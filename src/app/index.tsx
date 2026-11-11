import { styles } from "@/styles/index.styles";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

// 1. Interface untuk data mentah dari External API
interface ApiFilm {
  id: string;
  title: string;
  description: string;
  director: string;
  release_date: string;
}

// 2. Interface untuk Object Movie
interface Movie {
  id: string;
  title: string;
  genre: string;
  price: number;
  description: string;
}

const API_URL = "https://ghibliapi.vercel.app/films";

// 3. Custom Async Function menggunakan Pre-built Async Function (fetch),
//    Promise.resolve(), dan Promise.reject()
const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      return Promise.reject(
        new Error(`Gagal mengambil data API (status: ${response.status})`)
      );
    }

    const data: ApiFilm[] = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return Promise.reject(new Error("Data film kosong"));
    }

    // Memasukkan data dari External API ke dalam Object menggunakan Interface Movie
    const mappedMovies: Movie[] = data.map((item, index) => {
      const movieObject: Movie = {
        id: item.id,
        title: item.title,
        genre: `Animation (${item.release_date})`,
        price: 45000 + (index % 3) * 5000,
        description: item.description,
      };
      return movieObject;
    });

    return Promise.resolve(mappedMovies);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default function Index() {
  const router = useRouter();

  const [movies, setMovies] = useState<Movie[]>([]);

  // 4. Memanggil Custom Async Function dengan .then()
  useEffect(() => {
    fetchMovies()
      .then((result) => {
        setMovies(result);
      })
      .catch((error) => {
        console.error("Gagal memuat film:", error);
      });
  }, []);

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

//case 1: ganti tujuan page dari sebuah button yang menggunakan push function atau link
//case 2: refactor salah satu nama dari state variable dan pastikan program nya jalan
//case 3: buatkan page biasa bernama profile.tsx dan pastikan bisa diakses lewat expo router

//nama : bagas dewantara
//nim : 202410370110441
