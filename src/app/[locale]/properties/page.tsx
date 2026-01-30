import { PropertiesAPI } from "@/features/properties/api/properties.api";
import PropertyGrid from "@/features/properties/components/PropertyGrid";
import { getDictionary } from "@/lib/get-dictionary";

export default async function PropertiesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1");
  const t = await getDictionary(locale as any, "common");

  let propertiesData = null;
  let error = null;

  try {
    propertiesData = await PropertiesAPI.getProperties(currentPage);
  } catch (e: any) {
    console.error("Failed to fetch properties:", e);
    error = e.message;
  }

  return (
    <main className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-[#0f1114]">
      <div className="container mx-auto px-6">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 uppercase tracking-tight">
            {t.properties}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
            Explore our curated list of premium properties across various
            locations. Find your next dream home or investment opportunity.
          </p>
        </header>

        {error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 p-6 rounded-2xl text-red-600 dark:text-red-400 flex items-center gap-4">
            <i className="pi pi-exclamation-circle text-2xl"></i>
            <div>
              <p className="font-bold">Error loading properties</p>
              <p className="text-sm opacity-80">
                {error}. Please ensure the API URL is configured correctly.
              </p>
            </div>
          </div>
        ) : (
          <PropertyGrid
            properties={propertiesData?.data?.data || []}
            locale={locale}
          />
        )}
      </div>
    </main>
  );
}
