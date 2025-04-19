
import { useEffect, useRef, useState } from "react";
import { generateRandomLocations } from "@/utils/mapUtils";
import MapOverlay from "./MapOverlay";
import MapLocation from "./MapLocation";
import MapBackground from "./MapBackground";

interface Location {
  id: number;
  lat: number;
  lng: number;
  confidence: number;
  source: string;
  timestamp: string;
}

interface WorldMapProps {
  isSearching: boolean;
  completionPercentage: number;
}

const WorldMap = ({ isSearching, completionPercentage }: WorldMapProps) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [highlightedLocation, setHighlightedLocation] = useState<Location | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!isSearching) return;
    
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newLocation = generateRandomLocations(1)[0];
        setLocations(prev => [...prev, newLocation]);
        
        setHighlightedLocation(newLocation);
        setTimeout(() => setHighlightedLocation(null), 2000);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isSearching]);
  
  useEffect(() => {
    if (isSearching && completionPercentage < 5) {
      setLocations([]);
    }
  }, [isSearching, completionPercentage]);

  return (
    <div className="relative w-full border border-gray-200 rounded-lg overflow-hidden bg-blue-50">
      <svg 
        ref={svgRef}
        viewBox="0 0 1000 500" 
        className="w-full h-full" 
        style={{ minHeight: "400px" }}
      >
        <MapBackground />
        
        {locations.map((loc) => (
          <MapLocation
            key={loc.id}
            location={loc}
            isHighlighted={highlightedLocation?.id === loc.id}
          />
        ))}
        
        {isSearching && (
          <g>
            <circle
              cx="500"
              cy="250"
              r={isSearching ? "100" : "0"}
              fill="none"
              stroke="#3182ce"
              strokeWidth="2"
              opacity="0.3"
            >
              <animate
                attributeName="r"
                from="0"
                to="500"
                dur="4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.7"
                to="0"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        )}
      </svg>
      
      <MapOverlay 
        completionPercentage={completionPercentage}
        locationsCount={locations.length}
      />
    </div>
  );
};

export default WorldMap;
