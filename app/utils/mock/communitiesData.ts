import { CommunityGovernance, CulturalProtocol } from "@/lib/constants/community";
import { Community } from "@/lib/types/community";


export const mockCommunities: Community[] = [
  {
    communityIdentifier: "1",
    identity: {
      id: "1",
      title: "Bamalete Cultural Preservation Society",
      description: "Preserving traditional knowledge and practices of the Bamalete people",
      governanceModel: CommunityGovernance.ELDER_COUNCIL,
      leadership: {
        primaryContact: {
          id: "1",
          name: "Kgosi Mosadi Seboko",
          email: "demo@kitsohub.org.bw",
          role: "Paramount Chief",
          culturalTitle: "Knowledge Keeper"
        },
        eldersCouncil: [
          {
            id: "2",
            name: "Elder 1",
            email: "demo@kitsohub.org.bw",
            role: "Elder",
            culturalTitle: "Spiritual Leader"
          }
        ]
      },
      region: "South-East District, Botswana",
      language: "Selete, Setswana, English",
      establishedDate: new Date("2025-09-20")
    },
    members: [
       {
          id: "3",
          name: "Kgosi Puso Gaborone",
          email: "demo@kitsohub.org.bw",
          role: "Paramount Chief",
          culturalTitle: "Lead Steward"
        }
    ],
    knowledgeItems: [],
    protocols: [CulturalProtocol.ELDER_APPROVAL_REQUIRED, CulturalProtocol.COMMUNITY_ONLY],
    stats: {
      totalItems: 156,
      publicItems: 45,
      restrictedItems: 111,
      memberCount: 89,
      collectionCount:0,
      subCommunityCount: 0
    }
  },
  // {
  //   communityIdentifier: "2",
  //   identity: {
  //     id: "2",
  //     title: "Batlokwa Elder Circle",
  //     description: "Collaborative stewardship of Batlokwa traditional knowledge and land",
  //     governanceModel: CommunityGovernance.STEWARDSHIP_CIRCLE,
  //     leadership: {
  //       primaryContact: {
  //         id: "3",
  //         name: "Kgosi Puso Gaborone",
  //         email: "demo@kitsohub.org.bw",
  //         role: "Paramount Chief",
  //         culturalTitle: "Lead Steward"
  //       }
  //     },
  //     region: "South-East District",
  //     language: "Setlokwa, Setswana, English",
  //     establishedDate: new Date("2025-09-20")
  //   },
  //   members: [],
  //   knowledgeItems: [],
  //   protocols: [CulturalProtocol.PUBLIC, CulturalProtocol.COMMUNITY_ONLY],
  //   stats: {
  //     totalItems: 203,
  //     publicItems: 89,
  //     restrictedItems: 114,
  //     memberCount: 156,
  //     collectionCount:0,
  //     subCommunityCount: 0

  //   }
  // },
  // {
  //   communityIdentifier: "3",
  //   identity: {
  //     id: "3",
  //     title: "San Research Center",
  //     description: "Traditional ecological knowledge of desert landscapes and survival",
  //     governanceModel: CommunityGovernance.INDIGENOUS_COUNCIL,
  //     leadership: {
  //       primaryContact: {
  //         id: "4",
  //         name: "Basetsana Bolaane",
  //         email: "demo@kitsohub.org",
  //         role: "Director",
  //         culturalTitle: "Knowledge Coordinator"
  //       }
  //     },
  //     region: "South-West District, Botswana",
  //     language: "English",
  //     establishedDate: new Date("2025-09-20")
  //   },
  //   members: [],
  //   knowledgeItems: [],
  //   protocols: [CulturalProtocol.PUBLIC, CulturalProtocol.GENDER_RESTRICTED],
  //   stats: {
  //     totalItems: 78,
  //     publicItems: 23,
  //     restrictedItems: 55,
  //     memberCount: 42,
  //     collectionCount:0,
  //     subCommunityCount: 0
  //   }
  // }
];
