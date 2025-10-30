import { collection } from 'firebase/firestore'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  Collection,
  Community,
  KnowledgeItem,
  SubCommunityData,
} from '@/lib/types/community'
import { mockCommunities } from '@/app/utils/mock/communitiesData'
import { CulturalProtocol, TKLabel } from '../constants/community'

interface CommunityStore {
  currentCommunity: Community | null
  currentSubCommunity: Partial<SubCommunityData> | null
  currentCollection: Partial<Collection> | null
  currentKnowledgeItemMetadata: Partial<KnowledgeItem> | null

  communities: Community[]
  addCommunity: (community: Community) => void
  removeCommunity: (id: string) => void
  reset: () => void
  addSubCommunity: (subCommunity: Partial<SubCommunityData>, id: string) => void
  addCollectionMetaData: (
    collection: Partial<Collection>,
    subCommunityId: string
  ) => void
  addKnowledgeItemMetadata: (
    knowledgeItemMetadata: Partial<KnowledgeItem>,
    subCommunityId: string,
    collectionMetadataId: string
  ) => void

  setCurrentCommunity: (community: Community | null) => void
  setCurrentSubCommunity: (community: Partial<SubCommunityData> | null) => void
  setCurrentCollectionMetaData: (collection: Partial<Collection> | null) => void
  setCurrentKnowledgeItemMetadata: (item: Partial<KnowledgeItem> | null) => void
}

export type SubCommunityWithCollections = Partial<SubCommunityData> & {
  collections: Partial<Collection>[]
}
// interface SubCommunityWithCollections extends Partial<SubCommunityData> {
//   collections: Partial<Collection>[];
// }
interface SubCommunityStore {
  // to update to capture multiple sub communities
  subCommunities: SubCommunityWithCollections[]
  currentSubCommunity: SubCommunityWithCollections | null

  // subCommunity: Partial<SubCommunityData> | null;
  addSubCommunity: (community: Partial<SubCommunityData> | null) => void
  // currentSubCommunity: Partial<SubCommunityData> | null;
  setCurrentSubCommunity: (community: Partial<SubCommunityData> | null) => void

  addCollectionMetadata: (collection: Partial<Collection>) => void
  updateCollectionMetadata: (collection: Partial<Collection>) => void
}

export const useCommunityStore = create<CommunityStore>()(
  persist(
    (set, get) => ({
      currentCommunity: null,
      currentSubCommunity: null,
      currentCollection: null,
      currentKnowledgeItemMetadata: null,
      communities: mockCommunities,

      addCommunity: community =>
        set(state => ({
          communities: [...state.communities, community],
        })),
      removeCommunity: id =>
        set(state => ({
          communities: state.communities.filter(
            c => c.communityIdentifier !== id
          ),
        })),
      reset: () => set({ communities: mockCommunities }),

      setCurrentCommunity: community => set({ currentCommunity: community }),
      addSubCommunity: (subCommunity, id) => {
        // first get the current community
        const { communities } = get()

        // get the correct community and add to the subCommunity the new subCommunity
        const updatedCommunities = communities.map(c =>
          c.communityIdentifier === id
            ? {
                ...c,
                subCommunities: [...(c.subCommunities ?? []), subCommunity],
                stats: {
                  ...c.stats,
                  subCommunityCount: (c.subCommunities?.length ?? 0) + 1,
                },
              }
            : c
        )

        set({
          communities: updatedCommunities,
          currentCommunity:
            get().currentCommunity?.communityIdentifier === id
              ? updatedCommunities.find(c => c.communityIdentifier === id) ||
                null
              : get().currentCommunity,
        })
      },

      setCurrentSubCommunity: community => {
        if (!community) {
          set({
            currentSubCommunity: null,
          })
          return
        }
        const { communities } = get()
        const found =
          communities
            .flatMap(c => c.subCommunities ?? [])
            .find(
              sc => sc?.communityIdentifier === community.communityIdentifier
            ) || null
        set({ currentSubCommunity: found })
      },

      // Collection
      addCollectionMetaData: (collection, subCommunityId) => {
        const { communities } = get()
        const updatedCommunities = communities.map(c => ({
          ...c,
          subCommunities: (c.subCommunities ?? []).map(sc =>
            sc.communityIdentifier === subCommunityId
              ? {
                  ...sc,
                  collections: [...(sc.collections ?? []), collection],
                  stats: {
                    ...sc.stats,
                    collectionCount: (sc.collections?.length ?? 0) + 1,
                  },
                }
              : sc
          ),
        }))

        const updatedSubCommunity =
          updatedCommunities
            .flatMap(c => c.subCommunities ?? [])
            .find(sc => sc.communityIdentifier === subCommunityId) || null

        set({
          communities: updatedCommunities,
          currentSubCommunity: updatedSubCommunity,
        })
      },

      setCurrentCollectionMetaData: collection => {
        set({ currentCollection: collection })
      },

      // items
      addKnowledgeItemMetadata: (item, subCommuntyId, collectionMetadataId) => {
        console.error('Item: ', item.title)
        console.error('Item: ', item.knowledgeItemIdentier)

        console.error('SubID: ', subCommuntyId)
        console.error('CollectionID: ', collectionMetadataId)

        const { communities } = get()
        const udpatedCommunities = communities.map(c => ({
          ...c,
          subCommunities: (c.subCommunities ?? []).map(sc =>
            sc.communityIdentifier === subCommuntyId
              ? {
                  ...sc,
                  collections: (sc.collections ?? []).map(col =>
                    col?.collectionMetadataIdentifier === collectionMetadataId
                      ? {
                          ...col,
                          knowledgeItems: [...(col.knowledgeItems ?? []), item],
                        }
                      : col
                  ),
                }
              : sc
          ),
        }))
        const updatedCollection = udpatedCommunities
          .flatMap(c => c.subCommunities ?? [])
          .flatMap(sc => sc?.collections ?? [])
          .find(
            col => col?.collectionMetadataIdentifier === collectionMetadataId
          )
        set({
          communities: udpatedCommunities,
          currentCollection: updatedCollection,
          currentKnowledgeItemMetadata: item,
        })
      },
      setCurrentKnowledgeItemMetadata: item =>
        set({ currentKnowledgeItemMetadata: item }),
    }),
    // end

    { name: 'community-store-a00001a' }
  )
)

export const useSubCommunityStore = create<SubCommunityStore>()(
  persist(
    (set, get) => ({
      // subCommunity: null,
      currentSubCommunity: null,

      subCommunities: [],
      addSubCommunity: community => {
        const newSubCommunity: SubCommunityWithCollections = {
          ...community,
          collections: [],
        }
        set(state => ({
          subCommunities: [...state.subCommunities, newSubCommunity],
        }))
      },

      setCurrentSubCommunity: community => {
        if (!community) {
          set({
            currentSubCommunity: null,
          })
          return
        }
        const state = get()
        const found =
          state.subCommunities.find(
            sc => sc.communityIdentifier === community.communityIdentifier
          ) || null
        set({ currentSubCommunity: found })
      },
      addCollectionMetadata: collection => {
        // console.error(">>>>> Initiation of Collection meta >>>>>>>>>")
        const { currentSubCommunity, subCommunities } = get()
        const state = get()

        // console.error(">>>>> C: Id >>>>>>>>>", state.currentSubCommunity?.title)

        if (!currentSubCommunity?.communityIdentifier) return

        const found =
          subCommunities.find(
            sc =>
              sc.communityIdentifier === currentSubCommunity.communityIdentifier
          ) || null

        // console.error(">>>>> SC: Id >>>>>>>>>", found?.communityIdentifier)

        const updatedSubCommunities = subCommunities.map(sc =>
          sc.communityIdentifier === currentSubCommunity.communityIdentifier
            ? { ...sc, collections: [...(sc.collections || []), collection] }
            : sc
        )

        set({
          subCommunities: updatedSubCommunities,
          currentSubCommunity:
            updatedSubCommunities.find(
              sc =>
                sc.communityIdentifier ===
                currentSubCommunity.communityIdentifier
            ) || null,
        })
      },

      updateCollectionMetadata: updatedCollection => {
        const { currentSubCommunity, subCommunities } = get()
        if (!currentSubCommunity?.communityIdentifier) return

        const updatedSubCommunities = subCommunities.map(sc =>
          sc.communityIdentifier === currentSubCommunity.communityIdentifier
            ? {
                ...sc,
                collections: sc.collections.map(c =>
                  c.collectionMetadataIdentifier ===
                  updatedCollection.collectionMetadataIdentifier
                    ? { ...c, ...updatedCollection }
                    : c
                ),
              }
            : sc
        )

        set({
          subCommunities: updatedSubCommunities,
          currentSubCommunity:
            updatedSubCommunities.find(
              sc =>
                sc.communityIdentifier ===
                currentSubCommunity.communityIdentifier
            ) || null,
        })
      },

      // updateCollectionMetadata: (updatedCollection) => {
      //   set((state) => ({
      //     collections: state.collections.map((c) =>
      //       c.collectionMetadataIdentifier === updatedCollection.collectionMetadataIdentifier ? { ...c, ...updatedCollection } : c)
      //   }))
    }),
    { name: 'sub-community-store-a00001a' }
  )
)
