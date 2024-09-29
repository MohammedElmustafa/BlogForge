import prisma from "./db";
import { NextApiResponse } from "next";
import bcrypt from "bcrypt";
export const requireAdminUser = async (username: string, password: string, res: NextApiResponse) => {
  const adminUser = await prisma.admin.findUnique({
    where: { username: username },
  });
  if (!adminUser || !(await bcrypt.compare(password, adminUser.password))) {
    res.writeHead(302, { Location: "/admin" });
    res.end();
    return;
  }

  return adminUser;
};