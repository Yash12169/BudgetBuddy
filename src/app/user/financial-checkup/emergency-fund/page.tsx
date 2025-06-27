"use client";
import Layout from "@/components/Layout/layout";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import EmergencyFundEdit from "@/components/Cards/EmergencyFundEdit";
import Disclaimer from "@/components/Cards/Disclaimer";

export default function FinancialSidebar() {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);
  return (
    <Layout>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="bg-base-200 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/user/financial-checkup" className="text-base-content hover:text-neutral-content/50">
                      Financial Checkup
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbLink href="/user/financial-checkup/emergency-fund">
                    <BreadcrumbPage className="text-base-content hover:text-neutral-content/50">Emergency Fund</BreadcrumbPage>
                  </BreadcrumbLink>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            {/* <ThemeController /> */}
            {/* <SignOutButton /> */}
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-base-200">
            <EmergencyFundEdit/>
            <Disclaimer/>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </Layout>
  );
}
