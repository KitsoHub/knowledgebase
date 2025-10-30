'use client'
import VerificationWorkspace from '@/app/components/shared/patent/VerificationWorkspace'

export default function Verification() {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 space-y-4 p-4 md:p-8">
        {/* metrics */}
        {/* application queue */}

        {/* <VerificationOverviewMetrics /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <VerificationWorkspace />
        </div>
      </main>
    </div>
  )
}
