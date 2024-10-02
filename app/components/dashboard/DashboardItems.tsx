"use client";

import { cn } from "@/lib/utils";
import { DollarSign, Globe, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardItems() {
  
  const navLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Sites",
      href: "/dashboard/sites",
      icon: Globe,
    },
    {
      name: "Pricing",
      href: "/dashboard/pricing",
      icon: DollarSign,
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
