"use client";

import { Button } from "@/app/components/ui/button";
import { AlertCircleIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SiteDetailView } from "@/app/components/heritageSites/sitesDetailView";
import { useSiteById } from "@/app/hooks/use-sites";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useState } from "react";

import { Separator } from "@/app/components/ui/separator";

import GalleryCarousel from "@/app/components/shared/gallery/gallery-carousel";
import { useSiteStore } from "@/lib/store/siteStore";

export default function SiteDetailPage() {
  const params = useParams();

  const siteId = params.siteId as unknown as number;


  // TODO: try using one call passing the siteId
  const { site, isLoading, isError } = useSiteById(siteId);

  // TODO: check why this bring back null for other fields
  const {currentSite} = useSiteStore();

  const [activeTab, setActiveTab] = useState('overview')


const site_images = site?.images?.flatMap(img => img.images ? [img.images] : []) ?? []
  // const site_images = site?.images?.map((img)=> img.images)

  return (
    <main className="container mx-auto px-4 py-6 pb-24 md:pb-6 mt-28">
      <header className="flex justify-between items-center mb-6">
        <Link href="/map">
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
          Site Public View. Information may be inaccurate advsised to contract support for proper authentication.
        </AlertDescription>
      </Alert>


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
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>

        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <>

              {site && <SiteDetailView site={site} />}
            </>
          </div>

        </TabsContent>

        <TabsContent value="gallery" className="space-y-4">
          <main className="container mx-auto px-4 py-12">
            <GalleryCarousel images={site_images}/>
          </main>
        </TabsContent>

        <TabsContent value="metadata" className="space-y-4">

          <Card>
            <CardHeader>
              <CardTitle>Technical Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="space-y-2">
                  <h4 className="font-medium">Contribution Details</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Contributor:</span>
                      <span>{site?.created_by && site.created_by.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Role:</span>
                      <span>{site?.created_by?.is_staff ? "STAFF" : "Other"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created:</span>
                      <span>
                        {site?.date_created && new Date(site?.date_created).toLocaleDateString()}


                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {site?.metadata && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium">Additional Metadata</h4>
                    <pre className="text-xs bg-muted p-3 rounded overflow-auto">
                      {JSON.stringify(site.metadata, null, 2)}
                    </pre>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>


      {/* end of main content */}

      {isError && (
        <p className="text-red-600 text-center py-10">
          Failed to load site details.
        </p>
      )}


    </main>
  );
}
