"use client";

import { Button } from "@/components/ui/button";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PdfControlsProps {
  currentPage: number;
  numPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export function PdfControls({
  currentPage,
  numPages,
  onPrevPage,
  onNextPage,
}: PdfControlsProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
      <Link href="/">
        <Button variant="ghost" className="text-[#027046]">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Button>
      </Link>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Página {currentPage} de {numPages}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onPrevPage}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={onNextPage}
            disabled={currentPage >= numPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <a href="/catalogo.pdf" download>
          <Button className="bg-[#027046] hover:bg-[#025a38]">
            <Download className="mr-2 h-4 w-4" />
            Descargar Catálogo
          </Button>
        </a>
      </div>
    </div>
  );
}