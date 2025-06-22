import React from 'react';

import { BrainCircuit, CheckCircle, XCircle } from 'lucide-react';
import { Separator } from '@/app/components/ui/separator';
import { Button } from '@/app/components/ui/button';

const VerificationTools: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <div>
        <h4 className="font-medium mb-2">Formal Requirements</h4>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 mr-2 text-patent-green" />
            <span>Application form complete and signed</span>
          </div>
          <div className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 mr-2 text-patent-green" />
            <span>Inventor information verified</span>
          </div>
          <div className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 mr-2 text-patent-green" />
            <span>Claims properly formatted</span>
          </div>
          <div className="flex items-center text-sm">
            <XCircle className="h-4 w-4 mr-2 text-patent-red" />
            <span>Drawing references consistent with specification</span>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-medium mb-2">Classification</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="justify-start">Software Methods</Button>
          <Button variant="outline" size="sm" className="justify-start">Data Processing</Button>
          <Button variant="outline" size="sm" className="justify-start">User Interfaces</Button>
          <Button variant="outline" size="sm" className="justify-start">System Architecture</Button>
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-medium mb-2">Decision</h4>
        <div className="flex space-x-2">
          <Button className="bg-patent-green hover:bg-patent-green/90">
            <CheckCircle className="h-4 w-4 mr-2" />
            Proceed to Examination
          </Button>
          <Button variant="outline" className="text-patent-red">
            <XCircle className="h-4 w-4 mr-2" />
            Request Corrections
          </Button>
          <Button className="bg-patent-green hover:bg-patent-green/90">
            <BrainCircuit className="h-4 w-4 mr-2" />
            AI Examination
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificationTools;
