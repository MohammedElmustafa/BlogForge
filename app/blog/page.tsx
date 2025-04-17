import prisma from "@/app/utils/db";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Defaultimage from "@/public/default.png";
import { Hero } from "../components/frontend/Hero";
import { Footer } from "../components/frontend/Footer";

export default async function AllBlogsPage() {
  const blogs = await prisma.site.findMany({
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      name: true,
      description: true,
      imageUrl: true,
      subdirectory: true,
      User: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <h1 className="text-3xl font-bold mb-8 text-center">All Blogs</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Card key={blog.id}>
              <Image
                src={blog.imageUrl ?? Defaultimage}
                alt={blog.name}
                width={400}
                height={200}
                className="rounded-t-lg w-full h-[200px]"
              />
              <CardHeader>
                <CardTitle>{blog.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {blog.description}
                </CardDescription>
                <p className="text-sm text-muted-foreground mt-2">
                  By {blog.User ? `${blog.User.firstName} ${blog.User.lastName}` : "Unknown"}
                </p>
              </CardHeader>
              <div className="p-4">
                <Link
                  className="text-blue-600 hover:underline font-medium"
                  href={`/blog/${blog.subdirectory}`}
                >
                  View Blog
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
