"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/cart";

interface ProductCardProps {
  product: {
    name: string;
    brand: string;
    price: string;
    image: string;
    link: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
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

  return (
    <Card className="group h-[400px] flex flex-col hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="relative flex-1 min-h-0">
          <Link href={product.link} className="block h-full">
            <div className="relative h-48 mb-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </Link>
          <Button
            onClick={handleAddToCart}
            className="absolute top-2 right-2 bg-white/90 hover:bg-white text-[#027046] h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            size="icon"
            variant="secondary"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-auto space-y-3">
          <Badge className="bg-[#027046] mb-2">{product.brand}</Badge>
          <Link href={product.link}>
            <h3 className="font-semibold text-lg group-hover:text-[#027046] line-clamp-2 min-h-[56px] transition-colors duration-300">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center justify-between pt-2">
            <p className="text-2xl font-bold text-[#027046]">{product.price}</p>
            <Button
              onClick={handleAddToCart}
              className="bg-[#027046] hover:bg-[#025a38] transition-colors duration-300"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Agregar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}