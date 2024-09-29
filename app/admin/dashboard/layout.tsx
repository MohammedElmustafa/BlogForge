"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import Logo from "@/public/logo-Letter.svg";
import Image from "next/image";
import { CircleUser, Globe, Home, Menu, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/app/components/dashboard/ThemeToggle";
import { DashboardItems } from "@/app/components/admindashboard/DashboardItems";
import { useRouter } from "next/navigation";

export const navLinks = [
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

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      sessionStorage.removeItem("isAdmin");
      router.push("/admin");
    }
  };

  return (
    <section className="relative grid min-h-screen w-full grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-muted opacity-100 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image src={Logo} alt="Logo" className="w-8 h-8" />
              <h3 className="text-lg lg:text-2xl">
                Blog<span className="text-primary">Forge</span>
              </h3>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 font-medium lg:px-4">
              <DashboardItems />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <button
            className="block md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-x-3 lg:gap-x-5">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <button onClick={handleLogout}>Log out</button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button>System</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-70 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </section>
  );
}
