import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getI18nTranslations } from "@/utils/i18n";
import { useProductDetail } from "@/features/products/queries/products.queries";
import Link from "next/link";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import { ProductsAPI } from "@/features/products/api/products.api";
import { Product } from "@/features/products/types/product.types";

interface ProductDetailPageProps {
  initialProduct: Product;
}

export default function ProductDetail({
  initialProduct,
}: ProductDetailPageProps) {
  const { t } = useTranslation(["product"]);
  const router = useRouter();
  const { id } = router.query;
  const { data: product } = useProductDetail(id as string, initialProduct);

  if (router.isFallback) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">Product not found.</p>
          <Link href="/products" className="text-blue-500 hover:underline">
            Go back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-32 min-h-screen px-4 pb-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/products"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors group"
        >
          <i className="pi pi-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></i>
          Back to Products
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-100 dark:bg-gray-700/50 p-12 flex items-center justify-center relative min-h-[400px]">
              <div className="relative w-full h-full">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div className="p-10 flex flex-col justify-center">
              <div className="mb-6">
                <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                  {product.category}
                </span>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white leading-tight mb-4">
                  {product.title}
                </h1>
                <div className="flex items-center mb-6">
                  <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/20 px-3 py-1 rounded-lg">
                    <i className="pi pi-star-fill text-yellow-500 mr-2"></i>
                    <span className="font-bold text-yellow-700 dark:text-yellow-500">
                      {product.rating?.rate}
                    </span>
                  </div>
                  <span className="mx-3 text-gray-300 dark:text-gray-600">
                    |
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 font-medium">
                    {product.rating?.count} reviews
                  </span>
                </div>
              </div>

              <div className="mb-10">
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                  {product.description}
                </p>
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-black text-indigo-600 dark:text-indigo-400">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-auto">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 transition-all active:scale-95 flex items-center justify-center">
                  <i className="pi pi-shopping-cart mr-2"></i>
                  Add to Cart
                </button>
                <button className="bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:border-indigo-600 dark:hover:border-indigo-400 text-gray-800 dark:text-white font-bold py-4 px-8 rounded-2xl transition-all active:scale-95 flex items-center justify-center">
                  <i className="pi pi-heart mr-2"></i>
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await ProductsAPI.getProducts();
  const paths = products.map((p) => ({
    params: { id: p.id.toString() },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const id = params?.id as string;
  try {
    const product = await ProductsAPI.getProduct(id);

    if (!product) {
      return { notFound: true };
    }

    return {
      props: {
        ...(await getI18nTranslations(locale || "en", ["product"])),
        initialProduct: product,
      },
      revalidate: 60,
    };
  } catch (error) {
    return { notFound: true };
  }
};
