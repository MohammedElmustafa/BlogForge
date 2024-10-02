"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "@/app/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function DeleteForm({ params }: { params: { userId: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    if (!isAdmin || isAdmin !== "true") {
      router.push("/admin");
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isAdmin = sessionStorage.getItem("isAdmin") || '';
    console.log("UserId:", params.userId);
    console.log("IsAdmin:", isAdmin);

    const response = await fetch('/api/deleteUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isAdmin,
        userId: params.userId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to delete user. Status:", response.status, errorText);
      setError("Failed to delete user.");
      return;
    }

    const data = await response.json();
    console.log(data);

    if (data.success) {
      router.push('/admin/dashboard/Users');
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      setError(data.message);
    }    
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Are you absolutely sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will delete this user and all related data from our server.
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary" asChild>
            <Link href={`/dashboard/Users/${params.userId}`}>Cancel</Link>
          </Button>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="userId" value={params.userId} />
            <SubmitButton variant="destructive" text="Delete User" />
          </form>
        </CardFooter>
        {error && <p className="text-red-500 mt-4">Error: {error}</p>}
      </Card>
    </div>
  );
}
