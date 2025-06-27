"use client";
import Layout from "@/components/Layout/layout";
import { AppSidebar } from "@/components/app-sidebar";
import DebtEdit from "@/components/Cards/DebtEdit";
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
                    <BreadcrumbLink href="/user/financial-checkup" className="text-base-content">
                      Financial Checkup
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbLink href="/user/financial-checkup/debt">
                    <BreadcrumbPage className="text-base-content">Debt</BreadcrumbPage>
                  </BreadcrumbLink>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-base-200">
            <DebtEdit/>
            <Disclaimer/>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </Layout>
  );
}
