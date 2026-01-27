import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <main className="pt-20">
      <section
        id="home"
        className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t("home")}</h1>
          <p className="max-w-2xl px-4">{t("home-info")}</p>
        </div>
      </section>

      <section
        id="tutorial"
        className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800"
      >
        <h2 className="text-3xl font-bold">{t("app-tutorial")}</h2>
      </section>

      <section
        id="our-info"
        className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
      >
        <h2 className="text-3xl font-bold">{t("our-info")}</h2>
      </section>

      <section
        id="app-ui"
        className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800"
      >
        <h2 className="text-3xl font-bold">{t("app-ui")}</h2>
      </section>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || "en", ["common"])),
  },
});
