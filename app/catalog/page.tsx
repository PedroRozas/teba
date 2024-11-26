"use client";

import { useState, useEffect } from "react";
import  HTMLFlipBook  from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.14.305/build/pdf.worker.min.js';

export default function CatalogPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pages, setPages] = useState<string[]>([]);

    useEffect(() => {
        const loadPDF = async () => {
            try {
                setLoading(true);
                setError(null);

                const pdfUrl = encodeURI("/catalogo-2.pdf");
                const pdf = await pdfjsLib.getDocument(pdfUrl).promise;

                const generatedPages: string[] = [];
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);

                    const viewport = page.getViewport({ scale: 2 });
                    const canvas = document.createElement("canvas");
                    const context = canvas.getContext("2d");

                    canvas.width = viewport.width;
                    canvas.height = viewport.height;

                    await page.render({ canvasContext: context!, viewport }).promise;

                    const imgData = canvas.toDataURL();
                    generatedPages.push(imgData);
                }

                setPages(generatedPages);
            } catch (err) {
                console.error("Error loading PDF:", err);
                setError(`No se pudo cargar el catálogo. Detalles:`);
            } finally {
                setLoading(false);
            }
        };

        loadPDF();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#027046] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando catálogo...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-[#027046] hover:bg-[#025a38] px-4 py-2 rounded text-white"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    // @ts-ignore
    return (
        <div className="container mx-auto px-4 py-8">
            <HTMLFlipBook
                width={800}
                height={600}
                showCover={true}
                size="stretch"
                minWidth={400}
                maxWidth={1200}
                minHeight={500}
                maxHeight={800}
                maxShadowOpacity={0.5}
                drawShadow={true}
                useMouseEvents={true}
                startPage={0}
                flippingTime={500}
                usePortrait={true}
                startZIndex={0}
                autoSize={true}
                style={{
                    margin: "auto",
                    border: "1px solid #ccc",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
                className="mx-auto shadow-lg"
                mobileScrollSupport={false} // Deshabilita el scroll en móviles mientras se usa el flipbook
                clickEventForward={true} // Permite que los eventos de clic pasen a través del flipbook
                swipeDistance={30} // Distancia mínima para detectar un gesto de swipe
                showPageCorners={true} // Muestra esquinas interactivas de las páginas
                disableFlipByClick={false} // Habilita el volteo de páginas al hacer clic
            >
                {pages.map((page, index) => (
                    <div key={index} className="page">
                        <img src={page} alt={`Page ${index + 1}`} className="w-full h-full" />
                    </div>
                ))}
            </HTMLFlipBook>
        </div>
    );
}
