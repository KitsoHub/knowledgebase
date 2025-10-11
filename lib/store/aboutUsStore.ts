import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AboutContent, AboutState, PastContributor, TeamMember } from "../types/aboutUs";


const initialTeamMembers: TeamMember[] = [
 {
  ikmsTeamIdentifier: 'project-team-5',
  name: 'Ogaufi Mokopakgosi',
  email: 'ogaufimokopakgosi3@gmail.com',
  title: 'AI Researcher & Front-End Developer',
  role: 'AI Researcher',
  culturalAffiliation: 'Botswana',
  imageUrl: 'assets/team/ogaufiMokopakgosi.jpg',
  bio: 'Ogaufi Mokopakgosi is a self-taught coder, AI researcher, and a final-year Electrical Engineering student at the University of Botswana. Passionate about advancing indigenous language technology, Ogaufi focuses on AI development, front-end design, and promoting cultural innovation through technology.',
  expertise: ['Artificial Intelligence', 'Front-End Development', 'Electrical Engineering', 'Language Technology'],
  joinedDate: new Date('2025-01-01'),
  linkedIn: 'https://linkedin.com/in/ogaufimokopakgosi',
  website: undefined,
  isActive: true
},

  {
    ikmsTeamIdentifier: 'project-team-6',
    name: 'Kgosi Thembani',
    email: 'kgosithembani@gmail.com',
    title: 'Project Manager',
    role: 'Researcher',
    culturalAffiliation: 'Botswana',
    imageUrl: "assets/team/kgosiThembani.jpg",
    bio: 'Kgosi Thembani is a Botswana-based project manager, researcher, and innovation strategist dedicated to leveraging digital transformation and indigenous knowledge for sustainable national development. I blend ethical, thoughtful research with hands-on innovation, always looking for ways to bridge the gap between legacy systems and modern solutions.',
    expertise: ['Project Management', 'Business Analysis', 'Leadership'],
    joinedDate: new Date('2025-01-01'),
    linkedIn: 'https://www.linkedin.com/in/kgosi-thembani-87695ba9/',
    website: undefined,
    isActive: true,
  },
    {
    ikmsTeamIdentifier: 'project-team-7',
    name: 'Tumani Modimo',
    email: 'ntombimodimo@gmail.com',
    title: 'Cloud Engineer',
    role: 'Lingustics Lead',
    culturalAffiliation: 'Botswana, Bukalanga tribe',
    imageUrl: "assets/team/tumaniModimo.jpg",
    bio: 'Tumani Modimo is a Cloud Professional certified as an Aviatrix ACE Multicloud Network Associate and currently completing the AWS re/Start Cloud Practitioner program. I design and implement scalable, secure, high-performance cloud solutions across AWS, Azure, GCP, and OCI. Passionate about social impact, I have adopted four junior secondary schools in marginalized areas, providing sanitary towels, stationery, and educational support to empower students. I am seeking opportunities in cloud engineering, architecture, and multicloud networking, where I can combine technical expertise with meaningful impact.',
    expertise: ['Multicloud Networking Specialist','Project Management'],
    joinedDate: new Date('2025-01-01'),
    linkedIn: 'https://www.linkedin.com/in/tumanimodimo/',
    website: undefined,
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
      // pastContributors: initialPastContributors,
      aboutUsContent: initialAboutContent,

    addTeamMember:(member)=>set((state)=>({
        teamMembers: [...state.teamMembers, member],
    })),

    updateTeamMember:(id, updatedMember)=>set((state)=>({
        teamMembers: state.teamMembers.map((member)=> member.ikmsTeamIdentifier === id ?
         {...member, ...updatedMember }: member)
    })),

    removeTeamMember:(id)=>set((state)=>({
        teamMembers: state.teamMembers.filter((member)=> member.ikmsTeamIdentifier != id),
    })),

    // addPastContributor:(contributor)=>set((state)=>({
    //     pastContributors: [...state.pastContributors, contributor],
    // })),

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
