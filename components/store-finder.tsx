"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Clock, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import storesData from "@/data/products.json";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

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

export default function StoreFinder() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [stores, setStores] = useState<(Store & { distance?: number })[]>(storesData.stores || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          setError("No pudimos obtener tu ubicación");
          setLoading(false);
        }
      );
    } else {
      setError("Tu navegador no soporta geolocalización");
      setLoading(false);
    }
  }, []);

  if (!storesData.stores || storesData.stores.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Nuestras Tiendas</h2>
            <p className="text-gray-600">Encuentra la tienda TEBA más cercana a ti</p>
          </div>
          <Link href="/stores">
            <Button variant="outline" className="hidden md:flex">
              Ver Más Detalles
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            Array(6).fill(0).map((_, i) => (
              <Card key={i} className="h-[250px]">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : error ? (
            <Card className="col-span-full">
              <CardContent className="p-4 text-center text-red-600">
                {error}
              </CardContent>
            </Card>
          ) : (
            stores.map((store) => (
              <Card
                key={store.name}
                className="hover:shadow-lg transition-shadow duration-300 h-[250px] flex flex-col"
              >
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-[#027046] line-clamp-1">
                        {store.name}
                      </h3>
                      <Badge
                        variant={isStoreOpen(store.hours) ? "default" : "secondary"}
                        className={isStoreOpen(store.hours) ? "bg-green-500" : ""}
                      >
                        {isStoreOpen(store.hours) ? "Abierto" : "Cerrado"}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-[#027046] flex-shrink-0" />
                        <span className="line-clamp-2">{store.address}</span>
                      </p>
                      {store.distance && (
                        <p className="flex items-center">
                          <Navigation className="h-4 w-4 mr-2 text-[#027046] flex-shrink-0" />
                          {store.distance.toFixed(1)} km
                        </p>
                      )}
                      <p className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-[#027046] flex-shrink-0" />
                        <span className="line-clamp-1">{store.hours}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      className="flex-1 bg-[#027046] hover:bg-[#025a38]"
                      onClick={() => {
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
                      onClick={() => {
                        window.open(
                          `https://wa.me/${store.whatsapp.replace(/[^0-9]/g, '')}`,
                          '_blank'
                        );
                      }}
                    >
                      WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="text-center mt-6">
          <Link href="/stores" className="md:hidden">
            <Button variant="outline">Ver Más Detalles</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}