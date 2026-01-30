"use client";

import React from "react";

interface PropertyMapProps {
  lat: number;
  lng: number;
  locationName: string;
}

export default function PropertyMap({
  lat,
  lng,
  locationName,
}: PropertyMapProps) {
  // Use Google Maps Embed API (no key required for basic view)
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=15&output=embed`;

  return (
    <div className="w-full h-full aspect-video rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        src={embedUrl}
        title={`Location of ${locationName}`}
        className="grayscale dark:invert-[0.9] dark:hue-rotate-180"
      ></iframe>
    </div>
  );
}
