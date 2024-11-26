import { notFound } from "next/navigation";
import ProductDetail from "@/components/product-detail";
import productsData from "@/data/products.json";

// Generar rutas dinámicas para exportación estática
export function generateStaticParams() {
  const params = productsData.products.map((product) => ({
    slug: product.link.split("/").pop() || "",
  }));
  console.log("Static params generated:", params); // Asegúrate de que se generan las rutas correctas
  return params;
}

export const dynamicParams = false;

export default function ProductPage({ params }: { params: { slug: string } }) {

  const product = productsData.products.find(
      (p) => p.link.split("/").pop() === params.slug
  );

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
