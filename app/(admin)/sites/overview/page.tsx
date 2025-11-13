'use client'

// Update the sites
import CollectionDashboard from '@/app/components/community/collectionDashboard'
import CommunityCreationFlow from '@/app/components/community/communityCreationFlow'
import CommunityDashboard from '@/app/components/community/communityDashboard'
import { CommunityDirectory } from '@/app/components/community/communityDirectory'
import SubCommunityCreationFlow from '@/app/components/community/subCommunityCreationFlow'
import SubCommunityDashboard from '@/app/components/community/subCommunityDashboard'
import SiteCreationFlow from '@/app/components/heritageSites/siteCreationFlow'
import { SitesDirectory } from '@/app/components/heritageSites/sitesDirectory'
import { Alert, AlertDescription } from '@/app/components/ui/alert'
import { Button } from '@/app/components/ui/button'
import { useCommunityStore } from '@/lib/store/communityStore'
import { SubCommunityData } from '@/lib/types/community'
import { BookOpen, Info, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function CommunityPage() {
  const [currentView, setCurrentView] = useState('directory')
  const [showCreateSite, setShowCreateSite] = useState(false)

//   const [currentSubCommunity, setCurrentSubCommunity] =
//     useState<SubCommunityData | null>(null)


  const handleBackToMain = () => {
    setShowCreateSite(false)
    setCurrentView('directory')
  }

  const renderCurrentView = () => {
    if (showCreateSite) {
      return (
        <SiteCreationFlow
          onComplete={() => setShowCreateSite(false)}
          onCancel={() => setShowCreateSite(false)}
        />
      )
    }

    switch (currentView) {
      case 'directory':
        return <SitesDirectory onNavigate={setCurrentView} />
    //   case 'community-dashboard':
    //     return (
    //       <CommunityDashboard
    //         onNavigate={setCurrentView}
    //         onCreateSubCommunity={() => setShowCreateSubCommunity(true)}
    //       />
    //     )
    //   case 'sub-community-dashboard':
    //     return (
    //       <SubCommunityDashboard
    //         onBack={handleBackToMain}
    //         onNavigate={setCurrentView}
    //       />
    //     )

    //   case 'collection-dashboard':
    //     return (
    //       <CollectionDashboard
    //         onBack={handleBackToMain}
    //         onNavigate={setCurrentView}
    //       />
    //     )
      // case 'knowledge':
      //   return <KnowledgeBaseView />;
      // case 'contribute':
      //   return <ContributionWizard />;
      // case 'tk-labels':
      //   return <TKLabelDashboard />;
      // case 'management':
      //   return <ManagementConsole />;
      default:
        return <SitesDirectory />
    }
  }
  return (
    <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertDescription>
          IKMS demonstrates. For full community governance, user authentication,
          and secure knowledge storage.
        </AlertDescription>
      </Alert>

      {!showCreateSite && currentView === 'directory' && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button
            onClick={() => setShowCreateSite(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Site</span>
          </Button>

          {/* <Button
              variant="outline"
              onClick={() => setCurrentView('contribute')}
              className="flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Contribute Knowledge</span>
            </Button> */}
        </div>
      )}

      {renderCurrentView()}
    </main>
  )
}
