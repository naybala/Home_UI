import { useTranslation } from "next-i18next";
import { getI18nTranslations } from "@/utils/i18n";
import { useProducts } from "@/features/products/queries/products.queries";
import Link from "next/link";
import Image from "next/image";
import { ProductsAPI } from "@/features/products/api/products.api";
import { ProductList } from "@/features/products/types/product.types";
import { GetStaticProps } from "next";

interface ProductsPageProps {
  initialProducts: ProductList;
}

export default function Products({ initialProducts }: ProductsPageProps) {
  const { t } = useTranslation(["product"]);
  const { data: products } = useProducts(initialProducts);

  return (
    <main className="pt-32 min-h-screen px-4 pb-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            {t("product-title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t("product-description")}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products?.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 block"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100 p-8">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                  priority={product.id <= 4}
                />
                <div className="absolute top-4 right-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-3 py-1 rounded-full text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {product.category}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-white line-clamp-2 min-h-[3.5rem]">
                  {product.title}
                </h2>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <i className="pi pi-star-fill text-yellow-400 mr-1"></i>
                    <span>
                      {product.rating?.rate} ({product.rating?.count})
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const products = await ProductsAPI.getProducts();

  return {
    props: {
      ...(await getI18nTranslations(locale || "en", ["product"])),
      initialProducts: products,
    },
    revalidate: 60, // Refetch in background every 60 seconds
  };
};
