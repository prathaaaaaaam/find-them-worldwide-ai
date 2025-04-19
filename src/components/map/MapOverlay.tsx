
interface MapOverlayProps {
  completionPercentage: number;
  locationsCount: number;
}

const MapOverlay = ({ completionPercentage, locationsCount }: MapOverlayProps) => {
  return (
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
        Potential sightings: {locationsCount}
      </div>
    </div>
  );
};

export default MapOverlay;
