export type ApplicationStatus =
  | "New"
  | "Verification"
  | "Search"
  | "Drafting"
  | "Filed"
  | "Publication"
  | "Examination"
  | "Granted"
  | "Abandoned"

export type PriorityLevel = "Low" | "Medium" | "High" | "Urgent"

export interface Application {
  id: string
  title: string
  inventor: string
  filingDate: string
  status: ApplicationStatus
  assignedExaminer: string
  lastUpdated: string
  technologyArea: string
  priority: PriorityLevel
}

export interface Examiner {
  id: string
  name: string
  specialization: string
  workload: number
}

// Generate random date within the last year
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split("T")[0]
}

const today = new Date()
const oneYearAgo = new Date(today)
oneYearAgo.setFullYear(today.getFullYear() - 1)

const technologyAreas = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Biotechnology",
  "Chemical Engineering",
]

const priorities: PriorityLevel[] = ["Low", "Medium", "High", "Urgent"]

const statuses: ApplicationStatus[] = [
  "New",
  "Verification",
  "Search",
  "Drafting",
  "Filed",
  "Publication",
  "Examination",
  "Granted",
  "Abandoned",
]

// Sample examiners
export const examiners: Examiner[] = [
  { id: "EX001", name: "Dr. Jane Smith", specialization: "Computer Science", workload: 12 },
  { id: "EX002", name: "Dr. John Doe", specialization: "Electrical Engineering", workload: 8 },
  { id: "EX003", name: "Dr. Emily Johnson", specialization: "Mechanical Engineering", workload: 15 },
  { id: "EX004", name: "Dr. Michael Brown", specialization: "Biotechnology", workload: 10 },
  { id: "EX005", name: "Dr. Sarah Wilson", specialization: "Chemical Engineering", workload: 7 },
]

// Generate 50 sample applications
export const applications: Application[] = Array.from({ length: 50 }, (_, i) => {
  const status = statuses[Math.floor(Math.random() * statuses.length)]
  const examiner = examiners[Math.floor(Math.random() * examiners.length)]

  return {
    id: `PAT${String(i + 1001).padStart(6, "0")}`,
    title: `Innovative ${technologyAreas[i % technologyAreas.length]} System and Method`,
    inventor: `Inventor ${i + 1}`,
    filingDate: randomDate(oneYearAgo, today),
    status,
    assignedExaminer: examiner.name,
    lastUpdated: randomDate(new Date(today.setMonth(today.getMonth() - 3)), new Date()),
    technologyArea: technologyAreas[i % technologyAreas.length],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
  }
})

// Get applications by status
export const getApplicationsByStatus = () => {
  const statusCounts = statuses.map((status) => ({
    name: status,
    value: applications.filter((app) => app.status === status).length,
  }))

  return statusCounts
}

// Get applications in queue
export const getApplicationsInQueue = () => {
  return applications.filter((app) => ["New", "Verification", "Search", "Drafting"].includes(app.status)).length
}

// Get applications in workspace
export const getApplicationsInWorkspace = () => {
  return applications.filter((app) => app.status === "Verification").length
}

// Get average processing time (in days)
export const getAverageProcessingTime = () => {
  return 14 // Mock value
}

// Get office actions issued this month
export const getOfficeActionsThisMonth = () => {
  return 28 // Mock value
}

// Get productivity trends
export const getProductivityTrends = () => {
  // Mock weekly data for the last 6 weeks
  return [
    { week: "Week 1", processed: 12, averageTime: 3.2, officeActions: 8 },
    { week: "Week 2", processed: 15, averageTime: 2.8, officeActions: 10 },
    { week: "Week 3", processed: 10, averageTime: 3.5, officeActions: 7 },
    { week: "Week 4", processed: 18, averageTime: 2.5, officeActions: 12 },
    { week: "Week 5", processed: 14, averageTime: 2.9, officeActions: 9 },
    { week: "Week 6", processed: 16, averageTime: 2.7, officeActions: 11 },
  ]
}

// Get applications for queue
export const getApplicationsForQueue = () => {
  return applications
    .filter((app) => ["New", "Verification", "Search", "Drafting"].includes(app.status))
    .sort((a, b) => {
      // Sort by priority first
      const priorityOrder = { Urgent: 0, High: 1, Medium: 2, Low: 3 }
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }

      // Then by filing date (oldest first)
      return new Date(a.filingDate).getTime() - new Date(b.filingDate).getTime()
    })
}

// Get applications for workspace
export const getApplicationsForWorkspace = () => {
  return applications.filter((app) => app.status === "Verification")
}
