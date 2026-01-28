import { getDictionary } from "@/lib/get-dictionary";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale as any, "common");

  return (
    <main className="pt-20">
      <section
        id="home"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center ">
          <h1 className="text-4xl font-bold mb-4">{t.home}</h1>
          <p className="max-w-2xl px-4">{t["home-info"]}</p>
        </div>
      </section>

      <section
        id="tutorial"
        className="min-h-screen flex items-center justify-center"
      >
        <h2 className="text-3xl font-bold ">{t["app-tutorial"]}</h2>
      </section>

      <section
        id="our-info"
        className="min-h-screen flex items-center justify-center"
      >
        <h2 className="text-3xl font-bold">{t["our-info"]}</h2>
      </section>

      <section
        id="app-ui"
        className="min-h-screen flex items-center justify-center"
      >
        <h2 className="text-3xl font-bold">{t["app-ui"]}</h2>
      </section>
    </main>
  );
}
