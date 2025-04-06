"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
// const titleParser = (title: string) => {
//   const words = title.trim().split(" ");
//   let ans = "";
//   words.forEach((word, i) => {
//     if (i > 0) ans += "-";
//     ans += word.toLowerCase();
//   });
//   return ans;
// };

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const router = useRouter();
  return (
    <SidebarGroup>
      <SidebarGroupLabel></SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            
            <SidebarMenuItem className="">
              <div onClick={()=>{router.push(item.url)}}>
                
                <SidebarMenuButton tooltip={item.title} className="">
                  {item.icon && <item.icon  />}
                  <span className="">{item.title}</span>
                </SidebarMenuButton>
              </div>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
