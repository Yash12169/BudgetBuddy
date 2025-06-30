import Layout from "@/components/Layout/layout";
import FinancialSidebar from "@/components/Sidebar/FinancialSidebar";
import { themes, theme as ThemeType } from "@/components/ThemeController/themeController";

export default function page() {
  return (
    <div>
      <Layout>
      <FinancialSidebar/>
      </Layout>
     

    </div>
  )
}
