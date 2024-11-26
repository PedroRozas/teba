"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Timer, Percent } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/store/cart";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Product {
  name: string;
  brand: string;
  price: string;
  originalPrice: string;
  discount: number;
  image: string;
  link: string;
  stock: number;
}

interface FeaturedDealsProps {
  products: any[];
}

export function FeaturedDeals({ products }: FeaturedDealsProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  if (!products.length) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-[#027046] text-white rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Percent className="h-8 w-8" />
                Ofertas Destacadas
              </h2>
              <p className="text-white/90">
                ¡No te pierdas estas increíbles ofertas por tiempo limitado!
              </p>
            </div>
            <div className="bg-white/10 rounded-lg px-6 py-3 flex items-center gap-3">
              <Timer className="h-6 w-6" />
              <div>
                <p className="text-sm mb-1">Termina en</p>
                <p className="text-2xl font-bold tracking-wider">
                  {String(timeLeft.hours).padStart(2, "0")}:
                  {String(timeLeft.minutes).padStart(2, "0")}:
                  {String(timeLeft.seconds).padStart(2, "0")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              key={product.name}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative">
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-red-500 text-white font-bold px-3 py-1">
                    -{product.discount}%
                  </Badge>
                </div>
                
                {/* Stock Badge */}
                {product.stock <= 10 && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge variant="secondary" className="bg-yellow-500 text-white">
                      ¡Últimas {product.stock} unidades!
                    </Badge>
                  </div>
                )}

                {/* Product Image */}
                <Link href={product.link}>
                  <div className="relative h-64 overflow-hidden bg-white">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>
              </div>

              <div className="p-6">
                {/* Product Info */}
                <Link href={product.link}>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-[#027046] transition-colors duration-300 line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                <Badge className="mb-4 bg-[#027046]">{product.brand}</Badge>

                {/* Price Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#027046]">
                      {product.price}
                    </span>
                    <span className="text-gray-500 line-through">
                      {product.originalPrice}
                    </span>
                  </div>
                  <p className="text-sm text-green-600 font-medium">
                    ¡Ahorras{" "}
                    {(
                      parseInt(product.originalPrice.replace(/[^0-9]/g, "")) -
                      parseInt(product.price.replace(/[^0-9]/g, ""))
                    ).toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                    !
                  </p>
                </div>

                {/* Add to Cart Button */}
                <Button
                  className="w-full mt-4 bg-[#027046] hover:bg-[#025a38] transition-colors duration-300"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Agregar al Carrito
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}