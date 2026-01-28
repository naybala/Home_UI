import { useTranslation } from "next-i18next";
import { getI18nProps } from "@/utils/i18n";

export default function Products() {
  const { t } = useTranslation("common");

  return (
    <main className="pt-32 min-h-screen px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t("product")}</h1>
        <div className="prose dark:prose-invert">
          <p>{t("product-title")}</p>
          <p>{t("product-description")}</p>
        </div>
      </div>
    </main>
  );
}

export const getStaticProps = getI18nProps(["common", "product"]);
