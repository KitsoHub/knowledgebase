export interface MedicinalPlant {
  id: string;
  name: string;
  scientificName: string;
  otherNames?: string[];
  localNames?: string[];
  family: string;
  origin: string;
  partsUsed: string[];
  image: string;
  description: string;
  medicinalQualities: string[];
  traditionalUses: string[];
  modernMedicine: {
    activeCompounds: string[];
    clinicalStudies: string[];
    approvedUses: string[];
    contraindications: string[];
  };
  homeopathicUses: {
    preparations: string[];
    conditions: string[];
    dosage: string;
  };
  research: {
    recentStudies: Array<{
      title: string;
      year: number;
      findings: string;
      source: string;
    }>;
    futureDirections: string[];
  };
  references: string[];
  creditors?: {
    creditor: Array<{
      name: string;
      url: string;
    }>;
  };
}


export interface BotanicalSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedFamily: string;
  onFamilyChange: (value: string) => void;
  selectedOrigin: string;
  onOriginChange: (value: string) => void;
  selectedPartUsed: string;
  onPartUsedChange: (value: string) => void;
  selectedCondition: string;
  onConditionChange: (value: string) => void;
  onClearFilters: () => void;}
