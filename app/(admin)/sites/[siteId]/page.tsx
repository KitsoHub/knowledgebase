"use client";

import { Button } from "@/app/components/ui/button";
import { AlertCircleIcon, ArrowLeft, CheckCheckIcon, Database, Download, Edit, Info, MoreVertical, Plus, Settings, Shield, ShieldAlertIcon, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { SiteDetailView } from "@/app/components/heritageSites/sitesDetailView";
import { useSiteById } from "@/app/hooks/use-sites";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";

export default function SiteDetailPage() {
  const params = useParams();
  // console.log("🔍 useParams():", params);
  const siteId = params.siteId as unknown as number;




  const { site, isLoading, isError } = useSiteById(siteId);
  const [activeTab, setActiveTab] = useState('overview')
  const [showVerificationCreation, setVerificationCreation] =
    useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDeleteSite = () => {
    console.log('Delete community:', siteId)
  }
  const handleEditSite = () => {
    console.log('Edit community:', siteId)
  }
  const handleExportMetadata = () => {
    console.log(
      'Export metadata for site:',
      siteId
    )
  }
  const handleExportSiteData = () => {
    console.log(
      'Export full data for site:',
      siteId
    )
  }

  return (
    <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
      <header className="flex justify-between items-center mb-6">
        <Link href="/sites/overview">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>


        <div className="w-10"></div>
        <h2>{site && site.site_name}</h2>
      </header>
      <Alert className="mb-6">
        <AlertCircleIcon color="red" className="h-4 w-4 " />
        <AlertDescription>
          Site Admin View. If you are not an admin please be advsised to contract support for proper authentication.
        </AlertDescription>
      </Alert>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4">
        {/* Primary actions */}
        <div className="flex items-center space-x-2">
          <Button onClick={() => {
            //setShowContributeDialog(true)
          }}>
            <CheckCheckIcon className="w-4 h-4 mr-2" />
            Verify
          </Button>
          <Button className="bg-red-500" onClick={() => {
            // setShowContributeDialog(true)
          }}>
            <ShieldAlertIcon className="w-4 h-4 mr-2" />
            Reject
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              // setShowSubCommunityCreation(true)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Provide </span>Feedback
          </Button>
        </div>

        {/* Secondary Actions Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Manage</span>
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => {
              //setShowEditCommunity(true)
            }}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Community Information
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleExportSiteData}>
              <Download className="w-4 h-4 mr-2" />
              Export Full Site Data
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportMetadata}>
              <Database className="w-4 h-4 mr-2" />
              Export Metadata Only
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                // setShowDeleteDialog(true)
              }}
              className="text-red-600 focus:text-red-600 focus:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Community
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLoading && (
        <p className="text-muted-foreground text-center py-10">Loading…</p>
      )}

      {/* Main content tabs */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full rounded-sm space-y-4"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="verifications">Verification Log</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>

        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <>

            {site && <SiteDetailView site={site} />}
            </>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest community activities and contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <Plus className="w-4 h-4 text-green-600" />
                    <span>
                      New Protocol item added: "Traditional Healing Practices"
                    </span>
                    <span className="text-muted-foreground">1 day ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>New member joined: Sam Kenpachi</span>
                    <span className="text-muted-foreground">1 day1 ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Shield className="w-4 h-4 text-yellow-600" />
                    <span>Protocol updated: Elder approval required</span>
                    <span className="text-muted-foreground">1 ady ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-orange-200 bg-orange-50/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Site Management</span>
              </CardTitle>
              <CardDescription>
                Quick access to administrative functions and community structure
                management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    // setShowEditCommunity(true)
                  }}
                  className="flex flex-col items-center space-y-2 h-auto py-4"
                >
                  <Edit className="w-5 h-5" />
                  <div className="text-center">
                    <p className="font-medium">Edit Site</p>
                    <p className="text-xs text-muted-foreground">
                      Update information & settings
                    </p>
                  </div>
                </Button>


                <Button
                  variant="outline"
                  onClick={handleExportMetadata}
                  className="flex flex-col items-center space-y-2 h-auto py-4"
                >
                  <Database className="w-5 h-5" />
                  <div className="text-center">
                    <p className="font-medium">Export Metadata</p>
                    <p className="text-xs text-muted-foreground">
                      Download structure info
                    </p>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={handleExportSiteData}
                  className="flex flex-col items-center space-y-2 h-auto py-4"
                >
                  <Download className="w-5 h-5" />
                  <div className="text-center">
                    <p className="font-medium">Export Full Data</p>
                    <p className="text-xs text-muted-foreground">
                      Complete backup
                    </p>
                  </div>
                </Button>
              </div>

              {/* Danger Zone */}
              <div className="mt-6 pt-4 border-t border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-red-800">Danger Zone (Admins Only)</h4>
                    <p className="text-sm text-red-600">
                      Irreversible actions that affect the entire community
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Site
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

         <TabsContent value="metadata" className="space-y-4">

            <Card>
              <CardHeader>
                <CardTitle>Site Metadata</CardTitle>
                <CardDescription>
                 Site Metadata
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <Plus className="w-4 h-4 text-green-600" />
                    <span>
                               {site?.metadata?.unesco && (
            <div className="mt-4">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                UNESCO Listed
              </span>
            </div>
          )}
                    </span>
                    <span className="text-muted-foreground">1 day ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>New member joined: Sam Kenpachi</span>
                    <span className="text-muted-foreground">1 day1 ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Shield className="w-4 h-4 text-yellow-600" />
                    <span>Protocol updated: Elder approval required</span>
                    <span className="text-muted-foreground">1 ady ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
         </TabsContent>

      </Tabs>

      {/* Sub-Community Creation Dialog */}

      <Dialog
        open={showVerificationCreation}
        onOpenChange={setVerificationCreation}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Sub-Community</DialogTitle>
            <DialogDescription>
              Create a new verification under {siteId}
            </DialogDescription>
          </DialogHeader>
          {/* <SubCommunityCreationFlow
                  parentCommunity={currentCommunity}
                  onComplete={() => setShowSubCommunityCreation(false)}
                /> */}
        </DialogContent>
      </Dialog>


      {/* end of main content */}

      {isError && (
        <p className="text-red-600 text-center py-10">
          Failed to load site details.
        </p>
      )}


    </main>
  );
}
