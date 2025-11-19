"use client"

import { CheckCheckIcon, Plus, ShieldAlertIcon } from "lucide-react"
import { Button } from "../ui/button"

interface VerificationActionBartProps {
    onApprove: () => void
    onReject: () => void
    onFeedback:() => void
}

export default function VerificationActionBar({onApprove, onReject, onFeedback}:VerificationActionBartProps) {
    return(
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4">
      <div className="flex items-center space-x-2">

        <Button onClick={onApprove}>
          <CheckCheckIcon className="w-4 h-4 mr-2" />
          Verify
        </Button>

        <Button className="bg-red-500" onClick={onReject}>
          <ShieldAlertIcon className="w-4 h-4 mr-2" />
          Reject
        </Button>

        <Button variant="outline" onClick={onFeedback}>
          <Plus className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Provide </span>Feedback
        </Button>

      </div>
      </div>
    )

}
