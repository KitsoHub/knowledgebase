"use client";
import { Community, CommunityGovernance, CulturalProtocol } from "@/lib/types/community";
import { Calendar, Crown, Filter, MapPin, Search, TreePine, Users } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { useCommunityCreationStore } from "@/lib/store/communityCreation";
import { useCommunityStore } from "@/lib/store/communityStore";


interface CommunityDirectoryProps {
  onNavigate?: (view: string) => void;
}
export function CommunityDirectory({onNavigate}:CommunityDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGovernance, setSelectedGovernance] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const { communities, setCurrentCommunity } = useCommunityStore();

  const governanceIcons = {
    [CommunityGovernance.ELDER_COUNCIL]: Crown,
    [CommunityGovernance.INDIGENOUS_COUNCIL]: Users,
    [CommunityGovernance.STEWARDSHIP_CIRCLE]: TreePine
  };

  const governanceColors = {
    [CommunityGovernance.ELDER_COUNCIL]: "bg-secondary text-secondary-foreground",
    [CommunityGovernance.INDIGENOUS_COUNCIL]: "bg-primary text-primary-foreground",
    [CommunityGovernance.STEWARDSHIP_CIRCLE]: "bg-green-600 text-white"
  };

  const protocolColors = {
    [CulturalProtocol.PUBLIC]: "protocol-public",
    [CulturalProtocol.COMMUNITY_ONLY]: "protocol-community",
    [CulturalProtocol.ELDER_APPROVAL_REQUIRED]: "protocol-restricted",
    [CulturalProtocol.GENDER_RESTRICTED]: "protocol-restricted"
  };

  const filteredCommunities = communities.filter(community => {
    const title = community.identity.title || '';
    const region = community.identity.region || '';
    const language = community.identity.language || '';

    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         language.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGovernance = selectedGovernance === "all" || community.identity.governanceModel === selectedGovernance;
    const matchesRegion = selectedRegion === "all" || region.includes(selectedRegion);

    return matchesSearch && matchesGovernance && matchesRegion;
  });

  const regions = Array.from(new Set(
    communities
      .map(c => c.identity.region)
      .filter((region): region is string => Boolean(region))
  ));

    const handleViewCommunity = (community: Community) => {
      console.log("To View community:", community.id);
    setCurrentCommunity(community);
    onNavigate?.('community-dashboard');
  };
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl mb-2">Community Directory</h2>
        <p className="text-muted-foreground">
          Discover Indigenous communities sharing traditional knowledge and cultural practices
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search communities, regions, or languages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:w-auto"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <label className="text-sm font-medium mb-2 block">Governance Model</label>
                  <Select value={selectedGovernance} onValueChange={setSelectedGovernance}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Governance Models</SelectItem>
                      <SelectItem value={CommunityGovernance.ELDER_COUNCIL}>Elder Council</SelectItem>
                      <SelectItem value={CommunityGovernance.INDIGENOUS_COUNCIL}>Indigenous Council</SelectItem>
                      <SelectItem value={CommunityGovernance.STEWARDSHIP_CIRCLE}>Stewardship Circle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Region</label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      {regions.map(region => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredCommunities.length} communities found
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Map View</Button>
          <Button variant="outline" size="sm">List View</Button>
        </div>
      </div>

      {/* Community Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommunities.map((community) => {
          const GovernanceIcon = community.identity.governanceModel
            ? governanceIcons[community.identity.governanceModel]
            : Crown;

          return (
            <Card key={community.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 font-cultural">
                      {community.identity.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {community.identity.description}
                    </CardDescription>
                  </div>
                  <Badge className={`${governanceColors[community.identity.governanceModel ?? CommunityGovernance.ELDER_COUNCIL]} flex items-center space-x-1`}>
                    <GovernanceIcon className="w-3 h-3" />
                    <span className="text-xs">
                      {community.identity.governanceModel === CommunityGovernance.ELDER_COUNCIL ? 'Elder' :
                       community.identity.governanceModel === CommunityGovernance.INDIGENOUS_COUNCIL ? 'Council' :
                       'Steward'}
                    </span>
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Location and Language */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {community.identity.region}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                Est. {community.identity.establishedDate
                  ? typeof community.identity.establishedDate === "string"
                    ? community.identity.establishedDate
                    : community.identity.establishedDate.toLocaleDateString()
                  : ''}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Languages:</p>
                  <div className="flex flex-wrap gap-1">
                    {community.identity.language?.split(', ').map((lang, index) => (
                      <Badge key={index} variant="outline" className="text-xs font-cultural">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Cultural Protocols */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Cultural Protocols:</p>
                  <div className="flex flex-wrap gap-1">
                    {community.protocols.map((protocol, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className={`text-xs ${protocolColors[protocol] || ''}`}
                      >
                        {protocol.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Leadership */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Leadership:</p>
                  <div className="text-sm">
                    <p className="font-medium">{community.identity.leadership?.primaryContact.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {community.identity.leadership?.primaryContact.culturalTitle || community.identity.leadership?.primaryContact.role}
                    </p>
                  </div>

                  {community.identity.leadership?.eldersCouncil && community.identity.leadership.eldersCouncil?.length > 0 && (
                    <div className="mt-2 flex items-center text-xs text-muted-foreground">
                      <Crown className="w-3 h-3 mr-1" />
                      {community.identity.leadership.eldersCouncil.length} Elder{community.identity.leadership.eldersCouncil.length > 1 ? 's' : ''} in Council
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t text-center">
                  <div>
                    <p className="text-lg font-semibold text-primary">{community.stats.totalItems}</p>
                    <p className="text-xs text-muted-foreground">Knowledge Items</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-primary">{community.stats.memberCount}</p>
                    <p className="text-xs text-muted-foreground">Members</p>
                  </div>
                </div>

                <Button className="w-full" variant="outline"  onClick={() => handleViewCommunity(community)}>
                  View Community
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCommunities.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No communities found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setSelectedGovernance("all");
              setSelectedRegion("all");
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
