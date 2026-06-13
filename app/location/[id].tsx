import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGetCityQuery } from "../../services/city";

export default function LocationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: city, isLoading, error } = useGetCityQuery(id);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Loading city details...</Text>
      </View>
    );
  }

  if (error || !city) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFoundText}>City not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.cityName}>{city.name}</Text>
        <View style={styles.countryContainer}>
          <Text style={styles.countryCode}>{city.country}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Population</Text>
        <Text style={styles.cardValue}>
          {city.population?.toLocaleString?.() ?? "—"}
        </Text>
        <Text style={styles.cardUnit}>people</Text>
      </View>

      <View style={styles.infoGroup}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Coordinates</Text>
          <Text style={styles.infoValue}>
            {city.latitude}°, {city.longitude}°
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Time Zone</Text>
          <Text style={styles.infoValue}>
            {city.timezone ?? "—"}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Elevation</Text>
        <Text style={styles.cardValue}>
          {city.elevation ?? "—"}
        </Text>
        <Text style={styles.cardUnit}>
          {city.elevation ? "meters above sea level" : "not available"}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  notFoundText: {
    fontSize: 18,
    color: "#666",
  },
  header: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 24,
  },
  cityName: {
    fontSize: 40,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
    textAlign: "center",
  },
  countryContainer: {
    backgroundColor: "#E8ECF4",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  countryCode: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A90E2",
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#8E8E93",
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  cardUnit: {
    fontSize: 13,
    color: "#8E8E93",
  },
  infoGroup: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  infoLabel: {
    fontSize: 15,
    color: "#666",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginHorizontal: 20,
  },
  footer: {
    paddingVertical: 32,
    alignItems: "center",
  },
  footerText: {
    fontSize: 13,
    color: "#C6C6C8",
  },
});