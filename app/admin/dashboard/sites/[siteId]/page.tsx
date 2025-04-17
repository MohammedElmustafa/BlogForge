import { EmptyState } from "@/app/components/dashboard/EmptyState";
import prisma from "@/app/utils/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Book,
  MoreHorizontal,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getData(siteId: string) {
  const data = await prisma.site.findUnique({
    where: {
      id: siteId,
    },
    select: {
      subdirectory: true,
      posts: {
        select: {
          image: true,
          title: true,
          createdAt: true,
          slug: true,
          id: true
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return data;
}

export default async function AdminSitePosts({
  params,
}: {
  params: { siteId: string };
}) {
  const data = await getData(params.siteId);
  return (
    <>
      <div className="flex w-full justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manage Articles</h2>
        <div className="flex gap-2">
          <Button asChild variant="secondary">
            <Link href={`/blog/${data?.subdirectory}`}>
              <Book className="size-4 mr-2" />
              View Blog
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href={`/admin/sites/${params.siteId}/settings`}>
              <Settings className="size-4 mr-2" />
              Site Settings
            </Link>
          </Button>
        </div>
      </div>

      {data?.posts === undefined || data.posts.length === 0 ? (
        <EmptyState
          title="No Articles Found"
          description="There are no articles for this site. Ask the user to create some."
          buttonText="Back to Sites"
          href="/admin/sites"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Articles</CardTitle>
            <CardDescription>Review and manage blog posts</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.posts.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Image
                        src={item.image}
                        width={64}
                        height={64}
                        alt="Article Cover Image"
                        className="size-16 rounded-md"
                      />
                    </TableCell>
                    <TableCell>
                      <Link href={`/blog/${data.subdirectory}/${item.slug}`} target="_blank">
                        {item.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-500/10 text-green-500"
                      >
                        Published
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "medium",
                      }).format(item.createdAt)}
                    </TableCell>
                    <TableCell className="text-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin/dashboard/sites/${params.siteId}/${item.id}`}
                            >
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin/dashboard/sites/${params.siteId}/${item.id}/delete`}
                            >
                              Delete
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
}