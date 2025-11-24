"use client";

import { Button } from "@/app/components/ui/button";
import { AlertCircleIcon, ArrowLeft, Calendar, CheckCheckIcon, Database, Download, Edit, Info, MoreVertical, Plus, Settings, Shield, ShieldAlertIcon, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { SiteDetailView } from "@/app/components/heritageSites/sitesDetailView";
import { useSiteById, useVerificationLogsBySiteId, useVotesBySiteId } from "@/app/hooks/use-sites";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import VerificationActionBar from "@/app/components/heritageSites/verificationActionBar";
import { VerificationDialog } from "@/app/components/heritageSites/verificationDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
import { SiteData } from "@/lib/types/sitesData";
import { Separator } from "@/app/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { differenceInDays, formatDistanceToNowStrict } from 'date-fns';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/app/components/ui/carousel";
import { ImageWithFallback } from "@/app/components/shared/image-with-fallback";

export default function SiteDetailPage() {
  const params = useParams();
  // console.log("🔍 useParams():", params);
  const siteId = params.siteId as unknown as number;


  // TODO: try using one call passing the siteId
  const { site, isLoading, isError } = useSiteById(siteId);
  const { votes = [], isVotesLoading, isVotesError } = useVotesBySiteId(siteId);
  const { vlog, isVlogLoading, error } = useVerificationLogsBySiteId(siteId)
  // get verification logs

  const [activeTab, setActiveTab] = useState('overview')
  const [showVerificationCreation, setVerificationCreation] =
    useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [verificationDialogMode, setVerificationDialogMode] = useState<"approve" | "reject" | null>(null)

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

  const voteColorMap = {
    reject: 'bg-blue-100 text-blue-800 border-blue-200',
    approve: 'bg-green-100 text-green-800 border-green-200',
  } as const

  const exhibitions = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1541512416146-3cf58d6b27cc?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === exhibitions.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? exhibitions.length - 1 : prevIndex - 1))
  }

  const images = exhibitions.map((e) => e.image)
  const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null)
  const handleThumbnailClick = (index:number) =>{
    setCurrentIndex(index)

  }

    const handleSelect = () => {
    if (!emblaApi) return
    setCurrentIndex(emblaApi.selectedScrollSnap())
  }

  const handleApi = (api: CarouselApi) => {
    setEmblaApi(api)
    api?.on("select", handleSelect)
  }

  const goToSlide = (index: number) => {
    if (!emblaApi) return
    emblaApi.scrollTo(index)
    setCurrentIndex(index)
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
        {/* verification action bar */}
        <VerificationActionBar
          onApprove={() => setVerificationDialogMode('approve')}
          onReject={() => setVerificationDialogMode('reject')}
        />


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
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="verifications">Verification Votes</TabsTrigger>
          <TabsTrigger value="logs">Verification Logs</TabsTrigger>
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
                  Latest activities and contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <Plus className="w-4 h-4 text-green-600" />
                    <span>
                      Verification Status:
                    </span>
                    <span className="text-muted-foreground">{site?.status_display && site.status_display}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Last updated</span>
                    <span className="text-muted-foreground">
                      <Calendar className="w-3 h-3" />


                      {/* {site?.last_updated && new Date(site?.last_updated).toLocaleDateString()} */}
                      {/* {site?.date_created && site?.last_updated ? differenceInDays(new Date(site.date_created), new Date(site.last_updated)) : 'N/A'} days ago */}
                      {site?.date_created ? formatDistanceToNowStrict(new Date(site.date_created), { addSuffix: true }) : 'N/A'}

                    </span>
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

        <TabsContent value="gallery" className="space-y-4">
          <main className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-2 gap-12">

              <div className="space-y-4">
                <Carousel className="w-full" setApi={handleApi}>
                  <CarouselContent>
                    {images.map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                          <ImageWithFallback
                  src={img}
                  alt={`Artwork ${index + 1}`}

                  className="object-cover"
                />
                        </div>
                      </CarouselItem>
                    ))}

                    {/* {images.map((i) => (
                  <CarouselItem key={i}>
                    <div className="relative aspect-[4/3]  overflow-hidden rounded-xl bg-gray-100">
                      <Image
                        src={`/placeholder.svg?height=400&width=400&text=Product${i}`}
                        alt={`Product image ${i}`}
                        fill
                        objectFit="cover"
                        className=" object-center object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))} */}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                <div className="grid grid-cols-4 gap-4">
              {images.map((img, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all
            duration-300 hover:ring-2 hover:ring-black ${
              currentIndex === index ? "ring-2 ring-black" : ""
            }`}
          >
            <ImageWithFallback
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="object-cover h-full w-full"
            />
          </div>
        ))}
                </div>
              </div>
            </div>
          </main>
        </TabsContent>


        <TabsContent value="verifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Verified Sites Verification Personnel
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  IKMS Sites
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Non-verifiers contribution for site verification is not permitted per IKMS guideline.
                Verifiers are declared by the community and  not IKMS Admins.
              </p>
            </CardHeader>

            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Verifier</TableHead>
                      <TableHead>Vote Status</TableHead>
                      <TableHead>Comment</TableHead>
                      <TableHead className="text-right">Vote Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isVotesLoading && (
                      <p className="text-muted-foreground text-center py-10">Loading…</p>
                    )}
                    {(votes as Array<any>).map(contributor => {

                      return (
                        <TableRow
                          key={contributor.id}
                          className="group hover:bg-muted/50"
                        >
                          <TableCell className="space-y-2">
                            <div className="flex items-center gap-3">

                              <div className="min-w-0">
                                <div className="font-mono text-sm truncate">
                                  {contributor.verifier.name}
                                </div>
                                {/* <div className="text-xs text-muted-foreground truncate">
                            {contributor.affiliation}
                          </div>
                          {contributor.orcidId && (
                            <div className="text-xs text-blue-600 font-mono">
                              ORCID: {contributor.orcidId}
                            </div>
                          )} */}
                              </div>
                            </div>
                          </TableCell>

                          <TableCell className="space-y-2">
                            <div className="flex items-center gap-3">

                              <div className="min-w-0">
                                <div className="font-mono text-sm truncate">
                                  <Badge
                                    key={contributor.id}
                                    variant="outline"
                                    className={`text-xs $voteColorMap[contributor.vote]}`}
                                  >
                                    {contributor.vote}
                                  </Badge>

                                </div>

                              </div>
                            </div>
                          </TableCell>

                          <TableCell className="space-y-2">
                            <div className="flex items-center gap-3">

                              <div className="min-w-0">
                                <div className="font-mono text-sm truncate">

                                  {contributor.comment}

                                </div>

                              </div>
                            </div>
                          </TableCell>

                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {new Date(
                                contributor.created_at
                              ).toLocaleDateString()}
                            </div>
                          </TableCell>


                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Verification Logs
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Verication logs for {site?.site_name} site
              </p>
            </CardHeader>

            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Changed By</TableHead>
                      <TableHead>Is Override</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead className="text-right">Verification Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isVlogLoading && (
                      <p className="text-muted-foreground text-center py-10">Loading…</p>
                    )}
                    {(vlog as Array<any>).map(item => {

                      return (
                        <TableRow
                          key={item.id}
                          className="group hover:bg-muted/50"
                        >
                          <TableCell className="space-y-2">
                            <div className="flex items-center gap-3">

                              <div className="min-w-0">
                                <div className="font-mono text-sm truncate">
                                  {item.changed_by.name}
                                </div>
                                <div className="text-xs text-muted-foreground truncate">

                                </div>
                                {item.changed_by && (
                                  <div className="text-xs text-blue-600 font-mono">
                                    Staff: {item.is_staff ? "TRUE" : "FALSE"}
                                  </div>
                                )}
                              </div>
                            </div>
                          </TableCell>


                          <TableCell className="space-y-2">
                            <div className="flex items-center gap-3">

                              <div className="min-w-0">
                                <div className="font-mono text-sm truncate">

                                  {item.is_override ? "TRUE" : "FALSE"}

                                </div>

                              </div>
                            </div>
                          </TableCell>

                          <TableCell className="space-y-2">
                            <div className="flex items-center gap-3">

                              <div className="min-w-0">
                                <div className="font-mono text-sm truncate">

                                  {item.reason}

                                </div>

                              </div>
                            </div>
                          </TableCell>

                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {new Date(
                                item.timestamp
                              ).toLocaleDateString()}
                            </div>
                          </TableCell>


                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metadata" className="space-y-4">

          <Card>
            <CardHeader>
              <CardTitle>Technical Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <div className="space-y-2">
                  <h4 className="font-medium">File Information</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Content Type:</span>
                      <span className="capitalize">{site.contentType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">File Size:</span>
                      <span>{item.content.fileSize}</span>
                    </div>
                    {item.content.duration && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span>{item.content.duration}</span>
                      </div>
                    )}
                    {item.content.dimensions && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Dimensions:</span>
                        <span>{item.content.dimensions}</span>
                      </div>
                    )}
                  </div>
                </div> */}

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

      {verificationDialogMode && (
        <VerificationDialog
          open={!!verificationDialogMode}
          onOpenChange={() => setVerificationDialogMode(null)}
          siteId={siteId}
          mode={verificationDialogMode}
        />
      )}

      {/* end of main content */}

      {isError && (
        <p className="text-red-600 text-center py-10">
          Failed to load site details.
        </p>
      )}


    </main>
  );
}
