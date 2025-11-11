'use client'

import React, { useState } from 'react'
import { culturalSites } from '@/app/utils/map/locations' // Import culturalSites data
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs'
import { Badge } from '@/app/components/ui/badge'
import { MetricsPanel } from '@/app/components/heritageSites/MetricsPanel'
import { SiteForm } from '@/app/components/heritageSites/SiteForm'
import { SiteList } from '@/app/components/heritageSites/SiteList'
import { TemplateManager } from '@/app/components/heritageSites/TemplateManager'
import {
  BarChart3,
  Plus,
  List,
  FileText,
  Database,
  Users,
  Globe,
  Shield,
} from 'lucide-react'
import { SiteData } from '@/lib/types/sitesData'
import { Dashboard } from '@/app/components/heritageSites/dashboard'

export default function DashboardPage() {
  const [sites, setSites] = useState(culturalSites) // Use culturalSites as the initial state

  // Add a new site
  // const handleAddSite = (
  //   site: Omit<CulturalSite, 'id' | 'dateCreated' | 'lastUpdated'>
  // ) => {
  //   const newSite = {
  //     ...site,
  //     id: `site${sites.length + 1}`, // Generate a unique ID
  //     dateCreated: new Date().toISOString(),
  //     lastUpdated: new Date().toISOString(),
  //   }
  //   setSites([...sites, newSite])
  // }

  // Update an existing site
  const handleUpdateSite = (id: string, updates: Partial<SiteData>) => {
    setSites(
      sites.map(site =>
        site.id === id
          ? { ...site, ...updates, lastUpdated: new Date().toISOString() }
          : site
      )
    )
  }

  // Delete a site
  const handleDeleteSite = (id: string) => {
    setSites(sites.filter(site => site.id !== id))
  }

  return (
    <Dashboard
      sites={sites}
      // onAddSite={handleAddSite}
      // onUpdateSite={handleUpdateSite}
      // onDeleteSite={handleDeleteSite}
    />
  )
}
