"use client"

import { ContributorCard } from "@/app/components/contributions/contribution-card";
import { ContributorTable } from "@/app/components/contributions/contribution-table";
import LanguagesBrowse from "@/app/components/shared/langauges/browse"
import { Button } from "@/app/components/ui/button";


import {
  mockRepositoryMetadata,
  mockTranslationEntries,
  mockContributors,
  mockAIUsage
} from "@/app/utils/mock/translators"
import { useState } from "react";


export default function LanguageLearnDashboard() {
  const [contributorView, setContributorView] = useState<"cards" | "table">("table");


  return (
    <>
      {/* Browse */}
      <LanguagesBrowse />
      {/* Contributions */}
      <section className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-4 py-6">
                  <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl">Contributor Recognition (KitsoHub Section II.A.3)</h2>
                  <p className="text-muted-foreground">
                    Contributors are recognized for their specific roles and contributions,
                    not as authors. This follows ORCID and KITSOHUB guidelines for proper attribution.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={contributorView === "table" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setContributorView("table")}
                  >
                    Table View
                  </Button>
                  <Button
                    variant={contributorView === "cards" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setContributorView("cards")}
                  >
                    Card View
                  </Button>
                </div>
              </div>
            </div>

            {contributorView === "table" ? (
              <ContributorTable
                contributors={mockContributors}
                showOnlyVerified={true}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockContributors.map((contributor) => (
                  <ContributorCard
                    key={contributor.id}
                    contributor={contributor}
                    showComplianceIndicators={true}
                  />
                ))}
              </div>
            )}

      </section>

    </>

  )
}
