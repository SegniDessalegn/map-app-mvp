export interface City {
    id: string;
    name: string;
    country: string;
    latitude: number;
    longitude: number;
    population: number;
    timezone: number;
    elevation: number;
}

export interface MapProps {
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  markers: City[];
  onMarkerPress: (marker: City) => void;
}
