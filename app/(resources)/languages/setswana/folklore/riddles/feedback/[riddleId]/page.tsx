"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { FeedbackForm } from "@/app/components/languages/folklore/feedback/feedback-form"
import { useParams } from "next/navigation";
import { FeedbackService } from "@/app/utils/supabase/supabase";


export default function FeedbackPage() {
      const params = useParams();

      // const siteId = params.siteId as unknown as number;
    const id = params.riddleId as string;

  return (
    <div className="min-h-screen bg-background py-12 mt-28">
      <div className="max-w-2xl mx-auto px-4 space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Feedback</h1>
        </div>
        <FeedbackForm itemId={id}     itemCategory="riddle"
    onSuccess={async () => {

      const newFeedback = await FeedbackService.getFeedbackByItemId(id);

    }}/>
      </div>
    </div>
  )
}
