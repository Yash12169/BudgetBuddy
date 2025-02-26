"use client";
import Accomplishments from "@/components/Accomplishments/accomplishments";
import Faq from "@/components/FAQ/faq";
import Features from "@/components/Features/features";
import LandFooter from "@/components/Footer/LandFooter/landFooter";
import Hero from "@/components/Hero/hero";
import { LoginForm } from "@/components/SignUp/loginForm";
import Navbar2 from "@/components/Navbar/navbar2";
import ExampleWrapper from "@/components/ui/modal";
import { TextParallax } from "@/components/ui/textParallax";
import { ReactLenis } from "@studio-freight/react-lenis"; // Correct import

export default function Home() {
  return (
    <ReactLenis root>
      <div className="flex flex-col gap-[8rem] bg-[#FFF8ED] pb-[2.5rem]">
        <Navbar2 />
        <Hero />
        <TextParallax />
        <Accomplishments />
        <Features />
        <Faq />
        <LandFooter />
      </div>
    </ReactLenis>
  );
}
