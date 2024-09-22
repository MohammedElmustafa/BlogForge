"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo-Letter.svg";
import { ThemeToggle } from "../dashboard/ThemeToggle";
import { Button } from "@/components/ui/button";
import { LucideLayoutDashboard } from "lucide-react";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import HeroImageDark from "@/public/hero-d.png";
import HeroImageLight from "@/public/hero-w.png";

export function Hero() {
  
  const { theme, resolvedTheme } = useTheme();
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const [session, setSession] = useState<KindeUser<any> | null>(null);

  useEffect(() => {
    setIsThemeLoaded(true);
  }, [theme]);

  useEffect(() => {
    const fetchSession = async () => {
      if (typeof window === "undefined") {
        const { getKindeServerSession } = await import("@kinde-oss/kinde-auth-nextjs/server");
        const { getUser } = getKindeServerSession();
        const sessionData = await getUser();
        setSession(sessionData);
      }
    };

    fetchSession();
  }, []);

  const HeroImage = resolvedTheme === "dark" ? HeroImageDark : HeroImageLight;

  return (
    <>
      <div className="relative flex flex-col w-full py-5 mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center justify-between text-sm lg:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} className="size-10" alt="Logo" />

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
        {session?.id ? (
          <Link href="/dashboard">
            <Button variant="secondary"><LucideLayoutDashboard /> </Button>
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
