"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Separator } from "@/app/components/ui/separator"
import { Textarea } from "@/app/components/ui/textarea"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import {
  Search,
  FileText,
  CheckCircle,
  XCircle,
  HelpCircle,
  Download,
  Upload,
  Clock,
  User,
  Calendar,
  Tag,
  Briefcase,
  InboxIcon,
  BrainCircuit,
} from "lucide-react"
import { getApplicationsForWorkspace, type Application } from "@/lib/data"
import { useToast } from "@/app/hooks/use-toast"
// import { useDnd } from "@/lib/dnd-context"
// import { useDrop } from "react-dnd"

export function VerificationWorkspace() {
  const { toast } = useToast()
//   const { workspaceApplications } = useDnd()
  const [applications, setApplications] = useState<Application[]>([])
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [activeTab, setActiveTab] = useState("details")

  // Initialize with both local and context applications
  useEffect(() => {
        // const initialApps = [...getApplicationsForWorkspace(), ...workspaceApplications ]
    const initialApps = [...getApplicationsForWorkspace(), ]

    const uniqueApps = initialApps.filter((app, index, self) => index === self.findIndex((a) => a.id === app.id))
    setApplications(uniqueApps)

    if (uniqueApps.length > 0 && !selectedApplication) {
      setSelectedApplication(uniqueApps[0])
    }
  }, [ selectedApplication])

//   const [{ isOver, canDrop }, drop] = useDrop(() => ({
//     accept: "APPLICATION",
//     drop: () => ({ moved: true }),
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//       canDrop: monitor.canDrop(),
//     }),
//   }))

  const handleVerify = () => {
    toast({
      title: "Application verified",
      description: `${selectedApplication?.id} has been verified and moved to the next stage.`,
    })
  }

  const handleReject = () => {
    toast({
      title: "Application rejected",
      description: `${selectedApplication?.id} has been rejected.`,
    })
  }

  const handleRequestInfo = () => {
    toast({
      title: "Information requested",
      description: `Additional information has been requested for ${selectedApplication?.id}.`,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Left panel - Application list with drop target */}
            {/* <Card className={`md:col-span-1 ${isOver && canDrop ? "ring-2 ring-primary" : ""}`} ref={drop}></Card> */}
      <Card className={`md:col-span-1`} >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Applications
            {/* {isOver && canDrop && (
              <Badge variant="outline" className="animate-pulse">
                Drop to add
              </Badge>
            )} */}
          </CardTitle>
          <CardDescription>
            Applications in your verification workspace. Drag applications here from the queue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedApplication?.id === application.id ? "bg-primary/10 border-primary" : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedApplication(application)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{application.id}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{application.title}</p>
                    </div>
                    <Badge>{application.status}</Badge>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Filed: {application.filingDate}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <InboxIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">No applications yet</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Drag applications from the queue to add them to your workspace
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Right panel - Application details and tools */}
      {selectedApplication ? (
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{selectedApplication.title}</CardTitle>
                <CardDescription>
                  {selectedApplication.id} • Filed on {selectedApplication.filingDate}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" /> Download
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-1" /> Upload
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="details">Application Details</TabsTrigger>
                <TabsTrigger value="search">Prior Art Search</TabsTrigger>
                <TabsTrigger value="actions">Office Actions</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Inventor</Label>
                    <div className="flex items-center p-2 border rounded-md">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      {selectedApplication.inventor}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Assigned Examiner</Label>
                    <div className="flex items-center p-2 border rounded-md">
                      <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                      {selectedApplication.assignedExaminer}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Technology Area</Label>
                    <div className="flex items-center p-2 border rounded-md">
                      <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                      {selectedApplication.technologyArea}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Last Updated</Label>
                    <div className="flex items-center p-2 border rounded-md">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      {selectedApplication.lastUpdated}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Abstract</Label>
                  <div className="p-3 border rounded-md bg-muted/50">
                    <p>
                      This invention relates to an innovative system and method in the field of{" "}
                      {selectedApplication.technologyArea}. The system comprises multiple interconnected components that
                      work together to solve technical challenges in the industry.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Claims</Label>
                  <div className="p-3 border rounded-md bg-muted/50 max-h-40 overflow-y-auto">
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>
                        A system for processing data, comprising: a processor; a memory; and instructions stored in the
                        memory that, when executed by the processor, cause the system to perform operations.
                      </li>
                      <li>
                        The system of claim 1, wherein the operations include receiving input data from a user
                        interface.
                      </li>
                      <li>
                        The system of claim 1, wherein the operations include analyzing the input data using a machine
                        learning model.
                      </li>
                      <li>
                        The system of claim 1, wherein the operations include generating output data based on the
                        analysis.
                      </li>
                      <li>
                        The system of claim 1, wherein the operations include displaying the output data on a user
                        interface.
                      </li>
                    </ol>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="search" className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input placeholder="Search for prior art..." />
                  </div>
                  <Button>
                    <Search className="h-4 w-4 mr-1" /> Search
                  </Button>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Search Results</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
                      <div className="flex justify-between">
                        <h4 className="font-medium">US10123456B2</h4>
                        <span className="text-sm text-muted-foreground">2020-05-12</span>
                      </div>
                      <p className="text-sm line-clamp-2">
                        System and method for data processing using artificial intelligence techniques
                      </p>
                    </div>
                    <div className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
                      <div className="flex justify-between">
                        <h4 className="font-medium">EP3456789A1</h4>
                        <span className="text-sm text-muted-foreground">2019-11-23</span>
                      </div>
                      <p className="text-sm line-clamp-2">
                        Method and apparatus for processing information in a computing environment
                      </p>
                    </div>
                    <div className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
                      <div className="flex justify-between">
                        <h4 className="font-medium">WO2021/123456</h4>
                        <span className="text-sm text-muted-foreground">2021-02-15</span>
                      </div>
                      <p className="text-sm line-clamp-2">
                        Advanced techniques for data analysis and processing in networked systems
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Search Notes</Label>
                  <Textarea placeholder="Add notes about your prior art search findings..." className="min-h-[100px]" />
                </div>
              </TabsContent>

              <TabsContent value="actions" className="space-y-4">
                <div className="space-y-2">
                  <Label>Office Action Template</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Select a template...</option>
                    <option>First Office Action - Rejection</option>
                    <option>First Office Action - Allowance</option>
                    <option>Request for Information</option>
                    <option>Final Rejection</option>
                    <option>Notice of Allowance</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Examiner Notes</Label>
                  <Textarea placeholder="Add your examination notes here..." className="min-h-[100px]" />
                </div>

                <div className="space-y-2">
                  <Label>Decision</Label>
                  <div className="flex gap-2">
                    <Button variant="default" className="flex-1" onClick={handleVerify}>
                      <CheckCircle className="h-4 w-4 mr-1" /> Verify & Proceed
                    </Button>
                    <Button variant="destructive" className="flex-1" onClick={handleReject}>
                      <XCircle className="h-4 w-4 mr-1" /> Reject
                    </Button>
                    <Button variant="secondary" className="flex-1" onClick={handleRequestInfo}>
                      <HelpCircle className="h-4 w-4 mr-1" /> Request Info
                    </Button>
                    <Button variant="default" className="flex-1" onClick={handleVerify}>
                      <BrainCircuit className="h-4 w-4 mr-1" /> AI Verification
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <Card className="md:col-span-2">
          <CardContent className="flex items-center justify-center h-full min-h-[400px]">
            <div className="text-center">
              <FileText className="h-16 w-16 mx-auto text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">No Application Selected</h3>
              <p className="text-muted-foreground">Select an application from the list to view details</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
