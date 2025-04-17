import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileIcon, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Defaultimage from "@/public/default.png";
import { EmptyState } from "@/app/components/dashboard/EmptyState";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getAllSites() {
  const data = await prisma.site.findMany({
    include: {
      User: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      posts: {
        select: {
          id: true,
          title: true,
          image: true,
          createdAt: true,
        },
      },
    },
  });
  return data.map(site => ({
    ...site,
    isPublished: site.status === "published",
  }));
}

export default async function SitesRoute() {
  const sites = await getAllSites();
  return (
    <>
      <div className="flex w-full justify-end">
        <Button asChild>
          <Link href={"/dashboard/sites/new"}>
            <PlusCircle className="mr-2 size-4" /> Create Site
          </Link>
        </Button>
      </div>
      {sites === undefined || sites.length === 0 ? (
        <EmptyState
          title="You dont have any Sites created"
          description="You currently dont have any Sites. Please create some so that you can
        see them right here!"
          buttonText="Create Site"
          href="/dashboard/sites/new"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {sites.map((item) => (
            <Card key={item.id}>
              <Image
                src={item.imageUrl ?? Defaultimage}
                alt={item.name}
                className="rounded-t-lg w-full h-[200px]"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle className="truncate">{item.name}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/admin/dashboard/sites/${item.id}`}>
                    View Articles
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
