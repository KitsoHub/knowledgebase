"use client";

import { Button } from "@/app/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { SiteDetailView } from "@/app/components/heritageSites/sitesDetailView";
import { useSiteById } from "@/app/hooks/use-sites";

export default function SiteDetailPage() {
  const params = useParams();
  // console.log("🔍 useParams():", params);
  const siteId = params.siteId as unknown as number;


  const { site, isLoading, isError } = useSiteById(siteId);

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-6">
        <Link href="/sites/overview">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>

        <h1 className="text-xl font-bold">Site Details {siteId}</h1>
        <div className="w-10"></div>
      </header>

      {isLoading && (
        <p className="text-muted-foreground text-center py-10">Loading…</p>
      )}

      {isError && (
        <p className="text-red-600 text-center py-10">
          Failed to load site details.
        </p>
      )}

      {site && <SiteDetailView site={site} />}
    </div>
  );
}
