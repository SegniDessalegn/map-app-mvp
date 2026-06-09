import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function LocationDetail() {
  const { id, name, country } = useLocalSearchParams<{
    id: string;
    name?: string;
    country?: string;
  }>();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>
        {name ?? "Unknown City"}
      </Text>

      <Text style={{ marginTop: 10 }}>ID: {id}</Text>

      <Text style={{ marginTop: 10 }}>
        Country: {country ?? "Unknown"}
      </Text>
    </View>
  );
}