"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Clock, Phone, ShoppingBag, Truck, Users, Store as StoreIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import storesData from "@/data/products.json";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import Link from "next/link";
import "leaflet/dist/leaflet.css";

const Map = dynamic(
  () => import("@/components/map"), 
  { 
    loading: () => <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg" />,
    ssr: false
  }
);

interface Store {
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  hours: string;
  whatsapp: string;
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function isStoreOpen(hours: string): boolean {
  const now = new Date();
  const [start, end] = hours.split(" – ").map(time => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    return date;
  });
  return now >= start && now <= end;
}

export default function StoresPage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [stores, setStores] = useState<(Store & { distance?: number })[]>(storesData.stores || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<number>(0);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          if (storesData.stores) {
            const storesWithDistance = storesData.stores.map(store => ({
              ...store,
              distance: calculateDistance(
                latitude,
                longitude,
                store.coordinates.lat,
                store.coordinates.lng
              )
            })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
            
            setStores(storesWithDistance);
          }
          setLoading(false);
        },
        (error) => {
          setError("No pudimos obtener tu ubicación. Por favor, verifica los permisos de ubicación.");
          setLoading(false);
        }
      );
    } else {
      setError("Tu navegador no soporta geolocalización.");
      setLoading(false);
    }
  }, []);

  if (!storesData.stores || storesData.stores.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>No hay tiendas disponibles en este momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Nuestras Tiendas</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Encuentra tu tienda TEBA más cercana y descubre todos nuestros productos y servicios. 
            Estamos comprometidos con brindarte la mejor experiencia de compra.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: ShoppingBag,
              title: "Amplio Catálogo",
              description: "Miles de productos para todas tus necesidades"
            },
            {
              icon: Truck,
              title: "Despacho a Domicilio",
              description: "Entrega rápida y segura en toda la región"
            },
            {
              icon: Users,
              title: "Atención Personalizada",
              description: "Personal capacitado para asesorarte"
            },
            {
              icon: StoreIcon,
              title: "Tiendas Modernas",
              description: "Espacios amplios y bien organizados"
            }
          ].map((benefit, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <benefit.icon className="h-8 w-8 mx-auto mb-4 text-[#027046]" />
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
            {!loading && !error && stores.length > 0 && (
              <Map
                stores={stores}
                userLocation={userLocation}
                selectedStore={selectedStore}
                onStoreSelect={setSelectedStore}
              />
            )}
          </div>

          {/* Stores List */}
          <div className="space-y-4 overflow-auto max-h-[600px] pr-2">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="border shadow-md">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <Skeleton className="h-6 w-48" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-72" />
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : error ? (
              <Card>
                <CardContent className="p-6 text-center text-red-600">
                  <p>{error}</p>
                </CardContent>
              </Card>
            ) : (
              stores.map((store, index) => (
                <Card
                  key={store.name}
                  className={`transition-all duration-300 cursor-pointer hover:shadow-lg ${
                    selectedStore === index
                      ? "ring-2 ring-[#027046] shadow-lg"
                      : ""
                  }`}
                  onClick={() => setSelectedStore(index)}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-[#027046]">
                          {store.name}
                        </h3>
                        <Badge
                          variant={isStoreOpen(store.hours) ? "default" : "secondary"}
                          className={isStoreOpen(store.hours) ? "bg-green-500" : ""}
                        >
                          {isStoreOpen(store.hours) ? "Abierto" : "Cerrado"}
                        </Badge>
                      </div>

                      <div className="space-y-3 text-gray-600">
                        <p className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-[#027046]" />
                          {store.address}
                        </p>
                        {store.distance && (
                          <p className="flex items-center">
                            <Navigation className="h-4 w-4 mr-2 text-[#027046]" />
                            {store.distance.toFixed(1)} km de distancia
                          </p>
                        )}
                        <p className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-[#027046]" />
                          {store.phone}
                        </p>
                        <p className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-[#027046]" />
                          {store.hours}
                        </p>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          className="flex-1 bg-[#027046] hover:bg-[#025a38]"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(
                              `https://www.google.com/maps/dir/?api=1&destination=${store.coordinates.lat},${store.coordinates.lng}`,
                              '_blank'
                            );
                          }}
                        >
                          Cómo Llegar
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(
                              `https://wa.me/${store.whatsapp.replace(/[^0-9]/g, '')}`,
                              '_blank'
                            );
                          }}
                        >
                          WhatsApp
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-[#027046] text-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">¿Necesitas ayuda con tus compras?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Nuestro equipo está listo para asistirte. Contáctanos o visita tu tienda más cercana 
            para recibir atención personalizada.
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg">
              Contactar Ahora
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}