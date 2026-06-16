import React from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { MapProps } from "../types";

export default function WebMap({ markers, initialRegion, onMarkerPress }: MapProps) {
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <APIProvider apiKey={apiKey!}>
      <Map
        style={{ width: "100%", height: "100%" }}
        defaultCenter={{
          lat: initialRegion.latitude,
          lng: initialRegion.longitude,
        }}
        defaultZoom={6}
        gestureHandling="greedy"
        disableDefaultUI
        mapId="a1b2c3d4e5f6"
      >
        {markers.map((marker) => (
          <AdvancedMarker
            key={marker.id}
            position={{
              lat: marker.latitude,
              lng: marker.longitude,
            }}
            onClick={() => {
              onMarkerPress(marker);
            }}
          />
        ))}
      </Map>
    </APIProvider>
  );
}