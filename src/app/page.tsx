import Allocation from "@/components/Cards/Allocation";
import Disclaimer from "@/components/Cards/Disclaimer";
import NetWorth from "@/components/Cards/NetWorth";
import RiskProfile from "@/components/Cards/RiskProfile";
import StarterCard from "@/components/Cards/starterCard";
import FranFormFaq from "@/components/FAQ/faq";
import LandFooter from "@/components/Footer/LandFooter/landFooter";
import Layout from "@/components/Layout/layout";
import { SidebarDemo } from "@/components/Navbar/navbar";
import Tester from "@/components/Tester/tester";
import ThemeController from "@/components/ThemeController/themeController";
import InvestmentChart from "@/components/ui/investmentChart";
import { Network } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      <div className="w-screen h-screen  gap-5 flex flex-col">
        <ThemeController />
          
        {/* <Disclaimer /> */}
        {/* <div className="flex gap-5"> */}
        {/* <RiskProfile/> */}
        {/* <StarterCard/> */}
        {/* </div> */}
        {/* <LandFooter/> */}
        <FranFormFaq/>
      </div>
    </Layout>
  );
}
