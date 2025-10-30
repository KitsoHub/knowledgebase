// Base community layout ( auth + role-based wrapper )

import { ReactNode } from 'react'
import CommunityBase from '@/app/components/community/communityBase'
import { ThemeProvider } from 'next-themes'
import { SidebarProvider } from '@/app/components/ui/sidebar'
import { AppSidebar } from '@/app/components/community/app-sidebar'

interface CommunityLayoutProps {
  children: ReactNode
}

export default function CommunityLayout({ children }: CommunityLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      <SidebarProvider>
        <div className="flex-1 flex min-h-screen">
          <AppSidebar />
          <div className="flex-1 flex flex-col bg-card ">
            <CommunityBase>
              {/* <div className="flex items-center mb-4">
                                            <SidebarToggle />
                                            <DashboardHeader
                                                heading="Financial Services Portal Dashboard"
                                                text="Governance, risk, compliance processes"
                                            />
                                        </div> */}

              {/* Main content */}
              <main className="flex-1 h-full overflow-y-auto p-4 ">
                {children}
              </main>
              <footer className="bg-white dark:bg-gray-900 p-4 text-center text-sm text-gray-500 dark:text-gray-400 w-full">
                © {new Date().getFullYear()} IKMS | Version 1.0.0
              </footer>
            </CommunityBase>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>

    //                 <html lang="en" suppressHydrationWarning>
    //     <body className="bg-background text-foreground">
    //     </body>
    // </html>
  )

  // <CommunityBase>
  //   <div className="max-w-6xl mx-auto p-6">{children}</div>
  // </CommunityBase>
}
