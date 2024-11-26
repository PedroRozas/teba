"use client";

import { useEffect, useRef, useState } from "react";
import { PDFDocumentProxy } from "pdfjs-dist";
import { useResizeObserver } from "@/hooks/use-resize-observer";

interface PdfCanvasProps {
  pdfDoc: PDFDocumentProxy;
  pageNumber: number;
  onError: (error: string) => void;
}

export function PdfCanvas({ pdfDoc, pageNumber, onError }: PdfCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const { width: containerWidth } = useResizeObserver(containerRef);

  useEffect(() => {
    let isMounted = true;
    let currentPage: any = null;

    const renderPage = async () => {
      if (!canvasRef.current || !containerRef.current) return;

      try {
        // Clean up previous page
        if (currentPage) {
          currentPage.cleanup();
        }

        // Get the page
        currentPage = await pdfDoc.getPage(pageNumber);
        
        if (!isMounted) {
          currentPage.cleanup();
          return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d", { 
          alpha: false,
          willReadFrequently: true
        });
        
        if (!context) {
          throw new Error("Could not get canvas context");
        }

        // Calculate scale to fit container width with padding
        const padding = 32;
        const availableWidth = (containerWidth || containerRef.current.clientWidth) - padding;
        const viewport = currentPage.getViewport({ scale: 1 });
        const newScale = availableWidth / viewport.width;
        
        if (newScale !== scale) {
          setScale(newScale);
        }

        const scaledViewport = currentPage.getViewport({ scale: newScale });

        // Set canvas dimensions
        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;
        canvas.style.width = `${scaledViewport.width}px`;
        canvas.style.height = `${scaledViewport.height}px`;

        // Clear canvas
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Render with higher quality
        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
          enableWebGL: true,
          renderInteractiveForms: true,
        };

        try {
          await currentPage.render(renderContext).promise;
        } catch (renderError) {
          console.error("Render error:", renderError);
          if (isMounted) {
            onError("Error al renderizar la página. Intente recargar.");
          }
        }

      } catch (err) {
        console.error("Error in renderPage:", err);
        if (isMounted) {
          onError("Error al procesar la página. Por favor, intente nuevamente.");
        }
      }
    };

    renderPage();

    return () => {
      isMounted = false;
      if (currentPage) {
        currentPage.cleanup();
      }
    };
  }, [pdfDoc, pageNumber, containerWidth, scale, onError]);

  return (
    <div 
      ref={containerRef}
      className="bg-white rounded-lg shadow-lg p-4 overflow-auto min-h-[600px]"
    >
      <canvas 
        ref={canvasRef}
        className="mx-auto"
      />
    </div>
  );
}