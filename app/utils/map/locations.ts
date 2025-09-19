// app/lib/locations.ts
import { CulturalSite } from '@/lib/types/culturalSites';

export const culturalSites: CulturalSite[] = [
  {
    id: "site1",
    name: "Okavango Delta",
    latitude: -19.318701,
    longitude: 22.446918,
    description: "A lush inland delta in Botswana, home to elephants, hippos, and incredible biodiversity.",
    category: "heritage",
    tribe: "Kalanga People",
    language: "kalanga",
    images: ["/sites/okavango.jpeg"],
    videos: [],
    audio: [],
    metadata: {
      unesco: true,
      undp: false,
      unicef: true,
      localContext: "Sacred water source for ancestral rituals.",
      indigenousSystem: "Oral storytelling and seasonal migration tracking.",
      rights: "Community-owned; requires permission for research use.",
      ipMetadata: "CC-BY-NC 4.0",
      sensitivityLevel: "public",
      accessProtocol: "Open for education, restricted for commercial use."
    },
    dateCreated: "2020-05-12",
    lastUpdated: "2023-08-15"
  },
  // Add more as needed...
];