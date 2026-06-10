import { Stack } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/query-client";

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="location/[id]"
          options={{
            title: "City Details",
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}