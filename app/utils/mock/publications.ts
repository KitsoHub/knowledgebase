/**
 * details field captures publication venue (journal/publisher) and volume/issue
identifiers object handles ISBN/ISSN/DOI consistently
notes field preserves important contextual information
 * Featured flag (isFeatured) for highlighting significant works
    * This structure allows for easy expansion and categorization of publications
 * Metadata
 * @file
 * @description Mock data for Indigenous Knowledge Systems research publications
 * @author
 * @date 2024-10-01
 * This file contains a structured representation of scholarly contributions
 */

// Publication taxonomy (extensible)
type PublicationType =
    | 'book'
    | 'journal-article'
    | 'conference-paper'
    | 'book-chapter'
    | 'community-report';

// Indigenous knowledge-specific labels
type TKLabel =
    | 'culturally_sensitive'
    | 'seasonal_knowledge'
    | 'restricted'
    | 'secret_sacred'
    | 'agricultural_knowledge'
    | 'water_management' | 'hunting_practices' | 'ecological_calendar'|'cultural_heritage'|'identity_knowledge';

// Access control licenses
type LicenseType =
    | 'CC-BY'
    | 'Traditional-Knowledge-Notice'
    | 'All-Rights-Reserved';
type PublicationStatus = 'published' | 'in-press' | 'forthcoming' | 'submitted';

export interface PublicationContainer {
    title: string;
    volume?: string;
    issue?: string;
    pages?: string;
    publisher?: string;
    doi?: string;
}
export interface BookOrProceedings {
    title: string;
    editors?: string[];
    isbn?: string;
}

export interface PublicationCategory {
    name: string;
    description?: string;
    sortOrder: number;
    items: Publication[];
}

// TypeScript Interface
export interface Publication {
    category: string;
    id: string;
    year: number;
    authors: Array<{
        name: string;
        orcid?: string;
        isIndigenousResearcher?: boolean;
    }>;
    title: string;
    type: PublicationType;
    status: PublicationStatus;
    identifiers?: {
        doi?: string;
        isbn?: string;
        issn?: string;
        handle?: string;
        arxivId?: string;
        repositoryUrl?: string; // e.g., institutional repository
    };
    notes?: string;
    isFeatured?: boolean;
    metadata: {
        container?: PublicationContainer; // Journal/book details
        parentPublication?: BookOrProceedings; // For chapters
    };
    // Access and rights
    access: {
        openAccess?: boolean;
        license?: 'CC-BY' | 'CC0' | 'All-Rights-Reserved' | 'Traditional-Knowledge-Notice';
        embargoDate?: Date;
        accessStatement?: string; // For Indigenous data sovereignty
    };
    indigenousContext?: {
        communitiesInvolved: string[];
        tkLabels: TKLabel[];
        communityApproval: boolean;
    };
    academicContext: {
        abstract?: string;
        keywords: string[];
        citations?: number;
        featuredIn?: string[];
        relatedProjects?: { id: string; title: string }[];
    };

}

export interface PublicationCategory {
    name: string;
    description?: string;
    sortOrder: number;
    items: Publication[];
}
export interface PublicationsData {
    title: string;
    description: string;
    lastUpdated: Date;
    categories: PublicationCategory[];
}

// Publication Data Object
export const publicationsData: PublicationsData = {
    title: "Indigenous Knowledge Systems Research",
    description: "Selected scholarly contributions focusing on Indigenous knowledge systems, cultural heritage, and community-led research methodologies",
    lastUpdated: new Date("2025-08-20"),
    categories: [
        {
            name: "Books",
            sortOrder: 1,
            items: [
                {

                    id: "skold-2015-same-sun",
                    year: 2015,
                    type: "book",
                    status: "published",
                    authors: [{ name: " Peter Skold" },
                    { name: " Moa Sanderstrom" },
                    { name: " Maitseo Bolaane", isIndigenousResearcher: true }],
                    title: "Under the Same Sun! Parallel Issues and Mutual Challenges for San and Sami People in Research",
                    metadata: {
                        container: {
                            title: "Vaartoe / Centre for Sami Research (CeSam), Umeå University",
                            pages: "200"
                        }
                    },
                    identifiers: {
                        isbn: "978-91-7601-137-9",
                        issn: "1651-5455"
                    },
                    academicContext: {
                        keywords: ["Indigenous research", "San people", "Sami people", "cross-cultural methodology"],
                        abstract: "Explores comparative Indigenous research methodologies and mutual challenges faced by San and Sami communities in academic research contexts."
                    },
                    access: {
                        license: "All-Rights-Reserved",

                    }
                },
                {
                    id: "bolaane-2023-chief-hunters-san",
                    year: 2013,

                    authors: [{ name: "Bolaane, Maitseo" }],
                    type: "book",
                    status: "published",
                    title: "Chiefs, Hunters, and San in the Creation of the Moremi Game Reserve, Okavango Delta: Multiracial Interactions and Initiatives, 1956-1979",
                    metadata: {
                        container: {
                            title: "University of Botswana",
                            pages: "250"
                        }
                    },
                    identifiers: {
                        isbn: "978-4-906962-08-2"
                    },
                    notes: "Vol. 83. Single-authored monograph examining Indigenous ecological knowledge in conservation policy. Received positive reviews in Journal of Anthropological Research (2014) and Botswana Notes & Records",
                    isFeatured: true,
                    access: {
                        license: "Traditional-Knowledge-Notice",
                        accessStatement: "Requires community approval via Local Contexts platform"
                    },
                    academicContext: {
                        abstract: undefined,
                        keywords: [],
                        citations: undefined,
                        featuredIn: undefined,
                        relatedProjects: undefined
                    }
                },
                {
                    id: "bolaane-2024-san-cross-border",
                    year: 2014,
                    authors: [{ name: "Bolaane, Maitseo", isIndigenousResearcher: true }],
                    type: "book",
                    title: "San Cross-Border Cultural Heritage and Identity in Botswana, Namibia and South Africa",
                    metadata: {
                        container: {
                            title: "African Study Monographs, Centre for African Area Studies, Kyoto University"
                        }
                    },
                    identifiers: {
                        issn: "0285-1601"
                    },
                    isFeatured: true,
                    notes: "Vol. 35 (1). Examines transnational Indigenous identity preservation and cultural heritage systems",
                    access: {
                        license: "All-Rights-Reserved",
                    },
                    academicContext: {
                        abstract: undefined,
                        keywords: [],
                        citations: undefined,
                        featuredIn: undefined,
                        relatedProjects: undefined
                    },
                    status: "published"
                }
            ]
        },
        {
            name: "Journal Articles",
            sortOrder: 2,
            items: [
                {
                    id: "bolaane-2025-crocodile",
                    year: 2025,
                    authors: [
                        {
                            name: "Bolaane, Maitseo",
                            orcid: "0000-0002-1234-5678",
                            isIndigenousResearcher: true
                        },
                        {
                            name: "Anne-Maria Fehn",
                            orcid: "0000-0002-1234-5678",
                            isIndigenousResearcher: true
                        },
                        {
                            name: "Bonny Sands",
                            orcid: "0000-0002-1234-5678",
                            isIndigenousResearcher: true
                        },
                        {
                            name: "Admire Phiri",
                            orcid: "0000-0002-1234-5678",
                            isIndigenousResearcher: true
                        },
                        {
                            name: "Gaseitsiwe Masunga",
                            orcid: "0000-0002-1234-5678",
                            isIndigenousResearcher: true
                        },
                        {
                            name: "Ezequiel Fabiano",
                            orcid: "0000-0002-1234-5678",
                            isIndigenousResearcher: true
                        },
                        {
                            name: "Jorge Rocha",
                            orcid: "0000-0002-1234-5678",
                            isIndigenousResearcher: true
                        }
                    ],
                    title: "Tracing contact and migration in pre-Bantu southern Africa through lexical borrowing",
                    type: "journal-article",
                    status: "in-press",
                    metadata: {
                        container: {
                            title: "Journal of Southern African Studies",
                            doi: "10.1080/03057070.2024.2522586"
                        }
                    },
                    academicContext: {
                        keywords: ["Indigenous ecological knowledge", "Okavango Delta", "colonial history"],
                        abstract: "Examines how Indigenous ecological knowledge was both utilized and suppressed during colonial hunting practices in Botswana, highlighting the sophisticated understanding of crocodile behavior and habitats maintained by BaYei river people.",
                        citations: 12
                    },
                    access: {
                        license: "Traditional-Knowledge-Notice",
                        accessStatement: "Access requires approval from BaYei River People Council"
                    },
                    indigenousContext: {
                        communitiesInvolved: ["Bayei River People"],
                        tkLabels: ["ecological_calendar"],
                        communityApproval: true
                    },
                    isFeatured: true
                },
                {
                    id: "bolaane-2024-hunting-okavango",
                    year: 2025,
                    authors: [{ name: "Bolaane, Maitseo", }],
                    title: "Crocodile Hunting in the Okavango Swamps: White Hunters and Indigenous Ecological Knowledge in Late Colonial Botswana",
                    type: "journal-article",
                    status: "forthcoming",
                    metadata: {
                        container: {
                            title: "Journal of Southern African Studies",
                            doi: "10.1080/03057070.2024.2522586"
                        }
                    },
                    academicContext: {
                        abstract: "Crocodile Hunting in the Okavango Swamps.",
                        keywords: [
                            "Indigenous ecological knowledge",
                            "conservation history",
                            "colonial policy",
                            "Okavango Delta"
                        ],
                        citations: 42,
                        featuredIn: [
                            "Reviewed in Journal of Anthropological Research, vol. 70, 2014",
                            "Featured in Botswana Notes & Records, vol. 47"
                        ]
                    },
                    identifiers: {
                        doi: "10.1080/03057070.2024.2522586"
                    },
                    notes: "Forthcoming article examining Indigenous ecological knowledge systems in colonial hunting practices",
                          indigenousContext: {
        communitiesInvolved: ["San Council of Botswana", "!Xun and Khwe San Council"],
        tkLabels: ["hunting_practices", "restricted"],
        communityApproval: true
      },
                    access: {
                        license: "All-Rights-Reserved",

                    }
                }
            ]
        }
    ]
};
