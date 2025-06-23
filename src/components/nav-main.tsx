"use client";


import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Collapsible,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  url: string;
  icon?: string; 
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
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
            <SidebarMenuItem className="transition-all duration-300 hover:bg-blue-100/40 dark:hover:bg-blue-900/40 rounded-xl">
              <SidebarMenuButton
                tooltip={isCollapsed ? item.title : undefined}
                className="relative group flex items-center"
                onClick={() => router.push(item.url)}
              >
                {item.icon && (
                  <div
                    className={`flex-shrink-0 flex items-center justify-center ${
                      isCollapsed ? "w-6 h-6" : "w-7 h-7 mr-3"
                    } transition-all duration-200 group-hover:scale-110`}
                  >
                    <Image
                      src={item.icon}
                      alt={`${item.title} icon`}
                      width={28}
                      height={28}
                      className={`object-contain ${
                        isCollapsed ? "w-6 h-6" : "w-7 h-7"
                      }`}
                    />
                  </div>
                )}
                {!isCollapsed && (
                  <span className="ml-2 font-semibold text-blue-900 dark:text-blue-100 transition-opacity duration-200">
                    {item.title}
                  </span>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
