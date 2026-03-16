## Plan: Implementasi PAPER.OS Design System

Migrasi semua gaya visual ke sistem **PAPER.OS** termasuk palet warna (Editorial Muted), font Inter, border radius yang membulat (`rounded-3xl`), serta menambahkan dukungan transisi dinamis antara Light (`Warm Paper`) dan Dark Mode (`Muted Charcoal`) memakai `next-themes`.

**Steps**

1. Install `next-themes` untuk mengelola state light/dark mode. (_parallel with step 2_)
2. Update konfigurasi Next.js font di app/layout.tsx dari Geist ke **Inter** dan pasang pembungkus `<ThemeProvider>`.
3. Konfigurasi ulang app/globals.css menggunakan CSS variables dari spesifikasi (contoh `--paper-bg`, `--dark-bg`) yang akan dipetakan secara terpusat ke variabel semantik Tailwind seperti `--background`, `--foreground`, dll.
4. Buat komponen **ThemeToggler.tsx** (kemungkinan di `app/components/ui/`) dan integrasikan ke Sidebar serta Bottom Navigation. (_depends on 1 & 3_)
5. Update komponen app/components/ui/Card.tsx, app/components/Sidebar.tsx dan app/components/BottomNavigation.tsx agar mengadopsi estetika PAPER.OS (radius `rounded-xl` untuk button/input, `rounded-3xl` untuk card, aksen tipografi). (_depends on 3_)
6. Update implementasi warna Sticky Notes di modul app/notes/page.tsx dengan palet grid spesifik (Yellow, Pink, Blue, dll) untuk light & dark mode. (_depends on 5_)

**Relevant files**

- `package.json` — Penambahan dependency `next-themes`.
- `app/layout.tsx` — Konfigurasi font "Inter" dan ThemeProvider.
- `app/globals.css` — Memetakan token warna desain (#FAF7F2 terang, #141312 arang) serta utilitas `@theme`.
- `app/components/Sidebar.tsx` — Menyisipkan tombol mode gelap/terang.
- `app/components/BottomNavigation.tsx` — Menambahkan tombol dark mode untuk tampilan mobile (opsional).
- `app/components/ui/Card.tsx` — Memperbarui sistem border `border-border`, membuang drop shadow tebal, dan memasang radius lebar 24px (`rounded-3xl`).
- `app/components/ui/Typography.tsx` — Menyetel tracking (`tracking-tighter` untuk heading besar dan `tracking-widest` untuk micro-labels).
- `app/notes/page.tsx` — Menerapkan warna fix dari spek notes (warna light vs dark BG/Border spesifik).

**Verification**

1. Instal komponen (`npm install next-themes`) lalu verifikasi switch mode merender warna yang benar baik sebagai latar aplikasi maupun teks elemen.
2. Periksa semua card tidak menggunakan drop-shadow tebal sesuai spesifikasi dan border-radius menggunakan `24px`.
3. Buka halaman `/notes` untuk memvalidasi warna "kertas fisik" khusus masing-masing warna sticky note di mode light dan mode dark.

**Decisions**

- Memakai `next-themes` dibandingkan menyimpannya manual di _Zustand / useStore_ agar secara otomatis menyesuaikan local storage dan default preferensi OS tanpa intervensi.
- Memetakan var khusus desain (`--paper-*` dan `--dark-*`) ke kelas-kelas utilitas Tailwind generic yang sudah dipakai aplikasi saat ini (contoh: `--background`). Hal ini akan jauh lebih cepat ketimbang mengubah seluruh nama _class_ (`bg-surface` menjadi `dark:bg-dark-bg bg-paper-bg`) di setiap file komponen UI.
