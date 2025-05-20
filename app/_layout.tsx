import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Cache le header sur tous les écrans
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}

