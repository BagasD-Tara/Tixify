import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    // Menerapkan Stack Navigation dan Stack.Screen
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#1e293b" },
        headerTintColor: "#ffffff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* 1. Halaman Utama: Daftar Film */}
      <Stack.Screen
        name="index"
        options={{ title: "Daftar Film" }}
      />

      {/* 2. Halaman Detail: Detail Film */}
      <Stack.Screen
        name="detail"
        options={{ title: "Detail Film" }}
      />
    </Stack>
  );
}
