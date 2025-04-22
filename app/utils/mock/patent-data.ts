import { mockApplication } from './patent-data';


// Generate random dates from the last 2 years

import type { ApplicationStage, PriorityLevel, TechnologyArea } from "@/lib/types";

export interface Examiner {
    id:string;
    name:string;
    specialization:TechnologyArea[];
    workload:number;
    efficiency:number;
    officeActionsIssued:number;
    }

    export interface PatentApplication {
        id: string;
        title: string;
        inventor: string;
        filingDate: string;
        stage: ApplicationStage;
        assignedExaminer: string | null;
        lastUpdated: string;
        technologyArea: TechnologyArea;
        priorityLevel: PriorityLevel;
        officeActions: number;
        daysInCurrentStage: number;
      }


const getRandomDate = (daysAgo = 730) => {

const today_date = new Date();
today_date.setDate(today_date.getDate() - Math.floor(Math.random() * daysAgo));
const r_date = today_date.toISOString().split("T")[0];
return r_date
}


// Examiners
export const generateExaminers = (count: number): Examiner[] => {
    const examiners: Examiner[] = [];

    const technologyAreas: TechnologyArea[] = [
        "Software",
        "Hardware",
        "Biotechnology",
        "Chemical",
        "Mechanical",
        "Electrical",
    ];



    // assign random technology areas to examiners
   for (let i = 0; i < count; i++) {
    const specializationCount = Math.floor(Math.random() * 3) + 1;
    const specializations : TechnologyArea[] = [];
    for (let j = 0; j < specializationCount; j++) {
        const area = technologyAreas[Math.floor(Math.random() * technologyAreas.length)];
        if (!specializations.includes(area)) {
            specializations.push(area);
        }
    }

    examiners.push({
        id: `EX-${i + 1}`,
        name: `Examiner ${i + 1}`,
        specialization: specializations,
        workload: Math.floor(Math.random() * 15) + 5,
        efficiency: Math.floor(Math.random() * 20) + 10,
        officeActionsIssued: Math.floor(Math.random() * 50) + 10,
    })
   }
   return examiners;
}


// weekly productivity data
export interface WeeklyProductivity {
    week: string;
    applicationProcessed: number;
    averageProcessingTime: number;
    officeActionsIssued: number;
}

export const generateWeeklyProductivity = (weeks: number): WeeklyProductivity[] => {
    const productivityData: WeeklyProductivity[] = [];
    for(let i =0; i<weeks; i++){
        const date = new Date();
        date.setDate(date.getDate() - (i * 7));
        productivityData.unshift({
            week: `Week ${weeks - i}`,
            applicationProcessed: Math.floor(Math.random() * 10) + 5,
            averageProcessingTime: Math.floor(Math.random() * 10) + 3,
            officeActionsIssued: Math.floor(Math.random() * 5) + 5,
        })
    }
return productivityData;
}

// Patent sample applications

export const generateApplications = (count: number): PatentApplication[] => {
    const applications: PatentApplication[] = [];
    const stages: ApplicationStage[] = [
        "New", "Verification", "Search", "Drafting",
        "Publication", "Examination", "Awaiting Response", "Ready for Decision",
        "Granted", "Abandoned"
    ];
    const technologyAreas: TechnologyArea[] = ["Software", "Hardware", "Biotechnology", "Chemical", "Mechanical", "Electrical"];
    const priorityLevels: PriorityLevel[] = ["Low", "Medium", "High", "Urgent"];
    for (let i = 0; i < count; i++) {
        const stage = stages[Math.floor(Math.random() * (stages.length - 3))];
        applications.push({
            id: `PAT-${10000 + 1}`,
            title: `Innovation in ${technologyAreas[Math.floor(Math.random() * technologyAreas.length)]} Technologies`,
            inventor: `Inventor ${i + 1}`,
            filingDate: getRandomDate(),
            stage,
            assignedExaminer: Math.random() > 0.2 ? `Examiner ${Math.floor(Math.random() * 5) + 1}` : null,
            lastUpdated: getRandomDate(60),
            technologyArea: technologyAreas[Math.floor(Math.random() * technologyAreas.length)],
            priorityLevel: priorityLevels[Math.floor(Math.random() * priorityLevels.length)],
            officeActions: Math.floor(Math.random() * 3),
            daysInCurrentStage: Math.floor(Math.random() * 90) + 1,
        });
    }
    return applications;
}

// creating mock data for patent applications
export const mockApplications = generateApplications(10);
export const mockExaminers = generateExaminers(5);
export const mockWeeklyProductivity = generateWeeklyProductivity(10);


//dashboard summary data
export const getSummaryData = () =>{
    const applicationsInQueue = mockApplications.filter(app => ["New", "Verification", "Search", "Examination", "Ready for Decision"].includes(app.stage)).length;

    const  myWorkspace = mockApplications.filter(app => app.assignedExaminer === "Examiner 1").length;
    const averageProcessingTime = mockApplications.reduce((sum, app)=>sum + app.daysInCurrentStage, 0) / mockApplications.length;
    const officeActionsThisMonth =  mockApplications.reduce((sum, app)=>sum + app.officeActions, 0);

    return {
        applicationsInQueue,
        myWorkspace,
        averageProcessingTime: Math.round(averageProcessingTime),
        officeActionsThisMonth,
    }
}

// application counts by stage for donut chart
export const getApplicationsByStage = () => {
    const counts: Record<string, number> = {
      "New": 0,
      "Verification": 0,
      "Under Examination": 0, // Combined Search, Drafting, Examination
      "Awaiting Response": 0,
      "Ready for Decision": 0,
      "Completed": 0 // Combined Granted and Abandoned
    };

    for (const app of mockApplications) {
      if (["Search", "Drafting", "Examination", "Publication"].includes(app.stage)) {
        counts.UnderExamination++;
      } else if (["Granted", "Abandoned"].includes(app.stage)) {
        counts.Completed++;
      } else {
        counts[app.stage]++;
      }
    }

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value
    }));
  };
