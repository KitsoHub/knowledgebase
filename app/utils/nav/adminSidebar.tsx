'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
    HomeIcon,
    CogIcon,
   // BookOpenText,
    MoonIcon,
    SunIcon,
    ChevronRightIcon,
    Headphones,
   // UsersRound,
    //Amphora,
    Newspaper,
    //BrainCircuit,
} from 'lucide-react'

interface SidebarProps {
    isOpen: boolean
    toggleSidebar: () => void
}
const AdminSidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode)
        document.documentElement.classList.toggle('dark')
    }

    const menuItems = [
        { icon: HomeIcon, label: 'Overview', href: '/admin/overview' },
        { icon: Newspaper, label: 'Patents', href: '/patents',  badge: 'Beta' },
        // {
        //     icon: BrainCircuit,
        //     label: 'KitsoAI',
        //     href: '/dashboard/kitsoai',
        //     badge: 'Beta',
        // },
        // {
        //     icon: UsersRound,
        //     label: 'Cultures',
        //     href: '/cultures',
        //     badge: 'Beta',
        // },
        // {
        //     icon: Newspaper,
        //     label: 'Articles',
        //     href: '/dashboard/articles',
        //     badge: 'Beta',
        // },
        // {
        //     icon: Amphora,
        //     label: 'Artifacts',
        //     href: '/artifacts',
        //     badge: 'Beta',
        // },
        { icon: Headphones, label: 'Support', href: '/support', badge: 'Beta' },
        { icon: CogIcon, label: 'Settings', href: '/settings', badge: 'Beta' },
    ]

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <div
                className={`
          fixed left-0 top-0 h-full
          bg-white dark:bg-gray-800
          shadow-md transition-all duration-300
          z-50
          w-64
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}

        `}
            >
                <button
                    onClick={toggleSidebar}
                    className="
          absolute right-0 top-4
            translate-x-full bg-white dark:bg-gray-800
            p-2 rounded-r-md shadow-md hover:bg-indigo-400
          "
                >
                    <ChevronRightIcon
                        className={`w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-white
              ${isOpen ? 'rotate-180' : ''} transition-transform`}
                    />
                </button>
                <div className="p-4 border-b dark:border-gray-700">
                    <img
                        src="/logo.svg"
                        alt="KitsoHub"
                        className="h-10 mx-auto"
                    />
                </div>

                <nav className="mt-5">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className="flex items-center p-3 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors group"
                        >
                            <item.icon className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400 group-hover:text-purple-600" />
                            <span className="flex-grow text-gray-700 dark:text-gray-300 group-hover:text-purple-600">
                                {item.label}
                            </span>
                            {item.badge && (
                                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t dark:border-gray-700">
                    <button
                        onClick={toggleTheme}
                        className="w-full flex items-center justify-center p-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                        {isDarkMode ? (
                            <SunIcon className="w-5 h-5 mr-2 text-yellow-500" />
                        ) : (
                            <MoonIcon className="w-5 h-5 mr-2 text-purple-600" />
                        )}
                        <span className="text-gray-700 dark:text-gray-300">
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar
