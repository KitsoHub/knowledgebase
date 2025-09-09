import { MedicinalPlant } from "@/lib/types/botanical";

export const mockPlants: MedicinalPlant[] = [
  {
    id: '1',
    name: 'Echinacea',
    scientificName: 'Echinacea purpurea',
    family: 'Asteraceae',
    origin: 'North America',
    partsUsed: ['Roots', 'Leaves', 'Flowers'],
    image: 'https://images.unsplash.com/photo-1662411271553-e18d7ef508f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY2hpbmFjZWElMjBwdXJwbGUlMjBmbG93ZXJ8ZW58MXx8fHwxNzU3Mzg5MTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Purple coneflower used traditionally for immune support and wound healing.',
    medicinalQualities: ['Immunostimulant', 'Anti-inflammatory', 'Antioxidant', 'Antimicrobial'],
    traditionalUses: ['Cold and flu prevention', 'Wound healing', 'Respiratory infections', 'Skin conditions'],
    modernMedicine: {
      activeCompounds: ['Alkylamides', 'Cichoric acid', 'Polysaccharides', 'Flavonoids'],
      clinicalStudies: ['Reduced cold duration by 1.4 days in meta-analysis', 'Modest immune system enhancement in healthy adults'],
      approvedUses: ['Upper respiratory tract infections (Germany)', 'Topical wound healing'],
      contraindications: ['Autoimmune disorders', 'Progressive systemic diseases', 'Pregnancy (insufficient data)']
    },
    homeopathicUses: {
      preparations: ['Tincture 1:5', 'Mother tincture', 'Low potencies (3X-6X)'],
      conditions: ['Recurrent infections', 'Septic conditions', 'Boils and abscesses'],
      dosage: '5-10 drops TID for acute conditions'
    },
    research: {
      recentStudies: [
        {
          title: 'Echinacea for preventing and treating the common cold',
          year: 2023,
          findings: 'Moderate evidence for prevention, limited evidence for treatment',
          source: 'Cochrane Review'
        },
        {
          title: 'Immunomodulatory effects of Echinacea preparations',
          year: 2022,
          findings: 'Significant enhancement of innate immune responses',
          source: 'Journal of Ethnopharmacology'
        }
      ],
      futureDirections: ['Standardization of preparations', 'Optimal dosing protocols', 'Long-term safety studies']
    },
    references: [
      'Barnes, J. et al. (2005). Echinacea species (Echinacea angustifolia, E. pallida, E. purpurea)',
      'Shah, S.A. et al. (2007). Evaluation of echinacea for the prevention and treatment of the common cold'
    ]
  },
  {
    id: '2',
    name: 'Turmeric',
    scientificName: 'Curcuma longa',
    family: 'Zingiberaceae',
    origin: 'Southeast Asia',
    partsUsed: ['Rhizome'],
    image: 'https://images.unsplash.com/photo-1717483587555-dc38170a5c24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJtZXJpYyUyMGN1cmN1bWF8ZW58MXx8fHwxNzU3Mzg5MTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Golden spice with powerful anti-inflammatory and antioxidant properties.',
    medicinalQualities: ['Anti-inflammatory', 'Antioxidant', 'Hepatoprotective', 'Neuroprotective'],
    traditionalUses: ['Digestive disorders', 'Skin conditions', 'Joint pain', 'Liver support'],
    modernMedicine: {
      activeCompounds: ['Curcumin', 'Demethoxycurcumin', 'Bisdemethoxycurcumin', 'Turmerones'],
      clinicalStudies: ['Effective for osteoarthritis pain', 'Potential benefits in depression', 'Anti-inflammatory markers reduced'],
      approvedUses: ['Dietary supplement (US)', 'Traditional medicine (India, China)'],
      contraindications: ['Gallstones', 'Bleeding disorders', 'Pregnancy (high doses)']
    },
    homeopathicUses: {
      preparations: ['Mother tincture', 'Low potencies (3X-12X)'],
      conditions: ['Digestive complaints', 'Skin eruptions', 'Liver congestion'],
      dosage: '5-15 drops TID with meals'
    },
    research: {
      recentStudies: [
        {
          title: 'Curcumin for osteoarthritis: A systematic review',
          year: 2023,
          findings: 'Significant reduction in pain and stiffness compared to placebo',
          source: 'Arthritis Research & Therapy'
        },
        {
          title: 'Neuroprotective effects of curcumin in neurodegenerative diseases',
          year: 2022,
          findings: 'Promising results in animal models, limited human data',
          source: 'Nature Reviews Drug Discovery'
        }
      ],
      futureDirections: ['Bioavailability enhancement', 'Standardized extracts', 'Combination therapies']
    },
    references: [
      'Aggarwal, B.B. et al. (2007). Curcumin: The Indian solid gold',
      'Hewlings, S.J. & Kalman, D.S. (2017). Curcumin: A review of its effects on human health'
    ]
  },
  {
    id: '3',
    name: 'Ginseng',
    scientificName: 'Panax ginseng',
    family: 'Araliaceae',
    origin: 'East Asia',
    partsUsed: ['Root'],
    image: 'https://images.unsplash.com/photo-1630623092021-5033ec198e4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaW5zZW5nJTIwcm9vdHxlbnwxfHx8fDE3NTczODkxNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Adaptogenic root used for energy, stress relief, and cognitive enhancement.',
    medicinalQualities: ['Adaptogenic', 'Cognitive enhancer', 'Energy booster', 'Immunomodulator'],
    traditionalUses: ['Fatigue', 'Stress', 'Memory enhancement', 'Sexual dysfunction'],
    modernMedicine: {
      activeCompounds: ['Ginsenosides', 'Polysaccharides', 'Peptides', 'Polyacetylenes'],
      clinicalStudies: ['Improved cognitive function in healthy adults', 'Enhanced physical performance', 'Blood glucose regulation'],
      approvedUses: ['Dietary supplement (global)', 'Traditional medicine (Asia)'],
      contraindications: ['Hypertension', 'Insomnia', 'Pregnancy', 'Hormone-sensitive cancers']
    },
    homeopathicUses: {
      preparations: ['Mother tincture', 'Low to medium potencies (6X-30C)'],
      conditions: ['Mental exhaustion', 'Physical weakness', 'Sexual debility'],
      dosage: '10-20 drops BID, morning and afternoon'
    },
    research: {
      recentStudies: [
        {
          title: 'Ginseng for cognitive function: A systematic review',
          year: 2023,
          findings: 'Moderate evidence for memory and attention improvement',
          source: 'Psychopharmacology'
        },
        {
          title: 'Adaptogenic effects of Panax ginseng on stress',
          year: 2022,
          findings: 'Reduced cortisol levels and improved stress tolerance',
          source: 'Journal of Ginseng Research'
        }
      ],
      futureDirections: ['Optimal ginsenoside ratios', 'Personalized dosing', 'Long-term cognitive studies']
    },
    references: [
      'Reay, J.L. et al. (2005). Single doses of Panax ginseng reduce blood glucose levels',
      'Geng, J. et al. (2010). Ginseng for cognition: A systematic review'
    ]
  },
  {
    id: '4',
    name: 'Lavender',
    scientificName: 'Lavandula angustifolia',
    family: 'Lamiaceae',
    origin: 'Mediterranean',
    partsUsed: ['Flowers', 'Essential oil'],
    image: 'https://images.unsplash.com/photo-1541927634837-a7d5c4892527?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXZlbmRlciUyMGZsb3dlcnN8ZW58MXx8fHwxNzU3Mzg5MTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Calming aromatic herb used for relaxation, sleep, and anxiety relief.',
    medicinalQualities: ['Anxiolytic', 'Sedative', 'Antiseptic', 'Anti-inflammatory'],
    traditionalUses: ['Insomnia', 'Anxiety', 'Minor burns', 'Headaches'],
    modernMedicine: {
      activeCompounds: ['Linalool', 'Linalyl acetate', 'Camphor', 'Terpinen-4-ol'],
      clinicalStudies: ['Reduced anxiety in dental patients', 'Improved sleep quality', 'Wound healing acceleration'],
      approvedUses: ['Aromatherapy (global)', 'Traditional herbal medicine (EU)'],
      contraindications: ['Pregnancy (essential oil)', 'Allergic reactions', 'Drug interactions (sedatives)']
    },
    homeopathicUses: {
      preparations: ['Mother tincture', 'Low potencies (3X-12X)'],
      conditions: ['Nervous tension', 'Sleep disorders', 'Restlessness'],
      dosage: '5-10 drops before bedtime or TID for anxiety'
    },
    research: {
      recentStudies: [
        {
          title: 'Lavender aromatherapy for anxiety: A meta-analysis',
          year: 2023,
          findings: 'Significant reduction in anxiety scores across multiple studies',
          source: 'International Journal of Nursing Studies'
        },
        {
          title: 'Lavender oil for sleep quality: Randomized controlled trial',
          year: 2022,
          findings: 'Improved sleep duration and quality in adults with insomnia',
          source: 'Sleep Medicine'
        }
      ],
      futureDirections: ['Optimal delivery methods', 'Dosage standardization', 'Combination with other interventions']
    },
    references: [
      'Enshaieh, S. et al. (2007). The use of lavender aromatherapy to relieve stress',
      'Lewith, G.T. et al. (2005). A single-blinded, randomized pilot study evaluating the aroma of Lavandula'
    ]
  },
  {
    id: '5',
    name: 'Ginkgo',
    scientificName: 'Ginkgo biloba',
    family: 'Ginkgoaceae',
    origin: 'China',
    partsUsed: ['Leaves'],
    image: 'https://images.unsplash.com/photo-1697985007583-e197e2b73bbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaW5rZ28lMjBsZWF2ZXN8ZW58MXx8fHwxNzU3Mzg5MTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Ancient tree species used for cognitive enhancement and circulation support.',
    medicinalQualities: ['Cognitive enhancer', 'Circulatory stimulant', 'Neuroprotective', 'Antioxidant'],
    traditionalUses: ['Memory problems', 'Circulation disorders', 'Tinnitus', 'Vertigo'],
    modernMedicine: {
      activeCompounds: ['Flavonoids', 'Terpenoids', 'Ginkgolides', 'Bilobalide'],
      clinicalStudies: ['Mixed results for dementia', 'Improved peripheral circulation', 'Possible benefits for tinnitus'],
      approvedUses: ['Prescription medicine (Germany)', 'Dietary supplement (US)'],
      contraindications: ['Bleeding disorders', 'Surgery', 'Pregnancy', 'Epilepsy']
    },
    homeopathicUses: {
      preparations: ['Mother tincture', 'Low to medium potencies (6X-30C)'],
      conditions: ['Memory weakness', 'Poor circulation', 'Vertigo'],
      dosage: '10-15 drops BID for chronic conditions'
    },
    research: {
      recentStudies: [
        {
          title: 'Ginkgo biloba for cognitive impairment and dementia',
          year: 2023,
          findings: 'Limited evidence for cognitive benefits in healthy adults',
          source: 'Cochrane Database of Systematic Reviews'
        },
        {
          title: 'Ginkgo extract for peripheral arterial disease',
          year: 2022,
          findings: 'Modest improvement in walking distance and symptoms',
          source: 'European Journal of Vascular Surgery'
        }
      ],
      futureDirections: ['Biomarker identification', 'Personalized treatment', 'Combination therapies']
    },
    references: [
      'Diamond, B.J. et al. (2000). Ginkgo biloba extract: mechanisms and clinical indications',
      'Ernst, E. & Pittler, M.H. (2000). Ginkgo biloba for dementia: a systematic review'
    ]
  }
];
