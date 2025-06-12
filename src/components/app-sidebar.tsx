"use client"

import * as React from "react"
import { Wallet } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import finalgoalGif from "../assets/finalgoal.gif";
import finalgoalPng from "../assets/finalgoal.png";
import dashboardGif from "../assets/dashboardi.gif";
import dashboardPng from "../assets/dashboardi.png";
import analysisGif from "../assets/analysis.gif";
import analysisPng from "../assets/analysis.png";
import profileGif from "../assets/profilei.gif";
import profilePng from "../assets/profilei.png";

const data = {
  teams: [
    {
      name: "BudgetBuddy",
      logo: Wallet,
      plan: "",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      webmIcon: dashboardGif.src,
      staticIcon: dashboardPng.src,
      isActive: true,
    },
    {
      title: "Financial Checkup",
      url: "/user/financial-checkup",
      webmIcon: analysisGif.src,
      staticIcon: analysisPng.src,
      isActive: true,
    },
    {
      title: "My Goals",
      url: "/user/goals",
      webmIcon: finalgoalGif.src,
      staticIcon: finalgoalPng.src,
      isActive: true,
    },
    {
      title: "Profile",
      url: "/user/profile",
      webmIcon: profileGif.src,
      staticIcon: profilePng.src,
      isActive: true,
    },
  ] as {
    title: string;
    url: string;
    webmIcon?: string;
    staticIcon?: string;
    isActive?: boolean;
  }[],
  projects: [],
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}