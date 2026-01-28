import { useTranslation } from "next-i18next";
import { getI18nProps } from "@/utils/i18n";

export default function About() {
  const { t } = useTranslation("common");

  return (
    <main className="pt-32 min-h-screen px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t("about")}</h1>
        <div className="prose dark:prose-invert">
          <p>Welcome to Lucky Click. This is our about page.</p>
        </div>
      </div>
    </main>
  );
}

export const getStaticProps = getI18nProps(["common"]);
