// Base community layout ( auth + role-based wrapper )

import { ReactNode } from "react";
import CommunityBase from "@/app/components/community/communityBase";

interface CommunityLayoutProps {
  children: ReactNode;
}

export default function CommunityLayout({ children }: CommunityLayoutProps) {
  return (
    <CommunityBase>
      <div className="max-w-6xl mx-auto p-6">{children}</div>
    </CommunityBase>
  );
}
