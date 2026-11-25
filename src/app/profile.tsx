import { useAuth } from "@/context/auth";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { user, signOut, isAuthSubmitting } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Email Pengguna</Text>
        <Text style={styles.value}>{user?.email ?? "-"}</Text>

        <Text style={styles.label}>User ID</Text>
        <Text style={styles.subValue}>{user?.id ?? "-"}</Text>

        <TouchableOpacity
          style={[styles.logoutButton, isAuthSubmitting && styles.buttonDisabled]}
          onPress={signOut}
          disabled={isAuthSubmitting}
        >
          {isAuthSubmitting ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.logoutText}>Keluar (Sign Out)</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  label: {
    fontSize: 13,
    color: "#94a3b8",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f8fafc",
    marginBottom: 16,
  },
  subValue: {
    fontSize: 13,
    color: "#cbd5e1",
    marginBottom: 24,
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  logoutText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },
});

