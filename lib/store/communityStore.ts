
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Community } from "@/lib/types/community";
import { mockCommunities } from "@/app/utils/mock/communitiesData";
import { CulturalProtocol, TKLabel } from "../constants/community";


interface CommunityStore {
  currentCommunity: Community | null;
  communities: Community[];
  addCommunity: (community: Community) => void;
  removeCommunity: (id: string) => void;
  reset: () => void;
  setCurrentCommunity: (community: Community | null) => void;
}

interface SubCommunity {
  title: string;
  description: string;
  indigenousAuthorityId: string;
  custodianIds?: string[];
  localContextLabels: TKLabel[];
  geographicRegion: string;
  communityIdentifier: string;
  protocols: CulturalProtocol[];
}

interface SubCommunityStore {
  subCommunity: Partial<SubCommunity> | null;
  addSubCommunity: (community: Partial<SubCommunity> | null) => void;
}

export const useCommunityStore = create<CommunityStore>()(
  persist(
    (set) => ({
      currentCommunity: null,
      communities: mockCommunities,
      addCommunity: (community) =>
        set((state) => ({
          communities: [...state.communities, community],
        })),
      removeCommunity: (id) =>
        set((state) => ({
          communities: state.communities.filter((c) => c.id !== id),
        })),
      reset: () => set({ communities: mockCommunities }),

      setCurrentCommunity: (community) => set({ currentCommunity: community }),

    }),

    {
      name: "community-store-a00001",
    }
  )
);

export const useSubCommunityStore = create<SubCommunityStore>()(
  persist(
  (set) => ({
    subCommunity: null,
    addSubCommunity: (community) =>
      set(() => ({
        subCommunity: community,
      })),
  }), { name: "sub-community-store-a00001", })
);
