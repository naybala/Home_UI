import ContentLoader from "@/components/common/ContentLoader";

export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-lg mb-4" />
        <div className="h-6 w-96 bg-gray-100 animate-pulse rounded-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="border rounded-xl p-4 space-y-4">
            <div className="aspect-square bg-gray-100 animate-pulse rounded-lg" />
            <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4" />
            <div className="h-4 bg-gray-100 animate-pulse rounded w-1/2" />
            <div className="h-10 bg-gray-100 animate-pulse rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
