import * as React from "react";
import { useState, useMemo } from "react";
import Map, { Source, Layer, Popup } from "react-map-gl/mapbox";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Sparkles, Info, AlertCircle } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

// Mock event data
const events: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: 1,
        title: "Wedding Gala",
        neighborhood: "Beverly Hills",
        intensity: 0.9,
        photo: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600",
      },
      geometry: { type: "Point", coordinates: [-118.4004, 34.0736] },
    },
    {
      type: "Feature",
      properties: {
        id: 2,
        title: "Intimate Soirée",
        neighborhood: "Santa Monica",
        intensity: 0.4,
        photo: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=600",
      },
      geometry: { type: "Point", coordinates: [-118.4912, 34.0195] },
    },
    {
      type: "Feature",
      properties: {
        id: 3,
        title: "Corporate Launch",
        neighborhood: "Downtown LA",
        intensity: 0.7,
        photo: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600",
      },
      geometry: { type: "Point", coordinates: [-118.2437, 34.0407] },
    },
    {
      type: "Feature",
      properties: {
        id: 4,
        title: "Graduation Party",
        neighborhood: "Pasadena",
        intensity: 0.8,
        photo: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=600",
      },
      geometry: { type: "Point", coordinates: [-118.1445, 34.1478] },
    },
    {
      type: "Feature",
      properties: {
        id: 5,
        title: "Beach Wedding",
        neighborhood: "Malibu",
        intensity: 0.95,
        photo: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600",
      },
      geometry: { type: "Point", coordinates: [-118.7798, 34.0259] },
    },
    {
      type: "Feature",
      properties: {
        id: 6,
        title: "Hollywood Premiere",
        neighborhood: "Hollywood",
        intensity: 0.6,
        photo: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600",
      },
      geometry: { type: "Point", coordinates: [-118.3287, 34.0928] },
    },
  ],
};

const heatmapLayer: any = {
  id: "heatmap",
  maxzoom: 15,
  type: "heatmap",
  paint: {
    // Increase the heatmap weight based on frequency and property intensity
    "heatmap-weight": ["interpolate", ["linear"], ["get", "intensity"], 0, 0, 1, 1],
    // Increase the heatmap color weight weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 15, 3],
    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    // Begin color ramp at 0-stop with a 0-transparency color
    // to create a blur-like effect.
    "heatmap-color": [
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      0,
      "rgba(212, 175, 55, 0)",
      0.2,
      "rgba(212, 175, 55, 0.2)",
      0.4,
      "rgba(212, 175, 55, 0.4)",
      0.6,
      "rgba(212, 175, 55, 0.6)",
      0.8,
      "rgba(212, 175, 55, 0.8)",
      1,
      "rgba(212, 175, 55, 1)",
    ],
    // Adjust the heatmap radius by zoom level
    "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 15, 20],
    // Transition from heatmap to circle layer by zoom level
    "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 15, 0],
  },
};

export default function Heatmap() {
  const [hoverInfo, setHoverInfo] = useState<any>(null);
  const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  const onHover = React.useCallback((event: any) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features && features[0];

    setHoverInfo(hoveredFeature ? { feature: hoveredFeature, x, y } : null);
  }, []);

  if (!mapboxToken) {
    return (
      <div id="heatmap" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="bg-white/5 border border-gold/20 p-12 text-center rounded-none backdrop-blur-xl">
          <AlertCircle className="w-12 h-12 text-gold mx-auto mb-6" />
          <h2 className="text-3xl font-serif font-bold mb-4">Mapbox Token Required</h2>
          <p className="text-muted-foreground font-light mb-8 max-w-md mx-auto">
            To view the <span className="text-gold italic">Spatial Portfolio</span>, please provide a Mapbox access token in your environment variables.
          </p>
          <div className="flex justify-center gap-4">
            <code className="bg-black/50 px-4 py-2 rounded text-xs text-gold border border-gold/10">
              VITE_MAPBOX_ACCESS_TOKEN
            </code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="heatmap" className="space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Spatial Portfolio</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold">Nani in the <span className="italic gold-text-gradient">Wild</span></h2>
            <p className="text-muted-foreground font-light max-w-xl leading-relaxed">
              Explore our footprint across Los Angeles. From intimate gatherings in Santa Monica to grand weddings in Malibu, our artisan fleet brings elegance to every corner.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-6 bg-white/5 border-l-2 border-gold">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                <MapPin className="text-gold w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg">Los Angeles & Beyond</h4>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Serving all of Southern California</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 border border-white/5">
                <span className="block text-2xl font-serif font-bold gold-text-gradient">120+</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Events in 2025</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/5">
                <span className="block text-2xl font-serif font-bold gold-text-gradient">15k+</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Cocktails Served</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative aspect-square bg-[#0D0D0D] border border-gold/10 overflow-hidden group">
          <Map
            initialViewState={{
              latitude: 34.0522,
              longitude: -118.2437,
              zoom: 9,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken={mapboxToken}
            interactiveLayerIds={["heatmap"]}
            onMouseMove={onHover}
          >
            <Source type="geojson" data={events}>
              <Layer {...heatmapLayer} />
            </Source>

            <AnimatePresence>
              {hoverInfo && (
                <Popup
                  longitude={hoverInfo.feature.geometry.coordinates[0]}
                  latitude={hoverInfo.feature.geometry.coordinates[1]}
                  anchor="bottom"
                  closeButton={false}
                  closeOnClick={false}
                  className="z-50"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="w-48 overflow-hidden rounded-none border border-gold/30 shadow-2xl rose-glass"
                  >
                    <div className="relative h-24 overflow-hidden">
                      <img 
                        src={hoverInfo.feature.properties.photo} 
                        alt={hoverInfo.feature.properties.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
                    </div>
                    <div className="p-3 bg-obsidian/90">
                      <p className="text-[10px] font-bold text-gold uppercase tracking-widest leading-tight">
                        {hoverInfo.feature.properties.title}
                      </p>
                      <p className="text-[8px] text-muted-foreground uppercase tracking-tighter mt-1">
                        {hoverInfo.feature.properties.neighborhood}, CA
                      </p>
                    </div>
                  </motion.div>
                </Popup>
              )}
            </AnimatePresence>
          </Map>

          {/* Map Overlay Text */}
          <div className="absolute bottom-8 left-8 pointer-events-none">
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold">Live Booking Activity</span>
          </div>
          
          <div className="absolute top-8 right-8 pointer-events-none">
            <div className="flex items-center gap-2 bg-obsidian/60 backdrop-blur-md border border-gold/20 px-3 py-1.5">
              <Sparkles className="w-3 h-3 text-gold" />
              <span className="text-[8px] uppercase tracking-widest text-gold font-bold">Active Hotspots</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
