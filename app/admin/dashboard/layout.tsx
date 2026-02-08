"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import Logo from "@/public/logo-Letter.svg";
import Image from "next/image";
import { CircleUser, Menu } from "lucide-react";
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

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const adminStatus = sessionStorage.getItem("isAdmin");
    if (adminStatus !== "true") {
      router.push("/admin");
    } else {
      setIsAdmin(true);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("isAdmin");
    router.push("/admin");
  };

  if (isAdmin === null) {
    return <div />;
  }

  return (
    <section className="relative grid min-h-screen w-full grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64
          bg-muted dark:bg-gray-800
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }
        `}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b border-gray-200 dark:border-gray-700 px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <h3 className="text-lg lg:text-2xl text-gray-800 dark:text-gray-100">
                Blog<span className="text-primary dark:text-primary/80">Forge</span>
              </h3>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="grid items-start px-2 font-medium lg:px-4">
              <DashboardItems />
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b border-gray-200 dark:border-gray-700 bg-muted/40 dark:bg-gray-800/40 px-4 lg:h-[60px] lg:px-6">
          <button
            className="block md:hidden text-gray-700 dark:text-gray-200"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="ml-auto flex items-center gap-x-3 lg:gap-x-5">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white dark:bg-gray-800">
                <DropdownMenuItem asChild>
                  <button onClick={handleLogout} className="text-gray-700 dark:text-gray-200">
                    Log out
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button className="text-gray-700 dark:text-gray-200">System</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-white dark:bg-gray-900">
          {children}
        </main>
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </section>
  );
}
