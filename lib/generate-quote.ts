"use client";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";
import autoTable from "jspdf-autotable";

interface QuoteData {
  items: Array<{
    name: string;
    brand: string;
    price: string;
    quantity: number;
  }>;
  total: number;
  clientInfo: {
    name: string;
    email: string;
    phone: string;
    rut: string;
    company?: string;
  };
  date: Date;
}

export async function generateQuotePDF(data: QuoteData) {
  try {
    const doc = new jsPDF();

    // Add logo - using local file
    try {
      doc.addImage(
        "data:image/png;base64,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",
        "PNG",
        15,
        15,
        30,
        30,
        undefined,
        'FAST'
      );
    } catch (error) {
      console.warn("Could not load logo, continuing without it");
    }

    // Company info
    doc.setFontSize(20);
    doc.setTextColor(2, 112, 70); // #027046
    doc.text("Cotización", 50, 30);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("TEBA SpA", 50, 40);
    doc.text("RUT: 76.XXX.XXX-X", 50, 45);
    doc.text("ventas@teba.cl", 50, 50);
    doc.text("+56 2 2123 4567", 50, 55);

    // Quote info
    const quoteNumber = `COT-${format(data.date, "yyyyMMdd")}-${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`;
    doc.text(`Nº: ${quoteNumber}`, 150, 30);
    doc.text(`Fecha: ${format(data.date, "dd/MM/yyyy")}`, 150, 35);

    // Client info
    doc.setFontSize(12);
    doc.text("Datos del Cliente", 15, 70);
    doc.setFontSize(10);
    doc.text(`Nombre: ${data.clientInfo.name}`, 15, 80);
    doc.text(`RUT: ${data.clientInfo.rut}`, 15, 85);
    doc.text(`Email: ${data.clientInfo.email}`, 15, 90);
    doc.text(`Teléfono: ${data.clientInfo.phone}`, 15, 95);
    if (data.clientInfo.company) {
      doc.text(`Empresa: ${data.clientInfo.company}`, 15, 100);
    }

    // Products table
    const tableData = data.items.map((item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ""));
      return [
        item.name,
        item.brand,
        item.quantity.toString(),
        item.price,
        `$${(price * item.quantity).toLocaleString("es-CL")}`,
      ];
    });

    autoTable(doc, {
      startY: data.clientInfo.company ? 110 : 105,
      head: [["Producto", "Marca", "Cantidad", "Precio Unit.", "Total"]],
      body: tableData,
      theme: "striped",
      headStyles: { fillColor: [2, 112, 70] },
      styles: { fontSize: 8 },
    });

    // Totals
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    const subtotal = data.total / 1.19;
    const iva = data.total - subtotal;

    doc.text("Subtotal:", 140, finalY);
    doc.text(
      `$${Math.round(subtotal).toLocaleString("es-CL")}`,
      170,
      finalY,
      { align: "right" }
    );
    
    doc.text("IVA (19%):", 140, finalY + 5);
    doc.text(
      `$${Math.round(iva).toLocaleString("es-CL")}`,
      170,
      finalY + 5,
      { align: "right" }
    );
    
    doc.setFontSize(12);
    doc.text("Total:", 140, finalY + 12);
    doc.text(
      `$${Math.round(data.total).toLocaleString("es-CL")}`,
      170,
      finalY + 12,
      { align: "right" }
    );

    // Validity note
    doc.setFontSize(8);
    doc.setTextColor(255, 0, 0);
    doc.text(
      `* Esta cotización es válida solo por el día de hoy (${format(
        data.date,
        "dd/MM/yyyy"
      )}).`,
      15,
      finalY + 25
    );

    // Footer
    doc.setTextColor(100);
    doc.text("TEBA - Tu Tienda de Confianza", 105, 280, { align: "center" });
    doc.text(
      "Av. Principal 123, Santiago | ventas@teba.cl | +56 2 2123 4567",
      105,
      285,
      { align: "center" }
    );

    // Save the PDF
    doc.save(`cotizacion-teba-${format(data.date, "yyyy-MM-dd")}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("No se pudo generar la cotización. Por favor, intente nuevamente.");
  }
}