
import Hero from "@/components/ui/hero";
import MethodSection from "@/components/ui/Method";
import FeaturesSection from "@/components/views/Features";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
        <Hero/>
        <MethodSection/>
        <FeaturesSection/>
    </div>
  );
}
