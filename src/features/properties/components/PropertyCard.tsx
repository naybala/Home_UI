"use client";

import Image from "next/image";
import Link from "next/link";
import { Property } from "../types/property.types";

interface PropertyCardProps {
  property: Property;
  locale: string;
}

export default function PropertyCard({ property, locale }: PropertyCardProps) {
  return (
    <Link
      href={`/${locale}/properties/${property.id}`}
      className="group block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={property.url}
          alt={property.location}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            {property.groupType}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-gray-900 dark:text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
            {property.type}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl font-bold text-primary dark:text-white">
            {property.price}
          </div>
          <div className="text-xs text-gray-400 font-medium">
            {property.createdAt}
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {property.location}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-6 leading-relaxed">
          {property.desc || "No description available."}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <i className="pi pi-user text-xs text-gray-500 dark:text-gray-400"></i>
            </div>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {property.userFullName}
            </span>
          </div>

          <div className="flex items-center gap-1 text-primary font-semibold text-xs uppercase tracking-widest">
            View Details
            <i className="pi pi-arrow-right text-[10px]"></i>
          </div>
        </div>
      </div>
    </Link>
  );
}
