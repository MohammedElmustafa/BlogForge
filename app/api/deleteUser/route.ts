import { NextResponse } from 'next/server';
import prisma from "@/app/utils/db";
export async function POST(req: Request) {
  try {
    const {isAdmin, userId } = await req.json();
    console.log("Received data:", {isAdmin,userId });
    const adminUser = isAdmin;
    if (!adminUser) {
      console.log("Unauthorized access attempt");
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }
    const userToDelete = await prisma.user.findUnique({ where: { id: userId } });
    if (!userToDelete) {
      console.log("User not found for deletion:", userId);
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
    await prisma.site.deleteMany({ where: { userId: userId } });
    await prisma.post.deleteMany({ where: { userId: userId } });
    await prisma.user.delete({ where: { id: userId } });
    console.log("User deleted successfully:", userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ success: false, message: "An error occurred while deleting the user." }, { status: 500 });
  }
}