"use client";

import { useState } from "react";
import { 
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useCart } from "@/store/cart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QuoteForm } from "./quote-form";
import { generateQuotePDF } from "@/lib/generate-quote";

export function CartSheet() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleGenerateQuote = async (formData: any) => {
    try {
      setIsGenerating(true);

      const quoteData = {
        items: items.map(item => ({
          ...item,
          price: item.price,
          quantity: item.quantity
        })),
        total: total(),
        clientInfo: formData,
        date: new Date()
      };

      await generateQuotePDF(quoteData);

      toast({
        title: "¡Cotización generada!",
        description: "Tu cotización ha sido descargada exitosamente.",
        duration: 3000,
      });

      setShowForm(false);
      clearCart();
      
      toast({
        title: "Carrito vaciado",
        description: "El carrito ha sido vaciado automáticamente",
        duration: 3000,
      });

    } catch (error) {
      console.error("Error al generar la cotización:", error);
      toast({
        title: "Error",
        description: "No se pudo generar la cotización. Intenta nuevamente.",
        duration: 3000,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (items.length === 0) {
    return (
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrito de Compras</SheetTitle>
        </SheetHeader>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-center text-gray-500">
            Tu carrito está vacío
          </p>
        </div>
      </SheetContent>
    );
  }

  return (
    <SheetContent className="w-full sm:max-w-lg">
      <SheetHeader>
        <SheetTitle>Carrito de Compras</SheetTitle>
      </SheetHeader>
      
      <ScrollArea className="flex-1 -mx-6 px-6">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 py-2 border-b"
            >
              <div className="relative h-16 w-16 rounded overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.brand}</p>
                <p className="text-sm font-semibold text-[#027046]">
                  {item.price}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t pt-4 space-y-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${total().toLocaleString('es-CL')}</span>
        </div>
        <div className="space-y-2">
          <Button
            className="w-full bg-[#027046] hover:bg-[#025a38] flex items-center justify-center"
            onClick={() => setShowForm(true)}
            disabled={isGenerating}
          >
            <FileText className="mr-2 h-4 w-4" />
            Solicitar Cotización
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              clearCart();
              toast({
                title: "Carrito vaciado",
                description: "Se han eliminado todos los productos del carrito",
                duration: 2000,
              });
            }}
          >
            Vaciar Carrito
          </Button>
        </div>
      </div>

      <QuoteForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleGenerateQuote}
        isLoading={isGenerating}
      />
    </SheetContent>
  );
}