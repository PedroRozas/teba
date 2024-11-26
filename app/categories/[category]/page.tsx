import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import ProductCard from "@/components/product-card";

export function generateStaticParams() {
  const categories = [...new Set(productsData.products.map(p => p.category.toLowerCase()))];
  return categories.map((category) => ({
    category,
  }));
}

export const dynamicParams = false;

export default function CategoryPage({ params }: { params: { category: string } }) {
  const products = productsData.products.filter(
    (product) => product.category.toLowerCase() === params.category
  );

  if (!products.length) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {params.category}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </div>
  );
}