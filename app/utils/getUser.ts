import prisma from "@/app/utils/db";
export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      Subscription: true,
    },
  });
  return user;
}