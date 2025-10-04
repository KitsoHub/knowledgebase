import { TeamMember } from "@/lib/types/aboutUs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { ImageWithFallback } from "../shared/image-with-fallback";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Award, Briefcase, Calendar, ExternalLink, Globe, Linkedin, Mail } from "lucide-react";
import { Separator } from "../ui/separator";

interface TeamMemberDialogProps {
  member: TeamMember;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TeamMemberDialog({ member, open, onOpenChange }: TeamMemberDialogProps) {
  // Placeholder images for team members
  const placeholderImages: Record<string, string> = {
    'team-1': 'https://images.unsplash.com/photo-1660906863391-4191c6877cbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXRpdmUlMjBhbWVyaWNhbiUyMHdvbWFufGVufDF8fHx8MTc1OTUzNjQ5MXww&ixlib=rb-4.1.0&q=80&w=1080',
    'team-2': 'https://images.unsplash.com/photo-1582140161498-41c99a3721e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZ2Vub3VzJTIwZWxkZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTk1MzY0OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'team-3': 'https://images.unsplash.com/photo-1581065178026-390bc4e78dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc1OTQ0ODg3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    'team-4': 'https://images.unsplash.com/photo-1652471949169-9c587e8898cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFufGVufDF8fHx8MTc1OTUzNDE5NHww&ixlib=rb-4.1.0&q=80&w=1080',
  };

  const imageUrl = member.imageUrl || placeholderImages[member.ikmsTeamIdentifier];

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{member.name} - Team Profile</DialogTitle>
          <DialogDescription className="sr-only">
            Detailed profile information for {member.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section with Image */}
          <div className="flex flex-col md:flex-row gap-6">

            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                {imageUrl ? (
                  <ImageWithFallback
                    src={imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl font-medium text-primary">
                      {getInitials(member.name)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <h2 className="mb-1">{member.name}</h2>
                <p className="text-muted-foreground">{member.title}</p>
                {member.culturalAffiliation && (
                  <p className="text-primary font-cultural mt-1">
                    {member.culturalAffiliation}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="default">{member.role}</Badge>
                {!member.isActive && (
                  <Badge variant="secondary">Former Member</Badge>
                )}
              </div>

              {/* Contact Links */}
              <div className="flex flex-wrap gap-2">
                {member.email && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = `mailto:${member.email}`}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                )}
                {member.linkedIn && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(member.linkedIn, '_blank')}
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                )}
                {member.website && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(member.website, '_blank')}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Website
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Bio Section */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4 text-primary" />
              <h3>Biography</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
          </div>

          <Separator />

          {/* Areas of Expertise */}
          {member.expertise && member.expertise.length > 0 && (
            <>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-primary" />
                  <h3>Areas of Expertise</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Joined:</span>
                <span>
                  {member.joinedDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Years with IKMS:</span>
                <span>
                  {Math.floor((new Date().getTime() - member.joinedDate.getTime()) / (1000 * 60 * 60 * 24 * 365))} years
                </span>
              </div>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
