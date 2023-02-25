-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 25 Feb 2023 pada 16.14
-- Versi server: 10.4.25-MariaDB
-- Versi PHP: 8.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api_perpustakaan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `adonis_schema`
--

CREATE TABLE `adonis_schema` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `adonis_schema`
--

INSERT INTO `adonis_schema` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, 'database/migrations/1677136473886_users', 1, '2023-02-23 08:06:09'),
(2, 'database/migrations/1677136473897_api_tokens', 1, '2023-02-23 08:06:09'),
(3, 'database/migrations/1677158551968_otps', 2, '2023-02-23 13:33:55'),
(4, 'database/migrations/1677159125604_add_verify_otp_codes', 2, '2023-02-23 13:33:55'),
(5, 'database/migrations/1677220876302_profiles', 3, '2023-02-24 07:51:28'),
(6, 'database/migrations/1677242276401_kategoris', 4, '2023-02-24 12:53:19'),
(7, 'database/migrations/1677245189500_bukus', 5, '2023-02-24 14:42:10'),
(10, 'database/migrations/1677294268325_peminjamen', 6, '2023-02-25 03:05:44');

-- --------------------------------------------------------

--
-- Struktur dari tabel `adonis_schema_versions`
--

CREATE TABLE `adonis_schema_versions` (
  `version` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `adonis_schema_versions`
--

INSERT INTO `adonis_schema_versions` (`version`) VALUES
(2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `api_tokens`
--

CREATE TABLE `api_tokens` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `api_tokens`
--

INSERT INTO `api_tokens` (`id`, `user_id`, `name`, `type`, `token`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 1, 'Opaque Access Token', 'api', '38c6f58720803532fa36fd17e97e4352fb12bdb3017df86197fb4b30f6148cb3', '2023-02-24 08:36:35', '2023-02-23 08:36:35', '2023-02-23 08:36:35'),
(2, 1, 'Opaque Access Token', 'api', 'fcef4ac77316ddc3011897655ea6cb75dabf48b9957c16a0d5e80ef8fe560756', '2023-02-24 08:44:23', '2023-02-23 08:44:23', '2023-02-23 08:44:23'),
(3, 11, 'Opaque Access Token', 'api', 'f563ed45149b0d469060e5b8af70ea2b745b98da3bf66e011f78922b0273b051', '2023-02-25 04:29:04', '2023-02-24 04:29:04', '2023-02-24 04:29:04'),
(4, 13, 'Opaque Access Token', 'api', '054022d5e5e03ed5be0e42c8e50dbfac1bc476fad8ccfb4d5807117d85e35bc1', '2023-02-25 07:49:49', '2023-02-24 07:49:49', '2023-02-24 07:49:49'),
(5, 11, 'Opaque Access Token', 'api', '4b7fe886856b521bcb778a6b20d2d852bb2cb2617db856341c0d5fd47423b03d', '2023-02-25 13:24:28', '2023-02-24 13:24:28', '2023-02-24 13:24:28'),
(6, 14, 'Opaque Access Token', 'api', '97d6fc43fac2c4058f5791b0a76621479c6e363ae01663a92ee8b1f70411ff42', '2023-02-26 13:09:31', '2023-02-25 13:09:31', '2023-02-25 13:09:31'),
(7, 14, 'Opaque Access Token', 'api', '3f8af3da03ac0a93d9aa618bae0dd6823fa6516a7522a19057e25c7f995f381b', '2023-02-26 13:33:54', '2023-02-25 13:33:54', '2023-02-25 13:33:54'),
(8, 14, 'Opaque Access Token', 'api', '794809d14d49a5e565cccbee1adddec20749932ece168952ac3f934f05e84306', '2023-02-26 13:52:11', '2023-02-25 13:52:11', '2023-02-25 13:52:11'),
(9, 14, 'Opaque Access Token', 'api', '659ce899204f6fea02f0d401708738c93ae5e43b5510d7029063c0b3c631fc72', '2023-02-26 14:06:36', '2023-02-25 14:06:36', '2023-02-25 14:06:36');

-- --------------------------------------------------------

--
-- Struktur dari tabel `bukus`
--

CREATE TABLE `bukus` (
  `id` int(10) UNSIGNED NOT NULL,
  `judul` varchar(255) NOT NULL,
  `ringkasan` text NOT NULL,
  `tahun_terbit` date NOT NULL,
  `halaman` int(11) NOT NULL,
  `kategori_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `bukus`
--

INSERT INTO `bukus` (`id`, `judul`, `ringkasan`, `tahun_terbit`, `halaman`, `kategori_id`, `created_at`, `updated_at`) VALUES
(1, 'Harry Potter', 'Harry Potter adalah penyihir', '2020-01-20', 200, 2, '2023-02-24 14:42:25', '2023-02-24 14:42:25'),
(2, 'Pubg Mobile', 'Player Uknown BattleGround', '2020-01-20', 201, 2, '2023-02-25 03:12:47', '2023-02-25 03:12:47');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategoris`
--

CREATE TABLE `kategoris` (
  `id` int(10) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `kategoris`
--

INSERT INTO `kategoris` (`id`, `nama`, `created_at`, `updated_at`) VALUES
(2, 'RPG', '2023-02-24 13:12:00', '2023-02-25 14:26:54'),
(3, 'RPG', '2023-02-25 14:07:04', '2023-02-25 14:07:04');

-- --------------------------------------------------------

--
-- Struktur dari tabel `otps`
--

CREATE TABLE `otps` (
  `id` int(10) UNSIGNED NOT NULL,
  `otpcode` int(11) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `otps`
--

INSERT INTO `otps` (`id`, `otpcode`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 315560, 9, '2023-02-24 01:06:42', '2023-02-24 01:06:42'),
(2, 477043, 10, '2023-02-24 03:30:50', '2023-02-24 03:30:50'),
(3, 551661, 11, '2023-02-24 03:32:43', '2023-02-24 03:32:43'),
(4, 389849, 12, '2023-02-24 04:28:39', '2023-02-24 04:28:39'),
(5, 483214, 13, '2023-02-24 07:48:38', '2023-02-24 07:48:38'),
(6, 226717, 14, '2023-02-25 13:03:07', '2023-02-25 13:03:07'),
(7, 493649, 15, '2023-02-25 15:09:19', '2023-02-25 15:09:19');

-- --------------------------------------------------------

--
-- Struktur dari tabel `peminjamen`
--

CREATE TABLE `peminjamen` (
  `id` int(10) UNSIGNED NOT NULL,
  `peminjaman` date NOT NULL,
  `pengembalian` date NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `buku_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `peminjamen`
--

INSERT INTO `peminjamen` (`id`, `peminjaman`, `pengembalian`, `user_id`, `buku_id`, `created_at`, `updated_at`) VALUES
(1, '2023-08-20', '2023-08-20', 11, 2, '2023-02-25 03:08:06', '2023-02-25 03:14:20'),
(2, '2023-08-20', '2023-08-20', 11, 2, '2023-02-25 03:16:36', '2023-02-25 03:16:36'),
(3, '2022-07-20', '2022-07-20', 14, 2, '2023-02-25 14:58:15', '2023-02-25 14:58:15'),
(4, '2022-07-20', '2023-01-01', 14, 2, '2023-02-25 15:03:01', '2023-02-25 15:03:01');

-- --------------------------------------------------------

--
-- Struktur dari tabel `profiles`
--

CREATE TABLE `profiles` (
  `id` int(10) UNSIGNED NOT NULL,
  `bio` text NOT NULL,
  `alamat` text NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `profiles`
--

INSERT INTO `profiles` (`id`, `bio`, `alamat`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'testing bio', 'testing alamat', 13, '2023-02-24 07:52:07', '2023-02-24 07:52:07'),
(2, 'hallo im james bond', 'jl.california a450', 14, '2023-02-25 13:34:41', '2023-02-25 13:34:41');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `nama` varchar(40) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(180) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `remember_me_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `verifikasi` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `role`, `remember_me_token`, `created_at`, `updated_at`, `verifikasi`) VALUES
(1, 'difaaa', 'email@gmail.com', '$bcrypt$v=98$r=10$wqRYhUMNCeophVVCuyuVpA$EtsksmnpBQQy7mlVSYQTp43leYogsOQ', 'admin', NULL, '2023-02-23 08:09:42', '2023-02-23 08:09:42', 0),
(3, 'otpcod', 'otpBro@gmail.com', '$bcrypt$v=98$r=10$GB3RH1PihgTo23m3FUyu+A$wg9u/fn3j0UIYgOsMQ+yAyHVsVX30t0', 'admin', NULL, '2023-02-23 13:20:50', '2023-02-23 13:20:50', 0),
(4, 'otpcods', 'otpBros@gmail.com', '$bcrypt$v=98$r=10$MuLGLQBSQEibulK/m/gAzQ$36ff1vW3zF2g7Wn19nUXMQKg2bx+x/s', 'admin', NULL, '2023-02-24 00:04:08', '2023-02-24 00:04:08', 0),
(5, 'otpcodtesting', 'otpBrosTesting@gmail.com', '$bcrypt$v=98$r=10$wAqYYfx9hyoWzAhzFz2P/g$hWh3kxJyvKrhSRYelvKTbpQ2F3WAb0s', 'admin', NULL, '2023-02-24 00:52:09', '2023-02-24 00:52:09', 0),
(6, 'otpcodtestinging', 'otpBrosTestinsg@gmail.com', '$bcrypt$v=98$r=10$30lNfFss/gCOVwFcuG4FNw$GhD5qNdA7Lj7lerFOacSf0fwiJB8PQw', 'admin', NULL, '2023-02-24 00:54:57', '2023-02-24 00:54:57', 0),
(7, 'otpcodtestingiqng', 'otpBrosTestiwnsg@gmail.com', '$bcrypt$v=98$r=10$58tsQhsljWWDZ2mrZntinA$c7NwONxHFCO61khNRBZwVk5AVl38CLM', 'admin', NULL, '2023-02-24 01:03:44', '2023-02-24 01:03:44', 0),
(8, 'otpcodtestingiqwng', 'otpBrosTestiwnswg@gmail.com', '$bcrypt$v=98$r=10$OWllzKWgqTbklyTxFsYTWQ$InxIfyVY8han+r66vpaPyo89Ax3UV3w', 'admin', NULL, '2023-02-24 01:04:27', '2023-02-24 01:04:27', 0),
(9, 'otpcodtestingiqwnsg', 'otpBrosTestiwnswgs@gmail.com', '$bcrypt$v=98$r=10$u2FVlORslWdDcZd2Z8WsiQ$qoEOCFN2KLoisoJTsdRz/MatRUsljZw', 'admin', NULL, '2023-02-24 01:06:42', '2023-02-24 01:06:42', 0),
(10, 'testings', 'testingss@gmail.com', '$bcrypt$v=98$r=10$DgrYkQcEeiLP+6bCHONaAw$eH2junVDXoBLP4IRRqL0lImY0ttHX+k', 'admin', NULL, '2023-02-24 03:30:50', '2023-02-24 03:30:50', 0),
(11, 'testings1', 'testings1@gmail.com', '$bcrypt$v=98$r=10$N0Bi3snoic13tqeV17rggw$NkSsqot9VMTUMLI9Onm68EjMB08kRw4', 'admin', NULL, '2023-02-24 03:32:43', '2023-02-24 03:32:43', 1),
(12, 'testings12', 'testings12@gmail.com', '$bcrypt$v=98$r=10$J9eOo/AoJgpeMr9SqYHaww$9TdrnhurIVnuBccfEemaPSIaivCAc5k', 'admin', NULL, '2023-02-24 04:28:39', '2023-02-24 04:28:39', 0),
(13, 'apa123', 'apa@gmail.com', '$bcrypt$v=98$r=10$uGzorr78/qhQfqoSvkTf4A$em9F7nzCjN1uFtjXR0czf5evR32r4KE', 'admin', NULL, '2023-02-24 07:48:38', '2023-02-24 07:48:38', 1),
(14, 'James Bond', 'Bond007@example.com', '$bcrypt$v=98$r=10$+BOVeCvNXNUU3p7gqRfwxA$6b0wBTdRA/sJCsby031C37OdE7RFDeg', 'admin', NULL, '2023-02-25 13:03:07', '2023-02-25 13:03:07', 1),
(15, 'adminex', 'admin@example.com', '$bcrypt$v=98$r=10$R1/nD72KnP6kNPIAhTW3XQ$5k43/5zX5wpRce7XCquGWN0GvwFwV34', 'admin', NULL, '2023-02-25 15:09:19', '2023-02-25 15:09:19', 1);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `adonis_schema`
--
ALTER TABLE `adonis_schema`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `api_tokens`
--
ALTER TABLE `api_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `api_tokens_token_unique` (`token`),
  ADD KEY `api_tokens_user_id_foreign` (`user_id`);

--
-- Indeks untuk tabel `bukus`
--
ALTER TABLE `bukus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bukus_kategori_id_foreign` (`kategori_id`);

--
-- Indeks untuk tabel `kategoris`
--
ALTER TABLE `kategoris`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `otps`
--
ALTER TABLE `otps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `otps_user_id_foreign` (`user_id`);

--
-- Indeks untuk tabel `peminjamen`
--
ALTER TABLE `peminjamen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `peminjamen_user_id_foreign` (`user_id`),
  ADD KEY `peminjamen_buku_id_foreign` (`buku_id`);

--
-- Indeks untuk tabel `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profiles_user_id_foreign` (`user_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_nama_unique` (`nama`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `adonis_schema`
--
ALTER TABLE `adonis_schema`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `api_tokens`
--
ALTER TABLE `api_tokens`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `bukus`
--
ALTER TABLE `bukus`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `kategoris`
--
ALTER TABLE `kategoris`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `otps`
--
ALTER TABLE `otps`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `peminjamen`
--
ALTER TABLE `peminjamen`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `api_tokens`
--
ALTER TABLE `api_tokens`
  ADD CONSTRAINT `api_tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `bukus`
--
ALTER TABLE `bukus`
  ADD CONSTRAINT `bukus_kategori_id_foreign` FOREIGN KEY (`kategori_id`) REFERENCES `kategoris` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `otps`
--
ALTER TABLE `otps`
  ADD CONSTRAINT `otps_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `peminjamen`
--
ALTER TABLE `peminjamen`
  ADD CONSTRAINT `peminjamen_buku_id_foreign` FOREIGN KEY (`buku_id`) REFERENCES `bukus` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `peminjamen_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `profiles`
--
ALTER TABLE `profiles`
  ADD CONSTRAINT `profiles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
