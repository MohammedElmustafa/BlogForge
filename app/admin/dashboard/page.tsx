"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    if (!isAdmin || isAdmin !== "true") {
      router.push("/admin");
    } else {
      setLoading(false);
    }
  }, [router]);
  if (loading) {
    return <div>Loading...</div>;
  }
}