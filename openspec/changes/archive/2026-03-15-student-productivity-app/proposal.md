## Why

Membangun website produktivitas mahasiswa yang komprehensif, intuitif, dan sesuai dengan tema "Empowering Students Through Innovative Productivity Tools" untuk dilombakan pada Web Development Competition (WDC) IFest #14 2026. Aplikasi ini akan mengitegrasikan lima modul produktivitas utama (Pencatatan, Timer Fokus, Kalender, To-Do, dan Analisis) dalam satu antarmuka dashboard untuk menyelesaikan masalah manajemen waktu dan tugas mahasiswa.

## What Changes

- Mengembangkan web app dengan arsitektur Multi-Page Application (MPA) yang menawarkan _SPA-like experience_ untuk desktop.
- Mengadopsi Design System modern dengan tema utama Dark Mode (termasuk palet warna, tipografi, radius bingkai).
- Menambahkan fungsionalitas pencatatan (Note-taking).
- Menambahkan fitur Focus Timer menggunakan sistem Pomodoro.
- Menambahkan kalender jadwal (Calendar scheduling).
- Menambahkan manajemen tugas (To-Do task management).
- Mengintegrasikan dashboard analisis produktivitas (Analytics).

## Capabilities

### New Capabilities

- `dashboard-ui`: Antarmuka utama berbentuk dashboard multi-halaman (MPA) dengan navigasi sidebar yang memberikan transisi _SPA-like_.
- `note-taking`: Fitur pencatatan lengkap dengan rich text, kategori (Assignment, Exam, Study), referensi, dan aksi cepat.
- `focus-timer`: Timer Pomodoro yang dapat disesuaikan (25 menit, dst), lengkap dengan log sesi.
- `calendar`: Tampilan jadwal harian/mingguan terintegrasi dengan ringkasan statistik.
- `task-management`: Aplikasi daftar tugas (To-Do) dengan prioritas, filter status (hari ini, minggu ini), dan pelacakan tenggat waktu.
- `analytics`: Tampilan grafik analitik produktivitas meliputi total waktu fokus, tren mingguan, dan rasio penyelesaian tugas.

### Modified Capabilities

_(None)_

## Impact

- Membangun aplikasi front-end baru dengan Next.js / React (sesuai _tech stack_ di workspace).
- Menambahkan library UI dan _styling_ (Tailwind CSS direkomendasikan berdasarkan `postcss.config.mjs` di workspace).
- Mengelola state global untuk pengaturan tema (Dark/Light mode) dan data (Notes, Tasks, Timer, Analytics, Calendar).
- Berpotensi menggunakan _charting library_ (seperti Chart.js atau Recharts) untuk visualisasi analitik.
