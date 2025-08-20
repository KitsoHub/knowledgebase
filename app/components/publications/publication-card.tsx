import { Publication } from "@/app/utils/mock/publications";
import { Badge } from "../ui/badge";
import { ExternalLink, Globe, Link, LockIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type PublicationCardProps = {
  publication: Publication;
  index: number;
};

// Helper components
const IndigenousBadge = ({ label }: { label: string }) => (
  <Badge
    variant="outline"
    className={cn(
      "border-amber-500 text-amber-700 dark:text-amber-300",
      "bg-amber-50 dark:bg-amber-950/30"
    )}
  >
    <Globe className="w-3 h-3 mr-1" />
    {label.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
  </Badge>
);

const AccessIndicator = ({ publication }: { publication: Publication }) => {
  if (!publication.access.accessStatement) return null;

  return (
    <Alert className="mt-3 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
      <LockIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <AlertTitle className="font-medium text-amber-800 dark:text-amber-200">Access Required</AlertTitle>
      <AlertDescription className="text-amber-700 dark:text-amber-300">
        {publication.access.accessStatement}
      </AlertDescription>
    </Alert>
  );
};

const PublicationCard = ({ publication, index }: PublicationCardProps) => {
  const isFeatured = publication.isFeatured;
  const hasIndigenousContext = publication.indigenousContext?.tkLabels?.length;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        isFeatured && "border-primary shadow-lg hover:shadow-xl",
        hasIndigenousContext && "border-amber-200 dark:border-amber-800"
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
              <Link
                href={`/publications/${publication.id}`}
                className="hover:underline"
              >
                {publication.title}
              </Link>
            </CardTitle>
            {/* TODO */}
            {/* <AuthorList authors={publication.authors} /> */}
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

          {hasIndigenousContext && publication.indigenousContext?.tkLabels?.map((label) => (
            <IndigenousBadge key={label} label={label} />
          ))}
        </div>

        <AccessIndicator publication={publication} />
      </CardContent>
    </Card>
  );
};

export default PublicationCard;
