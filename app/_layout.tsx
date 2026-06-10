import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
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
  );
}