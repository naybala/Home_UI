"use client";

import React, { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

interface PropertyGalleryProps {
  images: string[];
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, emblaMainApi] = useEmblaCarousel({ loop: true });
  const [thumbViewportRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Main Carousel */}
      <div
        className="overflow-hidden rounded-3xl shadow-2xl bg-gray-100 dark:bg-gray-800"
        ref={mainViewportRef}
      >
        <div className="flex touch-pan-y">
          {images.map((url, index) => (
            <div className="relative flex-[0_0_100%] aspect-[16/9]" key={index}>
              <Image
                src={url}
                alt={`Property image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="overflow-hidden" ref={thumbViewportRef}>
        <div className="flex gap-4">
          {images.map((url, index) => (
            <button
              key={index}
              onClick={() => onThumbClick(index)}
              className={`relative flex-[0_0_20%] aspect-square rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                index === selectedIndex
                  ? "border-primary opacity-100 scale-105 shadow-md"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                src={url}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
