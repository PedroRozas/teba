import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import productsData from "@/data/products.json";
import ProductCard from "@/components/product-card";
import StoreFinder from "@/components/store-finder";
import HeroSlider from "@/components/hero-slider";
import { FeaturedDeals } from "@/components/featured-deals";
import { WhyChooseUs } from "@/components/why-choose-us";
import { FeaturedProducts } from "@/components/featured-products";

export default function Home() {
  const featuredProducts = productsData.products.filter((product) => product.featured);
  const trendingProducts = productsData.products.map(product => ({
    ...product,
    rating: 4.5 + Math.random() * 0.5,
    reviews: Math.floor(Math.random() * 100) + 50,
    trending: Math.random() > 0.5,
    stock: Math.floor(Math.random() * 20) + 1
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <HeroSlider slides={productsData.heroSlides} />
      </section>

      {/* Featured Deals Section */}
      <FeaturedDeals products={featuredProducts} />

      {/* Featured Products Section */}
      <FeaturedProducts products={trendingProducts} />

      {/* Store Finder Section */}
      <StoreFinder />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Categories Grid */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Categorías Principales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Abarrotes",
              image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
              href: "/categories/abarrotes"
            },
            {
              title: "Bebidas",
              image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=800",
              href: "/categories/bebidas"
            },
            {
              title: "Limpieza",
              image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800",
              href: "/categories/limpieza"
            }
          ].map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative h-48 overflow-hidden rounded-lg"
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}