// "use client"

// import { ChevronRight, type LucideIcon } from "lucide-react"

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible"
// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar"

// export function NavMain({
//   items,
// }: {
//   items: {
//     title: string
//     url: string
//     icon?: LucideIcon
//     isActive?: boolean
//     items?: {
//       title: string
//       url: string
//     }[]
//   }[]
// }) {
//   return (
//     <SidebarGroup>
//       <SidebarGroupLabel>Platform</SidebarGroupLabel>
//       <SidebarMenu>
//         {items.map((item) => (
//           <Collapsible
//             key={item.title}
//             asChild
//             defaultOpen={item.isActive}
//             className="group/collapsible"
//           >
//             <SidebarMenuItem>
//               <CollapsibleTrigger asChild>
//                 <SidebarMenuButton tooltip={item.title}>
//                   {item.icon && <item.icon />}
//                   <span>{item.title}</span>
//                   <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                 </SidebarMenuButton>
//               </CollapsibleTrigger>
//               <CollapsibleContent>
//                 <SidebarMenuSub>
//                   {item.items?.map((subItem) => (
//                     <SidebarMenuSubItem key={subItem.title}>
//                       <SidebarMenuSubButton asChild>
//                         <a href={subItem.url}>
//                           <span>{subItem.title}</span>
//                         </a>
//                       </SidebarMenuSubButton>
//                     </SidebarMenuSubItem>
//                   ))}
//                 </SidebarMenuSub>
//               </CollapsibleContent>
//             </SidebarMenuItem>
//           </Collapsible>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
//   )
// }





















"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AnimatedIcon } from "../animated-icons"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export interface NavItem {
  title: string
  url: string
  iconKey: string
  isActive?: boolean
  description?: string
}

const defaultItems = [
  {
    title: "Dashboard",
    iconKey: "dashboard",
    url: "/dashboard",
    description: "Your financial command center"
  },
  {
    title: "Financial Overview",
    iconKey: "financial",
    url: "/financial-checkup",
    description: "Review your financial health"
  },
  {
    title: "Expenses & Income",
    iconKey: "expenses",
    url: "/expenses",
    description: "Track your money flow"
  },
  {
    title: "Savings Goals",
    iconKey: "goals",
    url: "/goals",
    description: "Track your financial goals"
  },
  {
    title: "Investment Tracker",
    iconKey: "investments",
    url: "/investments",
    description: "Monitor your investments"
  },
  {
    title: "Reports & Analytics",
    iconKey: "reports",
    url: "/reports",
    description: "Detailed insights"
  },
  {
    title: "Smart Advisor",
    iconKey: "advisor",
    url: "/ai",
    description: "AI-powered insights"
  }
];

const bottomItems = [
  {
    title: "Settings",
    iconKey: "settings",
    url: "/settings",
    description: "Customize your experience"
  },
  {
    title: "Logout",
    iconKey: "logout",
    url: "/logout",
    description: "Exit securely"
  }
];

export function NavMain({ items = defaultItems }: { items?: NavItem[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const renderNavItem = (item: NavItem) => {
    const isActive = pathname === item.url;
    
    return (
      <SidebarMenuItem
        key={item.title}
        className="transition-all duration-200 ease-in-out group/item px-2"
        onMouseEnter={() => setHoveredItem(item.title)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <div 
          onClick={() => router.push(item.url)}
          className="w-full"
        >
          <SidebarMenuButton
            className={`group relative overflow-hidden rounded-xl transition-all duration-300 ease-in-out
              hover:bg-white/10 hover:shadow-[0_0_0.5rem_0_rgba(255,255,255,0.1)]
              active:scale-95 backdrop-blur-md
              ${isActive ? 'bg-white/20 text-primary shadow-[0_0_0.5rem_0_rgba(255,255,255,0.2)]' : 'bg-white/5'}`}
          >
            <div className="relative flex items-center justify-center">
              <AnimatedIcon 
                iconKey={item.iconKey as any}
                size={24}
                className="transition-colors duration-300 ease-in-out
                  group-hover/item:text-primary
                  group-data-[state=collapsed]/sidebar:h-5 group-data-[state=collapsed]/sidebar:w-5"
              />
              {/* Glass effect glow */}
              <div className="absolute inset-0 -z-10 rounded-full bg-white/20 blur-[2px] opacity-0 
                transition-all duration-300 group-hover/item:opacity-100 
                group-data-[state=collapsed]/sidebar:scale-150
                group-data-[state=collapsed]/sidebar:blur-md
                group-data-[state=collapsed]/sidebar:group-hover/item:scale-175" />
            </div>
            <span className="transition-all duration-300 ease-in-out px-3
              group-hover/item:text-primary group-hover/item:font-medium
              group-data-[state=collapsed]/sidebar:opacity-0
              group-data-[state=collapsed]/sidebar:w-0
              group-data-[state=collapsed]/sidebar:scale-0">
              {item.title}
            </span>
            {/* Glass effect tooltip */}
            <div className="absolute left-14 hidden rounded-xl bg-white/10 px-4 py-3
              text-sm font-medium shadow-[0_0_1rem_0_rgba(0,0,0,0.2)] backdrop-blur-md
              transition-all duration-300 border border-white/20
              group-data-[state=collapsed]/sidebar:group-hover/item:block">
              <div className="font-semibold text-primary mb-1">{item.title}</div>
              {item.description && (
                <div className="text-xs text-white/70">{item.description}</div>
              )}
            </div>
            {/* Glass gradient overlay */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 
              transition-opacity duration-300 ease-in-out group-hover/item:opacity-100" />
          </SidebarMenuButton>
        </div>
      </SidebarMenuItem>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <SidebarGroup className="flex-1">
        <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
        <SidebarMenu>
          {items.map(renderNavItem)}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarMenu>
          {bottomItems.map(renderNavItem)}
        </SidebarMenu>
      </SidebarGroup>
    </div>
  )
}
