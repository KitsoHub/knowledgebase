"use client"
import ContentTypeSelection from '@/app/components/community/contentTypeSelection';
import KnowledgeItemViewer from '@/app/components/community/itemViewer';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { accessLevelColors, CommunityGovernance, contentTypeIcons, CulturalProtocol } from '@/lib/constants/community';
import { useCommunityStore } from '@/lib/store/communityStore';
import { ContentType, KnowledgeItem } from '@/lib/types/community';
import { formatGovernanceText } from '@/lib/utils';
import { ArrowLeft, Calendar, CheckCheckIcon, CheckSquare, Crown, ExternalLink, FileAudio, FileText, FileVideo, Filter, Grid, ImageIcon, Info, Languages, List, MapPin, Search, Shield, Square, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'


export default function CollectionView() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');
    const { currentCollection, currentCommunity, currentKnowledgeItemMetadata, currentSubCommunity } = useCommunityStore();
    const [viewMode, setViewMode] = useState<"grid" | "list" | "content-types">("content-types");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedContentType, setSelectedContentType] = useState<ContentType>("all");
    const [selectedAccessLevel, setSelectedAccessLevel] = useState<string>("all");
    const [selectedItem, setSelectedItem] = useState<Partial<KnowledgeItem> | null>(null);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

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

    const filteredItems = currentCollection?.knowledgeItems?.filter(item => {
        const matchesSearch = item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.content?.metadata?.topics.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesContentType = selectedContentType === "all" || item.type === selectedContentType;
        const matchesAccessLevel = selectedAccessLevel === "all" || item.rightsMetadata?.accessLevel === selectedAccessLevel;

        return matchesSearch && matchesContentType && matchesAccessLevel;

    });

    // Content Type Selector View
    const handleContentTypeSelect = (contentType: ContentType | 'all') => {
        setSelectedContentType(contentType);
        setViewMode('grid');
    };
    if (viewMode === 'content-types') {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    {/* <div>
                        <h1>Knowledge Base</h1>
                        <p className="text-muted-foreground">
                            Browse and discover traditional knowledge shared by Indigenous communities
                        </p>
                    </div> */}
                    {/* <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            onClick={() => setViewMode('grid')}
                            className="flex items-center space-x-2"
                        >
                            <Grid className="w-4 h-4" />
                            <span>Browse All</span>
                        </Button>
                    </div> */}
                </div>

                <ContentTypeSelection
                    onContentTypeSelect={handleContentTypeSelect}
                    selectedContentType={selectedContentType}
                />
            </div>
        );
    }



    if (selectedItem) {
    return (
      <KnowledgeItemViewer
        item={selectedItem}
        onBack={() => setSelectedItem(null)}

      />
    );
  }

    return (
        <div className='p-6 space-y-6'>
            <div className="flex items-start space-x-4">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to {currentCommunity?.identity.title}
                </Button>
            </div>
            <Alert className="border-secondary">
                <Crown className="h-4 w-4 text-secondary" />
                <AlertDescription>
                    {/* TODO: update to use the proper subcommunity */}
                    This collection operates under the authority of {currentSubCommunity?.indigenousAuthority?.name || currentCommunity?.identity.leadership?.primaryContact.name}
                    {' '}{currentSubCommunity?.communityIdentifier} and follows traditional protocols for
                    {' '}{currentCommunity.identity.description}.
                </AlertDescription>
            </Alert>
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

            </div>
            {/* Header control */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                <Button
                    variant="ghost"
                    onClick={() => setViewMode('content-types')}
                    className="flex items-center space-x-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Content Types</span>
                </Button>

                <div>
                    <h3>Knowledge Base</h3>
                    <p className="text-muted-foreground">
                        {filteredItems && filteredItems.length} traditional knowledge items
                    </p>
                </div>

                <div className="flex items-center space-x-2">
                    {/* View Mode Toggle */}
                    <div className="flex items-center space-x-1 border rounded-lg p-1">
                        <Button
                            variant={viewMode === 'grid' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('grid')}
                        >
                            <Grid className="w-4 h-4" />
                        </Button>
                        <Button
                            variant={viewMode === 'list' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('list')}
                        >
                            <List className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Select Mode Toggle */}
                    {/* <Button
            variant={selectMode ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setSelectMode(!selectMode);
              if (!selectMode) setSelectedItems([]);
            }}
            className="flex items-center space-x-2"
          >
            {selectMode ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
            <span>Select</span>
          </Button> */}

                    {/* Export Button */}
                    {/* <ExportUtilities
            items={filteredItems}
            selectedItems={selectedItems}
            onExport={handleBulkExport}
          /> */}
                </div>

            </div>


      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search knowledge items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedContentType} onValueChange={(value) => setSelectedContentType(value as ContentType | "all")}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Content Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Content Types</SelectItem>
              <SelectItem value="audio">Audio Recordings</SelectItem>
              <SelectItem value="video">Video Content</SelectItem>
              <SelectItem value="text">Written Knowledge</SelectItem>
              <SelectItem value="image">Visual Materials</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedAccessLevel} onValueChange={setSelectedAccessLevel}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Access Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Access Levels</SelectItem>
              <SelectItem value="PUBLIC">Public Access</SelectItem>
              <SelectItem value="COMMUNITY_ONLY">Community Only</SelectItem>
              <SelectItem value="ELDER_APPROVAL_REQUIRED">Elder Approval Required</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>


      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <p className="text-sm text-muted-foreground">
            {filteredItems?.length} knowledge items found
          </p>

        </div>

      </div>

            {/* Knowledge Items Grid */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredItems?.map((item) => {

        //   TODO: udpate the content types
          const IconComponent = contentTypeIcons[item?.type as ContentType]
            const isSelected = selectedItems.includes(item?.knowledgeItemIdentier || '');

            return (
              <Card
                key={item.knowledgeItemIdentier}
                className={`hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-primary/20 ${
                  isSelected ? 'ring-2 ring-primary border-primary' : ''
                }`}
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      {/* {selectMode && (
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleSelectItem(item.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      )} */}
                      <IconComponent className="w-5 h-5 text-primary" />
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>

                  </div>

                  <div onClick={() =>  setSelectedItem(item)}>
                    <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {item.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent
                  className="space-y-4"
                  onClick={() => setSelectedItem(item)}
                >
                  {/* Content Metadata */}
                  <div className="space-y-2 text-sm">
                    {item.content?.duration && (
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <span>Duration: {item.content.duration}</span>
                      </div>
                    )}
                    {item.content?.dimensions && (
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <span>Size: {item.content.dimensions}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <span>File: {item.content?.fileSize}</span>
                    </div>
                  </div>

                  {/* Community and Collection */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{item.communityId}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{item.content?.metadata?.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{item.createdAt?.toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Access Level */}
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                  <Badge className={`${accessLevelColors[item.rightsMetadata?.accessLevel?.toString() as CulturalProtocol]}`}>

                      {item.rightsMetadata?.accessLevel.replace(/_/g, ' ')}
                    </Badge>
                  </div>

                  {/* TK Labels */}
                  <div className="flex flex-wrap gap-1">
                    {item.culturalMetadata?.tkLabels?.map((label) => (
                      <Badge key={label} variant="secondary" className="text-xs tk-label tk-cultural">
                        {label.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>



                    <Button className="w-full" variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Details
                    </Button>

                </CardContent>
              </Card>
            );
          })}
        </div>
      )}


      {/* Knowledge Items List */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {filteredItems?.map((item) => {
            const IconComponent = contentTypeIcons[item?.type as ContentType];
            const isSelected = selectedItems.includes(item?.knowledgeItemIdentier || '');

            return (
              <Card
                key={item.knowledgeItemIdentier}
                className={`cursor-pointer hover:shadow-md transition-all duration-200 ${
                  isSelected ? 'ring-2 ring-primary border-primary' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* {selectMode && (
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleSelectItem(item.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1"
                      />
                    )} */}

                    <div className="p-2 rounded-lg bg-primary/10">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>

                    <div
                      className="flex-1 space-y-2"
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-medium">{item.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {item.type}
                            </Badge>
                            <Badge className={`text-xs ${accessLevelColors[item.rightsMetadata?.accessLevel as CulturalProtocol]}`}>
                              {item.rightsMetadata?.accessLevel.replace(/_/g, ' ')}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground line-clamp-2">{item.description}</p>
                        </div>
{/*
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExportItem(item);
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </Button> */}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{item.communityId}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{item.content?.metadata?.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{item.createdAt?.toLocaleDateString()}</span>
                        </div>
                        {item.content?.duration && (
                          <span>Duration: {item.content.duration}</span>
                        )}
                        <span>Size: {item.content?.fileSize}</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {item.culturalMetadata?.tkLabels?.map((label) => (
                          <Badge key={label} variant="secondary" className="text-xs tk-label tk-cultural">
                            {label.replace(/_/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      {filteredItems && filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No knowledge items found matching your criteria.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchTerm("");
              setSelectedContentType("all");
              setSelectedAccessLevel("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

        </div>
    )
}
