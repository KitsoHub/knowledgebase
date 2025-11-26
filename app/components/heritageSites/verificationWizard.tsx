"use client"

import { useState } from "react"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useSubmitVote } from "@/app/hooks/use-sites"


interface VerificationWizardProps {
  siteId: number
  mode: "approve" | "reject"
  onComplete: () => void
}

export function VerificationWizard({ siteId, mode, onComplete }: VerificationWizardProps) {
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const { submitVote, isSubmitting, submitError } = useSubmitVote(siteId)


  const submitVerification = async () => {
    setLoading(true)
    setError(null)

    try {
    //   const res = await fetch(`/api/sites/sites/${siteId}/submit_verification`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       vote: mode === "approve" ? "approve" : "reject",
    //       comment,
    //     }),
    //   })

        await submitVote({
            siteId,
            vote: mode,
            comment
        })
        onComplete()

    //   if (!res.ok) throw new Error("Failed to submit verification")

      setSuccess(true)
      setTimeout(() => onComplete(), 1000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">


      <p className="text-sm text-muted-foreground">
        You are about to <strong>{mode === "approve" ? "Approve" : "Reject"}</strong> this verification.
        Please provide a short comment.
      </p>

      <Textarea
        placeholder="Add your comment..."
        value={comment}
        onChange={e => setComment(e.target.value)}
        className="min-h-[120px]"
      />

    {submitError && (
        <p className="text-red-500 text-sm">
          Failed to submit: {String(submitError)}
        </p>
      )}


      {success && (
        <p className="text-green-600 text-sm">Submitted successfully!</p>
      )}


      <div className="flex justify-end">
        <Button disabled={loading} onClick={submitVerification}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  )
}
