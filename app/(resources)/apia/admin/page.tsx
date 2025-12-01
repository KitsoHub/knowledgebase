"use client"
import PatentAnalysisResults from '@/app/components/patents/patent-analysis-results';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { Separator } from '@/app/components/ui/separator';
import { Textarea } from '@/app/components/ui/textarea';
import { PatentAnalysis } from '@/lib/types/patents';
import { Brain, FileText, Info, Shield, Sparkles, Upload } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from "sonner";
import Swal from 'sweetalert2'


export default function APIADashboard() {
      const [inventionText, setInventionText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<PatentAnalysis | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [analysisProgress, setAnalysisProgress] = useState(0);

    const showSwal = () => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No Information Provided',
          text: 'Please provide invention text or upload documents.',
          showConfirmButton: false,
          timer: 2800,
        })
      }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    toast.success(`${files.length} file(s) uploaded successfully`);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    toast.info("File removed");
  };
    const handleAnalyze = () => {
    if (!inventionText.trim() && uploadedFiles.length === 0) {
      showSwal()
      return;
    }
    simulateAnalysis();
  };

    const simulateAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate progress
    const progressSteps = [10, 25, 45, 65, 85, 100];
    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setAnalysisProgress(step);
    }

    // Generate mock analysis
    const mockAnalysis: PatentAnalysis = {
      inventionSummary: "A novel system for preserving and protecting traditional indigenous knowledge through AI-powered semantic analysis and patent intelligence. The system combines cultural protocol management with prior art searching to help indigenous communities identify, document, and protect their traditional innovations and knowledge systems before potential misappropriation.",
      problemSolved: "Indigenous communities face challenges in protecting traditional knowledge from unauthorized patents and commercialization. Existing patent systems are not designed to recognize or protect traditional knowledge, leading to biopiracy and cultural appropriation.",
      technicalFeatures: [
        "AI-powered semantic similarity engine for prior art detection",
        "Cultural protocol management system with TK Label integration",
        "Vector database for embedding storage and retrieval",
        "Multi-format document ingestion (PDF, DOCX, text)",
        "Automated claim generation and clarity assessment",
        "Real-time novelty scoring and risk analysis",
        "Indigenous knowledge classification system"
      ],
      novelElements: [
        "Integration of traditional knowledge (TK) labels with patent claim analysis",
        "Cultural context-aware prior art searching",
        "Community governance model for patent review workflows",
        "Semantic embedding of traditional knowledge alongside technical patents",
        "Indigenous authority verification for knowledge contributions"
      ],
      claims: [
        {
          number: 1,
          text: "A computer-implemented method for protecting traditional indigenous knowledge, comprising: receiving a description of traditional knowledge or innovation; analyzing the description using natural language processing to extract technical features and cultural context; generating semantic embeddings of the description; searching a vector database containing prior art patents and traditional knowledge records; identifying similarity matches with novelty risk scores; and generating patent claims incorporating cultural protocol requirements.",
          type: "independent",
          clarity: "strong"
        },
        {
          number: 2,
          text: "The method of claim 1, wherein the cultural context includes Traditional Knowledge (TK) label classifications selected from a group comprising: TK Attribution, TK Non-Commercial, TK Community Voice, TK Seasonal, TK Women General, TK Men General, TK Clan, and TK Secret Sacred.",
          type: "dependent",
          clarity: "strong"
        },
        {
          number: 3,
          text: "The method of claim 1, wherein the semantic embeddings are generated using transformer-based language models trained on both patent corpus and traditional knowledge documentation.",
          type: "dependent",
          clarity: "strong"
        },
        {
          number: 4,
          text: "The method of claim 1, further comprising: implementing a community governance workflow for claim approval; requiring indigenous authority verification before publication; and maintaining an audit trail of knowledge contributions and access requests.",
          type: "dependent",
          clarity: "medium",
          rewrittenText: "The method of claim 1, further comprising: implementing a community governance workflow wherein claim approval requires multi-stakeholder review; requiring verification by designated indigenous authority representatives before public disclosure; and maintaining a cryptographically secured audit trail recording all knowledge contributions, access requests, and approval decisions with timestamp and user attribution."
        },
        {
          number: 5,
          text: "The system processes documents using advanced AI techniques.",
          type: "independent",
          clarity: "weak",
          rewrittenText: "A system for document analysis comprising: a document ingestion module configured to accept multiple file formats including PDF, DOCX, and plain text; a natural language processing engine utilizing transformer-based neural networks to extract invention concepts, technical features, and problem statements; and a claim generation module that produces structured patent claims conforming to USPTO guidelines based on the extracted features."
        },
        {
          number: 6,
          text: "The method of claim 1, wherein the prior art search utilizes cosine similarity calculations on high-dimensional embedding vectors with a similarity threshold of 0.75 or higher for flagging potential novelty risks.",
          type: "dependent",
          clarity: "strong"
        },
        {
          number: 7,
          text: "The method of claim 1, further comprising generating alternative embodiments by identifying functional equivalents for each technical feature and combining them in different configurations while maintaining the core inventive concept.",
          type: "dependent",
          clarity: "strong"
        },
        {
          number: 8,
          text: "A non-transitory computer-readable storage medium storing instructions that, when executed by a processor, cause the processor to perform the method of claim 1.",
          type: "dependent",
          clarity: "strong"
        },
        {
          number: 9,
          text: "The method of claim 1, wherein the novelty score is calculated as a weighted combination of: semantic distance from closest prior art (40%), number of unique technical features (30%), cultural context uniqueness (20%), and temporal novelty based on knowledge age (10%).",
          type: "dependent",
          clarity: "strong"
        },
        {
          number: 10,
          text: "The method of claim 1, further comprising: exporting the analysis results as structured JSON containing invention summary, generated claims, rewritten claims, novelty score, risk assessment, prior art matches with similarity scores, and embedded metadata for integration with external patent management systems.",
          type: "dependent",
          clarity: "strong"
        }
      ],
      alternativeEmbodiments: [
        "Cloud-based SaaS platform with multi-tenant community isolation",
        "Blockchain-based immutable knowledge registry with smart contract governance",
        "Federated learning system allowing distributed knowledge analysis without centralization",
        "Mobile application with offline-first architecture for remote community access",
        "API-first platform enabling integration with existing tribal archives and museums",
        "Hybrid system combining manual elder review with AI-powered preliminary analysis"
      ],
      noveltyScore: 78,
      riskLevel: "low",
      priorArtMatches: [
        {
          id: "US10234567B2",
          title: "System and method for cultural heritage preservation using digital archives",
          similarity: 0.68,
          noveltyRisk: "medium",
          abstract: "A system for preserving cultural heritage through digital archiving and metadata management. The system includes document scanning, cataloging, and access control features for museum and library applications.",
          date: "2019-03-15"
        },
        {
          id: "US9876543B1",
          title: "AI-powered patent prior art search system",
          similarity: 0.72,
          noveltyRisk: "medium",
          abstract: "An artificial intelligence system for searching patent databases to identify prior art. Uses natural language processing and semantic similarity to match patent claims with existing patents.",
          date: "2018-07-22"
        },
        {
          id: "WO2020123456A1",
          title: "Traditional knowledge database with access protocols",
          similarity: 0.81,
          noveltyRisk: "high",
          abstract: "A database system for storing traditional knowledge with community-defined access protocols. Includes features for cultural sensitivity labeling and stakeholder permission management.",
          date: "2020-06-11"
        },
        {
          id: "US10987654B2",
          title: "Vector database for semantic document retrieval",
          similarity: 0.55,
          noveltyRisk: "low",
          abstract: "A vector database architecture optimized for high-dimensional embedding storage and cosine similarity searches for document retrieval applications.",
          date: "2021-01-08"
        }
      ],
      recommendations: [
        "Focus claims on the unique integration of TK Labels with patent analysis - this is your strongest novel element",
        "Consider adding claims specifically around the community governance workflow as it's significantly different from standard patent processes",
        "Strengthen Claim 4 with more specific technical details about the governance implementation",
        "The prior art match WO2020123456A1 has high similarity (0.81) - conduct detailed comparative analysis to highlight distinctions",
        "Consider filing as continuation-in-part if building on existing cultural preservation systems",
        "Add dependent claims covering specific TK Label types and their technical implementation",
        "Document the cultural consultation process as part of the inventive method",
        "Consider provisional patent filing to establish priority date while refining claims"
      ]
    };

    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
    toast.success("Analysis complete!");
  };


  return (
    <div className="min-h-screen bg-background mt-28">
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        {/* Supabase Integration Info */}
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            This Patents Engine --APIA-- demonstrates frontend functionality.
            User authentication, and secure knowledge storage with features like
            user management, content approval workflows, and cultural protocol
            enforcement.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 p-8 text-white">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Brain className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-3xl">CIPA AI Patent Intelligence Engine</h1>
                  <p className="text-blue-100">
                    Protecting Traditional Knowledge through Smart IP Analysis
                  </p>
                </div>
              </div>
              <p className="text-blue-50 max-w-3xl mt-4">
                Leveraging AI-powered semantic analysis to identify, documents, and
                protect indigenous innovations. Our system combines cultural
                protocol awareness with patent intelligence to prevent biopiracy
                and support traditional knowledge rights.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl"></div>
          </div>

                        <Alert className="border-blue-200 bg-blue-50">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-900">
          <strong>Important:</strong> This tool helps communities identify potential patent conflicts and document innovations.
          It does not constitute legal advice. Consult with IP attorneys familiar with indigenous knowledge rights before filing patents.
        </AlertDescription>
      </Alert>

      {/* input section */}

<section id='data-input'>
          <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Invention Input
          </CardTitle>
          <CardDescription>
            Describe your innovation, upload documents, or paste prior patent text for analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block mb-2">Invention Description</label>
            <Textarea
              placeholder="Describe your traditional innovation, technological development, or knowledge system. Include: 1) What problem it solves,
                2) How it works,
                3) What makes it unique,
                4) Cultural context and traditional origins..."
              value={inventionText}
              onChange={(e) => setInventionText(e.target.value)}
              rows={8}
              cols={50}

            />
            <p className="text-sm text-muted-foreground mt-2">
              {inventionText.length} characters
            </p>
          </div>

          <Separator />

          <div>
            <label className="block mb-2">Upload Documents (Optional)</label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="font-medium">Click to upload or drag and drop</p>
                <p className="text-sm text-muted-foreground">
                  PDF, DOCX, TXT, or prior patent documents
                </p>
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">{file.name}</span>
                      <Badge variant="secondary">{(file.size / 1024).toFixed(1)} KB</Badge>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Generate Patent Analysis
              </>
            )}
          </Button>

          {isAnalyzing && (
            <div className="space-y-2">
              <Progress value={analysisProgress} />
              <p className="text-sm text-center text-muted-foreground">
                Processing: {analysisProgress}%
              </p>
            </div>
          )}
        </CardContent>
      </Card>
</section>

<section id="analysis-result">
    {analysis && PatentAnalysisResults({inventionText,analysis, uploadedFiles})}
</section>
        </div>




      </main>
    </div>
  );
}
