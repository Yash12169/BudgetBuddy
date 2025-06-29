"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Disclaimer from "../Cards/Disclaimer";
import StarterCard from "../Cards/starterCard";
import FinancialScore from "../Cards/FinancialScore";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Goals from "../Cards/Goals";
import GoalTracker from "../Cards/GoalTracker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAtom } from "jotai";
import { persistentThemeAtom } from "../../atoms/atoms";

interface theme {
  id: string | number;
  theme: string;
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
}

const themes: theme[] = [
  {
    id: 0,
    theme: 'dark', 
    primary: "#200282",     
    secondary: "#5c6bc0",   
    accent: "#00bcd4",      
    neutral: "#0d1117",     
  },
  {
    id: 1,
    theme: 'night', 
    primary: "#000",     
    secondary: "#94a3b8",   
    accent: "#22d3ee",      
    neutral: "#1e1e2f",     
  },
  {
    id: 2,
    theme: 'corporate', 
    primary: "#4169e1",     
    secondary: "#7b9fff",   
    accent: "#00c49a",      
    neutral: "#f4f4f5",     
  },
];

export default function Sidebar() {
  const { user } = useUser();
  const router = useRouter();
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [, setTheme] = useAtom(persistentThemeAtom);

  const handleProfileClick = async () => {
    setIsProfileLoading(true);
    try {
      await router.push("/user/profile");
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handleThemeChange = (theme: string) => {
    setTheme(theme);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-base-200 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/user/dashboard" className="text-base-content hover:text-neutral-content/50">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2 ml-auto px-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity ring-2 ring-transparent hover:ring-primary/20">
                  <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                  <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/20 text-primary font-medium">
                    {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 shadow-lg">
                <DropdownMenuItem 
                  onClick={handleProfileClick}
                  disabled={isProfileLoading}
                  className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProfileLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <User className="mr-2 h-4 w-4" />
                  )}
                  {isProfileLoading ? "Loading..." : "My Profile"}
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      className="mr-2"
                      fill="currentColor"
                    >
                      <path d="M9.38 21.646A9.985 9.985 0 0 0 12 22l.141-.001a2.998 2.998 0 0 0 2.515-1.425c.542-.876.6-1.953.153-2.88l-.198-.415c-.453-.942-.097-1.796.388-2.281.485-.485 1.341-.841 2.28-.388h.001l.413.199a2.99 2.99 0 0 0 2.881-.153A2.997 2.997 0 0 0 22 12.141a9.926 9.926 0 0 0-.353-2.76c-1.038-3.827-4.353-6.754-8.246-7.285-3.149-.427-6.241.602-8.471 2.833S1.666 10.247 2.096 13.4c.53 3.894 3.458 7.208 7.284 8.246zM15.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-5-1a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM9 15.506a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-2.5-6.5a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 6.5 9.006z"></path>
                    </svg>
                    Change Theme
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="w-48 max-h-64 overflow-y-auto">
                    {themes.map((theme) => (
                      <DropdownMenuItem
                        key={theme.id}
                        onClick={() => handleThemeChange(theme.theme)}
                        className="cursor-pointer flex justify-between items-center px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <span className="capitalize">{theme.theme}</span>
                        <div className="flex gap-1">
                          <div style={{backgroundColor: theme.primary}} className="w-2 h-4 rounded-full"></div>
                          <div style={{backgroundColor: theme.secondary}} className="w-2 h-4 rounded-full"></div>
                          <div style={{backgroundColor: theme.accent}} className="w-2 h-4 rounded-full"></div>
                          <div style={{backgroundColor: theme.neutral}} className="w-2 h-4 rounded-full"></div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem 
                  asChild
                  className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SignOutButton>
                    <div className="flex items-center w-full">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </div>
                  </SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-base-200">
          <div className="grid auto-rows-min md:grid-cols-12 gap-x-4 gap-y-4">
            <div className="rounded-xl h-[300px] w-full md:col-span-4">
              <StarterCard />
            </div>
            <div className="rounded-xl h-[300px] w-full md:col-span-8">
              <GoalTracker />
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <FinancialScore />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min mt-2 mb-16 md:mb-4">
            <Goals />
          </div>
          <Disclaimer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
