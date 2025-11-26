"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { VerificationWizard } from "./verificationWizard"


interface VerificationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  siteId: number
  mode: "approve" | "reject"
}

export function VerificationDialog({ open, onOpenChange, siteId, mode }: VerificationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "approve" ? "Approve Verification" : "Reject Verification"}</DialogTitle>
          <DialogDescription>
            Submit your decision for site <strong>{siteId}</strong>
          </DialogDescription>
        </DialogHeader>

        <VerificationWizard
        //   siteId={siteId as unknown as number}
          siteId={Number(siteId)}
          mode={mode}
          onComplete={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
