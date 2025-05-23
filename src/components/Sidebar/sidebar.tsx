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
import Disclaimer from "../Cards/Disclaimer";
import NetWorth from "../Cards/NetWorth";
import StarterCard from "../Cards/starterCard";
import FinancialScore from "../Cards/FinancialScore";
import Habits from "../Cards/Habits";
import Debt from "../Cards/Debt";
import ThemeController from "../ThemeController/themeController";
import { SignOutButton } from "@clerk/nextjs";
import EmergencyFund from "../Cards/EmergencyFund";
import Goals from "../Cards/Goals";
import GoalTracker from "../Cards/GoalTracker";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
export default function Sidebar() {
  const router = useRouter();
  const id = "user_2uGEVCVsBBTBRsEZzNWCMsb5r3N";
  useEffect(() => {
    const test = async () => {
      try {
        if (!id) {
          console.error("No user ID available");
          return;
        }

        const emergencyFund = 30000;

        console.log("Attempting to create emergency fund record for user:", id);
        console.log("Sending data:", { emergencyFund });

        const response = await axios.post(`/api/emergency-fund/${id}`, {
          emergencyFund,
        });

        if (response.data.success) {
          console.log("Successfully created emergency fund record:", response.data);
        } else {
          console.error("Failed to create emergency fund record:", response.data.message);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error creating emergency fund record:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
          });
        } else {
          console.error("Unknown error creating emergency fund record:", error);
        }
      }
    };

    test();
  }, [id]);

  
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
          <ThemeController />
          <SignOutButton />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="rounded-xl h-fit w-full">
              <StarterCard />
            </div>
            <div className="rounded-xl h-fit col-span-2 ">
              <GoalTracker />
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          <FinancialScore />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          
            <Goals />
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <div className="aspect-video rounded-xl bg-green-500">
              <NetWorth />
            </div>
            <div className="aspect-video rounded-xl bg-red-500">
              <Allocation />
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
