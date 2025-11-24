
"use client"
import React, { useState } from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/app/components/ui/carousel";
import { ImageWithFallback } from '../image-with-fallback';

interface GalleryCarouselProps {
    images: string[]
}

export default function GalleryCarousel({ images }: GalleryCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null)

    const handleSelect = () => {
        if (!emblaApi) return
        setCurrentIndex(emblaApi.selectedScrollSnap())
    }

    const handleApi = (api: CarouselApi) => {
        setEmblaApi(api)
        api?.on('select', handleSelect)
    }

    const goToSlide = (index: number) => {
        if (!emblaApi) return
        emblaApi.scrollTo(index)
        setCurrentIndex(index)
    }

    return (
  <div className="grid lg:grid-cols-2 gap-12">
        <div className='space-y-4'>
            <Carousel className="w-full" setApi={handleApi}>
                <CarouselContent>
                    {images && images.map((img, index) => (
                        <CarouselItem key={index}>
                            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                                <ImageWithFallback
                                    src={img}
                                    alt={`Artwork ${index + 1}`}

                                    className="object-cover"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
                            <div className="grid grid-cols-4 gap-4">
                          {images && images.map((img, index) => (
                      <div
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all
                        duration-300 hover:ring-2 hover:ring-black ${
                          currentIndex === index ? "ring-2 ring-black" : ""
                        }`}
                      >
                        <ImageWithFallback
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="object-cover h-full w-full"
                        />
                      </div>
                    ))}
                            </div>

        </div>
        </div>

    )
}
