import Hero from "@/app/components/views/hero";
import FeaturesSection from "@/app/components/views/Features";
import MethodSection from "@/app/components/views/method";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
        <Hero/>
        <FeaturesSection/>
        <MethodSection/>
    </div>
  );
}
