import CommunityBase from '@/app/components/community/communityBase'

export default function SubmissionResourcePage() {
  return (
    <CommunityBase>
      <h1 className="text-2xl font-bold">Submission Resource Dashboard</h1>
      <p>Only admin, moderators, viewers can access this page</p>
    </CommunityBase>
  )
}
