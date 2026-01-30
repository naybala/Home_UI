"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useInfiniteProperties } from "../queries/properties.queries";
import { PropertyResponse } from "../types/property.types";
import PropertyCard from "./PropertyCard";
import InfiniteLoader from "@/components/common/InfiniteLoader";
import SearchBar from "@/components/common/SearchBar";

interface PropertiesClientProps {
  initialData: PropertyResponse;
  locale: string;
  search?: string;
}

export default function PropertiesClient({
  initialData,
  locale,
  search: initialSearch,
}: PropertiesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(initialSearch || "");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    status,
    error,
  } = useInfiniteProperties(initialData, initialSearch);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchInput.trim()) {
      params.set("search", searchInput.trim());
    } else {
      params.delete("search");
    }
    params.delete("page"); // Reset to page 1 when searching
    router.push(`?${params.toString()}`);
  };

  const handleClear = () => {
    setSearchInput("");
    router.push(window.location.pathname);
  };

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

  const allProperties = data?.pages.flatMap((page) => page.data.data) || [];

  // Use isFetching to detect loading during search changes, not just initial load
  const isSearching = isFetching && !isFetchingNextPage;

  // Loading state during initial search or when search changes
  if (isLoading || (isSearching && allProperties.length === 0)) {
    return (
      <div className="space-y-12">
        <SearchBar
          searchValue={searchInput}
          onSearchChange={setSearchInput}
          onSearch={handleSearch}
          onClear={handleClear}
          placeholder="Search properties (e.g., B7096)..."
          isLoading={isSearching}
          showClearButton={!!initialSearch}
          currentSearchTerm={initialSearch}
        />
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Searching properties...
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Please wait while we fetch the results
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="space-y-12">
        <SearchBar
          searchValue={searchInput}
          onSearchChange={setSearchInput}
          onSearch={handleSearch}
          onClear={handleClear}
          placeholder="Search properties (e.g., B7096)..."
          isLoading={isSearching}
          showClearButton={!!initialSearch}
          currentSearchTerm={initialSearch}
        />
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 p-6 rounded-2xl text-red-600 dark:text-red-400 flex items-center gap-4">
          <i className="pi pi-exclamation-circle text-2xl"></i>
          <div>
            <p className="font-bold">Error loading properties</p>
            <p className="text-sm opacity-80">{(error as Error).message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (allProperties.length === 0 && status === "success") {
    return (
      <div className="space-y-12">
        <SearchBar
          searchValue={searchInput}
          onSearchChange={setSearchInput}
          onSearch={handleSearch}
          onClear={handleClear}
          placeholder="Search properties (e.g., B7096)..."
          isLoading={isSearching}
          showClearButton={!!initialSearch}
          currentSearchTerm={initialSearch}
        />
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 dark:bg-gray-800 mb-6">
            <i className="pi pi-search text-3xl text-gray-300"></i>
          </div>
          <h3 className="text-xl font-bold dark:text-white mb-2">
            No Properties Found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {initialSearch
              ? `No results found for "${initialSearch}". Try a different search term.`
              : "Try adjusting your filters or check back later."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <SearchBar
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        onSearch={handleSearch}
        onClear={handleClear}
        placeholder="Search properties (e.g., B7096)..."
        isLoading={isSearching}
        showClearButton={!!initialSearch}
        currentSearchTerm={initialSearch}
      />

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
