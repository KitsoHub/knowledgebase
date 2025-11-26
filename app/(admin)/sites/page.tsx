// 'use client'

import ProductivityTrendsChart from "@/app/components/shared/patent/ProductivityTrendsChart";
import StatusDistributionChart from "@/app/components/shared/patent/StatusDistributionChart";

// import React, { useState } from 'react'
// import { culturalSites } from '@/app/utils/map/locations' // Import culturalSites data
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from '@/app/components/ui/card'
// import { Button } from '@/app/components/ui/button'
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from '@/app/components/ui/tabs'
// import { Badge } from '@/app/components/ui/badge'
// import { MetricsPanel } from '@/app/components/heritageSites/MetricsPanel'
// import { SiteForm } from '@/app/components/heritageSites/SiteForm'
// import { SiteList } from '@/app/components/heritageSites/SiteList'
// import { TemplateManager } from '@/app/components/heritageSites/TemplateManager'
// import {
//   BarChart3,
//   Plus,
//   List,
//   FileText,
//   Database,
//   Users,
//   Globe,
//   Shield,
// } from 'lucide-react'
// import { SiteData } from '@/lib/types/sitesData'
// import { SitesDashboard } from '@/app/components/heritageSites/dashboard'

// export default function DashboardPage() {
//   const [sites, setSites] = useState(culturalSites)
//   const handleUpdateSite = (id: string, updates: Partial<SiteData>) => {
//     setSites(
//       sites.map(site =>
//         site.id === id
//           ? { ...site, ...updates, lastUpdated: new Date().toISOString() }
//           : site
//       )
//     )
//   }


//   const handleDeleteSite = (id: string) => {
//     setSites(sites.filter(site => site.id !== id))
//   }

//   return (
//     <SitesDashboard
//     />
//   )
// }

export default function SitesDashboardOverview() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 space-y-4 p-4 md:p-8">
        {/* metrics */}
        {/* application queue */}
        {/* verification workspace */}
        {/* <SitesOverMetrics /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatusDistributionChart />
          <ProductivityTrendsChart />
        </div>
      </main>
    </div>
  )
}
