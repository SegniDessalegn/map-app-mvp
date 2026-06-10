import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

type City = {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

export default function MapScreen() {
  const router = useRouter();
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch(
          "https://api.cityapi.org/v1/cities?country=ET&population_min=100000"
        );
        const json = await res.json();

        const mapped: City[] = json.data.map((c: any) => ({
          id: String(c.id),
          name: c.name,
          country: c.country_code,
          latitude: Number(c.latitude),
          longitude: Number(c.longitude),
        }));

        setCities(mapped);
      } catch (e) {
        console.log("Error fetching cities:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
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
      {cities.map((city) => (
        <Marker
          key={city.id}
          coordinate={{
            latitude: city.latitude,
            longitude: city.longitude,
          }}
          title={city.name}
          description={city.country}
          onPress={() =>
            router.push(`/location/${city.id}?name=${city.name}&country=${city.country}`)
          }
        />
      ))}
    </MapView>
  );
}