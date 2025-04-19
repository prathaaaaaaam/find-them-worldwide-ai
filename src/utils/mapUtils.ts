
interface Location {
  id: number;
  lat: number;
  lng: number;
  confidence: number;
  source: string;
  timestamp: string;
}

export const generateRandomLocations = (count: number): Location[] => {
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
