"use client";
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
import Allocation from "../Cards/Allocation";
import RiskProfile from "../Cards/RiskProfile";
import Disclaimer from "../Cards/Disclaimer";
import NetWorth from "../Cards/NetWorth";
import StarterCard from "../Cards/starterCard";
import FinancialScore from "../Cards/FinancialScore";
import Habits from "../Cards/Habits";
import Debt from "../Cards/Debt";
import { useEffect } from "react";
import axios from "axios";
import ThemeController from "../ThemeController/themeController";

export default function Sidebar() {



  const id = 1;





  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/user/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbLink href="/user/financials">
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbLink>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ThemeController/>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <div className="aspect-video rounded-xl bg-green-500">
              <StarterCard />
            </div>
            <div className="aspect-video rounded-xl bg-red-500">
              <RiskProfile />
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-pink-300 md:min-h-min">
            <FinancialScore />
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <div className="aspect-video rounded-xl bg-green-500">
              <NetWorth />
            </div>
            <div className="aspect-video rounded-xl bg-red-500">
              <Allocation />
            </div>
          </div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-accent shadow-lg">
              <Habits />
            </div>
            <div className="aspect-video rounded-xl bg-accent shadow-lg">
              <Debt />
            </div>
            <div className="aspect-video rounded-xl bg-red-500">
              <Habits />
            </div>
          </div>
          <Disclaimer />

          <div className="min-h-[100vh] flex-1 rounded-xl bg-pink-300 md:min-h-min" />
          <div className="min-h-[100vh] flex-1 rounded-xl bg-pink-300 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

