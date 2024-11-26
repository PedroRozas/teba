"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  Star, 
  StarHalf,
  TrendingUp,
  Truck,
  Clock,
  Shield
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/store/cart";
import Image from "next/image";
import Link from "next/link";

interface Product {
  name: string;
  brand: string;
  price: string;
  image: string;
  link: string;
  rating?: number;
  reviews?: number;
  stock?: number;
  trending?: boolean;
}

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.name,
      name: product.name,
      price: product.price,
      brand: product.brand,
      image: product.image,
      quantity: 1,
    });

    toast({
      title: "Producto agregado",
      description: `${product.name} ha sido agregado al carrito`,
      duration: 2000,
    });
  };

  const renderRatingStars = (rating: number = 5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    return stars;
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Productos Destacados</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra selección de productos más populares, elegidos por su calidad 
            y preferencia entre nuestros clientes
          </p>
        </div>

        {/* Product Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Truck,
              title: "Envío Gratis",
              description: "En compras sobre $30.000"
            },
            {
              icon: Clock,
              title: "Entrega Rápida",
              description: "Recibe hoy en Santiago"
            },
            {
              icon: Shield,
              title: "Compra Segura",
              description: "Garantía de satisfacción"
            }
          ].map((benefit) => (
            <div 
              key={benefit.title}
              className="flex items-center gap-4 bg-gray-50 rounded-lg p-4"
            >
              <div className="bg-[#027046]/10 rounded-lg p-3">
                <benefit.icon className="h-6 w-6 text-[#027046]" />
              </div>
              <div>
                <h3 className="font-semibold">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card 
              key={product.name}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative">
                {product.trending && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-orange-500">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  </div>
                )}
                {product.stock && product.stock <= 5 && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge variant="destructive">
                      ¡Últimas {product.stock} unidades!
                    </Badge>
                  </div>
                )}
                <Link href={product.link}>
                  <div className="relative h-48 bg-white">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>
              </div>

              <div className="p-4">
                {/* Brand */}
                <Badge variant="secondary" className="mb-2">
                  {product.brand}
                </Badge>

                {/* Product Name */}
                <Link href={product.link}>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-[#027046] transition-colors">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {renderRatingStars(product.rating)}
                    </div>
                    {product.reviews && (
                      <span className="text-sm text-gray-500">
                        ({product.reviews})
                      </span>
                    )}
                  </div>
                )}

                {/* Price and Action */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-[#027046]">
                    {product.price}
                  </span>
                  <Button
                    size="sm"
                    className="bg-[#027046] hover:bg-[#025a38]"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link href="/products">
            <Button 
              variant="outline" 
              size="lg"
              className="hover:bg-[#027046] hover:text-white"
            >
              Ver Todos los Productos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}