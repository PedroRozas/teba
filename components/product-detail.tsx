"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package, Truck, Shield } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/store/cart";
import { useToast } from "@/components/ui/use-toast";

interface ProductDetailProps {
  product: {
    name: string;
    brand: string;
    price: string;
    image: string;
    category: string;
  };
}

export default function ProductDetail({ product }: ProductDetailProps) {
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
          </div>

          <div className="space-y-6">
            <div>
              <Badge className="mb-2 bg-[#027046]">{product.brand}</Badge>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-4xl font-bold text-[#027046]">{product.price}</p>
            </div>

            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full bg-[#027046] hover:bg-[#025a38]"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Agregar al Carrito
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              <div className="flex items-center space-x-3 text-sm">
                <Package className="h-5 w-5 text-[#027046]" />
                <span>Retiro en tienda</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Truck className="h-5 w-5 text-[#027046]" />
                <span>Envío a domicilio</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Shield className="h-5 w-5 text-[#027046]" />
                <span>Garantía de calidad</span>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-4">
                Descripción del Producto
              </h2>
              <p className="text-gray-600">
                {product.name} de la marca {product.brand}. Producto de alta
                calidad disponible en nuestras tiendas TEBA. Ideal para tu hogar o
                negocio.
              </p>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-4">Especificaciones</h2>
              <dl className="grid grid-cols-1 gap-4">
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-gray-600">Marca</dt>
                  <dd className="font-medium">{product.brand}</dd>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-gray-600">Categoría</dt>
                  <dd className="font-medium">{product.category}</dd>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-gray-600">Stock</dt>
                  <dd className="font-medium">Disponible</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}