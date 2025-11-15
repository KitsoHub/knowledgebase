
'use client'
import { Progress } from '../ui/progress'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { Label } from '../ui/label'
import { v4 as uuidv4 } from 'uuid'
import { Badge } from '../ui/badge'
import { SiteTypeSelector } from './siteTypeSelector'
import { useSiteCreationStore } from '@/lib/store/siteStore'
import { siteService } from '@/lib/services/api/sitesService'
import { useCreateSite, useSites } from '@/app/hooks/use-sites'
import { SensitivityLevel } from '@/lib/types/sitesData'
interface SiteCreationFlowProps {
  onComplete?: () => void
  onCancel?: () => void
}

export default function SiteCreationFlow({
  onComplete,
  onCancel,
}: SiteCreationFlowProps) {
  const {
    step,
    siteData,
    nextStep,
    prevStep,
    addSiteData,
    updateSiteData,
    resetForm,
  } = useSiteCreationStore()

  const {createSite, isCreating, errorCreating} = useCreateSite()
  const { refreshSites } = useSites();


  const steps = [
    { key: 'TYPE', title: 'Site Type', description: 'Select the site category' },
    { key: 'BASIC', title: 'Basic Information', description: 'Site details and identity' },
    { key: 'METADATA', title: 'Metadata', description: 'Cultural and contextual metadata' },
    { key: 'UPLOADS', title: 'Uploads', description: 'Images & file uploads' },
    { key: 'REVIEW', title: 'Review', description: 'Confirm before creation' },
  ]

  const options: { label: string; value: SensitivityLevel }[] = [
    { label: 'Public', value: 'public' },
    { label: 'Restricted', value: 'restricted' },
    { label: 'Closed', value: 'closed' },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === step)
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100

  // ---------- VALIDATION PER STEP ----------
  const canProceed = () => {
    switch (step) {
      case 'TYPE':
        return !!siteData.category

      case 'BASIC':
        return (
          !!siteData.site_name &&
          !!siteData.description &&
          siteData.latitude !== undefined &&
          siteData.longitude !== undefined
        )

      case 'METADATA':
        return (
          !!siteData.metadata?.local_context &&
          !!siteData.metadata?.indigenous_system &&
          !!siteData.metadata?.rights &&
          !!siteData.metadata?.ip_metadata &&
          !!siteData.metadata?.access_protocol
        )

      case 'UPLOADS':
        return true

      case 'REVIEW':
        return true

      default:
        return true
    }
  }

  // ---------- RENDER STEPS ----------
  const renderStepContent = () => {
    switch (steps[currentStepIndex].key) {
      case 'TYPE':
        return (
          <SiteTypeSelector
            selectedType={siteData.category || 'heritage'}
            onSelect={(type) => updateSiteData({ category: type })}
          />
        )

      case 'BASIC':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Site Information</h3>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              <div>
                <Label>Site Name *</Label>
                <Input
                  value={siteData.site_name || ''}
                  onChange={e => updateSiteData({ site_name: e.target.value })}
                  placeholder="Enter Site name"
                  className="font-cultural"
                />
              </div>

              <div>
                <Label>Description *</Label>
                <Textarea
                  value={siteData.description || ''}
                  onChange={e => updateSiteData({ description: e.target.value })}
                  placeholder="Describe the site"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Latitude *</Label>
                  <Input
                    value={siteData.latitude || ''}
                    onChange={e =>
                      updateSiteData({ latitude: Number(e.target.value) })
                    }
                    placeholder="Latitude"
                  />
                </div>

                <div>
                  <Label>Longitude *</Label>
                  <Input
                    value={siteData.longitude || ''}
                    onChange={e =>
                      updateSiteData({ longitude: Number(e.target.value) })
                    }
                    placeholder="Longitude"
                  />
                </div>

                <div>
                  <Label>Population Density</Label>
                  <Input
                    value={siteData.population_density || ''}
                    onChange={e =>
                      updateSiteData({ population_density: Number(e.target.value) })
                    }
                    placeholder="Population density"
                  />
                </div>

                <div>
                  <Label>Migration Route *</Label>
                  <Input
                    value={siteData.migration_route || ''}
                    onChange={e => updateSiteData({ migration_route: e.target.value })}
                    placeholder="Migration Route"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 'METADATA':
        return (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Metadata</h3>
            </div>

            <div className="space-y-4">
              {/* UNESCO */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={siteData.metadata?.unesco || false}
                  onChange={e =>
                    updateSiteData({
                      metadata: {
                        ...(siteData.metadata as any),
                        unesco: e.target.checked,
                      },
                    })
                  }
                />
                <Label>UNESCO Site</Label>
              </div>

                            <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={siteData.metadata?.unicef || false}
                  onChange={e =>
                    updateSiteData({
                      metadata: {
                        ...(siteData.metadata as any),
                        unicef: e.target.checked,
                      },
                    })
                  }
                />
                <Label>UNICEF Site</Label>
              </div>

                                          <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={siteData.metadata?.undp || false}
                  onChange={e =>
                    updateSiteData({
                      metadata: {
                        ...(siteData.metadata as any),
                        undp: e.target.checked,
                      },
                    })
                  }
                />
                <Label>UNDP Site</Label>
              </div>



              <div>
                <Label>Local Context *</Label>
                <Input
                  value={siteData.metadata?.local_context || ''}
                  onChange={e =>
                    updateSiteData({
                      metadata: {
                        ...(siteData.metadata as any),
                        local_context: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div>
                <Label>Indigenous System *</Label>
                <Input
                  value={siteData.metadata?.indigenous_system || ''}
                  onChange={e =>
                    updateSiteData({
                      metadata: {
                        ...(siteData.metadata as any),
                        indigenous_system: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div>
                <Label>Rights *</Label>
                <Input
                  value={siteData.metadata?.rights || ''}
                  onChange={e =>
                    updateSiteData({
                      metadata: {
                        ...(siteData.metadata as any),
                        rights: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div>
                <Label>IP Metadata *</Label>
                <Input
                  value={siteData.metadata?.ip_metadata || ''}
                  onChange={e =>
                    updateSiteData({
                      metadata: {
                        ...(siteData.metadata as any),
                        ip_metadata: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div>
                <Label>Sensitivity Level *</Label>

                <div className="space-y-3">
      {options.map((option) => (
        <div
          key={option.value}
          className="flex items-center ps-4 border border-default bg-neutral-primary-soft rounded-base"
        >
          <input
            id={`sensitivity-${option.value}`}
            type="radio"
            name="sensitivity_level"
            value={option.value}
            checked={siteData.metadata?.sensitivity_level === option.value}
            onChange={() =>
                    updateSiteData({
                      metadata: {
                        ...(siteData.metadata as any),
                        sensitivity_level: option.value,
                      },
                    })
                  }
            className="
              w-4 h-4
              text-neutral-primary
              border-default-medium
              bg-neutral-secondary-medium
              rounded-full
              checked:border-brand
              focus:ring-2
              focus:outline-none
              focus:ring-brand-subtle
              border
              border-default
              appearance-none
            "
          />
          <label
            htmlFor={`sensitivity-${option.value}`}
            className="w-full py-4 select-none ms-2 text-sm font-medium text-heading"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>

              </div>



              <div>
                <Label>Access Protocol *</Label>
                <Input
                  value={siteData.metadata?.access_protocol || ''}
                  onChange={e =>
                    updateSiteData({
                      metadata: {
                        ...(siteData.metadata as any),
                        access_protocol: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        )

      case 'UPLOADS':
        return (
          <div className="text-center py-10">
            <h3 className="text-xl mb-2">Media Uploads</h3>
            <p>Upload images or files (coming soon)</p>
          </div>
        )

      case 'REVIEW':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Review Site</h3>
              <p className="text-muted-foreground">Confirm all information</p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>{siteData.site_name}</CardTitle>
                  <CardDescription>{siteData.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label>Latitude</Label>
                      <p>{siteData.latitude}</p>
                    </div>
                    <div>
                      <Label>Longitude</Label>
                      <p>{siteData.longitude}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-green-800">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Ready to Create Site</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

    async function handleCreateSite() {
    try {
      console.log("🚀 Creating site with data:", siteData);
      await createSite(siteData);
      await refreshSites(); // refresh the dashboard list

      alert("Site created successfully!");

      resetForm();
      onComplete?.();
    } catch (err) {
      console.error("❌ Failed to create site:", err);
      alert("Failed to create site. Check logs and backend.");
    }
  }

  // ---------- MAIN RETURN ----------
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm mb-4">
          <h2 className="text-2xl">Create New Site</h2>
          <Badge variant="outline">
            {currentStepIndex + 1} of {steps.length}
          </Badge>
        </div>

        <Progress value={progressPercentage} className="mb-4" />

        <div className="flex items-center justify-between">
          {steps.map((stepInfo, index) => (
            <div key={stepInfo.key} className="flex-1 text-center">
              <div
                className={`text-sm ${
                  index === currentStepIndex
                    ? 'text-primary font-medium'
                    : index < currentStepIndex
                    ? 'text-green-600'
                    : 'text-muted-foreground'
                }`}
              >
                {stepInfo.title}
              </div>
              <div className="text-xs text-muted-foreground hidden md:block">
                {stepInfo.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-6">{renderStepContent()}</CardContent>
      </Card>

      <div className="flex justify-between items-center mt-6">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={step === 'TYPE'}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>

        <Button
          disabled={isCreating || !canProceed()}
          onClick={() => {
            if (step === "REVIEW") {
              handleCreateSite();
            } else {
              nextStep();
            }
          }}
          className="flex items-center space-x-2"
        >
          <span>
            {step === "REVIEW" ? (isCreating ? "Creating..." : "Create Site") : "Next"}
          </span>
          {step !== "REVIEW" && <ArrowRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  )
}
