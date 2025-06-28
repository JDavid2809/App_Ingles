import HeroSection from "@/components/hero";
import Navbar from "@/components/NavBar";
import MethodSection from '@/components/Method';


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
        <HeroSection/>
      <MethodSection/>
    </div>
  );
}
