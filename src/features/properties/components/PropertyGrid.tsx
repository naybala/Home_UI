"use client";

import { Property } from "../types/property.types";
import PropertyCard from "./PropertyCard";

interface PropertyGridProps {
  properties: Property[];
  locale: string;
}

export default function PropertyGrid({
  properties,
  locale,
}: PropertyGridProps) {
  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 dark:bg-gray-800 mb-6">
          <i className="pi pi-search text-3xl text-gray-300"></i>
        </div>
        <h3 className="text-xl font-bold dark:text-white mb-2">
          No Properties Found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your filters or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} locale={locale} />
      ))}
    </div>
  );
}
