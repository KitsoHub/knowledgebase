import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AboutContent, AboutState, PastContributor, TeamMember } from "../types/aboutUs";


const initialTeamMembers: TeamMember[] = [
 {
  ikmsTeamIdentifier: 'team-1',
  name: 'Ogaufi Mokopakgosi',
  email: 'ogaufimokopakgosi3@gmail.com',
  title: 'AI Researcher & Front-End Developer',
  role: 'Self-Taught Coder | AI Researcher | Electrical Engineering Student',
  culturalAffiliation: 'Botswana',
  imageUrl: 'assets/team/ogaufi.jpg', // you can add a profile image URL later
  bio: 'Ogaufi Mokopakgosi is a self-taught coder, AI researcher, and a final-year Electrical Engineering student at the University of Botswana. Passionate about advancing indigenous language technology, Ogaufi focuses on AI development, front-end design, and promoting cultural innovation through technology.',
  expertise: ['Artificial Intelligence', 'Front-End Development', 'Electrical Engineering', 'Cultural Innovation', 'Language Technology'],
  joinedDate: new Date('2025-01-01'),
  linkedIn: 'https://linkedin.com/in/ogaufimokopakgosi',
  website: undefined,
  isActive: true
},

  {
    ikmsTeamIdentifier: 'team-2',
    name: 'Elder James Crow',
    email: 'james@anishinaabe.org',
    title: 'Cultural Advisor',
    role: 'Traditional Elder & Wisdom Keeper',
    culturalAffiliation: 'Anishinaabe Nation',
    imageUrl: undefined,
    bio: 'Elder James Crow has served as a spiritual leader and cultural advisor for over 40 years. His deep knowledge of traditional practices and ceremonial protocols guides the ethical framework of the portal.',
    expertise: ['Ceremonial Practices', 'Traditional Hunting', 'Oral History', 'Spiritual Leadership'],
    joinedDate: new Date('2016-01-10'),
    isActive: true,
  },
  {
    ikmsTeamIdentifier: 'team-3',
    name: 'Mary Jourdain',
    email: 'mary@ojibwe.org',
    title: 'Language Preservation Lead',
    role: 'Language Keeper',
    culturalAffiliation: 'Ojibwe Nation',
    imageUrl: undefined,
    bio: 'Mary Jourdain (Gichi-manidoo-ikwe) is dedicated to preserving the Ojibwe language through innovative teaching methods and digital resources. She leads language revitalization initiatives across multiple communities.',
    expertise: ['Ojibwe Language', 'Language Revitalization', 'Educational Technology', 'Community Teaching'],
    joinedDate: new Date('2018-09-01'),
    linkedIn: 'https://linkedin.com/in/maryjourdain',
    isActive: true,
  },
  {
    ikmsTeamIdentifier: 'team-4',
    name: 'Dr. Sarah White Eagle',
    email: 'sarah@ikportal.org',
    title: 'Technology Director',
    role: 'Lead Developer & Systems Architect',
    culturalAffiliation: 'Lakota Nation',
    imageUrl: undefined,
    bio: 'Dr. White Eagle bridges traditional knowledge with modern technology. She specializes in building culturally-responsive digital platforms and has published extensively on Indigenous data sovereignty.',
    expertise: ['Software Development', 'Data Sovereignty', 'Digital Ethics', 'System Architecture'],
    joinedDate: new Date('2017-06-20'),
    website: 'https://sarahwhiteeagle.com',
    isActive: true,
  },
];


const initialPastContributors: PastContributor[] = [
  {
    ikmsTeamIdentifier: 'past-1',
    name: 'Paul Doe',
    culturalAffiliation: 'Ojibwe Nation',
    role: 'Governance & Operation Consultant',
    contributionPeriod: {
      startDate: new Date('2023-01-01'),
      endDate: new Date('2024-12-31'),
    },
    contributions: 'Developed governance framework and operational protocols',
  },
  {
    ikmsTeamIdentifier: 'past-2',
    name: 'Dr. Lisa Redfeather',
    culturalAffiliation: 'Cherokee Nation',
    role: 'Cultural Protocol Advisor',
    contributionPeriod: {
      startDate: new Date('2019-06-01'),
      endDate: new Date('2022-05-31'),
    },
    contributions: 'Established TK Label implementation guidelines and cultural sensitivity training',
  },
  {
    ikmsTeamIdentifier: 'past-3',
    name: 'Robert Thundercloud',
    role: 'Technical Infrastructure Consultant',
    contributionPeriod: {
      startDate: new Date('2020-03-01'),
      endDate: new Date('2021-08-31'),
    },
    contributions: 'Built foundational database architecture and security protocols',
  },
];

const initialAboutContent: AboutContent = {
  ikms: {
    mission: 'The Indigenous Knowledge Portal is dedicated to preserving, protecting, and sharing traditional knowledge in a manner that respects Indigenous cultural protocols and supports community sovereignty over cultural heritage.',
    vision: 'We envision a digital future where Indigenous communities have full control over their traditional knowledge, where cultural protocols are embedded in technology, and where knowledge sharing strengthens both individual communities and intercultural understanding.',
    overview: 'Built on the principles of community governance and cultural respect, our portal provides Indigenous communities with tools to manage their traditional knowledge according to their own cultural protocols. We implement Traditional Knowledge (TK) Labels, support multiple governance models, and ensure that access to sensitive cultural information is controlled by the communities themselves.',
    lastUpdated: new Date('2025-10-04'),
  },
  governance: {
    structure: 'The portal operates under a distributed governance model where each community maintains sovereignty over their own knowledge while participating in a broader network of Indigenous knowledge sharing.',
    principles: [
      'Community Sovereignty: Each community controls their own cultural heritage and knowledge',
      'Cultural Protocol Respect: All knowledge sharing follows traditional cultural protocols',
      'Elder Wisdom: Elder councils guide major decisions and cultural interpretations',
      'Transparency: Decision-making processes are open and accountable to community members',
      'Reciprocity: Knowledge sharing is based on mutual respect and benefit',
      'Data Sovereignty: Communities maintain ownership and control of their data',
    ],
    decisionMaking: 'Major platform decisions are made through consensus among community leaders, with Elder councils providing cultural guidance. Each community maintains independent decision-making authority for their own collections and protocols.',
    accountability: 'The portal is accountable to participating communities through regular reporting, community feedback sessions, and annual governance reviews. Community leaders can audit all access to their knowledge and modify protocols at any time.',
  },
  joinTeam: {
    openPositions: [
      {
        imksOpenPositionIdentifier: 'pos-1',
        title: 'Indigenous Community Liaison',
        description: 'Work directly with Indigenous communities to onboard them to the portal, provide training, and ensure cultural protocols are properly implemented.',
        requirements: [
          'Deep understanding of Indigenous cultural protocols',
          'Experience with community engagement and relationship building',
          'Excellent communication skills',
          'Willingness to travel to community locations',
        ],
        culturalRequirements: [
          'Preference for Indigenous candidates',
          'Understanding of traditional governance structures',
          'Respect for diverse cultural practices',
        ],
        postedDate: new Date('2025-09-15'),
        applicationEmail: 'careers@ikportal.org',
        applicationPhoneNumber: '+267 '
      },
      {
        imksOpenPositionIdentifier: 'pos-2',
        title: 'Digital Archivist',
        description: 'Manage digital preservation of traditional knowledge, including audio, video, and document formats. Ensure metadata standards align with cultural requirements.',
        requirements: [
          'Degree in Library Science, Archival Studies, or related field',
          'Experience with digital preservation standards',
          'Knowledge of metadata schemas',
          'Attention to cultural sensitivity',
        ],
        postedDate: new Date('2025-10-01'),
        applicationEmail: 'careers@ikportal.org',
      },
    ],
    volunteerOpportunities: 'We welcome volunteers who are passionate about Indigenous cultural preservation. Opportunities include metadata entry, cultural translation assistance, community event support, and educational outreach. Cultural sensitivity and respect for protocols is essential.',
    internshipInfo: 'We offer paid internships for Indigenous students interested in digital heritage, software development, library science, and community governance. Internships run for 12 weeks during summer and include mentorship from experienced team members.',
  },
};


export const useAboutUsStore = create<AboutState>()(
    persist(
        (set,get)=>({
                  teamMembers: initialTeamMembers,
      pastContributors: initialPastContributors,
      aboutUsContent: initialAboutContent,


    //   add
    addTeamMember:(member)=>set((state)=>({
        teamMembers: [...state.teamMembers, member],
    })),

    // update
    updateTeamMember:(id, updatedMember)=>set((state)=>({
        teamMembers: state.teamMembers.map((member)=> member.ikmsTeamIdentifier === id ?
         {...member, ...updatedMember }: member)
    })),

    // remove
    removeTeamMember:(id)=>set((state)=>({
        teamMembers: state.teamMembers.filter((member)=> member.ikmsTeamIdentifier != id),
    })),

    //add past contributor
    addPastContributor:(contributor)=>set((state)=>({
        pastContributors: [...state.pastContributors, contributor],
    })),
    //update content
    updateAboutUsContent:(content)=>set((state)=>({
        aboutUsContent:{
            ...state.aboutUsContent,
            ...content
        }
    })),
        }),
        {name: "abouts-us-store-a00001a"}
    )
)
