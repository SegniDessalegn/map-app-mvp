import { Stack } from "expo-router";
import { Provider } from 'react-redux'
import { store } from '../lib/store'

export default function Layout() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}