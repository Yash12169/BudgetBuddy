"use client"

import { type LucideIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Collapsible,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

interface NavItem {
  title: string
  url: string
  icon?: LucideIcon
  webmIcon?: string
  staticIcon?: string
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

export function NavMain({ items }: { items: NavItem[] }) {
  const router = useRouter();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup>
      <SidebarGroupLabel />
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={`${item.title}-${item.url}`}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem className="transition-all duration-300 hover:bg-accent/50">
              <SidebarMenuButton
                tooltip={isCollapsed ? item.title : undefined}
                className="relative group"
                onClick={() => router.push(item.url)}
              >
                {item.webmIcon && item.staticIcon && (
                  <div
                    className={`relative flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
                      isCollapsed ? 'w-10 h-10' : 'w-12 h-12'
                    }`}
                  >
                    <Image
                      src={item.staticIcon}
                      alt={`${item.title} icon`}
                      width={isCollapsed ? 40 : 48}
                      height={isCollapsed ? 40 : 48}
                      className={`absolute inset-0 w-full h-full object-contain z-0 ${
                        isCollapsed ? '' : 'group-hover:opacity-0 transition-opacity duration-200'
                      }`}
                      style={{ opacity: isCollapsed ? 1 : undefined }}
                    />
                    {!isCollapsed && (
                      <Image
                        src={item.webmIcon}
                        alt={`${item.title} animated icon`}
                        width={48}
                        height={48}
                        className="absolute inset-0 w-full h-full object-contain z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      />
                    )}
                  </div>
                )}

                {!isCollapsed && (
                  <span className="ml-2 transition-opacity duration-200">
                    {item.title}
                  </span>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
