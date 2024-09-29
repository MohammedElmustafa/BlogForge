import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const adminUser = await prisma.admin.findUnique({
    where: { username },
  });

  if (!adminUser || adminUser.password !== password) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  return NextResponse.json({ message: "Login successful" });
}
