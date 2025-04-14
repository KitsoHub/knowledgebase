import type { ApplicationStage, PriorityLevel, TechnologyArea } from "./types";

export interface PatentApplication {
    id: string;
    tittle: string;
    inventor: string;
    filingDate: string;
    stage: ApplicationStage;
    assignedExaminer: string | null;
    technologyArea: TechnologyArea;
    priorityLevel: PriorityLevel;
    officeActions: number;
    daysInCurrentStage: number;
    lastUpdated: string;
    status: string;
    abstract: string;
    claims: string;
    description: string;
    notes: string;
    references: string;
    images: string[];
    documents: string[];
    relatedPatents?: string[];
    citations: string[];
    legalStatus?: string;
    familyMembers?: string[];
    internationalClasses?: string[];
    localClasses?: string[];
    patentNumber?: string;
    applicationNumber?: string;
    publicationNumber?: string;

}

export interface Examiner {
id:string;
name:string;
specialization:TechnologyArea[];
workload:number;
efficiency:number;
officeActionsIssued:number;
}

export const generateApplications =() =>{}

export const generateExaminers =() =>{}
export const generatePatentData = () => {}
export const getSummaryData =()=>{}
