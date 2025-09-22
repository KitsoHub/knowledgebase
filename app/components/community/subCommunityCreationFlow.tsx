import { CommunityGovernanceSteps, CulturalProtocol, steps, TKLabel } from '@/lib/constants/community';
import { Community } from '@/lib/types/community';
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '../ui/card';

interface SubCommunityData {
    title: string;
    description: string;
    indigenousAuthorityId: string;
    custodianIds: string[];
    localContextLabels: TKLabel[];
    geographicRegion: string;
    communityIdentifier: string;
    protocols: CulturalProtocol[];
}

interface SubCommunityCreationFlowProps {
    onComplete?: () => void;
    onCancel?: () => void;
    parentCommunity?: Community;
}

export default function SubCommunityCreationFlow({ onComplete, onCancel, parentCommunity }: SubCommunityCreationFlowProps) {

    // get current community
    const [step, setStep] = useState<CommunityGovernanceSteps>(CommunityGovernanceSteps.BASIC)
    const [subCommunityData, setSubCommunityData] = useState<Partial<SubCommunityData>>({
        custodianIds: [],
        localContextLabels: [],
        protocols: []
    })

    const generateCommunityIdentifier = () => {
        return uuidv4();
    };


    const updateData = (updates: Partial<SubCommunityData>) => {
        setSubCommunityData(prev => ({ ...prev, ...updates }));
    };

    const renderStepContent = () => {
        switch (step) {
            case CommunityGovernanceSteps.BASIC:
                return (
                    <div className='space-y-6'>
                        <div className='text-center mb-6'>
                            <h3 className='text-xl mb-2'>Core Information</h3>
                            <p className='text-muted-foreground'>Define the core detailts of your sub-community</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="title">Sub-Community Title *</Label>
                                <Input
                                    id="title"
                                    value={subCommunityData.title || ''}
                                    onChange={(e) => {
                                        const title = e.target.value;
                                        updateData({
                                            title,
                                            communityIdentifier: generateCommunityIdentifier()
                                        });
                                    }}
                                    placeholder="Enter sub-community name"
                                    className="font-cultural"
                                />
                            </div>


                            <div>
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    value={subCommunityData.description || ''}
                                    onChange={(e) => updateData({ description: e.target.value })}
                                    placeholder="Describe the sub-community's cultural focus and purpose"
                                    rows={4}
                                    className="font-cultural"
                                />
                            </div>

                            <div>
                                <Label htmlFor="region">Geographic Region *</Label>
                                <Input
                                    id="region"
                                    value={subCommunityData.geographicRegion || ''}
                                    onChange={(e) => updateData({ geographicRegion: e.target.value })}
                                    placeholder="e.g., Great Lakes - Ojibwe Territory"
                                    className="font-cultural"
                                />
                            </div>

                            <div>
                                <Label htmlFor="identifier">Community Identifier</Label>
                                <Input
                                    id="identifier"
                                    value={subCommunityData.communityIdentifier || ''}
                                    onChange={(e) => updateData({ communityIdentifier: e.target.value })}
                                    placeholder="Unique identifier (auto-generated)"
                                    className="font-mono text-sm"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    This unique identifier will be used for referencing this sub-community
                                </p>
                            </div>



                        </div>

                    </div>
                );



            default:
                break;
        }
    }


    const nextStep = () => {
        const currentIndex = steps.indexOf(step);
        if (currentIndex < steps.length - 1) {
            setStep(steps[currentIndex + 1]);
        }
    };

    const prevStep = () => {
        const currentIndex = steps.indexOf(step);
        if (currentIndex > 0) {
            setStep(steps[currentIndex - 1]);
        }
    };

    const handleSubmit = () => {
        console.log('Creating sub-community:', subCommunityData);
        alert('Sub-community created successfully!');
        onComplete?.();
    };


    return (
        <div className='max-w-4xl mx-auto'>
            <div className='flex items-center space-x-4 mb-6'>
                <Button variant="ghost" onClick={onCancel}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Community
                </Button>
            </div>
            <div>
                <h2 className="text-2xl">Create Sub-Community</h2>
                <p className="text-muted-foreground">
                    Establish a cultural sub-group within {parentCommunity?.identity.title}
                </p>
            </div>

                            {/* Progress Steps */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between text-sm">
                                    {['Basic', 'Authority', 'Protocols', 'Review'].map((stepName, index) => {
                                        const stepKeys = [...steps];
                                        const currentIndex = stepKeys.indexOf(step);
                                        const isActive = index === currentIndex;
                                        const isCompleted = index < currentIndex;

                                        return (
                                            <div key={stepName} className="flex items-center">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${isCompleted ? 'bg-primary text-primary-foreground' :
                                                        isActive ? 'bg-primary text-primary-foreground' :
                                                            'bg-muted text-muted-foreground'
                                                    }`}>
                                                    {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                                                </div>
                                                <span className={`ml-2 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                                                    {stepName}
                                                </span>
                                                {index < 3 && <div className="w-12 h-px bg-border mx-4" />}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <Card>
                                <CardContent className='p-6'>
                                    {renderStepContent()}
                                </CardContent>
                            </Card>


            <div className="flex justify-between mt-6">
                <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 'BASIC'}
                >
                    Previous
                </Button>

                {step === 'REVIEW' ? (
                    <Button onClick={handleSubmit} className="bg-primary">
                        Create Sub-Community
                    </Button>
                ) : (
                    <Button onClick={nextStep}>
                        Next
                    </Button>
                )}
            </div>
        </div>
    )
}
