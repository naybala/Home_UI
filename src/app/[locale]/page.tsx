import { getDictionary } from "@/lib/get-dictionary";
import Image from "next/image";
import Link from "next/link";
import BackgroundHero from "@/public/images/demo-one.jpg";
import Demo from "@/public/images/demo-two.jpg";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale as any, "common");

  return (
    <main className="overflow-x-hidden">
      {/*  Hero Section */}
      <section id="home" className="relative h-screen w-full flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={BackgroundHero}
            alt="Hero Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center">
          <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-2xl max-w-xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 uppercase tracking-tight">
              {t.home}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t["home-info"]}
            </p>
            <Link
              href="#"
              className="inline-block bg-[#2D4356] hover:bg-[#1f2e3c] text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              {t["hero-cta"]}
            </Link>
          </div>
        </div>
      </section>

      {/*  About Us Section */}
      <section id="about-us" className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-primary pl-6 uppercase">
                {t["about-us"]}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                {t["about-us-info"]}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {Object.keys(t["about-stats"])
                .filter((key) => !key.endsWith("-label"))
                .map((key) => (
                  <div
                    key={key}
                    className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div className="text-3xl font-bold text-primary dark:text-white mb-2">
                      {t["about-stats"][key]}
                    </div>
                    <div className="text-sm text-gray-500 uppercase tracking-widest font-medium">
                      {t["about-stats"][`${key}-label`]}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { id: "ownership", icon: "pi-home" },
              { id: "emi", icon: "pi-wallet" },
              { id: "location", icon: "pi-map-marker" },
            ].map((feature) => (
              <div
                key={feature.id}
                className="group p-8 rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 hover:bg-white dark:hover:bg-gray-800 transition-all border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
              >
                <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                  <i
                    className={`pi ${feature.icon} text-2xl text-primary dark:text-white group-hover:text-white`}
                  ></i>
                </div>
                <h3 className="text-xl font-bold mb-4 dark:text-white">
                  {t["features"][`${feature.id}-title`]}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t["features"][`${feature.id}-desc`]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  Our Services Section */}
      <section id="our-services" className="py-24 bg-gray-50 dark:bg-[#0f1114]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group">
              <Image
                src={Demo}
                alt="Services Image"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="flex flex-col">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">
                {t["our-services"]}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-12 text-lg italic leading-relaxed">
                {t["services"]["desc"]}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {[
                  { id: "01", key: "residential" },
                  { id: "02", key: "rental" },
                  { id: "03", key: "offmarket" },
                  { id: "04", key: "commercial" },
                ].map((item) => (
                  <div key={item.id} className="relative pl-16">
                    <span className="absolute left-0 top-0 text-3xl font-black text-gray-200 dark:text-gray-800 leading-none">
                      {item.id}
                    </span>
                    <h4 className="text-lg font-bold mb-3 dark:text-white uppercase tracking-tight">
                      {t["services"][`${item.key}-title`]}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t["services"][`${item.key}-desc`]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
