import prisma from "@/app/utils/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getAllMessages() {
  const messages = await prisma.contactMessage.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      message: true,
      createdAt: true,
    },
  });
  return messages;
}

export default async function AdminDashboardContact() {
  const messages = await getAllMessages();

  return (
    <>
      <h1 className="text-2xl font-bold">All Messages</h1>
      {messages.length === 0 ? (
        <div>No Messages found</div>
      ) : (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>All Messages</CardTitle>
              <CardDescription>
                Manage all Messages from this dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((message: any) => (
                    <TableRow key={message.id}>
                      <TableCell className="text-left">
                        {message.name}
                      </TableCell>
                      <TableCell className="text-left">
                        {message.email}
                      </TableCell>
                      <TableCell className="text-left">
                        {message.message}
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
