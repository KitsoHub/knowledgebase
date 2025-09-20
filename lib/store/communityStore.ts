
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Community } from "@/lib/types/community";
import { mockCommunities } from "@/app/utils/mock/communitiesData";


interface CommunityStore {
currentCommunity: Community | null;
  communities: Community[];
  addCommunity: (community: Community) => void;
  removeCommunity: (id: string) => void;
  reset: () => void;
  setCurrentCommunity: (community: Community | null) => void;
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
