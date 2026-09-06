import { Profile, Experience, Project, SkillCategory } from "./types";
import fadliPhoto from "./dli.59.28.jpeg";
import siperpustImg from "./assets/images/siperpust_showcase_1779405941977.png";
import mykostImg from "./assets/images/mykost_showcase_1779408899887.png";
import kapitaImg from "./assets/images/kapita_new_showcase_1779796673826.png";
import absensiImg from "./assets/images/absensi_showcase.png";

export const profileData: Profile = {
  name: "Fadli Kurniawan",
  title: "Sistem Informasi Student | Web & UI/UX Design",
  subTitle: "Menghadirkan perpaduan estetis antara Web & UI/UX Design, Landing Page Design, dan Mobile App Design untuk solusi digital yang interaktif dan komunikatif.",
  bio: "Saya adalah mahasiswa Sistem Informasi yang memiliki ketertarikan kuat untuk berkarir di bidang Web & UI/UX Design (Landing Page & Mobile App). Saya lihai merancang wireframe, mockup, dan prototype interaktif menggunakan Figma dan Canva, serta memiliki pemahaman dasar HTML, CSS, dan JavaScript untuk pembuatan website fungsional berbasis rancangan UI/UX terbaik. Saya dikenal sebagai pribadi disiplin, berorientasi detail, kreatif, dan mampu menjalin kolaborasi tim yang solid.",
  avatarUrl: fadliPhoto,
  location: "Jakarta Barat, Indonesia",
  email: "faadlikurniawan9@gmail.com",
  phone: "081285356113",
  resumePdfUrl: "#resume",
  socials: {
    instagram: "https://www.instagram.com/dllikrnwn?igsh=MXJjcDd4NG1rc3FibA==",
    whatsapp: "https://wa.me/6281285356113",
    email: "mailto:faadlikurniawan9@gmail.com"
  }
};

export const experiencesData: Experience[] = [
  {
    id: "exp1",
    role: "Project Desain & Web Development",
    company: "Project Pribadi / Tugas Kuliah",
    period: "Aktif",
    location: "Jakarta, Indonesia",
    description: [
      "Mendesain tampilan antarmuka (UI/UX) website interaktif yang fungsional menggunakan tool Figma dan Canva.",
      "Mengembangkan website sederhana dengan struktur kode yang bersih menggunakan HTML, CSS, dan JavaScript dasar.",
      "Melakukan pengujian prototype aplikasi secara lokal untuk memastikan fungsionalitas navigasi dan respon tata letak berjalan optimal."
    ],
    skills: ["Figma", "Canva", "HTML", "CSS", "JavaScript", "VS Code", "Prototyping"]
  },
  {
    id: "exp3",
    role: "Wakil Ketua Himpunan Sistem Informasi (HIMSI)",
    company: "Universitas Bina Sarana Informatika",
    period: "2024 - Sekarang",
    location: "Jakarta, Indonesia",
    description: [
      "Membantu ketua dalam mengoordinasikan kegiatan dan memastikan program kerja HIMSI berjalan dengan baik dan terstruktur.",
      "Mengawasi kinerja divisi serta membantu menyelesaikan kendala dalam pelaksanaan kegiatan organisasi.",
      "Menjaga komunikasi dan kerja sama antar anggota untuk menciptakan lingkungan organisasi yang aktif, solid, dan bertanggung jawab."
    ],
    skills: ["Kepemimpinan", "Manajemen Organisasi", "Komunikasi", "Koordinasi Acara", "Pemecahan Masalah"]
  },
  {
    id: "exp2",
    role: "Humas Organisasi Kampus",
    company: "UKM Musik - Universitas Bina Sarana Informatika",
    period: "2025 - 2026",
    location: "Jakarta, Indonesia",
    description: [
      "Mengelola saluran komunikasi internal dan eksternal organisasi demi kelancaran koordinasi program kerja.",
      "Membantu penyebaran informasi kegiatan melalui pembuatan publikasi digital kreatif di media sosial dan platform digital.",
      "Bekerja sama secara aktif dalam tim lintas divisi untuk menyukseskan pelaksanaan kegiatan festival dan event organisasi."
    ],
    skills: ["Humas", "Komunikasi Publik", "Media Sosial", "Desain Publikasi", "Kolaborasi Tim", "Manajemen Event"]
  }
];

export const projectsData: Project[] = [
  {
    id: "proj1",
    title: "Project Toko Baju Online",
    category: "Web",
    summary: "Pembuatan website katalog toko baju modern dengan antarmuka responsif menggunakan VS Code.",
    description: "Merupakan proyek pengembangan website e-commerce fashion sederhana yang menyajikan katalog produk, detail deskripsi pakaian, serta navigasi belanja yang intuitif. Memanfaatkan struktur murni HTML5 untuk tata letak, CSS3 untuk gaya modern, serta interaksi JavaScript sederhana.",
    technologies: ["HTML5", "CSS3", "JavaScript", "VS Code"],
    githubUrl: "https://github.com/fadlikurniawan/toko-baju-web",
    imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop",
    features: [
      "Tampilan halaman katalog produk fashion responsif yang ramah perangkat seluler.",
      "Fitur filter kategori pakaian (Pria, Wanita, Aksesoris) berbasis manipulasi DOM JavaScript.",
      "Halaman keranjang belanja simulasi interaktif."
    ]
  },
  {
    id: "proj2",
    title: "SIPERPUST - Sewa Buku Online",
    category: "Web",
    summary: "Rancangan antarmuka platform perpustakaan digital terpadu untuk meningkatkan literasi, memonitor, dan menyewa koleksi buku dengan mudah.",
    description: "Sistem desain web terpadu untuk program SIPERPUST (Digital Literacy Transformation) dengan rancangan visual bernuansa modern yang ramah pengguna. Menggunakan perpaduan warna indigo dan violet untuk menciptakan dashboard interaktif lengkap dengan grafik kemajuan bacaan, visualisasi 3D kartu buku, manajemen pinjaman, serta dokumentasi Design System yang matang.",
    technologies: ["Figma", "Canva", "UI/UX Design", "Responsive Web Layout", "Design System"],
    liveUrl: "http://siperpust.xo.je/",
    imageUrl: siperpustImg,
    features: [
      "Dashboard performa membaca interaktif yang menyajikan statistik buku dipinjam, total denda, secara visual.",
      "Tampilan katalog buku berformat grid responsif dengan klasifikasi kategori, status, dan riwayat sirkulasi pintar.",
      "Sistem desain atomik yang mencakup panduan tipografi (Aa/Aaa), variasi palet warna kustom, dan koleksi set ikon yang konsisten."
    ]
  },
  {
    id: "proj3",
    title: "Sistem Absensi Digital",
    category: "Mobile",
    summary: "Aplikasi mobile absensi berbasis GPS + foto selfie dengan backend Laravel, panel admin real-time, dan manajemen karyawan lengkap.",
    description: "Aplikasi absensi digital full-stack yang mengintegrasikan mobile app Flutter dengan REST API Laravel. Mendukung pencatatan kehadiran berbasis GPS dan foto selfie, dashboard admin real-time dengan fitur Live View, rekap bulanan, pengelolaan payroll, pengajuan izin/cuti, serta manajemen karyawan dan divisi. Menggunakan arsitektur Riverpod untuk state management, Firebase Cloud Messaging untuk notifikasi push, dan sistem autentikasi JWT.",
    technologies: ["Flutter", "Laravel", "REST API", "Firebase", "Riverpod", "GPS Tracking", "Dark Mode"],
    githubUrl: "https://github.com/fadlikurniawan/aplikasi-absensi",
    imageUrl: absensiImg,
    features: [
      "Absensi berbasis GPS & foto selfie dengan validasi lokasi dan pencatatan waktu otomatis real-time.",
      "Dashboard admin real-time dengan Live View kehadiran, rekap bulanan, dan manajemen payroll karyawan.",
      "Profil karyawan dengan dark mode, jadwal kerja, notifikasi push, dan pengajuan izin/cuti terintegrasi."
    ]
  },
  {
    id: "proj4",
    title: "MYKOST - Kost Online",
    category: "Mobile",
    summary: "Rancangan UI/UX aplikasi pencarian dan penyewaan kost online interaktif yang praktis, aman, dan transparan.",
    description: "Sebuah solusi digital komprehensif bertajuk MYKOST (Kost Online) untuk memudahkan pencarian kamar kost bagi pencari (seeker) dan manajemen properti bagi pemilik (owner). Memiliki desain bertema hijau-teal (Branded Teal & Soft Mint) dengan antarmuka modern yang menyajikan rekomendasi kost terkurasi, pencarian berbasis kategori (Putra, Putri, Campur), chat langsung dengan pemilik, visualisasi laporan keuangan pada dashboard pemilik premium, serta sistem pembayaran terintegrasi.",
    technologies: ["Figma", "Canva", "UI/UX Design", "Mobile App Design", "User Persona & Journey"],
    liveUrl: "https://www.figma.com/proto/iQmNPqnLhQJmyZTcKly2g4/MyKost?node-id=7-1118&p=f&t=islHBB2ZjQIqDe2W-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=7%3A1118",
    imageUrl: mykostImg,
    features: [
      "Pencarian Kost Berbasis Kategori Cerdas (Putra, Putri, Campur) dengan filter harga dan lokasi presisi harian/bulanan.",
      "Fitur Direct Messaging & Hubungi Pemilik langsung dari dalam aplikasi untuk negosiasi dan verifikasi ketersediaan kamar.",
      "Dashboard Owner Premium interaktif yang menampilkan data visualisasi pendapatan, pengeluaran, persentase booking, dan kontrol sirkulasi keuangan kost secara real-time.",
      "Integrasi Perjalanan Pengguna (User Journey Maps) serta Profil Persona (Seeker) terstruktur untuk menghasilkan aplikasi yang berpusat pada kenyamanan pengguna."
    ]
  },
  {
    id: "proj5",
    title: "KAPITA - Kampus Pilihan Kita",
    category: "UI/UX",
    summary: "Rancangan UI/UX platform interaktif pencarian dan rekomendasi universitas impian terbaik untuk membantu pemetaan pendidikan tinggi calon mahasiswa.",
    description: "Sistem rancangan visual platform bimbingan & direktori perguruan tinggi bernama KAPITA (Kampus Pilihan Kita) untuk memudahkan calon mahasiswa menemukan program studi dan perguruan tinggi yang paling relevan dengan minat, bakat, serta impian mereka. Didesain dengan palet warna biru neon elektrik dan cyan bersih untuk memancarkan aura akademis, optimisme, dan teknologi masa depan yang bersahabat. Aplikasi ini mengintegrasikan navigasi pencarian program studi teruji, komparator universitas berdampingan, ulasan terverifikasi alumni, peta rute pendaftaran (SNBP, SNBT, Mandiri), serta dashboard tracker persiapan berkas pendaftaran.",
    technologies: ["Figma", "Canva", "UI/UX Design", "Wireframing", "Interaction Design", "User Persona"],
    liveUrl: "https://www.figma.com/proto/4FIW9fusS6Hsb2GapuNGYR/Untitled?node-id=62-3690&starting-point-node-id=62%3A3690&scaling=scale-down-width&content-scaling=fixed&t=X3du4qxAK2egVRhy-1",
    imageUrl: kapitaImg,
    features: [
      "Sistem Pencarian Perguruan Tinggi Terintegrasi dengan kustomisasi akreditasi prodi, filter wilayah, kalkulasi biaya kuliah rata-rata, dan pembandingan daya tampung dinamis.",
      "Fitur Bandingkan Kampus (Side-by-Side College Comparator) untuk membentangkan rincian fasilitas, kurikulum, dan reputasi dua kampus berbeda secara sejajar.",
      "Peta Linimasa Jalur Masuk (SNBP, SNBT, Seleksi Mandiri) interaktif dilengkapi sistem pengingat tenggat waktu unggah berkas portofolio dan dokumen pendaftaran.",
      "Ulasan Alumni Terverifikasi (Verified Alumni Testimonials) yang menyajikan data rill tentang kultur belajar, jaringan alumni, dan persentase serapan lulusan di dunia kerja."
    ]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    id: "cat1",
    name: "Desain Kreatif, Web & UI/UX",
    skills: [
      { name: "Desain Web (Figma)", level: 4.5 },
      { name: "Canva & Grafis", level: 4.5 },
      { name: "Landing Page Design", level: 4.8 },
      { name: "Mobile App Design", level: 4.6 },
      { name: "App Design", level: 4.7 },
      { name: "Adobe Photoshop", level: 3.5 }
    ]
  },
  {
    id: "cat2",
    name: "Pengembangan Web & Mobile",
    skills: [
      { name: "HTML & Struktur Web", level: 4 },
      { name: "CSS & Penataan Gaya", level: 4 },
      { name: "JavaScript Dasar", level: 3.5 },
      { name: "VS Code Editor", level: 4 },
      { name: "FlutLab IDE", level: 4.0 },
      { name: "Dart Dasar", level: 3.8 }
    ]
  },
  {
    id: "cat3",
    name: "Administratif & Organisasi",
    skills: [
      { name: "Hubungan Masyarakat (Humas)", level: 4.5 },
      { name: "Kolaborasi Tim & Komunikasi", level: 5 },
      { name: "Microsoft Office (Excel, Word, PP)", level: 4 },
      { name: "Teknik Komputer & Jaringan (TKJ)", level: 4 }
    ]
  }
];
