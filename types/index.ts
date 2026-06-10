export interface City {
    id: string;
    name: string;
    country: string;
    latitude: number;
    longitude: number;
    population: number;
}

export interface MapMarker {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  description?: string;
}

export interface MapProps {
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  markers: MapMarker[];
  onMarkerPress: (marker: MapMarker) => void;
}
