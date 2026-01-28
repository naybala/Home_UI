import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export const getI18nProps = (
  namespaces: string[] = ["common"],
): GetStaticProps => {
  return async ({ locale }) => ({
    props: {
      ...(await serverSideTranslations(locale || "en", namespaces)),
    },
  });
};
