"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import productsData from "@/data/products.json";

interface SearchDropdownProps {
  className?: string;
}

export function SearchDropdown({ className }: SearchDropdownProps) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filteredProducts = query
    ? productsData.products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 4)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setShowResults(false);
      setQuery("");
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="flex w-full">
        <Input
          type="search"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          className="rounded-r-none bg-white/10 text-white placeholder:text-white/70 border-white/20 focus:bg-white focus:text-gray-900 focus:placeholder:text-gray-500"
        />
        <Button
          type="submit"
          className="rounded-l-none bg-white/20 hover:bg-white/30 text-white"
        >
          <Search className="h-4 w-4" />
        </Button>
      </form>

      {showResults && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50">
          {filteredProducts.length > 0 ? (
            <>
              {filteredProducts.map((product) => (
                <Link
                  key={product.name}
                  href={product.link}
                  onClick={() => {
                    setShowResults(false);
                    setQuery("");
                  }}
                  className="flex items-center p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="relative w-12 h-12 mr-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#027046]">
                    {product.price}
                  </p>
                </Link>
              ))}
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                className="block p-3 text-center text-sm text-[#027046] hover:bg-gray-50 border-t"
                onClick={() => {
                  setShowResults(false);
                  setQuery("");
                }}
              >
                Ver todos los resultados
              </Link>
            </>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No se encontraron productos
            </div>
          )}
        </div>
      )}
    </div>
  );
}