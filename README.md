# 🛒 Katalog Digital Pasar Sinpasa (Summarecon Bandung)

Proyek ini adalah platform katalog web yang dirancang untuk mendigitalisasi informasi toko dan produk di Pasar Modern Sinpasa. Dibuat sebagai tugas integrasi mata kuliah **Pemrograman Web** dan **Interaksi Manusia & Komputer (HCI)**.

## 👥 Anggota Tim
Semua anggota tim berkontribusi dalam perancangan **UI/UX & Analisis HCI** (User-Centered Design).

* **Ahmad Fuad Mubarak** - Project Manager & Fullstack Developer
* **Raissa Fasya Sabila** - Frontend Developer (HTML & CSS Layouting)
* **Niranti Salmanabilah** - Frontend Developer (JavaScript & PHP Logic)
* **Resti Fujianti** - Database Engineer (PHP & MySQL Management)

---

## 🚀 Fitur Utama
- **Katalog Toko:** Daftar toko lengkap dengan kategori.
- **Filter Cerdas:** Mencari toko berdasarkan kategori produk yang dijual.
- **Sistem Rating & Testimoni:** 
  - Testimoni Sinpasa
  - Testimoni untuk setiap Toko.
- **Galeri Foto:** Maksimal 3 foto untuk setiap profil toko.
- **User-Centered Design:** Antarmuka yang dirancang berdasarkan prinsip HCI dan hasil observasi lapangan.

## 🛠 Tech Stack
- **Frontend:** HTML, CSS, JavaScript/Laravel(UAS)
- **Backend:** javascript & PHP(UAS)
- **Database:** MySQL(UAS) & PHP (UAS)
- **Design Tool:** Figma, Canva

---

## 💻 Cara Instalasi (Local Setup)

### 1. Persiapan Database (UAS)
1. Buka XAMPP/Laragon dan pastikan MySQL menyala.
2. Buat database baru bernama `db_sinpasa`.
3. Import file `database/migration.sql` untuk struktur tabel.

### 2. Setup Backend
1. Masuk ke folder server: `cd server`

### 3. Setup Frontend
1. Masuk ke folder client: `cd client`
2. Buka file `index.html`

---

## 📂 Struktur Folder
```text
.
├── client/          # Antarmuka Pengguna (Frontend)
├── server/          # Logika Bisnis & API (Backend)
├── database/        # Skema SQL & Data Seed
├── docs/            # Dokumentasi HCI, Link Figma, & Laporan
└── README.md