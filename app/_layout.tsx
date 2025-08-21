import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: "#16468fff" },
      headerTintColor: "#070101ff",
      headerShown : false,
      headerTitleStyle: { fontWeight: "bold" },
    }}>
    <Stack.Screen name="index" options={{ title: "Home" }} />
  </Stack>
  );
}



