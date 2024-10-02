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
async function getAllUsers() {
  const users = await prisma.user.findMany({
    include: {
      Site: true,
      posts: true,
      Subscription: true,
    },
  });
  return users;
}
export default async function AdminDashboardUsers() {
  const users = await getAllUsers();
  return (
    <>
      <h1 className="text-2xl font-bold">All Users</h1>
      {users.length === 0 ? (
        <div>No users found</div>
      ) : (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Manage all users from this dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead >Profile Image</TableHead>
                    <TableHead >First Name</TableHead>
                    <TableHead >Last Name</TableHead>
                    <TableHead >Email</TableHead>
                    <TableHead >Plan</TableHead>
                    <TableHead >Sites</TableHead>
                    <TableHead >Posts</TableHead>
                    <TableHead >Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="text-left">
                        <img
                          src={user.profileImage}
                          alt="Profile Image"
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      </TableCell>
                      <TableCell className="text-left">{user.firstName}</TableCell>
                      <TableCell className="text-left">{user.lastName}</TableCell>
                      <TableCell className="text-left">{user.email}</TableCell>
                      <TableCell className="text-left">
                        {user.Subscription ? (
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                            {user.Subscription.planId === "startup" ? "Startup" : "Freelance"}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-500/10 text-gray-500">
                            Free
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-left">
                        <Badge variant="outline">{user.Site.length} Sites</Badge>
                      </TableCell>
                      <TableCell className="text-left">
                        <Badge variant="outline">{user.posts.length} Posts</Badge>
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
                              <Link href={`/admin/dashboard/Users/${user.id}/edit`}>
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/dashboard/Users/${user.id}/delete`}>
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
        </div>
      )}
    </>
  );
}
