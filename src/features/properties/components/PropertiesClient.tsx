"use client";

import React, { useEffect, useRef } from "react";
import { useInfiniteProperties } from "../queries/properties.queries";
import { PropertyResponse } from "../types/property.types";
import PropertyCard from "./PropertyCard";
import InfiniteLoader from "@/components/common/InfiniteLoader";

interface PropertiesClientProps {
  initialData: PropertyResponse;
  locale: string;
}

export default function PropertiesClient({
  initialData,
  locale,
}: PropertiesClientProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteProperties(initialData);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "error") {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 p-6 rounded-2xl text-red-600 dark:text-red-400 flex items-center gap-4">
        <i className="pi pi-exclamation-circle text-2xl"></i>
        <div>
          <p className="font-bold">Error loading properties</p>
          <p className="text-sm opacity-80">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  const allProperties = data?.pages.flatMap((page) => page.data.data) || [];

  if (allProperties.length === 0 && status === "success") {
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
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {allProperties.map((property) => (
          <PropertyCard key={property.id} property={property} locale={locale} />
        ))}
      </div>

      {/* Loading Trigger */}
      <div
        ref={loadMoreRef}
        className="flex justify-center py-12"
        style={{ minHeight: "100px" }}
      >
        {isFetchingNextPage ? (
          <div className="flex flex-col items-center gap-4">
            <InfiniteLoader />
            <p className="text-sm text-gray-500 animate-pulse">
              Loading more properties...
            </p>
          </div>
        ) : hasNextPage ? (
          <div className="w-10 h-10 rounded-full border-t-2 border-primary animate-spin opacity-20" />
        ) : (
          allProperties.length > 0 && (
            <p className="text-gray-400 text-sm font-medium">
              You've reached the end of the list.
            </p>
          )
        )}
      </div>
    </div>
  );
}
