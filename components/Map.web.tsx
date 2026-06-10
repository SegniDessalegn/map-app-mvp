import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { MapProps } from "../types";

let isLoaded = false;
let isLoading = false;
const callbacks: (() => void)[] = [];

declare global {
  interface Window {
    google: any;
    __googleMapsInitCallback?: () => void;
  }
}

function loadGoogleMapsScript(apiKey: string, callback: () => void) {
  if (isLoaded) {
    callback();
    return;
  }
  callbacks.push(callback);
  if (isLoading) {
    return;
  }
  isLoading = true;

  window.__googleMapsInitCallback = () => {
    isLoaded = true;
    isLoading = false;
    callbacks.forEach((cb) => cb());
    delete window.__googleMapsInitCallback;
  };

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=__googleMapsInitCallback`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

export default function Map({ initialRegion, markers, onMarkerPress }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      setError("Google Maps API Key is missing in environment variables. Please check your .env file.");
      return;
    }

    loadGoogleMapsScript(apiKey, () => {
      setGoogleLoaded(true);
    });
  }, [apiKey]);

  useEffect(() => {
    if (!googleLoaded || !mapRef.current) return;

    const google = window.google;
    const map = new google.maps.Map(mapRef.current, {
      center: { lat: initialRegion.latitude, lng: initialRegion.longitude },
      zoom: 6,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      styles: [
        {
          featureType: "administrative",
          elementType: "geometry",
          stylers: [{ visibility: "on" }]
        }
      ]
    });

    const googleMarkers = markers.map((marker) => {
      const gMarker = new google.maps.Marker({
        position: { lat: marker.latitude, lng: marker.longitude },
        map,
        title: marker.title,
        animation: google.maps.Animation.DROP,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 200px;">
            <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #1A1A1A;">${marker.title}</h4>
            ${marker.description ? `<p style="margin: 0; font-size: 12px; color: #666; line-height: 1.4;">${marker.description}</p>` : ""}
            <div style="margin-top: 8px; font-size: 11px; color: #4A90E2; font-weight: 500; cursor: pointer;">View Details →</div>
          </div>
        `,
      });

      gMarker.addListener("mouseover", () => {
        infoWindow.open(map, gMarker);
      });

      gMarker.addListener("mouseout", () => {
        infoWindow.close();
      });

      gMarker.addListener("click", () => {
        onMarkerPress(marker);
      });

      return gMarker;
    });

    return () => {
      googleMarkers.forEach((m) => m.setMap(null));
    };
  }, [googleLoaded, markers, initialRegion, onMarkerPress]);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!googleLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Loading Map...</Text>
      </View>
    );
  }

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 24,
  },
  errorText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#D0021B",
    textAlign: "center",
    lineHeight: 20,
  },
});
