import { StyleSheet } from "react-native";

// 5. Menerapkan External Styling (Tema Bioskop Modern / Dark Mode)
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0f172a",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 25,
    marginTop: 20,
    color: "#f8fafc",
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#dd0f99",
    flexDirection: "row", // Bikin elemen rata kiri-kanan
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  movieTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#22e409",
    marginBottom: 4,
  },
  movieInfo: {
    fontSize: 14,
    color: "#94a3b8",
  },
  moviePrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#e8c7df",
  },
});
