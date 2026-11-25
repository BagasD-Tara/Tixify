import { AuthProvider, useAuth } from "@/context/auth";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

function RootNavigator() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0f172a",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#38bdf8" />
      </View>
    );
  }

  const isLoggedIn = Boolean(session);

  return (
    // Menerapkan Stack Navigation dan Stack.Protected untuk Route Protection Guards
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#1e293b" },
        headerTintColor: "#ffffff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* Rute khusus user yang belum login */}
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen
          name="login"
          options={{ title: "Masuk", headerShown: false }}
        />
      </Stack.Protected>

      {/* Rute terproteksi khusus user yang sudah login */}
      <Stack.Protected guard={isLoggedIn}>
        {/* 1. Halaman Utama: Daftar Film */}
        <Stack.Screen name="index" options={{ title: "Daftar Film" }} />

        {/* 2. Halaman Detail: Detail Film */}
        <Stack.Screen name="detail" options={{ title: "Detail Film" }} />

        {/* 3. Halaman Pengguna */}
        <Stack.Screen name="profile" options={{ title: "Pengguna" }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
