<div align="center">

# COUMPUTERCLASS — Website XI TJKT 1

**SMK Negeri 1 Maluku Tengah · Teknik Jaringan Komputer & Telekomunikasi**

*Satu kelas, satu koneksi.*

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2020-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tanpa Framework](https://img.shields.io/badge/No%20Framework-100%25-mintcream?style=flat)]()

</div>

---

## — Tentang — 

Website resmi kelas **XI TJKT 1** — keluarga kecil di balik akun
[`@coumputerclass`](https://www.instagram.com/coumputerclass/). Sebuah ruang
laboratorium daring tempat kabel berbicara, paket data berpindah, dan masa
depan dirangkai satu byte demi satu byte.

Dibangun **murni dengan HTML, CSS, dan JavaScript** — tanpa framework, tanpa
library UI, tanpa build step. Cukup buka dan langsung jalan.

## — Fitur —

| Kategori | Detail |
|---|---|
| 🎨 **Desain** | Monokrom premium, tipografi editorial (Fraunces + Space Grotesk + Space Mono), grid pattern |
| 📱 **Responsif** | **Mobile-first** — dioptimalkan untuk layar sentuh, tap target ≥44px, safe-area iOS |
| 🎬 **Animasi** | Preloader counter, reveal-on-scroll, hero line-mask, marquee, staggered menu, shimmer cards |
| ✨ **Micro-interaksi** | Custom cursor (blend-difference), tombol *magnetic*, teks *scramble*, scramble di hover |
| 🎵 **Musik** | Autoplay + loop (`music/Coracao_Maloqueiro.mp3`), dock player equalizer, toast notifikasi |
| 👥 **Konten** | Tentang, Pengurus Kelas, Daftar Siswa (29 siswa), Galeri Lab, Gallery Kelas, Jadwal, Creator |
| 🖼️ **Galeri** | Tile + lightbox dengan navigasi keyboard `←` `/` `→` `/` `Esc` |
| ♿ **Aksesibilitas** | `prefers-reduced-motion`, aria-label, semantik HTML, fokus keyboard |

## — Teknologi —

| Teknologi | Peran |
|---|---|
| **HTML5** | Struktur semantik satu halaman (`index.html`) |
| **CSS3** | Design system berbasis *custom properties* (`tokens.css`), struktur **mobile-first** |
| **Vanilla JS (ES2020)** | Preloader, kursor, reveal, magnetik, counter, lightbox, musik, menu |
| **Inline SVG** | Seluruh ikon (tanpa emoji/emoticon) |
| **Google Fonts** | `Fraunces`, `Space Grotesk`, `Space Mono` |

## — Struktur —

```
XI_TJKT1/
├── index.html            # Semua konten (satu halaman)
├── css/
│   ├── tokens.css        # Design tokens: warna, font, spacing (ubah desain di sini)
│   ├── base.css          # Reset, tipografi, animasi global (mobile-first)
│   ├── components.css    # Navbar, tombol, kartu, marquee, musik, toast
│   └── sections.css      # Layout tiap section (hero → footer)
├── js/
│   └── main.js           # Semua interaksi (moduler, terkomentari)
├── assets/
│   ├── favicon.svg
│   └── Hizkia_Letwar.jpeg # Foto creator
├── music/
│   └── Coracao_Maloqueiro.mp3
└── README.md
```

## — Menjalankan —

Tanpa build step — buka langsung di browser:

```bash
# 1. Buka folder
cd XI_TJKT1

# 2. Preview di browser (pilih salah satu)
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows

# atau jalankan server lokal ringan
python3 -m http.server 8080
# lalu buka http://localhost:8080
```

## — Kustomisasi —

> Semua bagian yang paling sering diubah dikelompokkan di `index.html`
> dengan komentar `<!-- ==== NAMA SEKSI ==== -->`.

| Yang ingin diubah | Tempat |
|---|---|
| **Nama & pengurus kelas** | `index.html` → blok *Pengurus Kelas* (4 kartu) |
| **Daftar 29 siswa** | `index.html` → section `id="siswa"` (kartu `Nama Siswa XX`) |
| **Foto siswa/pengurus** | Ganti isi `.student__photo` / `.crewcard__photo` dengan `<img>` |
| **Galeri** | Section `id="galeri"` & `id="gallery-kelas"` (tile + caption) |
| **Musik** | Ganti file di `music/`, sesuaikan `src` pada `<audio id="music">` |
| **Judul lagu & toast** | `js/main.js` → konstanta `TITLE = "..."` |
| **Link sosial creator** | Section `id="creator"` → tombol `.social-btn` |
| **Warna & font** | Satu-satunya file: `css/tokens.css` |
| **Nomor statistik** | `index.html` → `data-count` pada `.stat__num` |

## — Musik & Kebijakan Autoplay —

Lagu `Coracao_Maloqueiro.mp3` diputar otomatis saat halaman dibuka dan
mengulang (`loop`) sampai halaman ditutup.

**Catatan penting:** browser modern (Chrome, Safari, Firefox, Edge) memblokir
autoplay bersuara tanpa interaksi pengguna. Strategi yang dipakai:

1. Coba autoplay **audible** saat load — langsung jalan jika browser mengizinkan.
2. Jika diblokir → musik mulai **muted** (selalu diizinkan), lalu muncul toast
   **"Ketuk layar untuk membunyikan musik"**.
3. Gestur pertama di mana pun (klik/tap/key) → otomatis **unmute**.

Setelah kamu berinteraksi sekali dengan domain ini, kunjungan berikutnya
umumnya langsung bersuara (sticky activation).

## — Kompatibilitas Browser —

| Browser | Status |
|---|---|
| Chrome / Edge (83+) | ✔ Optimal — cursor kustom, backdrop-filter |
| Firefox (75+) | ✔ | 
| Safari (14+) | ✔ — klik "Buka suara" pada toast jika diblokir |
| Mobile (iOS/Android) | ✔ Mobile-first, safe-area, tanpa cursor kustom |

Fitur turun-genting: jika `prefers-reduced-motion` aktif, semua animasi
dimatikan otomatis.

## — Pengurus Kelas —

| Peran | Nama |
|---|---|
| Wali Kelas | Hans Kapressy |
| Ketua Kelas | Johanes T. Walalayo |
| Sekretaris | Juliana Putri Sarak |
| Bendahara | Wievielt Grevanya Wattimena |

## — Creator —

**Hikia Letwar** — pembuat situs kelas.

[![GitHub](https://img.shields.io/badge/GitHub-ikyletwar-black?style=social&logo=github)](https://github.com/ikyletwar)
[![Instagram](https://img.shields.io/badge/Instagram-ikyletwar-black?style=social&logo=instagram)](https://www.instagram.com/ikyletwar/)
[![TikTok](https://img.shields.io/badge/TikTok-@ikyletwar-black?style=social&logo=tiktok)](https://www.tiktok.com/@ikyletwar)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-081227237338-black?style=social&logo=whatsapp)](https://wa.me/6281227237338)

---

<div align="center">

© 2026 XI TJKT 1 · [`@coumputerclass`](https://www.instagram.com/coumputerclass/) · Dibuat dengan ♥ di laboratorium jaringan.

</div>