"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Truck, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  Users, 
  Store,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Truck,
    title: "Envío Rápido",
    description: "Entrega el mismo día en pedidos realizados antes de las 13:00 hrs"
  },
  {
    icon: ShieldCheck,
    title: "Garantía de Calidad",
    description: "Todos nuestros productos están garantizados y certificados"
  },
  {
    icon: Clock,
    title: "Horario Extendido",
    description: "Nuestras tiendas abren todos los días para tu comodidad"
  },
  {
    icon: CreditCard,
    title: "Pagos Seguros",
    description: "Múltiples métodos de pago y transacciones seguras"
  },
  {
    icon: Users,
    title: "Atención Personalizada",
    description: "Personal capacitado para asesorarte en tus compras"
  },
  {
    icon: Store,
    title: "Múltiples Sucursales",
    description: "Encuentra tu tienda TEBA más cercana"
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">¿Por qué elegir TEBA?</h2>
          <p className="text-gray-600">
            Nos esforzamos por brindarte la mejor experiencia de compra con productos 
            de calidad y un servicio excepcional
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card 
              key={benefit.title}
              className="hover:shadow-lg transition-shadow duration-300 group"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#027046]/10 rounded-lg p-3 group-hover:bg-[#027046] transition-colors duration-300">
                    <benefit.icon className="h-6 w-6 text-[#027046] group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-[#027046] rounded-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para comenzar a ahorrar?
            </h3>
            <p className="mb-8 text-white/90">
              Únete a miles de clientes satisfechos que confían en TEBA para sus compras diarias. 
              Descubre nuestras ofertas especiales y productos de calidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/stores">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Encuentra tu Tienda
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/catalog">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto text-black border-white hover:bg-white hover:text-[#027046]"
                >
                  Ver Catálogo Digital
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}