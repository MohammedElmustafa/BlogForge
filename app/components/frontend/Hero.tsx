"use client";

import Link from "next/link";
import { ThemeToggle } from "../dashboard/ThemeToggle";
import { Button } from "@/components/ui/button";
import { LucideLayoutDashboard } from "lucide-react";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import HeroImageDark from "@/public/hero-d.png";
import HeroImageLight from "@/public/hero-w.png";

export function Hero() {
  const { theme, resolvedTheme } = useTheme();
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  const { user } = useKindeBrowserClient();

  useEffect(() => {
    setIsThemeLoaded(true);
  }, [theme]);

  const HeroImage = resolvedTheme === "dark" ? HeroImageDark : HeroImageLight;

  return (
    <>
      <div className="relative flex flex-col w-full py-5 mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center justify-between text-sm lg:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <h4 className="text-3xl font-semibold">
              Blog<span className="text-primary">Forge</span>
            </h4>
          </Link>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
        <nav className="hidden md:flex md:justify-end md:space-x-4">
          <ThemeToggle />
          {user ? (
            <Link href="/dashboard">
              <Button variant="secondary">
                <LucideLayoutDashboard />
              </Button>
            </Link>
          ) : (
            <>
              <LoginLink>
                <Button variant="secondary">Sign in</Button>
              </LoginLink>
              <RegisterLink>
                <Button>Sign up</Button>
              </RegisterLink>
            </>
          )}
        </nav>
      </div>
    </>
  );
}
