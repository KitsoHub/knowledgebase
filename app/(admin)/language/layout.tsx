'use client'

import { AppSidebar } from '@/app/components/community/app-sidebar'
import CommunityBase from '@/app/components/community/communityBase'
import { LanguagesAppSidebar } from '@/app/components/languages/languages-app-sidebar'
import LanguagesBase from '@/app/components/languages/languagesBase'
import { PatentsAppSidebar } from '@/app/components/patents/patents-app-sidebar'
import PatentsBase from '@/app/components/patents/patentsBase'
import { SidebarProvider } from '@/app/components/ui/sidebar'
import PatentAdminSidebar from '@/app/utils/nav/patentAdminSidebar'
import Topbar from '@/app/utils/nav/topbar'
import { ThemeProvider } from 'next-themes'
import { useState } from 'react'

interface LayoutProps {
  children: React.ReactNode
}
const AdminAppLayout: React.FC<LayoutProps> = ({ children }) => {
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
          <LanguagesAppSidebar />
          <div className="flex-1 flex flex-col bg-card ">
            <LanguagesBase>
              <main className="flex-1 h-full overflow-y-auto p-4 ">
                {children}
              </main>
            </LanguagesBase>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default AdminAppLayout
