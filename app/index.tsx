import React, { useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useRouter } from "expo-router";
import Map from "../components/Map";
import { City } from "../types";
import { useGetCitiesQuery } from "../services/city";

export default function MapScreen() {
  const router = useRouter();
  const { data: cities, isLoading, error } = useGetCitiesQuery();
  const [location, setLocation] = useState({
    latitude: 9.02497,
    longitude: 38.74689,
    latitudeDelta: 5,
    longitudeDelta: 5,
  })

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Failed to load cities</Text>
      </View>
    );
  }

  const handleMarkerPress = (marker: City) => {
    setLocation({
      latitude: marker.latitude,
      longitude: marker.longitude,
      latitudeDelta: 5,
      longitudeDelta: 5,
    });
    router.push(`/location/${marker.id}`);
  };

  return (
    <Map
      initialRegion={location}
      markers={cities!}
      onMarkerPress={handleMarkerPress}
    />
  );
}