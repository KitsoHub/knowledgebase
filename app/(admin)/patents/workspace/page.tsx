import { VerificationWorkspace } from "@/app/components/shared/workspace/verification-workspace";

export default function WorkspacePage() {
  return (
    <div className="flex min-h-screen">
      {/* <AppSidebar /> */}
      <div className="flex-1">
        {/* <DashboardShell> */}
          <div className="flex items-center mb-4">
            {/* <SidebarToggle /> */}
            {/* <DashboardHeader
              heading="Verification Workspace"
              text="Review and process patent applications in your workspace."
            /> */}
          </div>
          <VerificationWorkspace />
        {/* </DashboardShell> */}
      </div>
    </div>
  )
}
