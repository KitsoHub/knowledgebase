
import { Crown, Users, TreePine } from "lucide-react";
import { CommunityGovernance } from "@/lib/types/community";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

interface CommunityTypeSelectorProps {
  selectedType: CommunityGovernance | null;
  onSelect: (type: CommunityGovernance) => void;
}

export function CommunityTypeSelector({ selectedType, onSelect }: CommunityTypeSelectorProps) {
  const governanceTypes = [
    {
      type: CommunityGovernance.ELDER_COUNCIL,
      title: "Elder Council",
      description: "Traditional governance led by community elders with special cultural authority",
      icon: Crown,
      emphasis: true
    },
    {
      type: CommunityGovernance.INDIGENOUS_COUNCIL,
      title: "Indigenous Council",
      description: "Democratically elected council representing community interests",
      icon: Users,
      emphasis: false
    },
    {
      type: CommunityGovernance.STEWARDSHIP_CIRCLE,
      title: "Stewardship Circle",
      description: "Collaborative leadership focused on environmental and cultural stewardship",
      icon: TreePine,
      emphasis: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl mb-2">Select Governance Model</h2>
        <p className="text-muted-foreground">
          Choose the governance structure that best represents your community's leadership
        </p>
      </div>

      {/* Mobile: Vertical Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {governanceTypes.map(({ type, title, description, icon: Icon, emphasis }) => (
          <Card
            key={type}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedType === type
                ? 'ring-2 ring-primary border-primary'
                : 'hover:border-primary/50'
            } ${emphasis ? 'border-2 border-secondary bg-secondary/5' : ''}`}
            onClick={() => onSelect(type)}
          >
            <CardHeader className="text-center pb-2">
              <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                emphasis
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-primary/10 text-primary'
              }`}>
                <Icon className="w-6 h-6" />
              </div>
              <CardTitle className={`text-lg ${emphasis ? 'text-secondary' : ''}`}>
                {title}
              </CardTitle>
              {emphasis && (
                <div className="text-xs font-medium text-secondary bg-secondary/20 px-2 py-1 rounded-full">
                  Special Authority
                </div>
              )}
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-sm leading-relaxed">
                {description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop: Additional circular layout option */}
      <div className="hidden lg:block mt-8">
        <div className="text-center text-sm text-muted-foreground mb-4">
          Alternative View: Circular Layout
        </div>
        <div className="relative w-80 h-80 mx-auto">
          {governanceTypes.map(({ type, title, icon: Icon, emphasis }, index) => {
            const angle = (index * 120) - 90; // Distribute in circle
            const radius = 100;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;

            return (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="lg"
                className={`absolute w-20 h-20 rounded-full p-0 transform -translate-x-1/2 -translate-y-1/2 ${
                  emphasis ? 'ring-2 ring-secondary' : ''
                }`}
                style={{
                  left: `50%`,
                  top: `50%`,
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`
                }}
                onClick={() => onSelect(type)}
              >
                <div className="flex flex-col items-center">
                  <Icon className="w-6 h-6 mb-1" />
                  <span className="text-xs">{title.split(' ')[0]}</span>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
