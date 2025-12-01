import { PatentAnalysis } from '@/lib/types/patents'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AlertCircle, AlertTriangle, BookOpen, CheckCircle2, Code, Database, Download, FileCheck, Lightbulb, Scale, Search, Sparkles, Target, TrendingUp } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import Swal from 'sweetalert2'

type PatentAnalysisResultsProps = {
    inventionText: string
    analysis: PatentAnalysis
    uploadedFiles: File[]
}



// TODO: use n8n and paperless for more context => vector DB supabase or postgresql
export default function PatentAnalysisResults({inventionText, analysis, uploadedFiles}: PatentAnalysisResultsProps) {
      const getRiskColor = (risk: "low" | "medium" | "high") => {
    switch (risk) {
      case "low": return "text-green-600 bg-green-50 border-green-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "high": return "text-red-600 bg-red-50 border-red-200";
    }
  };

  const getClarityColor = (clarity: "strong" | "medium" | "weak") => {
    switch (clarity) {
      case "strong": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "weak": return "bg-red-100 text-red-800";
    }
  };

    const showSwalDownload = () =>{
                Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Analysis Report',
            text: 'Document will be download to your local storage.',
            showConfirmButton: false,
            timer: 2800,
          })

    }

    const exportJSON = () => {
    if (!analysis) return;

    const jsonOutput = {
      timestamp: new Date().toISOString(),
      inventionSummary: analysis.inventionSummary,
      problemSolved: analysis.problemSolved,
      technicalFeatures: analysis.technicalFeatures,
      novelElements: analysis.novelElements,
      claims: analysis.claims,
      alternativeEmbodiments: analysis.alternativeEmbodiments,
      noveltyAssessment: {
        score: analysis.noveltyScore,
        riskLevel: analysis.riskLevel
      },
      priorArtAnalysis: analysis.priorArtMatches,
      recommendations: analysis.recommendations,
      metadata: {
        analyzedBy: "Indigenous Knowledge Patent Intelligence Engine",
        version: "1.0.0",
        documentCount: uploadedFiles.length,
        inputLength: inventionText.length
      }
    };

    const blob = new Blob([JSON.stringify(jsonOutput, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patent-analysis-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showSwalDownload()
  };
  return (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className={`border-2 ${getRiskColor(analysis.riskLevel)}`}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Novelty Score</p>
                    <p className="text-3xl mt-1">{analysis.noveltyScore}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className={`border-2 ${getRiskColor(analysis.riskLevel)}`}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Prior Art Risk</p>
                    <p className="text-3xl mt-1 capitalize">{analysis.riskLevel}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Claims Generated</p>
                    <p className="text-3xl mt-1">{analysis.claims.length}</p>
                  </div>
                  <FileCheck className="w-8 h-8 opacity-50 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabbed Content */}
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
              <TabsTrigger value="summary">
                <BookOpen className="w-4 h-4 mr-2" />
                Summary
              </TabsTrigger>
              <TabsTrigger value="claims">
                <Scale className="w-4 h-4 mr-2" />
                Claims
              </TabsTrigger>
              <TabsTrigger value="prior-art">
                <Search className="w-4 h-4 mr-2" />
                Prior Art
              </TabsTrigger>
              <TabsTrigger value="embodiments">
                <Lightbulb className="w-4 h-4 mr-2" />
                Embodiments
              </TabsTrigger>
              <TabsTrigger value="recommendations">
                <Target className="w-4 h-4 mr-2" />
                Insights
              </TabsTrigger>
              <TabsTrigger value="export">
                <Code className="w-4 h-4 mr-2" />
                Export
              </TabsTrigger>
            </TabsList>

            {/* Summary Tab */}
            <TabsContent value="summary" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Invention Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{analysis.inventionSummary}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Problem Solved</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{analysis.problemSolved}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Technical Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.technicalFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Novel Elements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.novelElements.map((element, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <span>{element}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Claims Tab */}
            <TabsContent value="claims">
              <Card>
                <CardHeader>
                  <CardTitle>Patent Claims Analysis</CardTitle>
                  <CardDescription>
                    Generated claims with clarity assessment and rewrites for weak claims
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      {analysis.claims.map((claim) => (
                        <Card key={claim.number} className="border-l-4 border-l-primary">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">
                                Claim {claim.number}
                                <Badge variant="outline" className="ml-2">
                                  {claim.type}
                                </Badge>
                              </CardTitle>
                              <Badge className={getClarityColor(claim.clarity)}>
                                {claim.clarity}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <p className="text-sm font-medium mb-1">Original Claim:</p>
                              <p className="text-muted-foreground leading-relaxed">{claim.text}</p>
                            </div>

                            {claim.rewrittenText && (
                              <div className="border-t pt-3">
                                <div className="flex items-center gap-2 mb-2">
                                  <AlertCircle className="w-4 h-4 text-orange-600" />
                                  <p className="text-sm font-medium">Rewritten for Clarity:</p>
                                </div>
                                <p className="text-muted-foreground leading-relaxed bg-muted p-3 rounded-lg">
                                  {claim.rewrittenText}
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Prior Art Tab */}
            <TabsContent value="prior-art">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Prior Art Matches
                  </CardTitle>
                  <CardDescription>
                    Semantic similarity search results from patent database
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.priorArtMatches.map((match) => (
                      <Card key={match.id} className="border-l-4 border-l-blue-500">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <CardTitle className="text-lg mb-2">{match.title}</CardTitle>
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="outline">{match.id}</Badge>
                                <Badge variant="secondary">{match.date}</Badge>
                                <Badge className={getRiskColor(match.noveltyRisk)}>
                                  {match.noveltyRisk} risk
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Similarity</p>
                              <p className="text-2xl font-bold">{(match.similarity * 100).toFixed(0)}%</p>
                              <Progress value={match.similarity * 100} className="w-24 mt-1" />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground leading-relaxed">{match.abstract}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Embodiments Tab */}
            <TabsContent value="embodiments">
              <Card>
                <CardHeader>
                  <CardTitle>Alternative Embodiments</CardTitle>
                  <CardDescription>
                    Different implementations of the core inventive concept
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.alternativeEmbodiments.map((embodiment, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="flex-1">{embodiment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Strategic Recommendations
                  </CardTitle>
                  <CardDescription>
                    AI-generated insights for strengthening your patent application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.recommendations.map((rec, index) => (
                      <Alert key={index} className="border-l-4 border-l-blue-500">
                        <Lightbulb className="h-4 w-4 text-blue-600" />
                        <AlertDescription>{rec}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Export Tab */}
            <TabsContent value="export">
              <Card>
                <CardHeader>
                  <CardTitle>Export Analysis</CardTitle>
                  <CardDescription>
                    Download structured JSON output for integration with patent management systems
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <Download className="h-4 w-4" />
                    <AlertDescription>
                      The JSON export includes: invention summary, all claims (original and rewritten),
                      novelty assessment, prior art matches with similarity scores, alternative embodiments,
                      recommendations, and metadata.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <h4 className="font-medium mb-2">JSON Structure</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Invention summary & problem statement</li>
                          <li>• {analysis.claims.length} patent claims with clarity scores</li>
                          <li>• {analysis.priorArtMatches.length} prior art matches</li>
                          <li>• {analysis.alternativeEmbodiments.length} alternative embodiments</li>
                          <li>• {analysis.recommendations.length} recommendations</li>
                          <li>• Novelty score & risk analysis</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <h4 className="font-medium mb-2">Use Cases</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Patent attorney review</li>
                          <li>• USPTO filing preparation</li>
                          <li>• IP management systems</li>
                          <li>• Community documentation</li>
                          <li>• Governance records</li>
                          <li>• Prior art defense</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Button onClick={exportJSON} size="lg" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download JSON Analysis
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

  )
}
