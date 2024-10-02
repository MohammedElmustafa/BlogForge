import { EmptyState } from "@/app/components/admindashboard/EmptyStateAdmin";
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
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

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

export default async function AdminDashboard() {
  
  const sites = await getAllSites();

  return (
    <>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      {sites.length === 0 ? (
        <EmptyState
          title="No Sites Found"
          description="There are currently no sites created."
        />
      ) : (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>All Sites</CardTitle>
              <CardDescription>
                Manage all sites from this dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4">Owner</TableHead>
                    <TableHead className="w-1/4">Site Subdirectory</TableHead>
                    <TableHead className="w-1/4">Articles</TableHead>
                    <TableHead className="w-1/4">Status</TableHead>
                    <TableHead className="w-1/4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sites.map((site) => (
                    <TableRow key={site.id}>
                      <TableCell className="text-left w-1/4">{site.User ? `${site.User.firstName} ${site.User.lastName}` : 'Unknown'}</TableCell>
                      <TableCell className="text-left w-1/4">
                        <Link href={`/blog/${site.subdirectory}`} target="_blank">
                          {site.subdirectory}
                        </Link>
                      </TableCell>
                      <TableCell className="w-1/4">
                        {site.posts.length > 0 ? (
                          <Badge variant="outline">{site.posts.length} Articles</Badge>
                        ) : (
                          <Badge variant="outline" className="text-red-500">
                            No Articles
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="w-1/4">
                        <Badge
                          variant="outline"
                          className={site.isPublished ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}
                        >
                          {site.isPublished ? 'Published' : 'Unpublished'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/dashboard/sites/${site.id}/settings`}>
                                Settings
                              </Link>
                            </DropdownMenuItem>
                            {site.posts.length > 0 && (
                              <DropdownMenuItem asChild>
                                <Link href={`/blog/${site.subdirectory}`}>
                                  View Site
                                </Link>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/dashboard/sites/${site.id}/unpublish`}>
                                Unpublish
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
        </div>
      )}
    </>
  );
}
