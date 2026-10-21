# Tixify - Movie App 🎬

Aplikasi mobile berbasis **Expo Router** dan **React Native** untuk menampilkan daftar film bioskop serta rincian informasi dan deskripsi detail film.

Proyek ini dibuat untuk keperluan praktikum lab dengan menerapkan konsep dasar navigasi stack dan React Hooks.

---

## 📌 Rincian Implementasi Tugas Lab

Berikut adalah bagian-bagian yang telah diimplementasikan sesuai kebutuhan tugas praktikum:

### 1. `_layout.tsx` dan `<Stack.Screen>`
- **File:** `src/app/_layout.tsx`
- **Penjelasan:** Mengatur hierarki navigasi tumpukan (*Stack Navigation*) untuk seluruh aplikasi menggunakan Expo Router.
- **Implementasi:**
  ```tsx
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
  ```

---

### 2. Hook `useState()`
- **File:** `src/app/index.tsx`
- **Penjelasan:** Digunakan untuk menyimpan dan mengelola data film secara reaktif di dalam komponen.
- **Implementasi:**
  ```tsx
  // Inisialisasi state movies dengan tipe data Movie[]
  const [movies, setMovies] = useState<Movie[]>([]);
  ```

---

### 3. Hook `useEffect()`
- **File:** `src/app/index.tsx`
- **Penjelasan:** Digunakan untuk menjalankan *side-effect*, yaitu mengisi data film awal (`initialMovies`) ke dalam state `movies` ketika halaman pertama kali dibuka (*component mount*).
- **Implementasi:**
  ```tsx
  useEffect(() => {
    // Memasukkan data awal film saat halaman pertama kali dimuat
    setMovies(initialMovies);
  }, []);
  ```

---

### 4. Navigasi `push()` & Judul Film Bisa Diklik
- **File:** `src/app/index.tsx`
- **Penjelasan:** Setiap judul film dapat diklik menggunakan komponen `<TouchableOpacity>`. Ketika judul film diklik, fungsi `goToDetail` akan memanggil `router.push()` untuk berpindah ke rute `/detail` sekaligus mengirimkan data film (judul, genre, harga, dan deskripsi singkat) melalui parameter.
- **Implementasi:**
  ```tsx
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

  // Pada JSX render card:
  <TouchableOpacity onPress={() => goToDetail(movie)}>
    <Text style={styles.movieTitle}>{movie.title} ↗</Text>
  </TouchableOpacity>
  ```

---

### 5. Halaman Detail, Deskripsi Singkat, & Navigasi `back()`
- **File:** `src/app/detail.tsx`
- **Penjelasan:** 
  - Mengambil data film dan deskripsi singkat dari rute menggunakan hook `useLocalSearchParams()`.
  - Menampilkan rincian film: Judul, Genre, Harga Tiket, dan **Deskripsi Singkat**.
  - Mengimplementasikan tombol kembali ke daftar film menggunakan fungsi `router.back()`.
- **Implementasi:**
  ```tsx
  // Mengambil data parameter dari halaman index
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    genre: string;
    price: string;
    description: string;
  }>();

  // Menampilkan deskripsi singkat
  <Text style={styles.sectionHeader}>Deskripsi Singkat:</Text>
  <Text style={styles.description}>{params.description}</Text>

  // Navigasi kembali (aman dari error jika browser di-refresh)
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  <TouchableOpacity style={styles.backButton} onPress={handleBack}>
    <Text style={styles.backButtonText}>← Kembali ke Daftar Film</Text>
  </TouchableOpacity>
  ```

---

## 📁 Struktur File Utama

```text
src/
├── app/
│   ├── _layout.tsx      # Konfigurasi Stack Navigation & Stack.Screen
│   ├── index.tsx        # Daftar Film, useState, useEffect, router.push()
│   └── detail.tsx       # Detail Film, deskripsi singkat, router.back()
└── styles/
    └── index.styles.ts  # File styling tema Dark Mode
```

---

## 🚀 Cara Menjalankan Proyek

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Jalankan Expo server:**
   ```bash
   npx expo start
   ```

3. **Buka aplikasi:**
   - Scan QR code dengan aplikasi **Expo Go** (Android / iOS).
   - Tekan `a` untuk membuka di Android Emulator.
   - Tekan `i` untuk membuka di iOS Simulator.
   - Tekan `w` untuk membuka di Browser Web.
