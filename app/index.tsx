import React from "react";
import MapView, { Marker } from "react-native-maps";
import { View, ActivityIndicator, Text } from "react-native";
import { useRouter } from "expo-router";
import { useCities } from "../hooks/city/use-cities";

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

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 9.08333,
        longitude: 36.55,
        latitudeDelta: 5,
        longitudeDelta: 5,
      }}
    >
      {cities?.map((city) => (
        <Marker
          key={city.id}
          coordinate={{
            latitude: city.latitude,
            longitude: city.longitude,
          }}
          title={city.name}
          description={city.country}
          onPress={() => router.push(`/location/${city.id}`)}
        />
      ))}
    </MapView>
  );
}