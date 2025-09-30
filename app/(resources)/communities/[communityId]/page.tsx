"use client"

import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { useCommunityStore } from '@/lib/store/communityStore'
import { Info } from 'lucide-react';
import React from 'react'

export default function CommunityView() {

    const {currentCommunity} = useCommunityStore();


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

  return (
    <div>CommunityView : {currentCommunity?.identity.title}</div>
  )
}
