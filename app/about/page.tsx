import { Footer } from "@/app/components/frontend/Footer";
import { Hero } from "@/app/components/frontend/Hero";
import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";


interface CardProps {
  title: string;
  description: string;
}

const Card = ({ title, description }: CardProps) => (
  <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <h3 className="text-xl font-semibold text-primary">{title}</h3>
    <p className="mt-2 text-base text-muted-foreground">{description}</p>
  </div>
);

export default async function AboutRoute() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Hero />
      <div className="flex flex-col items-center justify-center gap-6 w-full py-24 sm:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            About Us
          </h1>
          <p className="text-sm font-semibold leading-7 text-primary uppercase tracking-wide">
            Welcome to BlogForge
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            At BlogForge, we empower you to express yourself through blogging. Our mission is to provide an intuitive platform that simplifies the blogging process, allowing you to share your ideas with the world effortlessly.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Whether you’re a passionate writer, a business looking to engage customers, or someone with a story to tell, BlogForge is here to help. Our tools are designed to make the blogging experience enjoyable and productive.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Join our community of creators today and start building your blog in minutes. Discover the joy of sharing your voice and connecting with others in a vibrant online space.
          </p>
          <br /><br />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 justify-items-center">
            <Card 
              title="Our Mission" 
              description="To provide an intuitive platform that simplifies blogging, allowing you to share your ideas effortlessly." 
            />
            <Card 
              title="Our Vision" 
              description="To create a vibrant community of writers and readers where creativity thrives and knowledge is shared." 
            />
            <Card 
            title="Our Goal" 
            description="To empower individuals by giving them the tools they need to express themselves and connect with a global audience." 
            />
          </div>
          <div className="mt-8">
            <RegisterLink>
              <Button>Get Started</Button>
            </RegisterLink>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
