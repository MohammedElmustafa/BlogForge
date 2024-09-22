import { Hero } from "./components/frontend/Hero";
import { Features } from "./components/frontend/Features";
import { PricingTable } from "./components/shared/pricing";
import { Footer } from "./components/frontend/Footer";

export default async function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Hero />
      <Features />
      <PricingTable />
      <Footer />
    </div>
  );
}