import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="mt-16 flex flex-col items-center justify-center gap-4 py-8 text-center text-sm text-muted-foreground">
      <div className="container mx-auto flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0 md:space-x-8">
                <div className="text-center md:text-left">
                <h4 className="text-3xl font-semibold">
                    Blog<span className="text-primary">Forge</span>
                </h4>
                <p className="text-sm text-gray-400">
                    © 2024 BlogForge. All rights reserved.
                </p>
                </div>
                <nav className="flex space-x-4">
                <Link href="/" className="text-gray-400 hover:text-primary">
                    About Us
                </Link>
                <Link href="/" className="text-gray-400 hover:text-primary">
                    Contact
                </Link>
                <Link href="/" className="text-gray-400 hover:text-primary">
                    Privacy Policy
                </Link>
                <Link href="/" className="text-gray-400 hover:text-primary">
                    Terms of Service
                </Link>
                </nav>
                <div className="flex space-x-4">
                <Link href="https://facebook.com" aria-label="Facebook">
                    <FaFacebook className="w-5 h-5 text-gray-400 hover:text-primary" />
                </Link>
                <Link href="https://twitter.com" aria-label="Twitter">
                    <FaTwitter className="w-5 h-5 text-gray-400 hover:text-primary" />
                </Link>
                <Link href="https://instagram.com" aria-label="Instagram">
                    <FaInstagram className="w-5 h-5 text-gray-400 hover:text-primary" />
                </Link>
                <Link href="https://github.com" aria-label="GitHub">
                    <FaGithub className="w-5 h-5 text-gray-400 hover:text-primary" />
                </Link>
                </div>
        </div>  
    </footer>
  );
}