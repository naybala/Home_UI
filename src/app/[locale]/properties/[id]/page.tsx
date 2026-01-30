import { PropertiesAPI } from "@/features/properties/api/properties.api";
import Image from "next/image";
import { getDictionary } from "@/lib/get-dictionary";
import Link from "next/link";
import PropertyGallery from "@/features/properties/components/PropertyGallery";
import YoutubePlayer from "@/features/properties/components/YoutubePlayer";
import PropertyMap from "@/features/properties/components/PropertyMap";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const t = await getDictionary(locale as any, "common");

  let propertyDetail = null;
  let error = null;

  try {
    const response = await PropertiesAPI.getPropertyDetail(id);
    propertyDetail = response.data;
    console.log(propertyDetail);
  } catch (e: any) {
    console.error("Failed to fetch property details:", e);
    error = e.message;
  }

  if (error || !propertyDetail) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <i className="pi pi-exclamation-triangle text-5xl text-red-500 mb-6"></i>
          <h1 className="text-2xl font-bold mb-4 dark:text-white">
            Property Not Found
          </h1>
          <p className="text-gray-500 mb-8">
            {error ||
              "The property you're looking for might have been removed."}
          </p>
          <Link
            href={`/${locale}/properties`}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold"
          >
            Back to Properties
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-20 bg-white dark:bg-[#0f1114]">
      <div className="container mx-auto px-6">
        <Link
          href={`/${locale}/properties`}
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors group"
        >
          <i className="pi pi-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></i>
          Back to Properties
        </Link>
        <br />
        <br />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2">
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-primary text-white px-3 py-1 rounded text-xs font-bold uppercase transition-all hover:bg-primary/90">
                  {propertyDetail.groupType}
                </span>
                <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded text-xs font-bold uppercase transition-colors">
                  {propertyDetail.type}
                </span>
                <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded text-xs font-bold uppercase">
                  {propertyDetail.propertyStatus}
                </span>
                {propertyDetail.status === "Already Sold" && (
                  <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded text-xs font-bold uppercase">
                    Sold
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight">
                {propertyDetail.title}
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <i className="pi pi-map-marker text-primary"></i>
                {propertyDetail.locationName}, {propertyDetail.districtName},{" "}
                {propertyDetail.countryName}
              </p>
            </header>

            {/* Gallery Section */}
            <section className="mb-12">
              <PropertyGallery images={propertyDetail.urlList} />
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">
                Description
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed">
                {propertyDetail.desc}
              </div>
            </section>

            {/* Video Section */}
            {propertyDetail.linkYoutube && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">
                  Video Tour
                </h2>
                <YoutubePlayer url={propertyDetail.linkYoutube} />
              </section>
            )}

            {/* Map Section */}
            {propertyDetail.position && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">
                  Location
                </h2>
                <PropertyMap
                  lat={propertyDetail.position.lat}
                  lng={propertyDetail.position.lng}
                  locationName={propertyDetail.locationName}
                />
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold mb-6 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">
                Specifications
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  {
                    icon: "pi-home",
                    label: "Size",
                    value: `${propertyDetail.size} ${propertyDetail.dimension || "Rai"}`,
                  },
                  {
                    icon: "pi-slack",
                    label: "Bedrooms",
                    value: propertyDetail.numBed,
                  },
                  {
                    icon: "pi-box",
                    label: "Bathrooms",
                    value: propertyDetail.numBathroom,
                  },
                  { icon: "pi-tag", label: "Code", value: propertyDetail.code },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <i
                      className={`pi ${spec.icon} text-primary mb-2 block`}
                    ></i>
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-1">
                      {spec.label}
                    </span>
                    <span className="font-bold dark:text-white">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              {/* Payment Box */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="mb-6">
                  <div className="text-gray-500 text-sm uppercase tracking-widest mb-1">
                    Price
                  </div>
                  <div className="text-4xl font-black text-primary dark:text-white">
                    {propertyDetail.currencySymbol}
                    {propertyDetail.price?.toLocaleString()}
                  </div>
                  {propertyDetail.lastPrice > 0 && (
                    <div className="text-gray-400 line-through text-sm">
                      {propertyDetail.currencySymbol}
                      {propertyDetail.lastPrice?.toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <button className="w-full bg-[#2D4356] hover:bg-[#1f2e3c] text-white py-4 rounded-xl font-bold shadow-lg transition-all active:scale-95">
                    Contact Agent
                  </button>
                  <button className="w-full bg-white dark:bg-transparent border-2 border-[#2D4356] text-[#2D4356] dark:text-white dark:border-gray-600 py-4 rounded-xl font-bold transition-all hover:bg-gray-50 dark:hover:bg-gray-800">
                    Schedule Visit
                  </button>
                </div>
              </div>

              {/* Agent info */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl flex items-center gap-4 border border-gray-100 dark:border-gray-700">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-inner">
                  {propertyDetail.profileUrl && (
                    <Image
                      src={propertyDetail.profileUrl}
                      alt={propertyDetail.userFullName}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <h4 className="font-bold dark:text-white">
                    {propertyDetail.userFullName}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    Premium Agent
                  </p>
                  <div className="flex gap-2 mt-2">
                    <i className="pi pi-telegram text-primary cursor-pointer hover:scale-110 transition-transform"></i>
                    <i className="pi pi-phone text-primary cursor-pointer hover:scale-110 transition-transform"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
