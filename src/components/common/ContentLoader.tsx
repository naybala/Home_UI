"use client";

import "./ContentLoader.css";

interface ContentLoaderProps {
  message?: string;
}

/**
 * ContentLoader - Use this component to show loading state for specific content areas
 * This should be used in client components when fetching data with React Query
 *
 * Example usage:
 * ```tsx
 * const { data, isLoading } = useProducts();
 *
 * if (isLoading) {
 *   return <ContentLoader message="Loading products..." />;
 * }
 * ```
 */
export default function ContentLoader({
  message = "Loading...",
}: ContentLoaderProps) {
  return (
    <div className="page-loader-overlay">
      <div className="page-loader-spinner">
        <div className="spinner"></div>
        <p className="loading-text">{message}</p>
      </div>
    </div>
  );
}
