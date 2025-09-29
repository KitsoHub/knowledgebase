import { KnowledgeItem } from '@/lib/types/community';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { ArrowLeft, BookOpen, Calendar, Crown, Download, ExternalLink, Eye, FileAudio, FileDown, FileText, FileVideo, ImageIcon, Pause, Play, Share2, Shield, Users, Volume2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { accessLevelColors, accessLevelDescriptions, CulturalProtocol } from '@/lib/constants/community';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { useCommunityStore } from '@/lib/store/communityStore';

interface KnowledgeItemViewerProps {
    item: Partial<KnowledgeItem>;
    onBack: () => void;
    onExport: () => void;
}

export default function KnowledgeItemViewer({ item, onBack, onExport }: KnowledgeItemViewerProps) {
    const [currentTab, setCurrentTab] = useState("content");
    const [isPlaying, setIsPlaying] = useState(false);
    const { currentCollection } = useCommunityStore();

    const getContentTypeIcon = () => {
        switch (item.type) {
            case 'audio': return FileAudio;
            case 'video': return FileVideo;
            case 'text': return FileText;
            case 'image': return ImageIcon;
            default: return FileText;
        }
    };


    const ContentIcon = getContentTypeIcon();

    const renderContentPreview = () => {
        switch (item.type) {
            case 'audio':
                return (
                    <Card className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-center space-x-4">
                                <Button
                                    size="lg"
                                    variant={isPlaying ? "secondary" : "default"}
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="rounded-full w-16 h-16"
                                >
                                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                                </Button>
                            </div>

                            <div className="text-center space-y-2">
                                <h3 className="font-medium">Audio Recording</h3>
                                <p className="text-sm text-muted-foreground">
                                    Duration: {item.content?.duration} • Size: {item.content?.fileSize}
                                </p>

                                {/* Mock audio waveform */}
                                <div className="flex items-center justify-center space-x-1 py-4">
                                    {Array.from({ length: 40 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-1 bg-primary/60 rounded-full ${i < 15 ? 'bg-primary' : 'bg-primary/30'
                                                }`}
                                            style={{ height: `${Math.random() * 40 + 10}px` }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {item.content?.metadata && (
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Recorded:</span>
                                        <span>{item.content.metadata.recordingDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Location:</span>
                                        <span>{item.content.metadata.recordingLocation}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Language:</span>
                                        <span>{item.culturalMetadata?.culturalContext?.language}</span>
                                    </div>
                                    {item.content.metadata.instruments && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Instruments:</span>
                                            <span>{item.content.metadata.instruments.join(", ")}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </Card>
                );

            case 'image':
                return (
                    <Card className="p-0 overflow-hidden">
                        <div className="relative">
                            <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                                <div className="text-center text-muted-foreground space-y-2">
                                    <ImageIcon className="w-16 h-16 mx-auto" />
                                    <p>Traditional Knowledge Image</p>
                                    <p className="text-sm">{item.content?.dimensions}</p>
                                </div>
                            </div>
                        </div>

                        {item.content?.metadata && (
                            <div className="p-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Photographed:</span>
                                    <span>{item.content.metadata.photographDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Season:</span>
                                    <span>{item.content.metadata.season}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Time:</span>
                                    <span>{item.content.metadata.timeOfDay}</span>
                                </div>
                                {item.content.metadata.culturalNote && (
                                    <div className="bg-amber-50 p-2 rounded text-xs">
                                        <div className="flex items-start space-x-1">
                                            <Shield className="w-3 h-3 text-amber-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-amber-800">{item.content.metadata.culturalNote}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </Card>
                );

                break;
            case 'text':
                return (
                    <Card className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-center">
                                <div className="text-center space-y-2">
                                    <FileText className="w-16 h-16 mx-auto text-muted-foreground" />
                                    <h3 className="font-medium">Written Document</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {item.content?.fileSize} • PDF Document
                                    </p>
                                </div>
                            </div>

                            {item.content?.metadata && (
                                <div className="space-y-2 text-sm border-t pt-4">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Pages:</span>
                                        <span>{item.content.metadata.pages}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Word Count:</span>
                                        <span>{item.content.metadata.wordCount?.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Languages:</span>
                                        <span>{item.content.metadata.languages?.join(", ")}</span>
                                    </div>
                                    {item.content.metadata.topics && (
                                        <div className="space-y-1">
                                            <span className="text-muted-foreground">Topics:</span>
                                            <div className="flex flex-wrap gap-1">
                                                {item.content.metadata.topics.map((topic: string) => (
                                                    <Badge key={topic} variant="outline" className="text-xs">
                                                        {topic}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {item.rightsMetadata?.licensing?.approvalWorkflow && (
                                        <div className="bg-green-50 p-2 rounded text-xs">
                                            <div className="flex items-center space-x-1">
                                                <Crown className="w-3 h-3 text-green-600" />
                                                <span className="text-green-800">{item.rightsMetadata?.licensing?.approvalWorkflow?.approvalStatus}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <Button className="w-full" variant="outline">
                                <Eye className="w-4 h-4 mr-2" />
                                View Document
                            </Button>
                        </div>
                    </Card>
                );
            case 'video':
                return (
                    <Card className="p-0 overflow-hidden">
                        <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
                            <div className="text-center text-white space-y-4">
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="rounded-full w-20 h-20 bg-white/20 hover:bg-white/30"
                                >
                                    <Play className="w-8 h-8" />
                                </Button>
                                <div className="space-y-1">
                                    <p>Video Content</p>
                                    <p className="text-sm opacity-75">
                                        {item.content?.duration} • {item.content?.dimensions}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {item.content?.metadata && (
                            <div className="p-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Filmed:</span>
                                    <span>{item.content.metadata.filmingDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Location:</span>
                                    <span>{item.content.metadata.location}</span>
                                </div>
                                {item.content.metadata.techniques && (
                                    <div className="space-y-1">
                                        <span className="text-muted-foreground">Techniques Shown:</span>
                                        <div className="flex flex-wrap gap-1">
                                            {item.content.metadata.techniques.map((technique: string) => (
                                                <Badge key={technique} variant="outline" className="text-xs">
                                                    {technique}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </Card>
                );
            default:
                break;
        }
    }


    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Knowledge Base</span>
                </Button>

                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                    </Button>
                    <Button variant="outline" size="sm" onClick={onExport}>
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Item Header */}
            <Card>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <ContentIcon className="w-6 h-6 text-primary" />
                                <Badge variant="outline">{item.type}</Badge>
                            </div>
                            <CardTitle className="text-2xl">{item.title}</CardTitle>
                            <CardDescription className="text-base">
                                {item.description}
                            </CardDescription>
                        </div>

                        <Badge className={`${accessLevelColors[item.rightsMetadata?.accessLevel.toString() as CulturalProtocol]}`}>
                            {item.rightsMetadata?.accessLevel.replace(/_/g, ' ')}
                        </Badge>
                    </div>

                    {/* Metadata */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                <span>{item.title}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <BookOpen className="w-4 h-4 text-muted-foreground" />
                                <span>{item.colletionId}</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                                <Crown className="w-4 h-4 text-muted-foreground" />
                                <span>{item.createdBy?.name}</span>
                                {item.createdBy?.culturalTitle && (
                                    <Badge variant="secondary" className="text-xs">
                                        {item.createdBy.culturalTitle}
                                    </Badge>
                                )}
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span>{item.createdAt?.toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <Volume2 className="w-4 h-4 text-muted-foreground" />
                                <span>{item.culturalMetadata?.culturalContext?.language || 'English'} </span>
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Tabs */}
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
                <TabsList className='grid w-full grid-cols-4'>
                    <TabsTrigger value='content'>Content</TabsTrigger>
                    <TabsTrigger value='context'>Cultural Context</TabsTrigger>
                    <TabsTrigger value='metadata'>Details</TabsTrigger>
                    <TabsTrigger value='related'>Related</TabsTrigger>
                </TabsList>


                {/* content */}
                <TabsContent value="content" className="space-y-4">
                    {renderContentPreview()}

                    {/* Access Level Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Shield className="w-5 h-5" />
                                <span>Access Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                {accessLevelDescriptions[item.rightsMetadata?.accessLevel.toString() as CulturalProtocol]}
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="context" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Cultural Context</CardTitle>
                            <CardDescription>
                                Understanding the cultural significance and proper protocols for this knowledge
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium">Geographic & Cultural</h4>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Region:</span>
                                            <span>{item.culturalMetadata?.culturalContext?.region}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Language:</span>
                                            <span>{item.culturalMetadata?.culturalContext?.language}</span>
                                        </div>
                                        {item.content?.metadata?.season && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Season:</span>
                                                <span>{item.culturalMetadata?.culturalContext?.season}</span>
                                            </div>
                                        )}
                                        {item.culturalMetadata?.culturalContext?.ceremony && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Ceremony:</span>
                                                <span>{item.culturalMetadata?.culturalContext?.ceremony}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-medium">Traditional Knowledge Labels</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {item.culturalMetadata?.tkLabels?.map((label) => (
                                            <Badge key={label} className="tk-label tk-cultural">
                                                {label.replace(/_/g, ' ')}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <h4 className="font-medium">Subjects & Keywords</h4>
                                <div className="flex flex-wrap gap-2">
                                    {/* To add subjects to item */}
                                    {currentCollection?.subjects?.map((subject) => (
                                        <Badge key={subject} variant="outline">
                                            {subject}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="metadata" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Technical Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium">File Information</h4>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Content Type:</span>
                                            <span className="capitalize">{item.type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">File Size:</span>
                                            <span>{item.content?.fileSize}</span>
                                        </div>
                                        {item.content?.duration && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Duration:</span>
                                                <span>{item.content.duration}</span>
                                            </div>
                                        )}
                                        {item.content?.dimensions && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Dimensions:</span>
                                                <span>{item.content.dimensions}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-medium">Contribution Details</h4>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Contributor:</span>
                                            <span>{item.createdBy?.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Role:</span>
                                            <span>{item.createdBy?.role}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Created:</span>
                                            <span>{item.createdAt?.toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {item.content?.metadata && (
                                <>
                                    <Separator />
                                    <div className="space-y-2">
                                        <h4 className="font-medium">Additional Metadata</h4>
                                        <pre className="text-xs bg-muted p-3 rounded overflow-auto">
                                            {JSON.stringify(item.content.metadata, null, 2)}
                                        </pre>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="related" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Related Knowledge Items</CardTitle>
                            <CardDescription>
                                Other items in the knowledge base that relate to this content
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {item.relatedItems && item.relatedItems.length > 0 ? (
                                <div className="space-y-3">
                                    {item.relatedItems.map((relatedId) => (
                                        <div key={relatedId} className="flex items-center justify-between p-3 border rounded">
                                            <div className="flex items-center space-x-3">
                                                <FileText className="w-4 h-4 text-muted-foreground" />
                                                <div>
                                                    <p className="font-medium">Related Item {relatedId}</p>
                                                    <p className="text-sm text-muted-foreground">Traditional knowledge content</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                <ExternalLink className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center py-6">
                                    No related items found
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>



            {/* Download Options */}

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <FileDown className="w-5 h-5" />
                        <span>Download Options</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" onClick={onExport}>
                            <Download className="w-4 h-4 mr-2" />
                            Metadata (JSON)
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Citation Format
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Cultural Protocol Guide
                        </Button>
                    </div>
                </CardContent>
            </Card>      </div>
    )
}
