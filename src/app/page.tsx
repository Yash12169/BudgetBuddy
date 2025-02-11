import Disclaimer from "@/components/Cards/Disclaimer";
import NetWorth from "@/components/Cards/NetWorth";
import RiskProfile from "@/components/Cards/RiskProfile";
import Layout from "@/components/Layout/layout";
import { SidebarDemo } from "@/components/Navbar/navbar";
import Tester from "@/components/Tester/tester";
import ThemeController from "@/components/ThemeController/themeController";
import { Network } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      <div className="w-screen h-screen px-3 gap-5 flex flex-col">
        <ThemeController />

        <Disclaimer />
        <div className="flex gap-5">
        <RiskProfile/>
        <NetWorth/>
        </div>

      </div>
    </Layout>
  );
}
