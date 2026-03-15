## Context

Aplikasi produktivitas mahasiswa ini menargetkan lomba WDC 2026. Kompetisi ini mengharuskan konten berbasis statis (namun pada Multi-Page Application / MPA diharapkan dapat memberikan _SPA-like experience_ yang responsif). Teknologi yang ada di workspace berupa Next.js, React, Tailwind CSS (dilihat dari `tailwind.config`, `postcss.config`). Kita harus membangun antarmuka terpusat (dashboard) dengan Sidebar Navigasi dan berbagai panel/fitur fungsional (Timer, Kalender, dsb) mengutamakan design system yang telah disediakan (Dark Mode, dengan aksen ungu neon: `#6E56CF`). Karena batasannya adalah konten web statis/frontend, penyimpanan data aplikasi akan diandalkan ke _client-side storage_ seperti `localStorage` atau Context API di React untuk simulasi.

## Goals / Non-Goals

**Goals:**

- Membuat Multi-Page Application (MPA) berbasis React/Next.js dengan _SPA-like experience_, antarmuka sesuai dengan wireframe / gambar referensi.
- Mengimplementasikan State Management sentral untuk mensimulasikan penyimpanan data kelima modul (Note-taking, Focus Timer, Calendar, To-Do, Analytics).
- Menerapkan arsitektur desain komponen modular (Cards, Buttons, Inputs, Sidebar, Charts) yang bisa digunakan kembali antar halaman.
- Mendukung Dark dan Light theme, default ke Dark.

**Non-Goals:**

- Membangun backend nyata persisten ke database (kompetisi mensyaratkan tidak menggunakan full-stack backend khusus seperti Django/SpringBoot dsb, ditekankan pada static info atau setidaknya murni di client/local server statis).
- Real-time collaboration atau multi-user secara sinkron.
- Notifikasi push asli sistem operasi (hanya UI in-app / toast notification).

## Decisions

- **Framework**: Next.js App Router (karena ekosistem workspace saat ini).
- **Styling**: Tailwind CSS untuk implementasi design token seperti `bg-base` (`#16161E`), `bg-surface` (`#20202A`), `accent-primary` (`#6E56CF`) dll. Membuat custom CSS variables di `globals.css` sesuai dengan dokumen tata letak (8-point grid, border radius `24px`).
- **State Management**: `Zustand` atau `React Context API` untuk menyimpan data statis To-Do, jadwal, serta log timer. LocalStorage digunakan untuk persistensi ringan selama penilaian kompetisi.
- **Charts**: Recharts atau Chart.js (react-chartjs-2) sangat cocok untuk render grafik tren waktu fokus harian/mingguan dan persentase task completion, karena tampilannya bisa dikostumisasi mudah dengan gaya neon.
- **Routing**: Sidebar navigasi akan memanfaatkan Next.js sub-routes (`/dashboard`, `/notes`, `/timer`, `/calendar`, `/todo`, `/analytics`) yang mencerminkan pendekatan arsitektur Multi-Page Application (MPA). Transisi halaman akan dioptimalkan untuk terasa halus dan cepat layaknya _SPA-like experience_.

## Risks / Trade-offs

- _Risk_: Integrasi grafik tidak sesuai mock-up design (glow line/neon effect). -> _Mitigation_: Gunakan SVG filter/drop-shadow di line chart dengan library Recharts.
- _Risk_: Manajemen state antara timer yang berjalan global dan panel lain bisa reset jika navigasi berpindah. -> _Mitigation_: Simpan state Timer ke level teratas (`layout.tsx` atau Global Context) agar terus bernavigasi tanpa mati.
