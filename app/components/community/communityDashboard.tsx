"use client";
import { useCommunityStore, useSubCommunityStore } from '@/lib/store/communityStore';
import React, { useState } from 'react'
import { Alert, AlertDescription } from '../ui/alert';
import { BookOpen, Calendar, Crown, Database, Download, Edit, Globe, Info, Languages, MapPin, MoreVertical, Plus, Settings, Shield, ShieldBanIcon, ShieldCheck, Trash2, Users } from 'lucide-react';
import { Badge } from '../ui/badge';
import { formatGovernanceText, formatProtocolText, getProtocolColor } from '@/lib/utils';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import CommunityCreationFlow from './communityCreationFlow';
import SubCommunityCreationFlow from './subCommunityCreationFlow';
import { CommunityGovernance } from '@/lib/constants/community';
import { SubCommunityData } from '@/lib/types/community';


interface CommunityDashboardProps {
    onNavigate?: (view: string) => void;
    onCreateSubCommunity?: () => void;
}
export default function communityDashboard({ onNavigate, onCreateSubCommunity }: CommunityDashboardProps) {
    const { currentCommunity, setCurrentCommunity, setCurrentSubCommunity  } = useCommunityStore();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditCommunity, setShowEditCommunity] = useState(false);
    const [showSubCommunityCreation, setShowSubCommunityCreation] = useState(false);
    const [showContributeDialog, setShowContributeDialog] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");


    if (!currentCommunity) {
        return (
            <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                    No community selected. Please select a community from the directory.
                </AlertDescription>
            </Alert>
        );
    }

    const handleDeleteCommunity = () => {
        console.log("Delete community:", currentCommunity.communityIdentifier);
    }
    const handleEditCommunity = () => {
        console.log("Edit community:", currentCommunity.communityIdentifier);
    }
    const handleExportMetadata = () => {
        console.log("Export metadata for community:", currentCommunity.communityIdentifier);
    }
    const handleExportCommunity = () => {
        console.log("Export full data for community:", currentCommunity.communityIdentifier);
    }

    const handleViewSubCommunity = (community: Partial<SubCommunityData>) => {
        setCurrentCommunity(currentCommunity)
        setCurrentSubCommunity(community);
        onNavigate?.('sub-community-dashboard');
      };

    const getGovernanceIcon = (model: CommunityGovernance) => {
        switch (model) {
            case CommunityGovernance.ELDER_COUNCIL:
                return <Crown className="w-4 h-4" />;
            case CommunityGovernance.INDIGENOUS_COUNCIL:
                return <Users className="w-4 h-4" />;
            case CommunityGovernance.STEWARDSHIP_CIRCLE:
                return <Shield className="w-4 h-4" />;
        }
    };



    return (

        <div className="space-y-6">
            {/* community header */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                        <h1 className="text-3xl">{currentCommunity.identity.title}</h1>
                        <Badge variant="secondary" className="flex items-center space-x-1">
                            {currentCommunity.identity.governanceModel !== undefined && getGovernanceIcon(currentCommunity.identity.governanceModel)}
                            <span>   {currentCommunity.identity.governanceModel !== undefined && formatGovernanceText(currentCommunity.identity.governanceModel)}</span>
                        </Badge>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        {currentCommunity.identity.description}
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{currentCommunity.identity.region}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Languages className="w-4 h-4" />
                            <span>{currentCommunity.identity.language}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                                Est. {currentCommunity.identity.establishedDate
                                    ? typeof currentCommunity.identity.establishedDate === "string"
                                        ? currentCommunity.identity.establishedDate
                                        : currentCommunity.identity.establishedDate.toLocaleDateString()
                                    : ''}
                            </span>
                        </div>
                    </div>
                </div>
                {/* action menu */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    {/* Primary actions */}
                    <div className='flex items-center space-x-2'>
                        <Button onClick={() => setShowContributeDialog(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Contribute
                        </Button>
                        <Button onClick={() => setShowContributeDialog(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Create Collection
                        </Button>

                        <Button variant="outline" onClick={()=> setShowSubCommunityCreation(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Create </span>Sub-Community
                        </Button>
                    </div>

                    {/* Secondary Actions Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center space-x-2">
                                <Settings className="w-4 h-4" />
                                <span className="hidden sm:inline">Manage</span>
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem onClick={() => setShowEditCommunity(true)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Community Information
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleExportCommunity}>
                                <Download className="w-4 h-4 mr-2" />
                                Export Full Community Data
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleExportMetadata}>
                                <Database className="w-4 h-4 mr-2" />
                                Export Metadata Only
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => setShowDeleteDialog(true)}
                                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Community
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </div>

            {/* stats */}
            <div
                className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'
            >
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-secondary" />
                            <div>
                                <p className="text-2xl">{currentCommunity.stats.subCommunityCount}</p>
                                <p className="text-sm text-muted-foreground">Sub-Communities</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                            <Database className="w-4 h-4 text-secondary" />
                            <div>
                                <p className="text-2xl">{currentCommunity.stats.collectionCount}</p>
                                <p className="text-sm text-muted-foreground">Collections</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <div>
                                <p className="text-2xl">{currentCommunity.stats.memberCount}</p>
                                <p className="text-sm text-muted-foreground">Members</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4 text-muted-foreground" />
                            <div>
                                <p className="text-2xl">{currentCommunity.stats.totalItems}</p>
                                <p className="text-sm text-muted-foreground">Knowledge Items</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                            <Globe className="w-4 h-4 text-green-600" />
                            <div>
                                <p className="text-2xl">{currentCommunity.stats.publicItems}</p>
                                <p className="text-sm text-muted-foreground">Public Items</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                            <ShieldBanIcon className="w-4 h-4 text-red-600" />
                            <div>
                                <p className="text-2xl">{currentCommunity.stats.restrictedItems}</p>
                                <p className="text-sm text-muted-foreground">Restricted Items</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>

            {/* Main content tabs */}
            <Tabs
                defaultValue="overview"
                value={activeTab} onValueChange={setActiveTab}
                className="w-full rounded-sm space-y-4"
            >
                <TabsList className='grid w-full grid-cols-6'>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="community">Sub Commmunities</TabsTrigger>
                    <TabsTrigger value="collections">Collections</TabsTrigger>
                    <TabsTrigger value="members">Members</TabsTrigger>
                    <TabsTrigger value="protocols">Protocols&Processes</TabsTrigger>
                    <TabsTrigger value="governance">Governance</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <Card>
                            <CardHeader>
                                <CardTitle>Community Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4>Primary Contact</h4>
                                    <div className="text-sm text-muted-foreground">
                                        <p>{currentCommunity.identity.leadership?.primaryContact.name}</p>
                                        <p>{currentCommunity.identity.leadership?.primaryContact.role}</p>
                                        {currentCommunity.identity.leadership?.primaryContact.culturalTitle && (
                                            <p className="font-cultural italic">{currentCommunity.identity.leadership.primaryContact.culturalTitle}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h4>Cultural Protocols</h4>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {currentCommunity.protocols.map((protocol, index) => (
                                            <Badge key={index} variant="outline" className={getProtocolColor(protocol)}>
                                                {formatProtocolText(protocol)}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>Latest community activities and contributions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3 text-sm">
                                        <Plus className="w-4 h-4 text-green-600" />
                                        <span>New Protocol item added: "Traditional Healing Practices"</span>
                                        <span className="text-muted-foreground">1 day ago</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-sm">
                                        <Users className="w-4 h-4 text-blue-600" />
                                        <span>New member joined: Sam Kenpachi</span>
                                        <span className="text-muted-foreground">1 day1 ago</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-sm">
                                        <Shield className="w-4 h-4 text-yellow-600" />
                                        <span>Protocol updated: Elder approval required</span>
                                        <span className="text-muted-foreground">1 ady ago</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>

                    {/* Community management quick actions */}
                    <Card className="border-orange-200 bg-orange-50/50">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Settings className="w-5 h-5" />
                                <span>Community Management</span>
                            </CardTitle>
                            <CardDescription>
                                Quick access to administrative functions and community structure management
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowEditCommunity(true)}
                                    className="flex flex-col items-center space-y-2 h-auto py-4"
                                >
                                    <Edit className="w-5 h-5" />
                                    <div className="text-center">
                                        <p className="font-medium">Edit Community</p>
                                        <p className="text-xs text-muted-foreground">Update information & settings</p>
                                    </div>
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() => setShowSubCommunityCreation(true)}
                                    className="flex flex-col items-center space-y-2 h-auto py-4"
                                >
                                    <Plus className="w-5 h-5" />
                                    <div className="text-center">
                                        <p className="font-medium">Create Sub-Community</p>
                                        <p className="text-xs text-muted-foreground">Establish specialized groups</p>
                                    </div>
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={handleExportMetadata}
                                    className="flex flex-col items-center space-y-2 h-auto py-4"
                                >
                                    <Database className="w-5 h-5" />
                                    <div className="text-center">
                                        <p className="font-medium">Export Metadata</p>
                                        <p className="text-xs text-muted-foreground">Download structure info</p>
                                    </div>
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={handleExportCommunity}
                                    className="flex flex-col items-center space-y-2 h-auto py-4"
                                >
                                    <Download className="w-5 h-5" />
                                    <div className="text-center">
                                        <p className="font-medium">Export Full Data</p>
                                        <p className="text-xs text-muted-foreground">Complete backup</p>
                                    </div>
                                </Button>
                            </div>

                            {/* Danger Zone */}
                            <div className="mt-6 pt-4 border-t border-red-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-red-800">Danger Zone</h4>
                                        <p className="text-sm text-red-600">Irreversible actions that affect the entire community</p>
                                    </div>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => setShowDeleteDialog(true)}
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete Community
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value='community' className='space-y-6'>


                    <div className='space-y-4'>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* {currentCommunity.subCommunities?.map((subCommunity) => ( */}
                            {(currentCommunity?.subCommunities?.length ?? 0) > 0 ? (

                                currentCommunity.subCommunities?.map((subCommunity)=> (
                                                              <Card key={subCommunity.communityIdentifier} className="hover:shadow-lg transition-shadow border-secondary/20">
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center space-x-2">
                                            <Users className="w-5 h-5 text-secondary" />
                                            <span>{subCommunity.title}</span>
                                        </CardTitle>
                                        <CardDescription>{subCommunity.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                <Crown className="w-4 h-4" />
                                                <span>Authority: {subCommunity.indigenousAuthority?.name || currentCommunity.identity.leadership?.primaryContact.name}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                <MapPin className="w-4 h-4" />
                                                <span>{subCommunity.geographicRegion}</span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4 text-center text-sm">
                                                <div>
                                                    {/* <p className="text-lg">{subCommunity.stats.memberCount}</p> */}
                                                    <p className="text-lg">100</p>
                                                    <p className="text-muted-foreground text-xs">Members</p>
                                                </div>
                                                <div>
                                                    {/* <p className="text-lg">{subCommunity.stats.collectionCount}</p> */}
                                                    <p className="text-lg">10</p>
                                                    <p className="text-muted-foreground text-xs">Collections</p>
                                                </div>
                                                <div>
                                                    {/* <p className="text-lg">{subCommunity.stats.totalItems}</p> */}
                                                    <p className="text-lg">200</p>
                                                    <p className="text-muted-foreground text-xs">Items</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm">
                                                <Shield className="w-4 h-4" />
                                                {subCommunity.protocols && subCommunity.protocols.length > 0 && (
                                                    <Badge variant="outline" className={getProtocolColor(subCommunity.protocols[0])}>
                                                        {formatProtocolText(subCommunity.protocols[0])}
                                                    </Badge>
                                                )}
                                            </div>
                                            <Button className="w-full" variant="outline" onClick={() => handleViewSubCommunity(subCommunity)}>
                                                View Community
                                            </Button>
                                        </div>
                                        {/* <Button
                      className="w-full mt-4"
                      variant="outline"
                      onClick={() => onSubCommunitySelect?.(subCommunity.id)}
                    >
                      Enter Sub-Community
                    </Button> */}
                                    </CardContent>
                                </Card>

                                ))

                            ):(

                              <Card className="col-span-full">
                                    <CardContent className="p-8 text-center">
                                        <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                        <h3 className="text-lg mb-2">No Sub-Community Yet</h3>
                                        <p className="text-muted-foreground mb-4">
                                            Start organizing knowledge by creating your first sub community.
                                        </p>
                                        <Button onClick={() => setShowSubCommunityCreation(true)}>
                                            <Plus className="w-4 h-4 mr-2" />
                                            Create First Sub-Community
                                        </Button>
                                    </CardContent>
                                </Card>

                            )}
                        </div>

                    </div>


                </TabsContent>


            </Tabs>

            {/* Sub-Community Creation Dialog */}
            <Dialog open={showSubCommunityCreation} onOpenChange={setShowSubCommunityCreation}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Create Sub-Community</DialogTitle>
                        <DialogDescription>
                            Create a new sub-community under {currentCommunity.identity.title}
                        </DialogDescription>
                    </DialogHeader>
                    <SubCommunityCreationFlow
                        parentCommunity={currentCommunity}
                        onComplete={() => setShowSubCommunityCreation(false)
                        }
                    />
                </DialogContent>
            </Dialog>


        </div>
    )
}
