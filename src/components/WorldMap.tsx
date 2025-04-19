
import { useEffect, useRef, useState } from "react";

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

const generateRandomLocations = (count: number): Location[] => {
  const locations: Location[] = [];
  const sources = ["Social Media", "Public Camera", "News Report", "Travel Record", "Witness Report"];
  
  for (let i = 0; i < count; i++) {
    locations.push({
      id: i,
      lat: (Math.random() * 140) - 70, // -70 to 70
      lng: (Math.random() * 340) - 170, // -170 to 170
      confidence: Math.random(),
      source: sources[Math.floor(Math.random() * sources.length)],
      timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  
  return locations;
};

const WorldMap = ({ isSearching, completionPercentage }: WorldMapProps) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [highlightedLocation, setHighlightedLocation] = useState<Location | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!isSearching) return;
    
    // Simulate finding locations during search
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newLocation = generateRandomLocations(1)[0];
        setLocations(prev => [...prev, newLocation]);
        
        // Highlight the new location briefly
        setHighlightedLocation(newLocation);
        setTimeout(() => setHighlightedLocation(null), 2000);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isSearching]);
  
  // Reset locations when search starts
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
        {/* World map background - simplified outline */}
        <path
          d="M200,100 Q400,50 600,100 T800,150 Q900,200 800,300 T600,400 Q400,450 200,400 T50,200 Q100,150 200,100"
          fill="none"
          stroke="#a0aec0"
          strokeWidth="1"
        />
        
        {/* Continents - very simplified shapes */}
        <path d="M200,150 Q300,120 350,200 T250,300 Q200,280 200,150" fill="#e2e8f0" />
        <path d="M400,150 Q500,100 600,150 T550,300 Q450,350 400,150" fill="#e2e8f0" />
        <path d="M650,200 Q750,150 800,250 T700,350 Q650,300 650,200" fill="#e2e8f0" />
        <path d="M300,350 Q400,320 450,380 T350,420 Q320,400 300,350" fill="#e2e8f0" />
        
        {/* Plot the locations */}
        {locations.map((loc) => {
          // Convert lat/lng to SVG coordinates
          const x = ((loc.lng + 180) / 360) * 1000;
          const y = ((90 - loc.lat) / 180) * 500;
          
          const isHighlighted = highlightedLocation?.id === loc.id;
          const radius = isHighlighted ? 8 : 5;
          const fillOpacity = isHighlighted ? 0.8 : 0.6;
          
          // Color based on confidence
          let color = "#3182ce"; // default blue
          if (loc.confidence > 0.7) color = "#38a169"; // green for high confidence
          else if (loc.confidence < 0.3) color = "#e53e3e"; // red for low confidence
          
          return (
            <g key={loc.id}>
              <circle
                cx={x}
                cy={y}
                r={radius}
                fill={color}
                fillOpacity={fillOpacity}
                stroke="white"
                strokeWidth="1"
              />
              {isHighlighted && (
                <>
                  <circle
                    cx={x}
                    cy={y}
                    r={radius + 5}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      from={radius}
                      to={radius + 20}
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.5"
                      to="0"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <text
                    x={x}
                    y={y - 15}
                    textAnchor="middle"
                    fill="#4a5568"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {loc.source}
                  </text>
                </>
              )}
            </g>
          );
        })}
        
        {/* Scanning effect when searching */}
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
      
      {/* Map overlay with location count */}
      <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-md shadow-md">
        <div className="text-sm font-medium text-gray-800">Global Search Coverage</div>
        <div className="flex items-center mt-1">
          <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${completionPercentage}%` }} 
            />
          </div>
          <span className="ml-2 text-sm font-medium">{completionPercentage}%</span>
        </div>
        <div className="text-xs text-gray-600 mt-1">
          Potential sightings: {locations.length}
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
