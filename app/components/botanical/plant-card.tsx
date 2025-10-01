import React from 'react'

import { MedicinalPlant } from '@/lib/types/botanical';
import { motion } from "framer-motion";
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ImageWithFallback } from '../shared/image-with-fallback';
import { cn } from '@/lib/utils';


interface PlantCardProps {
  plant: MedicinalPlant;
  onCardClick: (plant: MedicinalPlant) => void;
}
export default function PlantCard({ plant, onCardClick }: PlantCardProps) {
  return (
    <motion.div
      // whileHover={{
      //   scale: 1.02,
      //   boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
      // }}
           whileHover={{
        scale: 1.03,
        y: -4
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20
      }}
      className="cursor-pointer"
      onClick={() => onCardClick(plant)}
    >
      <Card className={cn("glass-card leaf-shadow rounded-3xl overflow-hidden group relative"
        // "group relative overflow-hidden transition-all duration-300",
        // "hover:shadow-lg hover:shadow-gray-200 dark:hover:shadow-gray-800"
      )}>
        <div className="relative overflow-hidden">
          <ImageWithFallback
            src={plant.image}
            alt={plant.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          <div className="absolute top-3 right-3">
            <Badge className="bg-white/90 backdrop-blur-sm text-slate-500 border-primary/20 shadow-sm">
              🌸 {plant.family}
            </Badge>
          </div>
          <div className="absolute top-3 left-3">
            <div className="w-8 h-8 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center text-lg">
              🌿
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold">{plant.name}</h3>
              <p className="text-sm text-muted-foreground italic">{plant.scientificName}</p>
              <p className="text-sm text-muted-foreground italic">
                {plant.localNames && `Also known as: ${plant.localNames.join(', ')}`}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>🌍</span>
                <span>{plant.origin}</span>
              </div>
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
