import "server-only";

const dictionaries = {
  en: {
    common: () =>
      import("../../public/locales/en/common.json").then(
        (module) => module.default,
      ),
    product: () =>
      import("../../public/locales/en/product.json").then(
        (module) => module.default,
      ),
  },
  mm: {
    common: () =>
      import("../../public/locales/mm/common.json").then(
        (module) => module.default,
      ),
    product: () =>
      import("../../public/locales/mm/product.json").then(
        (module) => module.default,
      ),
  },
};

export const getDictionary = async (
  locale: "en" | "mm",
  namespace: "common" | "product",
) => dictionaries[locale][namespace]() as Promise<any>;
