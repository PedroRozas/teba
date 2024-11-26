"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { useEffect, useRef } from "react";

interface Store {
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface MapProps {
  stores: Store[];
  userLocation: { lat: number; lng: number } | null;
  selectedStore: number;
  onStoreSelect: (index: number) => void;
}

const storeIcon = new Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const userIcon = new Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Map({ stores, userLocation, selectedStore, onStoreSelect }: MapProps) {
  const mapRef = useRef<any>(null);
  const center = userLocation || { lat: stores[0].coordinates.lat, lng: stores[0].coordinates.lng };

  useEffect(() => {
    if (mapRef.current && stores[selectedStore]) {
      mapRef.current.setView(
        [stores[selectedStore].coordinates.lat, stores[selectedStore].coordinates.lng],
        13
      );
    }
  }, [selectedStore, stores]);

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>Tu ubicación</Popup>
        </Marker>
      )}

      {stores.map((store, index) => (
        <Marker
          key={store.name}
          position={[store.coordinates.lat, store.coordinates.lng]}
          icon={storeIcon}
          eventHandlers={{
            click: () => onStoreSelect(index),
          }}
        >
          <Popup>{store.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}