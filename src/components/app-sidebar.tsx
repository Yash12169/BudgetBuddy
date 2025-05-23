"use client"

import * as React from "react"
import {
  GalleryVerticalEnd,
  Goal,
  LayoutDashboardIcon,
  PieChart,
  User2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
Sidebar,
SidebarContent,
SidebarFooter,
SidebarHeader,
SidebarRail,
} from "@/components/ui/sidebar"
const data = {
user: {
name: "shadcn",
email: "m@example.com",
avatar: "",
},
teams: [
{
name: "BudgetBuddy",
logo: GalleryVerticalEnd,
plan: "",
},
],
navMain: [
{
title: "Dashboard",
url: "/user/dashboard",
webmIcon: "/assets/dashboardi.gif",
staticIcon: "/assets/dashboardi.png",
isActive: true,
},
{
title: "Financial Checkup",
url: "/user/financial-checkup",
webmIcon: "/assets/analysis.gif",
staticIcon: "/assets/analysis.png",
isActive: true,
},
{
title: "My Goals",
url: "/user/goals",
webmIcon: "/assets/finalgoal.gif",
staticIcon: "/assets/finalgoal.png",
isActive: true,
},
{
title: "Profile",
url: "/user/profile",
webmIcon: "/assets/profilei.gif",
staticIcon: "/assets/profilei.png",
isActive: true,
},
],
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
<SidebarFooter>
<NavUser user={data.user} />
</SidebarFooter>
<SidebarRail />
</Sidebar>
)
}