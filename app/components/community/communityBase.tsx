"use client";

// import { ReactNode } from "react";
// import { useUser } from "@clerk/nextjs";
// import RoleGuard from "./RoleGuard";
// import Sidebar from "./Sidebar";

// interface CommunityBaseProps {
//   children: ReactNode;
//   allowedRoles?: string[];
// }

// export default function CommunityBase({ children, allowedRoles }: CommunityBaseProps) {
//   const { user } = useUser();

//   return (
//     <RoleGuard user={user} allowedRoles={allowedRoles}>
//       <div className="flex min-h-screen">
//         <Sidebar />
//         <main className="flex-1 p-4">{children}</main>
//       </div>
//     </RoleGuard>
//   );
// }

import { ReactNode } from "react";
// { useUser } from "@clerk/nextjs";


interface CommunityBaseProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function CommunityBase({ children, allowedRoles }: CommunityBaseProps) {
  //const { user } = useUser();

  return <div className="flex-1 flex-col space-y-4 p-4 pt-6 md:p-8">{children}</div>

  // return (

  //     <div className="flex min-h-screen">

  //       <main className="flex-1 overflow-y-auto p-4 ">{children}</main>

  //     </div>

  // );
}
