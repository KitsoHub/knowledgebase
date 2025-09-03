import { ExternalLink, FileText, Globe, LockIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

import Link from 'next/link'
import { LanguageMetadata } from '@/lib/languages-data'

import { Badge } from '../../ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'

interface LanguageCardProps {
    lanMetadata: LanguageMetadata
    className?: string
}

// Access indicator component (if needed in future)

// region badge component
// Helper components
const LanguageRegionBadge = ({ label }: { label: string }) => (
    <Badge
        variant="outline"
        className={cn(
            'border-amber-500 text-amber-700 dark:text-amber-300',
            'bg-amber-50 dark:bg-amber-950/30'
        )}
    >
        <Globe className="w-3 h-3 mr-1" />
        {label.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
    </Badge>
)

const LanguageModalityBadge = ({ label }: { label: string }) => (
    <Badge
        variant="outline"
        className={cn(
            'border-amber-500 text-amber-700 dark:text-amber-300',
            'bg-amber-50 dark:bg-amber-950/30'
        )}
    >
        <Globe className="w-3 h-3 mr-1" />
        {label.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
    </Badge>
)

export default function LanguageCard({
    lanMetadata,
    className,
}: LanguageCardProps) {
    const isActive = lanMetadata.isActive

    const linkUrl = `/languages/${lanMetadata.id}/`

    return (
        <Link
            href={linkUrl}
            className={cn(
                'block',
                'group relative overflow-hidden transition-all duration-300',
                isActive && 'border-primary shadow-lg hover:shadow-xl'
            )}
        >
            <Card
                className={cn(
                    'group relative overflow-hidden transition-all duration-300',
                    isActive && 'border-primary shadow-lg hover:shadow-xl'
                )}
            >
                {isActive && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-0.5 rounded-bl-lg">
                        Supported
                    </div>
                )}

                {!isActive && (
                    <div className="absolute top-0 right-0 bg-secondary text-primary-foreground text-xs font-medium px-2.5 py-0.5 rounded-bl-lg">
                        Beta
                    </div>
                )}

                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                                <Link
                                    href={linkUrl}
                                    className="hover:underline"
                                >
                                    {lanMetadata.name}
                                </Link>
                            </CardTitle>

                            {/* Region */}
                        </div>
                        <Badge
                            variant="secondary"
                            className="shrink-0 mt-1 px-2 py-1 text-xs font-normal"
                        >
                            {lanMetadata.languageFamily.toString()}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="text-sm text-muted-foreground mb-3">
                        {lanMetadata.description}
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                        <Badge variant="outline">
                            Variety: {lanMetadata.variety}
                        </Badge>
                    </div>

                    {lanMetadata.description && (
                        <>
                            <span>Speakers: </span>
                            <Badge
                                variant="outline"
                                className="border-amber-500 text-amber-700 dark:text-amber-300"
                            >
                                <Globe className="w-3 h-3 mr-1" />
                                {lanMetadata.totalSpeakers}
                            </Badge>
                        </>
                    )}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {lanMetadata.modality &&
                            lanMetadata.modality.map((label) =>
                                label.types.map((type) => (
                                    <LanguageModalityBadge
                                        key={type}
                                        label={type}
                                    />
                                ))
                            )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                        <span>Regions: </span>
                        {lanMetadata &&
                            lanMetadata.regions?.map((label) => (
                                <LanguageRegionBadge
                                    key={label}
                                    label={label}
                                />
                            ))}

                        {lanMetadata.iso639_1 && (
                            <Link
                                href={`https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes#List`}
                                target="_blank"
                                className="inline-flex items-center text-xs text-primary hover:underline"
                            >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                ISO639_1
                            </Link>
                        )}
                    </div>

                    {/* <AccessIndicator lanMedata={lanMetadata} /> */}
                </CardContent>
            </Card>
        </Link>
    )
}
