export interface TeamMember {
  ikmsTeamIdentifier: string
  name: string
  //   firstName: string;
  //   lastName: string;
  email: string
  title: string // e.g., "Director of Technology"
  role: string // e.g., "Lead Developer"
  culturalAffiliation?: string // e.g., "Batlokwa etc"
  imageUrl?: string
  bio: string
  expertise: string[]
  joinedDate: Date
  linkedIn?: string
  facebook?: string
  github?: string
  twitter?: string
  instagram?: string
  website?: string
  isActive: boolean
  //   TODO: update and have isPastContributor + start + end date
}

export interface PastContributor {
  ikmsTeamIdentifier: string
  name: string
  // firstName: string;
  // lastName: string;
  culturalAffiliation?: string
  role: string
  contributionPeriod: {
    startDate: Date
    endDate: Date
  }
  contributions?: string
}

export interface AboutContent {
  ikms: {
    mission: string
    vision: string
    overview: string
    lastUpdated: Date
  }
  governance: {
    structure: string
    principles: string[]
    decisionMaking: string
    accountability: string
  }
  joinTeam: {
    openPositions: {
      imksOpenPositionIdentifier: string
      title: string
      description: string
      requirements: string[]
      culturalRequirements?: string[]
      postedDate: Date
      applicationEmail: string
      applicationPhoneNumber?: string
    }[]
    volunteerOpportunities: string
    internshipInfo: string
  }
}

export interface AboutState {
  teamMembers: TeamMember[]
  pastContributors?: PastContributor[]
  aboutUsContent: AboutContent
  addTeamMember: (member: TeamMember) => void
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void
  removeTeamMember: (id: string) => void
  // addPastContributor: (contributor: PastContributor)=>void;
  updateAboutUsContent: (conten: Partial<AboutContent>) => void
}
