import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { CheckCircle, Clock, AlertTriangle, Globe, Shield, Calendar } from "lucide-react";
import { TranslationContributor } from "@/lib/types/translationContribution";


interface ContributorTableProps {
  contributors: TranslationContributor[];
  showOnlyVerified?: boolean;
}

const roleColorMap = {
  medical_expert: "bg-blue-100 text-blue-800 border-blue-200",
  translator: "bg-green-100 text-green-800 border-green-200",
  reviewer: "bg-purple-100 text-purple-800 border-purple-200",
  cultural_advisor: "bg-orange-100 text-orange-800 border-orange-200",
  terminology_specialist: "bg-indigo-100 text-indigo-800 border-indigo-200",
  quality_controller: "bg-red-100 text-red-800 border-red-200"
} as const;

const roleLabels = {
  medical_expert: "Medical Expert",
  translator: "Translator",
  reviewer: "Reviewer",
  cultural_advisor: "Cultural Advisor",
  terminology_specialist: "Terminology Specialist",
  quality_controller: "Quality Controller"
} as const;

export function ContributorTable({ contributors, showOnlyVerified = false }: ContributorTableProps) {
  const filteredContributors = showOnlyVerified
    ? contributors.filter(c => c.verificationStatus === 'verified')
    : contributors;

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  const getTotalContributions = (contributor: TranslationContributor) => {
    // Count verification history entries where this contributor was the reviewer
    return contributors.reduce((total, c) => {
      // Count contributions made by this contributor
      const directContributions = c.id === contributor.id ? 1 : 0;
      return total + directContributions;
    }, 0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          Verified Contributors & Contributions
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            PuoIO Compliant
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Non-author contributor recognition per ORCID and KitsoHub guidelines. Contributors are acknowledged for specific roles, not authorship.
        </p>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Contributor</TableHead>
                <TableHead>Roles & Contributions</TableHead>
                <TableHead>Language Proficiency</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead>PuoIO Status</TableHead>
                <TableHead className="text-right">Contribution Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContributors.map((contributor) => {
                const initials = contributor.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2);

                const totalContributions = getTotalContributions(contributor);

                return (
                  <TableRow key={contributor.id} className="group hover:bg-muted/50">
                    <TableCell className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={contributor.avatar} alt={contributor.name} />
                          <AvatarFallback className="bg-slate-100 text-xs">{initials}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="font-mono text-sm truncate">{contributor.name}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {contributor.affiliation}
                          </div>
                          {contributor.orcidId && (
                            <div className="text-xs text-blue-600 font-mono">
                              ORCID: {contributor.orcidId}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {contributor.roles.map((role) => (
                            <Badge
                              key={role}
                              variant="outline"
                              className={`text-xs ${roleColorMap[role]}`}
                            >
                              {roleLabels[role]}
                            </Badge>
                          ))}
                        </div>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="text-xs text-muted-foreground cursor-help">
                                {totalContributions} contribution{totalContributions !== 1 ? 's' : ''}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-xs space-y-1">
                                <p className="font-medium">Contribution Details:</p>
                                <p>• Translation work: Local terminology</p>
                                <p>• Quality reviews: Peer validation</p>
                                <p>• Cultural adaptation: Regional context</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-xs">
                          <span className="font-medium text-slate-700">Native:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                              {contributor.country}
                            </Badge>
                          </div>
                        </div>

                        <div className="text-xs">
                          <span className="font-medium text-slate-700">Domain:</span>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs ml-1">
                            {contributor.languageIds ? contributor.languageIds.join(', ') : 'N/A'}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getVerificationIcon(contributor.verificationStatus)}
                        <div className="text-xs">
                          <div className="font-medium capitalize">
                            {contributor.verificationStatus}
                          </div>
                          {contributor.verificationStatus === 'verified' && (
                            <div className="text-green-600">KitsoHub Compliant</div>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        {contributor.orcidId ? (
                          <div className="flex items-center gap-1">
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                              <Globe className="w-3 h-3 mr-1" />
                              ORCI-ID
                            </Badge>
                          </div>
                        ) : (
                          <div className="text-xs text-muted-foreground">Non-ORCID</div>
                        )}

                        <div className="text-xs text-muted-foreground">
                          {contributor.country}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(contributor.contributionDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {filteredContributors.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Shield className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>No {showOnlyVerified ? 'verified ' : ''}contributors found.</p>
          </div>
        )}

        {/* Summary Statistics */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg text-blue-600">{filteredContributors.length}</div>
              <div className="text-muted-foreground">Total Contributors</div>
            </div>

            <div className="text-center">
              <div className="text-lg text-green-600">
                {filteredContributors.filter(c => c.verificationStatus === 'verified').length}
              </div>
              <div className="text-muted-foreground">Verified</div>
            </div>

            <div className="text-center">
              <div className="text-lg text-emerald-600">
                {filteredContributors.filter(c => c.orcidId).length}
              </div>
              <div className="text-muted-foreground">ORCID Contributors</div>
            </div>

            <div className="text-center">
              <div className="text-lg text-purple-600">
                {Array.from(new Set(filteredContributors.map(c => c.country))).length}
              </div>
              <div className="text-muted-foreground">Countries</div>
            </div>
          </div>
        </div>

        {/* ICMJE Compliance Statement */}
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-green-700">
              <p className="font-medium mb-1">KitsoHub Compliance</p>
              <p>
                All contributors are properly acknowledged for their specific roles and contributions
                to this translation repository. No individual qualifies for authorship as per ORCID and KitsoHub
                guidelines for non-research translation work.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
