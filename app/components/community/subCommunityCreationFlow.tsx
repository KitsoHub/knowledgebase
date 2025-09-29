import { CommunityGovernanceSteps, CulturalProtocol, steps, TKLabel } from '@/lib/constants/community';
import { Community } from '@/lib/types/community';
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../ui/button';
import { ArrowLeft, CheckCircle, Crown, MapPin, Users, X } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useAppStore } from '@/lib/store/appStore';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { useCommunityStore, useSubCommunityStore } from '@/lib/store/communityStore';


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
      title:'',
      description:'',
      indigenousAuthorityId:'',
        custodianIds: [],
        localContextLabels: [],
        geographicRegion:'',
        communityIdentifier:'',
        protocols: []
    })
    const {user} = useAppStore();
    const {addSubCommunity,currentCommunity}= useCommunityStore();
    const generateCommunityIdentifier = () => {
        return uuidv4();
    };


    const updateData = (updates: Partial<SubCommunityData>) => {
        setSubCommunityData(prev => ({ ...prev, ...updates }));
    };
  const tkLabelOptions = [
    { label: TKLabel.SECRET_SACRED, title: "Secret/Sacred", description: "Requires highest protection" },
    { label: TKLabel.CULTURAL_INFLUENCE, title: "Cultural Influence", description: "May influence cultural understanding" },
    { label: TKLabel.WOMEN_S_ONLY, title: "Women's Knowledge", description: "Specific to women's traditions" },
    { label: TKLabel.MEN_S_ONLY, title: "Men's Knowledge", description: "Specific to men's traditions" }
  ];

  const protocolOptions = [
    { value: CulturalProtocol.PUBLIC, title: "Public", description: "Openly accessible to all" },
    { value: CulturalProtocol.COMMUNITY_ONLY, title: "Community Only", description: "Restricted to community members" },
    { value: CulturalProtocol.ELDER_APPROVAL_REQUIRED, title: "Elder Approval Required", description: "Requires elder council approval" },
    { value: CulturalProtocol.GENDER_RESTRICTED, title: "Gender Restricted", description: "Limited by traditional gender protocols" }
  ];

    const toggleProtocol = (protocol: CulturalProtocol) => {
    const current = subCommunityData.protocols || [];
    const updated = current.includes(protocol)
      ? current.filter(p => p !== protocol)
      : [...current, protocol];
    updateData({ protocols: updated });
  };


  const toggleTKLabel = (label: TKLabel) => {
    const current = subCommunityData.localContextLabels || [];
    const updated = current.includes(label)
      ? current.filter(l => l !== label)
      : [...current, label];
    updateData({ localContextLabels: updated });
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
                                            communityIdentifier: generateCommunityIdentifier().toString()
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
            case CommunityGovernanceSteps.AUTHORITY:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-6">
                            <h3 className="text-xl mb-2">Indigenous Authority & Custodians</h3>
                            <p className="text-muted-foreground">Assign cultural leadership and custodial responsibilities</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="authority">Indigenous Authority *</Label>
                                <Select
                                    value={subCommunityData.indigenousAuthorityId}
                                    onValueChange={(value) => updateData({ indigenousAuthorityId: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select indigenous authority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {parentCommunity?.members?.map((member) => (
                                            <SelectItem key={member.id} value={member.id}>
                                                <div>
                                                    <div className="font-medium">{member.name}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {member.culturalTitle || member.role}
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        ))}
                                        {user && (
                                            <SelectItem value={user.id}>
                                                <div>
                                                    <div className="font-medium">{user.name} (You)</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {user.culturalTitle || user.role}
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground mt-1">
                                    The person responsible for cultural protocols and community governance
                                </p>
                            </div>

                            <div>
                                <Label>Additional Custodians (Optional)</Label>
                                <Select
                                    value=""
                                    onValueChange={(value) => {
                                        if (!subCommunityData.custodianIds?.includes(value) && value !== subCommunityData.indigenousAuthorityId) {
                                            updateData({
                                                custodianIds: [...(subCommunityData.custodianIds || []), value]
                                            });
                                        }
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Add custodians" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {parentCommunity?.members?.filter(m =>
                                            m.id !== subCommunityData.indigenousAuthorityId &&
                                            !subCommunityData.custodianIds?.includes(m.id)
                                        ).map((member) => (
                                            <SelectItem key={member.id} value={member.id}>
                                                <div>
                                                    <div className="font-medium">{member.name}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {member.culturalTitle || member.role}
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {subCommunityData.custodianIds?.map((custodianId) => {
                                        const custodian = parentCommunity?.members?.find(m => m.id === custodianId);
                                        return custodian ? (
                                            <Badge key={custodianId} variant="secondary" className="flex items-center space-x-1">
                                                <span>{custodian.name}</span>
                                                <button onClick={() => updateData({
                                                    custodianIds: subCommunityData.custodianIds?.filter(id => id !== custodianId)
                                                })}>
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </Badge>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                );
      case CommunityGovernanceSteps.PROTOCOLS:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Cultural Protocols</h3>
              <p className="text-muted-foreground">Set Traditional Knowledge labels and access protocols</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-base mb-3 block">Local Context Labels</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tkLabelOptions.map(({ label, title, description }) => (
                    <Card
                      key={label}
                      className={`cursor-pointer transition-all ${
                        (subCommunityData.localContextLabels || []).includes(label) ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => toggleTKLabel(label)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={(subCommunityData.localContextLabels || []).includes(label)}
                            onChange={() => {}}
                          />
                          <div className="flex-1">
                            <h6 className="font-medium">{title}</h6>
                            <p className="text-sm text-muted-foreground">{description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base mb-3 block">Access Protocols</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {protocolOptions.map(({ value, title, description }) => (
                    <Card
                      key={value}
                      className={`cursor-pointer transition-all ${
                        (subCommunityData.protocols || []).includes(value) ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => toggleProtocol(value)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={(subCommunityData.protocols || []).includes(value)}
                            onChange={() => {}}
                          />
                          <div className="flex-1">
                            <h6 className="font-medium">{title}</h6>
                            <p className="text-sm text-muted-foreground">{description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'REVIEW':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Review Sub-Community</h3>
              <p className="text-muted-foreground">Verify all details before creating</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-secondary" />
                  <span>{subCommunityData.title}</span>
                </CardTitle>
                <CardDescription>{subCommunityData.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Geographic Region</Label>
                    <p className="text-sm flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{subCommunityData.geographicRegion}</span>
                    </p>
                  </div>
                  <div>
                    <Label>Community Identifier</Label>
                    <p className="text-sm font-mono">{subCommunityData.communityIdentifier}</p>
                  </div>
                </div>

                <div>
                  <Label>Indigenous Authority</Label>
                  <p className="text-sm flex items-center space-x-1">
                    <Crown className="w-4 h-4 text-secondary" />
                    <span>
                      {parentCommunity?.members?.find(m => m.id === subCommunityData.indigenousAuthorityId)?.name || user?.name}
                    </span>
                  </p>
                </div>

                {subCommunityData.custodianIds && subCommunityData.custodianIds.length > 0 && (
                  <div>
                    <Label>Custodians</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {subCommunityData.custodianIds.map(custodianId => {
                        const custodian = parentCommunity?.members?.find(m => m.id === custodianId);
                        return custodian ? (
                          <Badge key={custodianId} variant="secondary">{custodian.name}</Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                <div>
                  <Label>Local Context Labels</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {subCommunityData.localContextLabels?.map(label => (
                      <Badge key={label} variant="outline" className="tk-cultural">
                        {label.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Access Protocols</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {subCommunityData.protocols?.map(protocol => (
                      <Badge key={protocol} variant="outline">
                        {protocol.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
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
        // console.log('Creating sub-community:', subCommunityData.communityIdentifier);
        // alert(`Sub-community created successfully!${subCommunityData.title}${subCommunityData.localContextLabels}`);
        addSubCommunity(subCommunityData, parentCommunity?.communityIdentifier?.toString() || '')
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

                                <p className="text-muted-foreground">
                    ID: {currentCommunity?.identity.title}
                </p>
                                            <p className="text-muted-foreground">
                    ParentID: {parentCommunity?.communityIdentifier.toString()}
                </p>
                                            <p className="text-muted-foreground">
                    CurrentID: {currentCommunity?.communityIdentifier.toString()}
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
