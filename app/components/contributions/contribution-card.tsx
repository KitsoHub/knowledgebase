import { TranslationContributor } from "@/lib/types/translationContribution";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


interface ContributorCardProps {
    contributor: TranslationContributor;
    showComplianceIndicators?: boolean;
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

export function ContributorCard({ contributor, showComplianceIndicators = true }: ContributorCardProps) {
    const initials = contributor.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const getVerificationIcon = () => {
        switch (contributor.verificationStatus) {
            case 'verified':
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'pending':
                return <Clock className="w-4 h-4 text-amber-500" />;
            default:
                return <AlertTriangle className="w-4 h-4 text-red-500" />;
        }
    };

    return (
        <Card className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                            <AvatarImage src={contributor.avatar} alt={contributor.name} />
                            <AvatarFallback className="bg-slate-100">{initials}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                {/* <h3 className="font-mono truncate">{contributor.name}</h3> */}
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <h4 className="font-mono truncate max-w-[12rem] cursor-help">
                                                {contributor.name}
                                            </h4>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{contributor.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                {showComplianceIndicators && (
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                {getVerificationIcon()}
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Verification Status: {contributor.verificationStatus}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate max-w-[10rem]">
                                {contributor.affiliation}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-muted-foreground">
                                    {contributor.country}
                                </span>
                                {contributor.orcidId && (
                                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                                        ORCI-ID
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                {/* ICMJE Section II.A.3 - Contributor Recognition (NOT Authorship) */}
                <div className="space-y-3">
                    <div>
                        <h4 className="text-sm mb-2 text-slate-700">Contribution Roles</h4>
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
                    </div>

                    {contributor.orcidId && (
                        <div className="text-xs text-muted-foreground">
                            <span className="font-mono">ORCID: {contributor.orcidId}</span>
                        </div>
                    )}

                    <div className="text-xs text-muted-foreground">
                        Contributed: {new Date(contributor.contributionDate).toLocaleDateString()}
                    </div>

                    {showComplianceIndicators && (
                        <div className="pt-2 border-t border-slate-100">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-600">KitsoHub Compliant</span>
                                <span className="text-green-600 font-mono">✓ Contributor Recognition</span>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
