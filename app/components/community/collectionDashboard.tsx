import { accessLevelColors, CommunityGovernance, contentTypeIcons, CulturalProtocol } from '@/lib/constants/community';
import { useCommunityStore } from '@/lib/store/communityStore';
import { Collection, ContentType, KnowledgeItem } from '@/lib/types/community';
import { ArrowLeft, BookOpen, Calendar, Crown, Database, Download, Edit, ExternalLink, FolderOpen, Globe, Languages, MapPin, MoreVertical, Plus, Settings, Shield, ShieldBanIcon, ShieldCloseIcon, ShieldPlusIcon, Trash2, UserPlus, Users } from 'lucide-react';
import React, { useState } from 'react'
import { Badge } from '../ui/badge';
import { formatGovernanceText, formatProtocolText, getProtocolColor } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ItemContributionWizard from './itemContributionWizard';
import { Checkbox } from '../ui/checkbox';
import KnowledgeItemViewer from './itemViewer';


interface CollectionDashboardProps {
    onNavigate?: (view: string) => void;
    onBack: () => void;
}

export default function CollectionDashboard({ onNavigate, onBack }: CollectionDashboardProps) {
    const [activeTab, setActiveTab] = useState('overview');
    const { currentCollection, currentCommunity, currentKnowledgeItemMetadata, currentSubCommunity } = useCommunityStore();
    const [showContributeDialog, setShowContributeDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditCollection, setShowEditCollection] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectMode, setSelectMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Partial<KnowledgeItem> | null>(null);

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


    const handleDeleteCollection = () => {
        console.log("Delete collection:", currentCollection?.collectionMetadataIdentifier);
    }
    const handleEditCollection = () => {
        console.log("Edit collection:", currentCollection?.collectionMetadataIdentifier);
    }
    const handleExportMetadata = () => {
        console.log("Export metadata for collection:", currentCollection?.collectionMetadataIdentifier);
    }
    const handleExportCollection = () => {
        console.log("Export full data for community:", currentCollection?.collectionMetadataIdentifier);
    }

    const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };
  const handleExportItem = (item: Partial<KnowledgeItem>) => {
        console.log("Export metadata for collection:", item?.knowledgeItemIdentier);
  }

    if (selectedItem) {
    return (
      <KnowledgeItemViewer
        item={selectedItem}
        onBack={() => setSelectedItem(null)}
        onExport={() => handleExportItem(selectedItem)}
      />
    );
  }

    return (
        <div className='space-y-6'>

            {/* header */}

            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" onClick={onBack}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to {currentCommunity?.identity.title}
                    </Button>

                </div>
                <div>
                    <div className="flex items-center space-x-2 mb-2">
                        <Users className="w-6 h-6 text-secondary" />
                        <h1 className="text-3xl font-cultural">{currentCollection?.title}</h1>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{currentCommunity?.identity.region}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Languages className="w-4 h-4" />
                            <span>{currentCommunity?.identity.language}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                                Est. {currentCommunity?.identity.establishedDate
                                    ? typeof currentCommunity.identity.establishedDate === "string"
                                        ? currentCommunity.identity.establishedDate
                                        : currentCommunity.identity.establishedDate.toLocaleDateString()
                                    : ''}
                            </span>
                        </div>
                    </div>

                </div>


            </div>

            {/* action menu */}
            <div className="flex items-center space-x-2">
                {/* Primary actions */}
                {/* <div className='flex items-center space-x-2'>
                        <Button onClick={() => setShowContributeDialog(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Contribute
                        </Button>
                    </div> */}

                <Dialog open={showContributeDialog} onOpenChange={setShowContributeDialog}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Contribute
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
                        <DialogHeader>
                            <DialogTitle>Contribute to {currentCollection?.title}</DialogTitle>
                            <DialogDescription>
                                Share knowledge in collection.
                            </DialogDescription>
                        </DialogHeader>
                        <ItemContributionWizard onComplete={() => setShowContributeDialog(false)} collectionMetadataId={currentCollection?.collectionMetadataIdentifier} />
                    </DialogContent>
                </Dialog>

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
                        <DropdownMenuItem onClick={() => setShowEditCollection(true)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Collection Information
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleExportCollection}>
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
                            Delete Collection
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* stats */}
            <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
                <Card>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <div>
                                {/* <p className="text-2xl">{currentSubCommunity?.stats.memberCount}</p> */}
                                <p className="text-2xl">100</p>
                                <p className="text-sm text-muted-foreground">Contributors</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4 text-muted-foreground" />
                            <div>
                                {/* <p className="text-2xl">{subCommunity.stats.totalItems}</p> */}
                                <p className="text-2xl">200</p>
                                <p className="text-sm text-muted-foreground">Knowledge Items</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                            <Database className="w-4 h-4 text-secondary" />
                            <div>
                                {/* <p className="text-2xl">{subCommunity.stats.collectionCount}</p> */}
                                <p className="text-2xl">2</p>
                                <p className="text-sm text-muted-foreground">Protocols</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                            <Globe className="w-4 h-4 text-green-600" />
                            <div>
                                {/* <p className="text-2xl">{subCommunity.stats.publicItems}</p> */}
                                <p className="text-2xl">170</p>
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
                                {/* <p className="text-2xl">{subCommunity.stats.restrictedItems}</p> */}
                                <p className="text-2xl">13</p>
                                <p className="text-sm text-muted-foreground">Restricted Items</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>
            {/* Cultural Context Alert */}
            <Alert className="border-secondary">
                <Crown className="h-4 w-4 text-secondary" />
                <AlertDescription>
                    {/* TODO: update to use the proper subcommunity */}
                    This sub-community operates under the authority of {currentCollection?.curator?.name || currentCommunity?.identity.leadership?.primaryContact.name}
                    {' '}{currentCollection?.collectionMetadataIdentifier} and follows traditional protocols for
                    {' '}{currentCollection?.description}.
                </AlertDescription>
            </Alert>


            {/* Management Section */}

            {/* main content tabs */}

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="knowledgeitems">Items</TabsTrigger>
                </TabsList>
                <TabsContent value='overview' className='space-y-4'>
                    {/* info */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <Card>
                            <CardHeader>
                                <CardTitle>Collection Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4>Primary Contact</h4>
                                    <div className="text-sm text-muted-foreground">
                                        <p>{currentCommunity?.identity.leadership?.primaryContact.name}</p>
                                        <p>{currentCommunity?.identity.leadership?.primaryContact.role}</p>
                                        {currentCommunity?.identity.leadership?.primaryContact.culturalTitle && (
                                            <p className="font-cultural italic">{currentCommunity.identity.leadership.primaryContact.culturalTitle}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h4>Cultural Protocols</h4>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {currentCollection?.rightsProtocols?.map((protocol, index) => (
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

                    {/* actions */}
                    <Card className="border-orange-200 bg-orange-50/50">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Settings className="w-5 h-5" />
                                <span>Collection Management</span>
                            </CardTitle>
                            <CardDescription>
                                Quick access to administrative functions and collection management
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowEditCollection(true)}
                                    className="flex flex-col items-center space-y-2 h-auto py-4"
                                >
                                    <Edit className="w-5 h-5" />
                                    <div className="text-center">
                                        <p className="font-medium">Edit Collection</p>
                                        <p className="text-xs text-muted-foreground">Update information & settings</p>
                                    </div>
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() => setShowContributeDialog(true)}
                                    className="flex flex-col items-center space-y-2 h-auto py-4"
                                >
                                    <Plus className="w-5 h-5" />
                                    <div className="text-center">
                                        <p className="font-medium">Create Items</p>
                                        <p className="text-xs text-muted-foreground">Add new knowledge items</p>
                                    </div>
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={handleExportMetadata}
                                    className="flex flex-col items-center space-y-2 h-auto py-4"
                                >
                                    <ShieldPlusIcon className="w-5 h-5" />
                                    <div className="text-center">
                                        <p className="font-medium">Manage Protocols</p>
                                        <p className="text-xs text-muted-foreground">Download structure info</p>
                                    </div>
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={handleExportCollection}
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
                                        Delete Collection
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </TabsContent>
                <TabsContent value='knowledgeitems' className='space-y-4'>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3>Items <span className='text-muted-foreground'>{currentCollection?.knowledgeItems?.length}</span></h3>
                            <Button onClick={() => setShowContributeDialog(true)}>
                                <Plus className="w-4 h-4 mr-2" />
                                Create New Item
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {(currentCollection?.knowledgeItems?.length ?? 0) > 0 ? (
                                currentCollection?.knowledgeItems?.map((collection) => {
                                        const isSelected = selectedItems.includes(collection?.colletionId || '');
                                        const IconComponent = contentTypeIcons[collection.type as ContentType];

                                    return (
              <Card
                key={collection.colletionId}
                className={`hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-primary/20 ${
                  isSelected ? 'ring-2 ring-primary border-primary' : ''
                }`}
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      {selectMode && (
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleSelectItem(collection?.colletionId || '')}
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
                      <IconComponent className="w-5 h-5 text-primary" />
                      <Badge variant="outline" className="text-xs">
                        {collection.type}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExportItem(collection);
                      }}
                      className="p-1 h-auto"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>

                  <div onClick={() => !selectMode && setSelectedItem(collection)}>
                    <CardTitle className="text-lg leading-tight">{collection.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {collection.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent
                  className="space-y-4"
                  onClick={() => !selectMode && setSelectedItem(collection)}
                >
                  {/* Content Metadata */}
                  <div className="space-y-2 text-sm">
                    {collection.content?.duration && (
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <span>Duration: {collection.content.duration}</span>
                      </div>
                    )}
                    {collection.content?.dimensions && (
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <span>Size: {collection.content.dimensions}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <span>File: {collection.content?.fileSize}</span>
                    </div>
                  </div>

                  {/* Community and Collection */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{currentCommunity?.identity.title}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{currentCommunity?.identity.region}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{collection?.createdAt?.toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Access Level */}
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <Badge className={`text-xs ${accessLevelColors[collection?.rightsMetadata?.accessLevel.toString() as CulturalProtocol]}`}>
                      {collection.rightsMetadata?.accessLevel.replace(/_/g, ' ')}
                    </Badge>
                  </div>

                  {/* TK Labels */}
                  <div className="flex flex-wrap gap-1">
                    {collection?.culturalMetadata?.tkLabels?.map((label) => (
                      <Badge key={label} variant="outline" className="text-xs tk-label tk-cultural">
                        {label.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Button */}
                  {!selectMode && (
                    <Button className="w-full" variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  )}
                </CardContent>
              </Card>
                                    );
                                }
                                    // <Card key={currentCollection.collectionMetadataIdentifier} className="hover:shadow-lg transition-shadow">
                                    //     <CardHeader>
                                    //         <CardTitle className="text-lg">{collection.title}</CardTitle>
                                    //         <CardDescription>{collection.description}</CardDescription>
                                    //     </CardHeader>
                                    //     <CardContent>
                                    //         <div className="space-y-3">
                                    //             <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    //                 <Database className="w-4 h-4" />
                                    //                 <span>{collection?.type?.replace(/_/g, ' ')}</span>
                                    //             </div>
                                    //             <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    //                 <Users className="w-4 h-4" />
                                    //                 <span>Curator: {collection?.createdBy?.name}</span>
                                    //             </div>
                                    //         </div>
                                    //         <Button className="w-full mt-4" variant="outline" onClick={() => { }}>
                                    //             <FolderOpen className="w-4 h-4 mr-2" />
                                    //             View Details
                                    //         </Button>
                                    //     </CardContent>
                                    // </Card>
                                )
                            ) : (
                                <Card className="col-span-full">
                                    <CardContent className="p-8 text-center">
                                        <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                        <h3 className="text-lg mb-2">No Items Yet</h3>
                                        <p className="text-muted-foreground mb-4">
                                            Start organizing knowledge by creating your first item.
                                        </p>
                                        <Button onClick={() => setShowContributeDialog(true)}>
                                            <Plus className="w-4 h-4 mr-2" />
                                            Create First Item
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            {/* contribution creation dialog */}
        </div>
    )
}
