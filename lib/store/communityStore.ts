
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Community, SubCommunityData } from "@/lib/types/community";
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

interface SubCommunityStore {
  // to update to capture multiple sub communities
  subCommunity: Partial<SubCommunityData> | null;
  addSubCommunity: (community: Partial<SubCommunityData> | null) => void;
  currentSubCommunity: Partial<SubCommunityData> | null;
  setCurrentSubCommunity:(community: Partial<SubCommunityData> | null) => void;
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
    { name: "community-store-a00001",}
  )
);

export const useSubCommunityStore = create<SubCommunityStore>()(
  persist(
  (set) => ({
    subCommunity: null,
    currentSubCommunity: null,
    addSubCommunity: (community) =>
      set(() => ({
        subCommunity: community,
      })),

      setCurrentSubCommunity:(community) => set({currentSubCommunity:community})
  }), { name: "sub-community-store-a00001", })
);
