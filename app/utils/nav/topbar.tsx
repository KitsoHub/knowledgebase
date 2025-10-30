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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toggleSidebar,
}) => {
  return (
    <div className="flex sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center pl-10">
        {/* <button
          onClick={toggleSidebar}
          className=" mr-4 text-gray-600 dark:text-gray-300 hover:text-purple-600"
          aria-label="Toggle Sidebar"
        >
          <MenuIcon className="w-6 h-6" />
        </button> */}
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Welcome, {username}
        </h1>
        <span className="ml-3 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
          {accountHostname}
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {/* <button
          className="flex items-center justify-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          aria-label="Create new article"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Create a new article
        </button> */}

        <button
          className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
          aria-label="Notifications"
        >
          <BellIcon className="w-6 h-6" />
        </button>

        <div className="relative">
          {/* <button
                        className="flex items-center"
                        aria-label="User profile"
                    >
                        <UserCircleIcon className="w-8 h-8 text-gray-500 dark:text-gray-400 hover:text-purple-600" />
                    </button> */}
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  )
}

export default Topbar
