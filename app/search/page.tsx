"use client";

import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import ProductCard from "@/components/product-card";
import productsData from "@/data/products.json";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const filteredProducts = query
    ? productsData.products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <form action="/search" className="flex w-full gap-2">
          <Input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Buscar productos..."
            className="flex-1"
          />
          <Button type="submit" className="bg-[#027046] hover:bg-[#025a38]">
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </form>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          {filteredProducts.length > 0
            ? `Resultados para "${query}"`
            : "No se encontraron resultados"}
        </h1>
        <p className="text-gray-600">
          {filteredProducts.length} productos encontrados
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            No encontramos productos que coincidan con tu búsqueda.
          </p>
          <p className="text-gray-500">
            Intenta con otros términos o navega por nuestras categorías.
          </p>
        </div>
      )}
    </div>
  );
}