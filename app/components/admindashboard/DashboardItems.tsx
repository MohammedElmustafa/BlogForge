"use client";

import { cn } from "@/lib/utils";
import { Home, Globe, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardItems() {
  const navLinks = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: Home,
    },
    {
      name: "Sites",
      href: "/admin/dashboard/sites",
      icon: Globe,
    },
    {
      name: "Users",
      href: "/admin/dashboard/Users",
      icon: User,
    },
  ];
  const pathname = usePathname();
  return (
    <>
      {navLinks.map((item) => (
        <Link
          href={item.href}
          key={item.name}
          className={cn(
            pathname == item.href
              ? "bg-muted text-primary"
              : "text-muted-foreground bg-none",
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary/70"
          )}
        >
          <item.icon className="size-4" />
          {item.name}
        </Link>
      ))}
    </>
  );
}
