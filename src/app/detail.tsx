import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function Detail() {
  const router = useRouter();

  // Mengambil data parameter yang dikirim melalui router.push()
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    genre: string;
    price: string;
    description: string;
  }>();

  // Fungsi kembali: jika ada history stack gunakan router.back(), jika tidak (misal setelah refresh browser) arahkan ke home
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Kartu Detail Film */}
        <View style={styles.card}>
          <Text style={styles.title}>{params.title}</Text>
          <Text style={styles.genre}>Genre: {params.genre}</Text>

          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>Rp {params.price}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionHeader}>Deskripsi Singkat:</Text>
          <Text style={styles.description}>
            {params.description || "Tidak ada deskripsi film."}
          </Text>
        </View>

        {/* Penerapan router.back() untuk kembali ke halaman sebelumnya */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>← Kembali ke Daftar Film</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0f172a",
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#dd0f99",
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#22e409",
    marginBottom: 6,
  },
  genre: {
    fontSize: 16,
    color: "#94a3b8",
    marginBottom: 14,
  },
  priceBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#e9a40e",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  priceText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffffff",
  },
  divider: {
    height: 1,
    backgroundColor: "#334155",
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f8fafc",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: "#cbd5e1",
    lineHeight: 22,
  },
  backButton: {
    backgroundColor: "#38bdf8",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  backButtonText: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "bold",
  },
});
