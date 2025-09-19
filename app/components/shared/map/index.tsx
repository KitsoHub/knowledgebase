// app/components/shared/map/index.tsx
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { CulturalSite } from '@/lib/types/culturalSites';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

interface MapProps {
  sites: CulturalSite[];
  center?: LatLngExpression;
  zoom?: number;
}

export default function SiteMap({ 
  sites, 
  center = [0, 0], 
  zoom = 3 
}: MapProps) {
  const mapCenter = sites.length > 0 
    ? [sites[0].latitude, sites[0].longitude]
    : center;

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%', borderRadius: '12px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {sites.map((site) => (
        <Marker 
          position={[site.latitude, site.longitude]} 
          key={site.id}
        >
          <Popup>
            <div style={{ maxWidth: '300px', fontFamily: 'Arial, sans-serif', margin: 0 }}>
              <img
                src={site.images[0]}
                alt={site.name}
                style={{
                  width: '100%',
                  height: '140px',
                  objectFit: 'cover',
                  borderRadius: '8px 8px 0 0',
                }}
              />
              <div style={{ padding: '10px' }}>
                <h2 style={{ margin: '0 0 6px 0', fontSize: '1.1em', color: '#1a1a1a' }}>
                  {site.name}
                </h2>
                <p style={{ 
                  margin: '0', 
                  fontSize: '0.9em', 
                  color: '#444', 
                  lineHeight: '1.5' 
                }}>
                {site.description.substring(0, 120)}...
              </p>
              <div style={{ fontSize: '0.8em', color: '#666' }}>
                {site.language && <div>🗣️ {site.language}</div>}
                {site.tribe && <div>👥 {site.tribe}</div>}
              </div>
              </div>
            </div>
          </Popup>
         
        </Marker>
      ))}
    </MapContainer>
  );
}