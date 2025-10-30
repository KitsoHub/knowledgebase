import React from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs'

import { FileText } from 'lucide-react'
import { Separator } from '@/app/components/ui/separator'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { PatentApplication } from '@/app/utils/mock/patent-data'

interface ApplicationDetailsProps {
  application: PatentApplication
}

const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({
  application,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted p-4">
        <h3 className="text-lg font-medium">{application.title}</h3>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <span className="font-medium mr-2">ID: {application.id}</span>
          <span>•</span>
          <span className="mx-2">Filed: {application.filingDate}</span>
        </div>
      </div>

      <Tabs defaultValue="details">
        <div className="px-4 pt-2">
          <TabsList className="w-full">
            <TabsTrigger value="details" className="flex-1">
              Application Details
            </TabsTrigger>
            <TabsTrigger value="claims" className="flex-1">
              Claims
            </TabsTrigger>
            <TabsTrigger value="drawings" className="flex-1">
              Drawings
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="details" className="p-4 m-0">
          <ScrollArea className="h-[370px] pr-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Inventor
                </h4>
                <p>{application.inventor}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Technology Area
                </h4>
                <p>{application.technologyArea}</p>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Abstract
                </h4>
                <p className="text-sm">
                  This invention relates to improvements in{' '}
                  {application.technologyArea.toLowerCase()}
                  technologies, specifically addressing challenges in data
                  processing and efficiency. The invention provides a novel
                  approach to solving technical problems through an innovative
                  system architecture and methodology.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Background
                </h4>
                <p className="text-sm">
                  Existing solutions in the field suffer from limitations
                  including performance bottlenecks, compatibility issues, and
                  complexity of implementation. This invention addresses these
                  challenges through a unique combination of techniques and
                  architectural decisions that result in significant
                  improvements over the prior art.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Summary
                </h4>
                <p className="text-sm">
                  The invention provides a system and method for enhancing data
                  processing efficiency in{' '}
                  {application.technologyArea.toLowerCase()} systems. Key
                  innovations include a modular architecture, optimized
                  algorithms, and novel integration patterns that together
                  deliver measurable improvements in performance, reliability,
                  and user experience.
                </p>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="claims" className="p-4 m-0">
          <ScrollArea className="h-[370px] pr-4">
            <ol className="list-decimal list-outside pl-6 space-y-4">
              <li className="text-sm">
                A method for processing data in a{' '}
                {application.technologyArea.toLowerCase()} system, comprising:
                receiving input from a user interface; transforming the input
                according to predetermined rules; storing the transformed data
                in a database; and providing feedback to the user interface.
              </li>
              <li className="text-sm">
                The method of claim 1, wherein transforming the input includes
                applying a machine learning algorithm to classify the input
                data.
              </li>
              <li className="text-sm">
                The method of claim 1, further comprising validating the input
                against a set of constraints before transformation.
              </li>
              <li className="text-sm">
                A system for implementing the method of claim 1, comprising: a
                user interface module; a processing engine; a database; and a
                feedback mechanism.
              </li>
              <li className="text-sm">
                The system of claim 4, wherein the processing engine includes
                dedicated hardware accelerators for specific transformation
                operations.
              </li>
            </ol>
          </ScrollArea>
        </TabsContent>

        <TabsContent
          value="drawings"
          className="flex items-center justify-center h-[370px] m-0"
        >
          <div className="text-center text-muted-foreground">
            <FileText className="h-16 w-16 mx-auto mb-4 opacity-30" />
            <p>Drawings would be displayed here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ApplicationDetails
