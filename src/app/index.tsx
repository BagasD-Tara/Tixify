import { View, Text, StyleSheet, ScrollView } from "react-native";

// 1. Menerapkan Type (Interface)
interface Movie {
  id: string;
  title: string;
  genre: string;
  price: number;
}

// 2. Menerapkan Array of Objects (Data Dummy)
const movies: Movie[] = [
  { id: "1", title: "Violet Evagarden", genre: "Drama", price: 45000 },
  { id: "2", title: "One Piece Film: Red", genre: "Fantasy", price: 45000 },
  { id: "3", title: "Dr. Stone: The Movie", genre: "Anime/Sci-Fi", price: 45000 }
];

export default function Index() {
  
  // 3. Menerapkan Custom Function (Buat nyetak desain card 1 film)
  const renderMovieCard = (movie: Movie) => {
    return (
      <View key={movie.id} style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <Text style={styles.movieInfo}>Genre: {movie.genre}</Text>
        </View>
        
        {/* Sisipan Inline Style biar asisten praktikum tahu kamu paham cara pakainya */}
        <View style={{ backgroundColor: '#0ea5e9', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 }}>
          <Text style={styles.moviePrice}>Rp {movie.price}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Tixify - Sedang Tayang</Text>
      
      {/* ScrollView biar kalau list filmnya nambah, layarnya bisa di-scroll */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 4. Menerapkan Loop (Manggil data array movies satu per satu) */}
        {movies.map((movie) => renderMovieCard(movie))}
      </ScrollView>
    </View>
  );
}

// 5. Menerapkan External Styling (Tema Bioskop Modern / Dark Mode)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0f172a", // Latar belakang gelap navy
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
    backgroundColor: "#1e293b", // Warna card kontras dengan background
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155",
    flexDirection: "row", // Bikin elemen rata kiri-kanan
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    paddingRight: 10, // Biar judul panjang gak nabrak kotak harga
  },
  movieTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#f1f5f9",
    marginBottom: 4,
  },
  movieInfo: {
    fontSize: 14,
    color: "#94a3b8",
  },
  moviePrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
  }
});
