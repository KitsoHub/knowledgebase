import AdminOverviewGridMetrics from "@/app/components/community/admin/community-metrics";
import CommunityBase from "@/app/components/community/communityBase";
import { CategoryBreakdown } from "@/app/components/shared/overview/category-breakdown";
import { DataDistributionChart } from "@/app/components/shared/overview/data-distribution-chart";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { BookOpen, DownloadIcon, UsersIcon } from "lucide-react";


export default function AdminPage() {
  return (
    <CommunityBase>


      <div className="flex min-h-screen flex-col bg-card ">
        <header className="sticky top-0 z-10 border-b bg-background">
          <div className="flex items-center justify-between p-6 border-b bg-card">
            <div>
              <BookOpen className="h-6 w-6" />
              <h1 className="text-xl font-semibold">
                Community Admin Dashboard
              </h1>
              <p className="text-muted-foreground">Manage your communities, collections, and content</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center space-x-2">
                <UsersIcon className="h-4 w-4" />
                <span>Manage Roles</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <DownloadIcon className="h-4 w-4" />
                <span>Export Data</span>
              </Button>
            </div>

            {/* TODO: add create-community ,create-collection, manage roles, export data buttons*/}
          </div>
        </header>
        <main className="flex-1 space-y-4 p-4 md:p-8">
          <AdminOverviewGridMetrics />
          <Tabs
            defaultValue="overview"
            className="w-full rounded-sm space-y-4"
          >

            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="community">Communities</TabsTrigger>
              <TabsTrigger value="collections">Collections</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Data Distribution by Category
                    </CardTitle>

                    <CardDescription>
                      Breakdown of entries across different
                      knowledge categories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DataDistributionChart />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Category Distribution</CardTitle>

                    <CardDescription>
                      Detailed view of data categories and
                      their composition
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CategoryBreakdown />
                  </CardContent>
                </Card>
              </div>

            </TabsContent>

          </Tabs>

        </main>

      </div>
    </CommunityBase>
  );
}
