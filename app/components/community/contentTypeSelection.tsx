import { FileAudio, FileVideo, FileText, Image, ArrowRight } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { ContentType } from '@/lib/types/community'

// type ContentType = 'audio' | 'video' | 'text' | 'image';

interface ContentTypeInfo {
  type: ContentType
  title: string
  description: string
  icon: typeof FileAudio
  examples: string
  sampleCount: number
  color: string
}

const contentTypes: ContentTypeInfo[] = [
  {
    type: 'audio',
    title: 'Audio Recordings',
    description: 'Traditional songs, stories, or oral histories',
    icon: FileAudio,
    examples: 'Ceremonial songs, elder interviews, language recordings',
    sampleCount: 24,
    color: 'bg-purple-100 text-purple-800 border-purple-300',
  },
  {
    type: 'video',
    title: 'Video Content',
    description: 'Visual demonstrations or ceremonies',
    icon: FileVideo,
    examples: 'Traditional dances, craft demonstrations, land use practices',
    sampleCount: 18,
    color: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  {
    type: 'text',
    title: 'Written Knowledge',
    description: 'Stories, protocols, or documented practices',
    icon: FileText,
    examples: 'Traditional stories, seasonal calendars, governance protocols',
    sampleCount: 32,
    color: 'bg-green-100 text-green-800 border-green-300',
  },
  {
    type: 'image',
    title: 'Visual Materials',
    description: 'Photographs, artwork, or cultural artifacts',
    icon: Image,
    examples: 'Historical photos, traditional art, sacred sites, cultural maps',
    sampleCount: 45,
    color: 'bg-amber-100 text-amber-800 border-amber-300',
  },
]

interface ContentTypeSelectorProps {
  onContentTypeSelect: (contentType: ContentType | 'all') => void
  selectedContentType?: ContentType | 'all'
}

export default function ContentTypeSeletion({
  onContentTypeSelect,
  selectedContentType = 'all',
}: ContentTypeSelectorProps) {
  return (
    <div className="p-6 space-y-6">
      {/* <div className="text-center space-y-2">
        <h2>Explore Knowledge by Content Type</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Traditional knowledge comes in many forms. Browse by content type to discover audio recordings,
          visual materials, written documentation, and video demonstrations from Indigenous communities.
        </p>
      </div> */}

      {/* All Content Types Overview */}
      <Card
        className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
          selectedContentType === 'all'
            ? 'ring-2 ring-primary border-primary'
            : 'hover:border-primary/20'
        }`}
        onClick={() => onContentTypeSelect('all')}
      >
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <span>All Traditional Knowledge</span>
            <Badge variant="secondary">
              {contentTypes.reduce((sum, ct) => sum + ct.sampleCount, 0)} items
            </Badge>
          </CardTitle>
          <CardDescription>
            Browse all knowledge items across all content types and communities
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button
            variant={selectedContentType === 'all' ? 'default' : 'outline'}
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            View All Knowledge
          </Button>
        </CardContent>
      </Card>

      {/* Individual Content Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contentTypes.map(contentType => {
          const IconComponent = contentType.icon
          const isSelected = selectedContentType === contentType.type

          return (
            <Card
              key={contentType.type}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected
                  ? 'ring-2 ring-primary border-primary'
                  : 'hover:border-primary/20'
              }`}
              onClick={() => onContentTypeSelect(contentType.type)}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {contentType.title}
                      </CardTitle>
                      <Badge className={contentType.color}>
                        {contentType.sampleCount} items
                      </Badge>
                    </div>
                  </div>
                </div>

                <CardDescription className="text-sm">
                  {contentType.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Examples Include:
                  </h4>
                  <p className="text-sm">{contentType.examples}</p>
                </div>

                <Button
                  className="w-full"
                  variant={isSelected ? 'default' : 'outline'}
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Explore {contentType.title}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Cultural Protocol Notice */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="text-amber-800 flex items-center space-x-2">
            <span>Cultural Protocols</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-amber-700 text-sm">
            All traditional knowledge in this portal is shared according to
            Indigenous cultural protocols. Some content may have access
            restrictions based on cultural sensitivity, ceremonial significance,
            or community governance decisions. Please respect Traditional
            Knowledge (TK) Labels and access guidelines.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
