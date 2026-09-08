import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon URLs in bundled apps
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export const JharkhandMap = ({ 
  challenges = [], 
  selectedChallengeId = null, 
  onSelectChallenge = null,
  isPickerMode = false,
  pickedLocation = null,
  onLocationPick = null,
  height = "320px",
  showLegend = true,
  center = [23.3650, 85.3300], // Ranchi center by default
  zoom = 12
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const pickerMarkerRef = useRef(null);

  // Category visual styles matching the reference image exactly
  const getCategoryMarkerConfig = (cat) => {
    switch (cat) {
      case 'Water':
        return { bg: '#0284c7', symbol: '💧', label: 'Water' };
      case 'Sanitation':
        return { bg: '#0d9488', symbol: '🔵', label: 'Sanitation' };
      case 'Road':
      case 'Urban Infrastructure':
        return { bg: '#16a34a', symbol: '🟢', label: 'Road' };
      case 'Electricity':
      case 'Energy':
        return { bg: '#d97706', symbol: '⚠️', label: 'Electricity' };
      case 'Education':
        return { bg: '#9333ea', symbol: '🟣', label: 'Education' };
      case 'Healthcare':
        return { bg: '#e11d48', symbol: '❤️', label: 'Healthcare' };
      default:
        return { bg: '#475569', symbol: '⚫', label: 'Others' };
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: true,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap | Samadhan Setu',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;

      // Handle map clicks in picker mode
      map.on('click', (e) => {
        if (onLocationPick) {
          onLocationPick({
            lat: parseFloat(e.latlng.lat.toFixed(5)),
            lng: parseFloat(e.latlng.lng.toFixed(5))
          });
        }
      });
    }

    return () => {
      // safe cleanup
    };
  }, []);

  // Update Markers when challenges change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous markers
    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    if (isPickerMode) {
      if (pickedLocation) {
        if (pickerMarkerRef.current) {
          map.removeLayer(pickerMarkerRef.current);
        }
        const pinIcon = L.divIcon({
          className: 'custom-pin-marker',
          html: `<div style="background-color: #1a73e8; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 15px;">📍</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

        const marker = L.marker([pickedLocation.lat, pickedLocation.lng], { icon: pinIcon }).addTo(map);
        marker.bindPopup(`<strong>Selected Village/Block Location:</strong><br/>Lat: ${pickedLocation.lat}, Lng: ${pickedLocation.lng}`).openPopup();
        pickerMarkerRef.current = marker;
        map.setView([pickedLocation.lat, pickedLocation.lng], 13);
      }
      return;
    }

    // Normal Mode: Add custom category pins
    challenges.forEach(ch => {
      if (!ch.locationCoordinates || !ch.locationCoordinates.lat) return;

      const catConfig = getCategoryMarkerConfig(ch.category);

      const customIcon = L.divIcon({
        className: 'custom-map-category-pin',
        html: `
          <div style="
            background: ${catConfig.bg};
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 2.5px solid #ffffff;
            box-shadow: 0 3px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            cursor: pointer;
            transition: transform 0.2s;
          " onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">
            ${catConfig.symbol}
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([ch.locationCoordinates.lat, ch.locationCoordinates.lng], { icon: customIcon }).addTo(map);

      // Clean Popup Content
      const popupHtml = `
        <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 210px; padding: 4px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <span style="background: #f1f5f9; color: #334155; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px;">${ch.category}</span>
            <span style="color: #0284c7; font-size: 10px; font-weight: 700; font-family: monospace;">${ch.id}</span>
          </div>
          <h4 style="font-size: 12px; font-weight: 700; margin: 0 0 4px 0; color: #0f172a; line-height: 1.3;">${ch.title}</h4>
          <p style="font-size: 11px; color: #64748b; margin: 0 0 6px 0;">📍 ${ch.village || ch.block || 'Ranchi'}, ${ch.district}</p>
          <div style="font-size: 11px; color: #1e293b; margin-bottom: 8px; display: flex; justify-content: space-between;">
            <span>👥 <strong>${ch.supportingCitizensCount || ch.affectedPopulation || 1}</strong> affected</span>
            <span style="color: #059669; font-weight: 600;">${ch.status}</span>
          </div>
          <button id="map-view-btn-${ch.id}" style="
            width: 100%;
            background: #1a73e8;
            color: #ffffff;
            border: none;
            padding: 6px 10px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: 700;
            cursor: pointer;
          ">
            View Problem →
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`map-view-btn-${ch.id}`);
        if (btn && onSelectChallenge) {
          btn.onclick = () => onSelectChallenge(ch.id);
        }
      });

      markersRef.current.push(marker);
    });

  }, [challenges, pickedLocation, isPickerMode, onSelectChallenge]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-slate-50 flex flex-col">
      <div 
        ref={mapContainerRef} 
        style={{ height }}
        className="w-full relative z-0"
      />
      {isPickerMode && (
        <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 shadow-md">
          👆 Click on map to pinpoint exact location in Ranchi / Jharkhand
        </div>
      )}

      {/* Category Legend Bar at Bottom matching the Reference Image */}
      {showLegend && !isPickerMode && (
        <div className="bg-white border-t border-slate-200 px-3 py-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] font-medium text-slate-600">
          <span className="flex items-center gap-1">
            <span>💧</span> <span>Water</span>
          </span>
          <span className="flex items-center gap-1">
            <span>🔵</span> <span>Sanitation</span>
          </span>
          <span className="flex items-center gap-1">
            <span>🟢</span> <span>Road</span>
          </span>
          <span className="flex items-center gap-1">
            <span>⚠️</span> <span>Electricity</span>
          </span>
          <span className="flex items-center gap-1">
            <span>🟣</span> <span>Education</span>
          </span>
          <span className="flex items-center gap-1">
            <span>⚫</span> <span>Others</span>
          </span>
        </div>
      )}
    </div>
  );
};
