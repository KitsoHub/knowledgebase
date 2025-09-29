
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Collection } from "../types/community";

interface CollectionStore {
    collectionMetaData: Partial<Collection> | null;
    addCollectionMetaData: (collection: Partial<Collection> | null) => void;
    setCurrentCollectionMetaData: (collection: Partial<Collection> | null) => void;
    currentCollectionMetadata: Partial<Collection> | null;
}

export const useCollectionStore = create<CollectionStore>()(
    persist(
        (set) => ({
            collectionMetaData: null,
            currentCollectionMetadata: null,
            addCollectionMetaData: (collection) => set(() => ({
                collectionMetaData: collection
            })),
            setCurrentCollectionMetaData: (collection) => set({ currentCollectionMetadata: collection })


        }), { name: 'collection-store-a00001', }
    )
)

// TODO: add items store
