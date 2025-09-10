// "@/app/components/shared/map/index.tsx"
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { locations } from '@/app/utils/map/locations'; // ✅ Adjust path as needed
import { LatLngExpression } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

interface MapProps {
  // Pass specific location keys you want to show
  locationKeys?: (keyof typeof locations)[];
  posix?: [number, number];
  // Or pass full data (more flexible)
  positions?: {
    id: string;
    name: string;
    position: LatLngExpression;
    description: string;
    imageUrl: string;
  }[];
  zoom?: number;
  center?: LatLngExpression; // Optional: override default center
}

const Map = ({ 
  locationKeys, 
  positions, 
  center, 
  zoom = 8 
}: MapProps) => {
  // If no positions passed, use selected locationKeys
  const markers = positions 
    ? positions 
    : locationKeys 
      ? locationKeys.map(key => locations[key]) 
      : Object.values(locations); // fallback: show all

  // Use provided center, or center on first marker
  const mapCenter: LatLngExpression = center || markers[0]?.position || [-22.3, 17.5];

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: '600px', width: '900px', borderRadius: '12px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Render all markers */}
      {markers.map((loc) => (
        <Marker position={loc.position} key={loc.id}>
          <Popup>
            <div style={{ maxWidth: '300px', fontFamily: 'Arial, sans-serif', margin: 0 }}>
              <img
                src={loc.imageUrl}
                alt={loc.name}
                style={{
                  width: '100%',
                  height: '140px',
                  objectFit: 'cover',
                  borderRadius: '8px 8px 0 0',
                }}
              />
              <div style={{ padding: '10px' }}>
                <h2 style={{ margin: '0 0 6px 0', fontSize: '1.1em', color: '#1a1a1a' }}>
                  {loc.name}
                </h2>
                <p style={{ 
                  margin: '0', 
                  fontSize: '0.9em', 
                  color: '#444', 
                  lineHeight: '1.5' 
                }}>
                  {loc.description}
                </p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;