import { styles } from "@/styles/index.styles";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

// 1. Tipe data Movie
interface Movie {
  id: string;
  title: string;
  genre: string;
  price: number;
  description: string;
}

// Data awal film (lengkap dengan deskripsi singkat)
const initialMovies: Movie[] = [
  {
    id: "1",
    title: "Violet Evergarden",
    genre: "Drama",
    price: 45000,
    description:
      "Kisah mantan prajurit wanita yang belajar memahami perasaan dan arti cinta melalui pekerjaannya menulis surat.",
  },
  {
    id: "2",
    title: "One Piece Film: Red",
    genre: "Fantasy",
    price: 45000,
    description:
      "Uta, diva paling dicintai di dunia, mengadakan konser live perdana yang mengejutkan seluruh dunia bajak laut.",
  },
  {
    id: "3",
    title: "Dr. Stone: The Movie",
    genre: "Anime/Sci-Fi",
    price: 45000,
    description:
      "Senku dan teman-temannya berusaha membangkitkan kembali peradaban manusia dari era batu menggunakan kekuatan sains.",
  },
  {
    id: "4",
    title: "Wuthering Waves",
    genre: "Fantasy",
    price: 50000,
    description:
      "Petualangan melintasi dunia terbuka pasca-bencana untuk mencari kembali ingatan dan menghadapi musuh baru.",
  },
  {
    id: "5",
    title: "Bagas Dewantara",
    genre: "Mahasiswa",
    price: 202410370110441,
    description: "Wujud asli mahasiswa nyawit yang ingin tidur",
  },
  {
    id: "6",
    title: "Mantap Mas",
    genre: "Action/Comedy",
    price: 500000,
    description:
      "Film aksi komedi tentang kehidupan sehari-hari yang seru dan penuh kejutan tak terduga.",
  },
];

export default function Index() {
  const router = useRouter();

  // 1. Penerapan hook useState
  const [movies, setMovies] = useState<Movie[]>([]);

  // 2. Penerapan hook useEffect
  useEffect(() => {
    // Memasukkan data awal film saat halaman pertama kali dimuat
    setMovies(initialMovies);
  }, []);

  // 3. Penerapan router.push() untuk berpindah ke halaman detail
  const goToDetail = (movie: Movie) => {
    router.push({
      pathname: "/detail",
      params: {
        id: movie.id,
        title: movie.title,
        genre: movie.genre,
        price: movie.price.toString(),
        description: movie.description,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Tixify - Sedang Tayang</Text>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {movies.map((movie) => (
          <View key={movie.id} style={styles.card}>
            <View style={styles.textContainer}>
              {/* Nama film bisa diklik untuk pindah ke halaman detail */}
              <TouchableOpacity onPress={() => goToDetail(movie)}>
                <Text style={styles.movieTitle}>{movie.title} ↗</Text>
              </TouchableOpacity>
              <Text style={styles.movieInfo}>Genre: {movie.genre}</Text>
            </View>

            <View
              style={{
                backgroundColor: "#e9a40e",
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 8,
              }}
            >
              <Text style={styles.moviePrice}>Rp {movie.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
