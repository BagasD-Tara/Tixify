import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    // Tambahkan screenOptions di sini
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="explore" />
    </Stack>
  );
}