import { Publication } from '@/app/utils/mock/publications'
import { Badge } from '../ui/badge'
import { ExternalLink, FileText, Globe, LockIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'

type PublicationCardProps = {
  publication: Publication
  index: number
  className?: string
  isFeatured?: boolean
}

// Helper components
const IndigenousBadge = ({ label }: { label: string }) => (
  <Badge
    variant="outline"
    className={cn(
      'border-amber-500 text-amber-700 dark:text-amber-300',
      'bg-amber-50 dark:bg-amber-950/30'
    )}
  >
    <Globe className="w-3 h-3 mr-1" />
    {label.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
  </Badge>
)

const AccessIndicator = ({ publication }: { publication: Publication }) => {
  if (!publication.access.accessStatement) return null

  return (
    <Alert className="mt-3 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
      <LockIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <AlertTitle className="font-medium text-amber-800 dark:text-amber-200">
        Access Required
      </AlertTitle>
      <AlertDescription className="text-amber-700 dark:text-amber-300">
        {publication.access.accessStatement}
      </AlertDescription>
    </Alert>
  )
}

const AuthorList = ({ authors }: { authors: Publication['authors'] }) => (
  <div className="flex flex-wrap gap-2 mt-1">
    {authors.map((author, index) => (
      <span key={index} className="text-sm">
        <span
          className={cn(
            author.isIndigenousResearcher &&
              'font-semibold text-indigo-700 dark:text-indigo-300'
          )}
        >
          {author.name}
        </span>
        {author.orcid && (
          <Link
            href={`https://orcid.org/${author.orcid}`}
            target="_blank"
            className="ml-1 inline-block hover:text-primary"
          >
            <span className="sr-only">ORCID</span>
            <FileText className="h-3 w-3 inline" />
          </Link>
        )}
        {index < authors.length - 1 && <span className="mx-1">•</span>}
      </span>
    ))}
  </div>
)

const getPrimaryAssetUrl = (publication: Publication): string | null => {
  if (!publication.assets?.length) return null

  // Try to find the primary asset first
  const primaryAsset = publication.assets.find(asset => asset.isPrimary)
  if (primaryAsset) return primaryAsset.url

  const webAsset = publication.assets.find(
    asset => asset.type === 'html' || asset.type === 'pdf'
  )
  return webAsset?.url || null
}

const PublicationCard = ({ publication, index }: PublicationCardProps) => {
  const isFeatured = publication.isFeatured
  const hasIndigenousContext = publication.indigenousContext?.tkLabels?.length
  const primaryAssetUrl = getPrimaryAssetUrl(publication)

  const requiresApproval =
    publication.access.assetsRequireApproval ||
    false ||
    publication.assets?.some(asset => asset.requiresApproval) ||
    false

  const linkUrl =
    primaryAssetUrl && !requiresApproval
      ? primaryAssetUrl
      : `/publications/${publication.id}`

  return (
    <Link
      href={linkUrl}
      className={cn(
        'block',
        'group relative overflow-hidden transition-all duration-300',
        isFeatured && 'border-primary shadow-lg hover:shadow-xl',
        hasIndigenousContext && 'border-amber-200 dark:border-amber-800'
      )}
    >
      <Card
        className={cn(
          'group relative overflow-hidden transition-all duration-300',
          isFeatured && 'border-primary shadow-lg hover:shadow-xl',
          hasIndigenousContext && 'border-amber-200 dark:border-amber-800'
        )}
      >
        {isFeatured && (
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-0.5 rounded-bl-lg">
            Featured
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                <Link href={linkUrl} className="hover:underline">
                  {publication.title}
                </Link>
              </CardTitle>

              <AuthorList authors={publication.authors} />
            </div>
            <Badge
              variant="secondary"
              className="shrink-0 mt-1 px-2 py-1 text-xs font-normal"
            >
              {publication.year}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="text-sm text-muted-foreground mb-3">
            {publication.metadata.container?.title}
            {publication.metadata.container?.volume && (
              <span>, Vol. {publication.metadata.container.volume}</span>
            )}
            {publication.metadata.container?.pages && (
              <span>, pp. {publication.metadata.container.pages}</span>
            )}
          </div>

          {publication.academicContext.abstract && (
            <p className="text-sm mb-3 line-clamp-3">
              {publication.academicContext.abstract}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-3">
            {publication.identifiers?.doi && (
              <Link
                href={`https://doi.org/${publication.identifiers?.doi}`}
                target="_blank"
                className="inline-flex items-center text-xs text-primary hover:underline"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                DOI
              </Link>
            )}

            {hasIndigenousContext &&
              publication.indigenousContext?.tkLabels?.map(label => (
                <IndigenousBadge key={label} label={label} />
              ))}
          </div>

          <AccessIndicator publication={publication} />
        </CardContent>
      </Card>
    </Link>
  )
}

export default PublicationCard
