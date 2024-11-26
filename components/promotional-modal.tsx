"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Timer, ShoppingCart, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/cart";
import { useToast } from "@/components/ui/use-toast";
import productsData from "@/data/products.json";

export function PromotionalModal() {
  const [open, setOpen] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();
  const featuredProducts = productsData.products.filter(product => product.featured).slice(0, 2);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenPromoModal");
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setOpen(true);
        localStorage.setItem("hasSeenPromoModal", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAddToCart = (product: any) => {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-[#027046] to-[#025a38] p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              ¡Ofertas Especiales de la Semana!
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center gap-2 mt-2 text-white/90">
            <Timer className="h-5 w-5" />
            <p>Ofertas válidas hasta agotar stock</p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {featuredProducts.map((product) => (
              <div
                key={product.name}
                className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative mb-3">
                  {product.discount && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      -{product.discount}%
                    </Badge>
                  )}
                  <div className="relative h-32">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-[#027046]">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
                <Button
                  className="w-full bg-[#027046] hover:bg-[#025a38]"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link href="/catalog">
              <Button variant="outline" className="gap-2">
                Ver Catálogo Completo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}