"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/app/components/dashboard/SubmitButtons";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (res.ok) {
      sessionStorage.setItem("isAdmin", "true");
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("password", password);
      router.push("/admin/dashboard");
    } else {
      const { error } = await res.json();
      alert(error);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton text="Login" />
      </form>
    </div>
  );
}