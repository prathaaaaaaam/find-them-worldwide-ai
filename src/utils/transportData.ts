
interface TransportStop {
  id: string;
  name: string;
  lat: number;
  lon: number;
  type: 'bus' | 'metro' | 'train';
}

interface TransportRoute {
  id: string;
  name: string;
  type: 'bus' | 'metro' | 'train';
  stops: TransportStop[];
}

// Sample transport data (simulating GTFS data structure)
export const sampleTransportStops: TransportStop[] = [
  {
    id: "KM001",
    name: "Aluva Metro Station",
    lat: 10.1076,
    lon: 76.3519,
    type: "metro"
  },
  {
    id: "DB001",
    name: "Delhi Central Bus Station",
    lat: 28.6304,
    lon: 77.2177,
    type: "bus"
  }
];

export const sampleTransportRoutes: TransportRoute[] = [
  {
    id: "KM-ROUTE-1",
    name: "Kochi Metro Blue Line",
    type: "metro",
    stops: [sampleTransportStops[0]]
  }
];
