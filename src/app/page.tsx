import Accomplishments from "@/components/Accomplishments/accomplishments";
import Faq from "@/components/FAQ/faq";
import Features from "@/components/Features/features";
import LandFooter from "@/components/Footer/LandFooter/landFooter";
import Hero from "@/components/Hero/hero";
import Navbar2 from "@/components/Navbar/navbar2";
import { TextParallax } from "@/components/ui/textParallax";

export default function Home() {
  return (
    <div className="flex flex-col gap-[8rem] bg-[#FFF8ED] pb-[2.5rem]">
      <Navbar2 />
      <Hero />
      <TextParallax/>
      <Accomplishments />
      <Features />
      <Faq />
      <LandFooter />
      {/* <WaitScroller /> */}
{/*       
      <Layout>
        <div className="w-screen h-screen  gap-5 flex flex-col">
          {/* <NavbarDemo/> */}

          {/* <Disclaimer /> */}
          {/* <div className="flex gap-5"> */}
          {/* <RiskProfile/> */}
          {/* <StarterCard/> */}
          {/* </div> */}
          {/* <LandFooter/> */}
          {/* <HeroImage/> */}

          {/* <ThemeController /> */}
        {/* </div> */}
      {/* </Layout> */} 
    </div>
  );
}
