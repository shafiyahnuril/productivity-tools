# Productivity Tools

🔗 **Link Deployment:** [https://productivity-tools-seven.vercel.app/](https://productivity-tools-seven.vercel.app/)

---

Nama Website : Productivity Tools  
Nama Tim : apaya  
Dengan Backend : TIDAK  
Daftar Fitur Utama : Notes, Focus Timer, Calendar, To-Do, Analyzer (Analytics)

---

## 🚀 Tentang Aplikasi

**Productivity Tools** adalah aplikasi web modern berbasis antarmuka yang dirancang untuk membantu pengguna memaksimalkan efisiensi dan mengatur waktu mereka dalam satu tempat atau _workspace_. Aplikasi dilengkapi berbagai instrumen manajemen kinerja yang terpadu.

## ✨ Penjelasan Fitur Website

1. **🏠 Dashboard Interaktif (Pusat Kontrol)**
   - Halaman utama yang mengintegrasikan berbagai metrik dan _widget_ cepat dalam satu tempat (Catatan terbaru, Ringkasan Kalender, Jam interaktif, Target harian).
   - Pengguna bisa melihat produktivitas mereka (_Dashboard Stats_) secara instan.

2. **📝 Notes (Catatan Pribadi)**
   - Menyediakan ruang interaktif untuk menulis rancangan ide hingga informasi krusial.
   - Kemampuan membuat, membaca, mengedit, dan menghapus (_CRUD_ berbasis _frontend local state_) catatan dengan kilat.
   - Terdapat ringkasan (_preview_) isi catatan yang tampil secara dinamis di halaman muka.

3. **⏳ Focus Timer (Manajemen Waktu Cerdas)**
   - Alat pengatur waktu khusus kelola fokus harian berbasis interval (contoh: metode Pomodoro).
   - Menyediakan sesi hitung mundur fokus, diikuti dengan sesi istirahat.
   - Durasi waktu kerja terekam otomatis dan akan masuk ke data panel analitik.

4. **📅 Calendar (Jadwal Terintegrasi)**
   - Representasi waktu visual komprehensif (berbasis tanggal dan bulan).
   - Membantu pengguna tetap ingat setiap target jadwal penting (_deadlines_).
   - Mengalokasikan rencana pertemuan dan mengelola alur kegiatan (_event planning_).

5. **✅ To-Do List (Daftar Tugas Terorganisir)**
   - Input pengerjaan rencana harian atau pekerjaan spesifik ke dalam antarmuka baris per baris.
   - _Checklist feature_: Klik untuk menandai tugas yang sudah tuntas (_Completed_) atau membatalkannya ke status aktif (_Active_).
   - Alur data mulus di mana tugas yang di-ceklis terhitung dalam pencapaian produktivitas harian.

6. **📊 Analytics / Analyzer (Pemantauan Kualitas Kerja)**
   - Tampilan visual berupa statistik kemajuan, waktu penyelesaian jam fokus, serta rasio tugas yang berstatus tuntas dan belum (_Charts/Graphs_).
   - Memudahkan evaluasi gaya kerja dan tren produktivitas di berbagai rentang waktu harian/mingguan.

7. **🌓 Kustomisasi Tema (Light & Dark Mode)**
   - Dukungan _Floating Theme Toggle_ untuk penyesuaian estetika layar, memungkinkan transisi desain berlatar gelap (_Night-mode_) atau terang demi kenyamanan mata pengguna.

8. **📱 Aksesibilitas Mobile-Friendly**
   - Transisi antarmuka yang sangat responsif di perangkat ponsel menggunakan komponen _Mobile Header_ dan navigasi khusus _Bottom Navigation_.
   - Tombol gantung (_Floating Add Button_) intuitif yang mempermudah interaksi pengguna menggunakan satu tangan pada layar portabel.

## 🛠️ Teknologi yang Digunakan

Aplikasi web ini dibangun menggunakan stack:

- **Framework Frontend:** Next.js (React)
- **Bahasa Pemrograman:** TypeScript
- **Styling:** Tailwind CSS

## 🏃‍♂️ Cara Menjalankan Proyek Secara Lokal

Jika Anda ingin menjalankan proyek ini di perangkat sendiri:

1. Clone repositori ini ke komputer Anda.
2. Buka terminal pada folder proyek, lalu jalankan instalasi _dependency_:
   ```bash
   npm install
   ```
3. Mulai server _development_:
   ```bash
   npm run dev
   ```
4. Buka [http://localhost:3000](http://localhost:3000) pada peramban web (_browser_) Anda untuk melihat hasilnya.
