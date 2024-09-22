"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import HeroImageLight from "@/public/hero-w.png";
import HeroImageDark from "@/public/hero-d.png";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

interface SectionProps {}

const Section: React.FC<SectionProps> = () => {
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
  <section className="relative flex items-center justify-center">
    <div className="relative items-center w-full py-12 lg:py-20">
      <div className="text-center">
        <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full">
          Ultimate Blogging SaaS for Startups
        </span>
        <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none">
          Setup your Blog{" "}
          <span className="block text-primary">in Minutes!</span>
        </h1>
        <p className="max-w-xl mx-auto mt-4 text-base font-light lg:text-lg text-muted-foreground tracking-tighter">
          Setting up your blog is hard and time consuming. We make it easy
          for you to create a blog in minutes
        </p>
        <div className="flex items-center gap-x-5 w-full justify-center mt-5 ">
          <LoginLink>
            <Button variant="secondary">Sign in</Button>
          </LoginLink>
          <RegisterLink>
            <Button>Try for free</Button>
          </RegisterLink>
        </div>
      </div>

      <div className="relative items-center w-full py-12 mx-auto mt-12">
        {isThemeLoaded ? (
          <Image
            src={HeroImage}
            alt="Hero image"
            priority
            className="relative object-cover w-full border rounded-lg shadow-2xl lg:rounded-2xl"
          />
        ) : null}
      </div>
    </div>
  </section>
);
};

export default Section;