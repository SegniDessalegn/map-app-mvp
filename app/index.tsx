import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useRouter } from "expo-router";
import { useCities } from "../hooks/city/use-cities";
import Map from "../components/Map";

export default function MapScreen() {
  const router = useRouter();
  const { data: cities, isLoading, error } = useCities();

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

  const markers =
    cities?.map((city) => ({
      id: city.id.toString(),
      latitude: city.latitude,
      longitude: city.longitude,
      title: city.name,
      description: city.country,
    })) ?? [];

  return (
    <Map
      initialRegion={{
        latitude: 9.08333,
        longitude: 36.55,
        latitudeDelta: 5,
        longitudeDelta: 5,
      }}
      markers={markers}
      onMarkerPress={(marker) => router.push(`/location/${marker.id}`)}
    />
  );
}