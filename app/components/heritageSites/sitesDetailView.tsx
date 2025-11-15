// components/sites/SiteDetailView.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Label } from "@/app/components/ui/label";
import { SiteData } from "@/lib/types/sitesData";

interface SiteDetailViewProps {
  site: Partial<SiteData>;
}

export function SiteDetailView({ site }: SiteDetailViewProps) {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{site.site_name}</CardTitle>
          <p className="text-muted-foreground">{site.description}</p>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <Label>Latitude</Label>
            <p>{site.latitude}</p>
          </div>

          <div>
            <Label>Longitude</Label>
            <p>{site.longitude}</p>
          </div>

          <div>
            <Label>Sensitivity Level</Label>
            <Badge variant="outline">
              {site.metadata?.sensitivity_level ?? "N/A"}
            </Badge>
          </div>

          <div>
            <Label>Population Density</Label>
            <p>{site.population_density ?? "N/A"}</p>
          </div>

          <div>
            <Label>Indigenous System</Label>
            <p>{site.metadata?.indigenous_system}</p>
          </div>

          <div>
            <Label>Rights</Label>
            <p>{site.metadata?.rights}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
