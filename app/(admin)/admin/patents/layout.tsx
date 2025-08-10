'use client'

import PatentAdminSidebar from '@/app/utils/nav/patentAdminSidebar'
import Topbar from '@/app/utils/nav/topbar'
import { useState } from 'react'

interface LayoutProps {
    children: React.ReactNode
}
const PatentAppLayout: React.FC<LayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }
    return (

        <div className="flex min-h-screen bg-background">


            {/* Main content area */}
            <div
                className={`flex-shrink-0 transition-width duration-300 ${isSidebarOpen ? 'w-16' : 'w-64'
                    }`}
            >
                {/* Sidebar */}
                <PatentAdminSidebar isCollapsed={isSidebarOpen} onToggle={toggleSidebar} />


            </div>

      <div className="flex flex-col flex-1 transition-all duration-300">
                        {/* Topbar */}
                <Topbar
                    username="Testuser"
                    accountHostname="localhost"
                    toggleSidebar={toggleSidebar}
                />

                {/* Main content */}
                <main className="flex-1 overflow-y-auto p-4 ">
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-white dark:bg-gray-900 p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} KitsoHub | Version 1.0.0
                </footer>
            </div>
        </div>
    )
}

export default PatentAppLayout
