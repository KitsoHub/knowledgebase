
export interface PatentClaim {
  number: number;
  text: string;
  type: "independent" | "dependent";
  clarity: "strong" | "medium" | "weak";
  rewrittenText?: string;
}

export interface PriorArtMatch {
  id: string;
  title: string;
  similarity: number;
  noveltyRisk: "low" | "medium" | "high";
  abstract: string;
  date: string;
}

export interface PatentAnalysis {
  inventionSummary: string;
  problemSolved: string;
  technicalFeatures: string[];
  novelElements: string[];
  claims: PatentClaim[];
  alternativeEmbodiments: string[];
  noveltyScore: number;
  riskLevel: "low" | "medium" | "high";
  priorArtMatches: PriorArtMatch[];
  recommendations: string[];
}
