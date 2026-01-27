import { useRouter } from "next/router";
import { useProduct } from "../../hooks/useProduct";
import Header from "../../components/layout/Header";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: product, isLoading, isError } = useProduct(id as string);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen text-black dark:text-white">
      <Header />
      <main className="max-w-4xl mx-auto pt-6 px-4">
        {isLoading && <p>Loading product...</p>}
        {isError && <p>Failed to load product.</p>}

        {product && (
          <div className="bg-white dark:bg-gray-700 p-6 rounded shadow">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-60 object-contain mb-4"
            />
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
              ${product.price}
            </p>
            <p className="text-sm">{product.description}</p>
          </div>
        )}
      </main>
    </div>
  );
}
