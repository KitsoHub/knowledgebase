import { CommunityGovernanceSteps, CulturalProtocol, TKLabel } from '@/lib/constants/community';
import { Community} from '@/lib/types/community';
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

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


    return (
        <div>subCommunityCreationFlow for : {parentCommunity?.identity.title}:{generateCommunityIdentifier()}</div>
    )
}
