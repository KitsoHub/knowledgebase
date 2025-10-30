import { Progress } from '@/app/components/ui/progress'

interface LevelIndicatorProps {
  currentLevel: number
  maxLevel: number
}

export function LevelIndicator({
  currentLevel,
  maxLevel,
}: LevelIndicatorProps) {
  const progress = (currentLevel / maxLevel) * 100

  return (
    <div className="w-full mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Level {currentLevel}
        </span>
        <span className="text-sm font-medium text-gray-500">
          {currentLevel} / {maxLevel}
        </span>
      </div>
      <Progress value={progress} className="w-full h-2" />
    </div>
  )
}
