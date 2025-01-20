"use client";

import { BookOpenText, Home, ChartCandlestick, Megaphone, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar"

import Image from "next/image"
import { Static } from "@/assets/image"
import { SocialIcon } from "@/components/atoms/Icons"

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Marketing Rules",
        url: "#",
        icon: ChartCandlestick,
    },
    {
        title: "Campaign",
        url: "#",
        icon: Megaphone,
    },
    {
        title: "Docs",
        url: "#",
        icon: BookOpenText,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export function AppSidebar() {
    const {
        open,
        isMobile,
    } = useSidebar()
    return (
        <Sidebar collapsible="icon" >
            <SidebarHeader>
                <div className="flex items-center gap-1 lg:gap-2">
                    <Image src={Static.Logo} alt="logo" width={isMobile ? 65 : 85} height={isMobile ? 65 : 85} />
                    {open || isMobile ? (<h2 className="darkModeText capitalize text-black tracking-wide lg:tracking-wider font-bold lg:font-bold text-xl lg:text-2xl">nestage</h2>) : ("")}
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="!flex justify-center !w-full lg:!hidden">
                    <SidebarGroupLabel>
                        <p className="darkModeText font-semibold text-lg !text-black">1,234,567,890 pts</p>
                    </SidebarGroupLabel>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <h1 className="font-bold text-xl">Menu</h1>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="pt-1">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon className="!w-5 !h-5" />
                                            <span className="text-lg">{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem className={`flex ${open || isMobile ? "flex-row" : "flex-col"} justify-center items-center w-full transition-all`}>
                    <div className={`${open || isMobile ? "px-4 space-x-5" : "space-y-3"} transition-all py-2`}>
                        <SocialIcon url="" network="telegram" className={`${open || isMobile ? "!w-10 !h-10" : "!w-7 !h-7"} transition-all`} />
                        <SocialIcon url="" network="x" className={`${open || isMobile ? "!w-10 !h-10" : "!w-7 !h-7"} transition-all`} />
                        <SocialIcon url="" network="youtube" className={`${open || isMobile ? "!w-10 !h-10" : "!w-7 !h-7"} transition-all`} />
                    </div>
                </SidebarMenuItem>
            </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
