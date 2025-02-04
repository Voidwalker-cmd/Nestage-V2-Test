// "use client"
import {SidebarProvider} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/molecules/DashboardSidebar";
import {cookies} from "next/headers"

import type {Metadata} from "next";
import "./../../../globals.css";
import DashboardNav from "@/components/organisms/DashboardNav";
import {ThemeProvider} from "@/components/molecules/ThemeProvider"
import UserContext from "@/context/UserContext";


export const metadata: Metadata = {
  title: "Nestage Dashboard",
  description: "nestage",
};


export default async function Layout({ children, levelOne, levelTwo }: { children: React.ReactNode, levelOne: React.ReactNode, levelTwo: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <>
      <UserContext>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className="w-full h-full dark:bg-[#0A0A0A]">
          <DashboardNav />
          <div className="pt-20 pb-5 lg:pt-0 lg:pb-10">
            {children}
            {levelOne}
            {levelTwo}
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
      </UserContext>
    </>
  )
}

