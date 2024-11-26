"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageCircle, MapPin, ChevronDown } from "lucide-react";
import storesData from "@/data/products.json";

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleStoreClick = (whatsapp: string) => {
    const cleanNumber = whatsapp.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${cleanNumber}`, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            size="lg"
            className="bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg group"
          >
            <MessageCircle className="h-5 w-5 mr-2 group-hover:animate-bounce" />
            WhatsApp
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-72 p-2 bg-white rounded-lg shadow-xl"
        >
          <div className="px-2 py-1.5 text-sm font-semibold text-gray-500">
            Selecciona una tienda
          </div>
          {storesData.stores.map((store) => (
            <DropdownMenuItem
              key={store.name}
              className="flex flex-col items-start px-2 py-2 cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
              onClick={() => handleStoreClick(store.whatsapp)}
            >
              <div className="font-medium text-[#027046]">{store.name}</div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="line-clamp-1">{store.address}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}