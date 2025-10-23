import { TeamMember } from '@/lib/types/aboutUs';
import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { ImageWithFallback } from '../shared/image-with-fallback';
import { Button } from '../ui/button';
import { ChevronRight, Globe, Linkedin, Mail } from 'lucide-react';
import { Badge } from '../ui/badge';



interface TeamMemberCardProps {
  member: TeamMember;
  onViewDetails: () => void;
}

export function TeamMemberCard({ member, onViewDetails }: TeamMemberCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Placeholder images for team members
  const placeholderImages: Record<string, string> = {
    'project-team-1': 'https://images.unsplash.com/photo-1660906863391-4191c6877cbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXRpdmUlMjBhbWVyaWNhbiUyMHdvbWFufGVufDF8fHx8MTc1OTUzNjQ5MXww&ixlib=rb-4.1.0&q=80&w=1080',
    'project-team-2': 'https://images.unsplash.com/photo-1582140161498-41c99a3721e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZ2Vub3VzJTIwZWxkZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTk1MzY0OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'project-team-3': 'https://images.unsplash.com/photo-1581065178026-390bc4e78dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc1OTQ0ODg3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    'project-team-4': 'https://images.unsplash.com/photo-1652471949169-9c587e8898cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFufGVufDF8fHx8MTc1OTUzNDE5NHww&ixlib=rb-4.1.0&q=80&w=1080',
  };

  const imageUrl = member.imageUrl || placeholderImages[member.ikmsTeamIdentifier];

  return (
    <Card
      className="group block overflow-hidden hover:shadow-lg cursor-pointer border-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
       onClick={onViewDetails}
    >
      <CardContent className="item-center content-center">
        {/* Image Header */}
        {/* <div className="relative h-56 w-56 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden justify-center mx-auto"> */}
        <div className="relative h-full w-full overflow-hidden justify-center mx-auto rounded-[8px] transition-transform duration-300 ease-out group-hover:scale-105 group-focus:scale-105 mt-4">

          {imageUrl ? (
            <ImageWithFallback
              src={imageUrl}
              alt={member.name}
              className="aspect-[173/192.22] rounded-[8px] w-full h-full avatar object-cover lg:aspect-[9/10] lg:h-[360px]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-4xl font-medium text-primary">
                  {getInitials(member.name)}
                </span>
              </div>
            </div>
          )}

          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Button
              variant="secondary"
              className="gap-2"
            >
              View Profile
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Status Badge */}
          {!member.isActive && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary">Former Member</Badge>
            </div>
          )}
        </div>

        {/* <div className='flex basis-1/2 flex-col gap-2'>
        <p className='text-web3-20 lg:text-web3-24 font-body'>{member.name}</p>
        <p className='text-web3-16 lg:text-web3-18 font-body'>{member.title}</p>
        </div> */}

        {/* Content */}
        <div className="space-y-1 mt-4 text-center">
          {/* Name & Title */}
          <div>
            <h4 className="mb-1">{member.name}</h4>
            <p className="text-sm text-muted-foreground">{member.title}</p>
            {/* {member.culturalAffiliation && (
              <p className="text-sm text-primary font-cultural mt-1">
                {member.culturalAffiliation}
              </p>
            )} */}
          </div>

          {/* Role */}
          {/* <div className="flex items-start space-x-2">
            <Badge variant="outline" className="flex-shrink-0">
              {member.role}
            </Badge>
          </div> */}

          {/* Quick Bio Preview */}
          {/* <p className="text-sm text-muted-foreground line-clamp-2">
            {member.bio}
          </p> */}

          {/* Expertise Tags */}
          {/* {member.expertise && member.expertise.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {member.expertise.slice(0, 2).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {member.expertise.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{member.expertise.length - 2} more
                </Badge>
              )}
            </div>
          )} */}

          {/* <div className="flex items-center space-x-2 pt-2 border-t"> */}
            {/* {member.email && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `mailto:${member.email}`;
                }}
              >
                <Mail className="h-4 w-4" />
              </Button>
            )} */}
            {/* {member.linkedIn && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(member.linkedIn, '_blank');
                }}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
            )}
            {member.website && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(member.website, '_blank');
                }}
              >
                <Globe className="h-4 w-4" />
              </Button>
            )} */}
            {/* <Button
              variant="ghost"
              size="sm"
              className="ml-auto h-8"
              onClick={onViewDetails}
            >
              Full Profile
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button> */}
          {/* </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
