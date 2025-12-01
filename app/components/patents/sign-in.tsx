"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { Wallet, AlertCircle, ShieldAlertIcon, BriefcaseBusinessIcon } from "lucide-react"

interface APIASignInModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (walletType: string) => void
}

export function APIASignInModal({ isOpen, onClose, onConnect }: APIASignInModalProps) {
  const [error, setError] = useState("")

  const handleConnect = (walletType: string) => {
    setError("")
    onConnect(walletType)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-crypto-darkBlue border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-crypto-black dark:text-white">
            Connect to APIA
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 dark:text-gray-300">
            Automated Patent Identification Authority
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md">
              <AlertCircle size={18} />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <Button
              onClick={() => handleConnect("metamask")}
              className="w-full flex items-center justify-between p-4 h-auto bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg text-left text-crypto-black dark:text-white hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 mr-3 flex-shrink-0">
                  <ShieldAlertIcon
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </div>
                <div>
                  <p className="font-medium">AdminPanel</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Connect to Admin Account</p>
                </div>
              </div>
              <div className="text-crypto-purple">
                <Wallet size={20} />
              </div>
            </Button>

            <Button
              onClick={() => handleConnect("walletconnect")}
              className="w-full flex items-center justify-between p-4 h-auto bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg text-left text-crypto-black dark:text-white hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 mr-3 flex-shrink-0">
                  <BriefcaseBusinessIcon
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </div>
                <div>
                  <p className="font-medium">My APIA</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Connect to your account using your token </p>
                </div>
              </div>
              <div className="text-crypto-purple">
                <Wallet size={20} />
              </div>
            </Button>

            <Button
              onClick={() => handleConnect("coinbase")}
              className="w-full flex items-center justify-between p-4 h-auto bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg text-left text-crypto-black dark:text-white hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 mr-3 flex-shrink-0">
                  <Image
                    src="/assets/communityvector.jpeg"
                    alt="IKMS"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </div>
                <div>
                  <p className="font-medium">IKMS Patent Dashboard</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">IKMS dashboard (token)</p>
                </div>
              </div>
              <div className="text-crypto-purple">
                <Wallet size={20} />
              </div>
            </Button>
          </div>
        </div>

        <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
          By connecting your APIA, you agree to Terms of Service and Privacy Policy
        </div>
      </DialogContent>
    </Dialog>
  )
}
