"use client"
import CommunityCreationFlow from '@/app/components/community/communityCreationFlow';
import CommunityDashboard from '@/app/components/community/communityDashboard';
import { CommunityDirectory } from '@/app/components/community/communityDirectory';
import SubCommunityCreationFlow from '@/app/components/community/subCommunityCreationFlow';
import { Alert, AlertDescription } from '@/app/components/ui/alert'
import { Button } from '@/app/components/ui/button';
import { useCommunityStore } from '@/lib/store/communityStore';
import { BookOpen, Info, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function CommunityPage() {
  const [currentView, setCurrentView] = useState('directory');
  const [showCreateCommunity, setShowCreateCommunity] = useState(false);
  const [showCreateSubCommunity, setShowCreateSubCommunity] = useState(false);

  if (showCreateSubCommunity) {
    return (

      <SubCommunityCreationFlow
        onComplete={() => setShowCreateSubCommunity(false)}
        onCancel={() => setShowCreateSubCommunity(false)}
      />
    )
  }


  const renderCurrentView = () => {
    if (showCreateCommunity) {
      return <CommunityCreationFlow />;
    }

    switch (currentView) {
      case 'directory':
        return <CommunityDirectory onNavigate={setCurrentView} />;
      case 'community-dashboard':
        return <CommunityDashboard onNavigate={setCurrentView}
          onCreateSubCommunity={() => setShowCreateSubCommunity(true)}
        />;
      // case 'knowledge':
      //   return <KnowledgeBaseView />;
      // case 'contribute':
      //   return <ContributionWizard />;
      // case 'tk-labels':
      //   return <TKLabelDashboard />;
      // case 'management':
      //   return <ManagementConsole />;
      default:
        return <CommunityDirectory />;
    }
  };
  return (
    <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">

      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertDescription>
          IKMS demonstrates. For full community governance, user authentication, and secure knowledge storage.
        </AlertDescription>
      </Alert>

      {!showCreateCommunity && currentView === 'directory' && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button
            onClick={() => setShowCreateCommunity(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Community</span>
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
