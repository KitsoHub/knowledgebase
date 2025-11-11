import React, { useState } from 'react'
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
import { MetricsPanel } from './MetricsPanel'
import { SiteForm } from './SiteForm'
import { SiteList } from './SiteList'
import { TemplateManager } from './TemplateManager'
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

interface CulturalSite {
  id: string
  name: string
  latitude: number
  longitude: number
  description: string
  category: 'heritage' | 'language' | 'botanical' | 'tribal' | 'migration'
  language?: string
  tribe?: string
  images: string[]
  videos: string[]
  audio: string[]
  metadata: {
    unesco: boolean
    undp: boolean
    unicef: boolean
    localContext: string
    indigenousSystem: string
    rights: string
    ipMetadata: string
    sensitivityLevel: 'public' | 'restricted' | 'closed'
    accessProtocol: string
  }
  populationDensity?: number
  migrationRoute?: string
  dateCreated: string
  lastUpdated: string
}

interface DashboardProps {
  sites: CulturalSite[]
  // onAddSite: (
  //   site: Omit<CulturalSite, 'id' | 'dateCreated' | 'lastUpdated'>
  // ) => void
  // onUpdateSite: (id: string, updates: Partial<CulturalSite>) => void
  // onDeleteSite: (id: string) => void
}

export function Dashboard({
  sites,
  // onAddSite,
  // onUpdateSite,
  // onDeleteSite,
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState('metrics')

  // Dashboard statistics
  const stats = {
    totalSites: sites.length,
    publicSites: sites.filter(
      site => site.metadata.sensitivityLevel === 'public'
    ).length,
    restrictedSites: sites.filter(
      site => site.metadata.sensitivityLevel === 'restricted'
    ).length,
    closedSites: sites.filter(
      site => site.metadata.sensitivityLevel === 'closed'
    ).length,
    unescoSites: sites.filter(site => site.metadata.unesco).length,
    undpSites: sites.filter(site => site.metadata.undp).length,
    unicefSites: sites.filter(site => site.metadata.unicef).length,
    categories: {
      heritage: sites.filter(site => site.category === 'heritage').length,
      language: sites.filter(site => site.category === 'language').length,
      botanical: sites.filter(site => site.category === 'botanical').length,
      tribal: sites.filter(site => site.category === 'tribal').length,
      migration: sites.filter(site => site.category === 'migration').length,
    },
    languages: [...new Set(sites.map(site => site.language).filter(Boolean))]
      .length,
    tribes: [...new Set(sites.map(site => site.tribe).filter(Boolean))].length,
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Heritage Dashboard
          </h2>
          <p className="text-gray-600">
            Manage cultural heritage sites and metadata
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-blue-100 text-blue-800">
            {stats.totalSites} Total Sites
          </Badge>
          <Badge className="bg-green-100 text-green-800">
            {stats.publicSites} Public
          </Badge>
          <Badge className="bg-yellow-100 text-yellow-800">
            {stats.restrictedSites} Restricted
          </Badge>
          <Badge className="bg-red-100 text-red-800">
            {stats.closedSites} Closed
          </Badge>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stats.totalSites}</p>
                <p className="text-sm text-gray-600">Total Sites</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stats.languages}</p>
                <p className="text-sm text-gray-600">Languages</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{stats.unescoSites}</p>
                <p className="text-sm text-gray-600">UNESCO Sites</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-amber-500" />
              <div>
                <p className="text-2xl font-bold">{stats.tribes}</p>
                <p className="text-sm text-gray-600">Tribal Groups</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="metrics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Metrics
          </TabsTrigger>
          <TabsTrigger value="add-site" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Site
          </TabsTrigger>
          <TabsTrigger value="manage-sites" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Manage Sites
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="mt-6">
          <MetricsPanel sites={sites} stats={stats} />
        </TabsContent>

        <TabsContent value="add-site" className="mt-6">
          <div className="max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle>Add New Cultural Heritage Site</CardTitle>
                <p className="text-sm text-gray-600">
                  Add a new site with comprehensive metadata following
                  international standards
                </p>
              </CardHeader>
              <CardContent>
                {/* <SiteForm onSubmit={onAddSite} /> */}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="manage-sites" className="mt-6">
          <SiteList
            sites={sites}
            // onUpdateSite={onUpdateSite}
            // onDeleteSite={onDeleteSite}
          />
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <TemplateManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}
