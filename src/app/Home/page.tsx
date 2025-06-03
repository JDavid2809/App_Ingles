import Hero from "../components/hero";
import MethodSection from "../components/method";
import NavBar from "../components/NavBar";


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar/>
        <Hero/>
        <MethodSection/>
    </div>
  );
}
