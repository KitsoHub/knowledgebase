import CommunityBase from "@/app/components/community/communityBase";


export default function AdminPage() {
  return (
    <CommunityBase>
      <h1 className="text-2xl font-bold">Community Admin Dashboard</h1>
      <p>Only admins can access this page</p>
    </CommunityBase>
  );
}
