import Hero from "@/components/views/hero";
import FeaturesSection from "@/components/views/Features";
import MethodSection from "@/components/views/method";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
        <Hero/>
        <FeaturesSection/>
        <MethodSection/>
    </div>
  );
}
