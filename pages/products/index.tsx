import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";

export default function About() {
  const { t } = useTranslation("common");

  return (
    <main className="pt-32 min-h-screen px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t("product")}</h1>
        <div className="prose dark:prose-invert">
          <p>Welcome to Lucky Click. This is our product page.</p>
        </div>
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || "en", ["common"])),
  },
});
