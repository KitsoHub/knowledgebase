'use client'

import React from 'react'
import { BellIcon } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'

interface TopbarProps {
    username: string
    accountHostname: string
    toggleSidebar: () => void
}

const Topbar: React.FC<TopbarProps> = ({
    username,
    accountHostname,
    toggleSidebar,
}) => {
    return (
        <div className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-sm">
            <div className="flex items-center">
                {/* Sidebar toggle button */}
                <button
                    onClick={toggleSidebar}
                    className="mr-4 text-gray-600 dark:text-gray-300 hover:text-purple-600"
                    aria-label="Toggle Sidebar"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>

                <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Welcome, {username}
                </h1>
                <span className="ml-3 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                    {accountHostname}
                </span>
            </div>

            <div className="flex items-center space-x-4">
                <button
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                    aria-label="Notifications"
                >
                    <BellIcon className="w-6 h-6" />
                </button>

                <div className="relative">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    )
}

export default Topbar

