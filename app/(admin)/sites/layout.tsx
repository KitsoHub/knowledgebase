"use client"
import { SitesAppSidebar } from "@/app/components/heritageSites/sites-app-sidebar"
import SitesBase from "@/app/components/heritageSites/sitesBase"
import { SidebarProvider } from "@/app/components/ui/sidebar"
import { ThemeProvider } from "next-themes"
import { useState } from "react"

interface LayoutProps {
  children: React.ReactNode
}
const SitesAdminAppLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      <SidebarProvider>
        <div className="flex-1 flex min-h-screen">
          <SitesAppSidebar />
          <div className="flex-1 flex flex-col bg-card ">
            <SitesBase>
              <main className="flex-1 h-full overflow-y-auto p-4 ">
                {children}
              </main>
            </SitesBase>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default SitesAdminAppLayout
