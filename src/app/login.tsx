import { useAuth } from "@/context/auth";
import { isSupabaseConfigured } from "@/lib/supabase";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const { signIn, signUp, isAuthSubmitting } = useAuth();

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    setErrorMessage(null);
    setInfoMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage("Email dan password wajib diisi.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password minimal 6 karakter.");
      return;
    }

    if (isSignUpMode) {
      const result = await signUp(email, password);
      if (result.error) {
        setErrorMessage(result.error);
      } else if (result.needsEmailConfirmation) {
        setInfoMessage(
          "Akun berhasil dibuat. Silakan cek email Anda untuk konfirmasi sebelum masuk.",
        );
      }
      return;
    }

    const result = await signIn(email, password);
    if (result.error) {
      setErrorMessage(result.error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Tixify</Text>
        <Text style={styles.subtitle}>
          {isSignUpMode ? "Buat akun baru" : "Masuk untuk melanjutkan"}
        </Text>

        {!isSupabaseConfigured && (
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              File .env belum dikonfigurasi. Salin .env.example menjadi .env dan
              isi kredensial Supabase Anda.
            </Text>
          </View>
        )}

        {errorMessage && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}

        {infoMessage && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>{infoMessage}</Text>
          </View>
        )}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="nama@email.com"
          placeholderTextColor="#64748b"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          editable={!isAuthSubmitting}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Minimal 6 karakter"
          placeholderTextColor="#64748b"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!isAuthSubmitting}
        />

        <TouchableOpacity
          style={[styles.button, isAuthSubmitting && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isAuthSubmitting}
        >
          {isAuthSubmitting ? (
            <ActivityIndicator color="#0f172a" />
          ) : (
            <Text style={styles.buttonText}>
              {isSignUpMode ? "Daftar" : "Masuk"}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => {
            setIsSignUpMode((prev) => !prev);
            setErrorMessage(null);
            setInfoMessage(null);
          }}
          disabled={isAuthSubmitting}
        >
          <Text style={styles.switchText}>
            {isSignUpMode
              ? "Sudah punya akun? Masuk di sini"
              : "Belum punya akun? Daftar di sini"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#334155",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#f8fafc",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: "#94a3b8",
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#cbd5e1",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#f8fafc",
    fontSize: 15,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#38bdf8",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchButton: {
    marginTop: 16,
    alignItems: "center",
  },
  switchText: {
    color: "#38bdf8",
    fontSize: 14,
  },
  errorBox: {
    backgroundColor: "#450a0a",
    borderColor: "#ef4444",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 14,
  },
  errorText: {
    color: "#fecaca",
    fontSize: 13,
  },
  infoBox: {
    backgroundColor: "#082f49",
    borderColor: "#38bdf8",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 14,
  },
  infoText: {
    color: "#bae6fd",
    fontSize: 13,
  },
  warningBox: {
    backgroundColor: "#422006",
    borderColor: "#f59e0b",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 14,
  },
  warningText: {
    color: "#fde68a",
    fontSize: 13,
  },
});

