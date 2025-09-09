export interface MedicinalPlant {
  id: string;
  name: string;
  scientificName: string;
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
}
