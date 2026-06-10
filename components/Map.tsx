import React from "react";
import MapView, { Marker } from "react-native-maps";
import { MapProps } from "./Map.types";

export default function Map({ initialRegion, markers, onMarkerPress }: MapProps) {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={initialRegion}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          description={marker.description}
          onPress={() => onMarkerPress(marker)}
        />
      ))}
    </MapView>
  );
}
