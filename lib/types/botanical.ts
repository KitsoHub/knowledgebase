export interface MedicinalPlant {
  id: string
  name: string
  scientificName: string
  otherNames?: string[]
  localNames?: string[]
  family: string
  origin: string
  partsUsed: string[]
  image: string
  description: string
  medicinalQualities: string[]
  traditionalUses: string[]
  modernMedicine: {
    activeCompounds: string[]
    clinicalStudies: string[]
    approvedUses: string[]
    contradictions: string[]
  }
  homeopathicUses: {
    preparations: string[]
    conditions: string[]
    dosage: string
  }
  research: {
    recentStudies: Array<{
      title: string
      year: number
      findings: string
      source: string
    }>
    futureDirections: string[]
  }
  references: string[]
  creditors?: {
    creditor: Array<{
      name: string
      url: string
    }>
  }
}

export interface BotanicalSearchBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedFamily: string
  onFamilyChange: (value: string) => void
  selectedOrigin: string
  onOriginChange: (value: string) => void
  selectedPartUsed: string
  onPartUsedChange: (value: string) => void
  selectedCondition: string
  onConditionChange: (value: string) => void
  onClearFilters: () => void
}
// Sengaparile (Devil’s Claw)
// ● Scientific Name: Harpagophytum procumbens

// 2. Lengana / Musuzwane (African Wormwood)
// ● Scientific Name: Artemisia afra

// 3. Mosukujane (Wild Mint)
// ● Scientific Name: Mentha longifolia


// 4. Morula (Marula)
// ● Scientific Name: Sclerocarya birrea

// 5. Mokgalo (African Sage)
// ● Scientific Name: Tarchonanthus camphoratus


// 6. Motlopi (Shepherd’s Tree)
// ● Scientific Name: Boscia albitrunca


// 7. Mowana (Baobab)
// ● Scientific Name: Adansonia digitata

// 8. Mokgopa (Mopane)
// ● Scientific Name: Colophospermum mopane

// 9. Mosu (Camelthorn)
// ● Scientific Name: Acacia tortilis


// 10. Motshikiri (Sweet Thorn)
// ● Scientific Name: Vachellia karroo

// 11. Lerotse (Tsamma Melon)
// ● Scientific Name: Citrullus lanatus

// 12. Mosetlha (Sickle Bush)
// ● Scientific Name: Dichrostachys cinerea

// 13. Mosukudu (Wild Medlar)
// ● Scientific Name: Vangueria infausta

// 14. Mohlokohloko (Christmas Berry)
// ● Scientific Name: Sarcocephalus latifolius

// 15. Moretlwa (Raisin Bush)
// ● Scientific Name: Grewia flava


// 16. Mokhure (Jackal Berry)
// ● Scientific Name: Diospyros mespiliformis

// 17. Mokwala (Blackthorn)
// ● Scientific Name: Senegalia mellifera

// 18. Mosima (Wild Pear)
// ● Scientific Name: Dombeya rotundifolia

// 19. Mokalabata (Milk Plum)
// ● Scientific Name: Englerophytum magalismontanum

// 20. Mukokomani (Aloe)
// ● Scientific Name: Aloe marlothii

// 21. Muganu (Bird Plum)
// ● Scientific Name: Berchemia discolor

// 22. Murumanyama (Sandpaper Bush)
// ● Scientific Name: Commiphora marlothii
