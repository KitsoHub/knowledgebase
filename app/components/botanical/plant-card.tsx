import React from 'react'

import { MedicinalPlant } from '@/lib/types/botanical';
import { motion } from 'motion/react';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ImageWithFallback } from '../shared/image-with-fallback';
import { cn } from '@/lib/utils';


interface PlantCardProps {
  plant: MedicinalPlant;
  onCardClick: (plant: MedicinalPlant) => void;
}
export default function PlantCard({plant, onCardClick}: PlantCardProps) {
  return (
       <motion.div
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      className="cursor-pointer"
      onClick={() => onCardClick(plant)}
    >
              <Card className={cn(
                      "group relative overflow-hidden transition-all duration-300",
                        "hover:shadow-lg hover:shadow-gray-200 dark:hover:shadow-gray-800"
                    )}>
        <div className="relative overflow-hidden">
          <ImageWithFallback
            src={plant.image}
            alt={plant.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {plant.family}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold">{plant.name}</h3>
              <p className="text-sm text-muted-foreground italic">{plant.scientificName}</p>
              <p className="text-sm text-muted-foreground">Origin: {plant.origin}</p>
            </div>

            <motion.div
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              whileHover={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="pt-2 border-t space-y-2">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Parts Used:</p>
                  <div className="flex flex-wrap gap-1">
                    {plant.partsUsed.slice(0, 3).map((part) => (
                      <Badge key={part} variant="outline" className="text-xs">
                        {part}
                      </Badge>
                    ))}
                    {plant.partsUsed.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{plant.partsUsed.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Key Properties:</p>
                  <div className="flex flex-wrap gap-1">
                    {plant.medicinalQualities.slice(0, 2).map((quality) => (
                      <Badge key={quality} variant="default" className="text-xs">
                        {quality}
                      </Badge>
                    ))}
                    {plant.medicinalQualities.length > 2 && (
                      <Badge variant="default" className="text-xs">
                        +{plant.medicinalQualities.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {plant.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
