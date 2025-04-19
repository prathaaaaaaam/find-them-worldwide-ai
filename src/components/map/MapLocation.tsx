
interface Location {
  id: number;
  lat: number;
  lng: number;
  confidence: number;
  source: string;
  timestamp: string;
}

interface MapLocationProps {
  location: Location;
  isHighlighted: boolean;
}

const MapLocation = ({ location, isHighlighted }: MapLocationProps) => {
  const x = ((location.lng + 180) / 360) * 1000;
  const y = ((90 - location.lat) / 180) * 500;
  
  const radius = isHighlighted ? 8 : 5;
  const fillOpacity = isHighlighted ? 0.8 : 0.6;
  
  let color = "#3182ce"; // default blue
  if (location.confidence > 0.7) color = "#38a169"; // green for high confidence
  else if (location.confidence < 0.3) color = "#e53e3e"; // red for low confidence
  
  return (
    <g>
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
            {location.source}
          </text>
        </>
      )}
    </g>
  );
};

export default MapLocation;
