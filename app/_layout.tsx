import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide header globally
      }}
    >
      <Stack.Screen name="index" />
       {/* Main app tabs screen after login */}
      <Stack.Screen
        name="(tabs)"
        options={{ title: "Home Tabs" }}
      />
    </Stack>
  );
}
