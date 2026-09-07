const MODEL = "gemini-3.6-flash";
const INTERACTIONS_URL = "https://generativelanguage.googleapis.com/v1beta/interactions";
const GC_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const SYSTEM_PROMPT = `Kamu adalah asisten virtual dari portfolio Fadli Kurniawan.
Jawab singkat dan jelas dalam 3-4 kalimat lengkap, ramah, dalam Bahasa Indonesia.
Gunakan hanya informasi berikut sebagai sumber fakta. Jika ditanya di luar ini, arahkan pertanyaan ke email faadlikurniawan9@gmail.com atau kontak lain.

PROFIL: Fadli Kurniawan, mahasiswa Sistem Informasi. Web & UI/UX Designer (Landing Page & Mobile App). Mahir wireframe, mockup, prototype di Figma dan Canva, serta HTML, CSS, JavaScript dasar. Disiplin, detail-oriented, kreatif, kolaboratif. Lokasi Jakarta Barat, Indonesia. Email faadlikurniawan9@gmail.com.

PENGALAMAN:
- Project Desain & Web Development (Proyek Pribadi/Tugas Kuliah, aktif): UI/UX design pakai Figma & Canva, pengembangan website dengan HTML/CSS/JS, pengujian prototype.
- Wakil Ketua Himpunan Sistem Informasi (HIMSI) UBSI (2024-sekarang): koordinasi kegiatan, pengawasan divisi, komunikasi organisasi.
- Humas UKM Musik UBSI (2025-2026): manajemen komunikasi, publikasi digital kreatif, kolaborasi event.

PROYEK:
- SIPERPUST: desain UI platform perpustakaan digital (Figma), dashboard interaktif.
- Sistem Absensi Digital: aplikasi mobile absensi GPS + selfie (Flutter + Laravel + Firebase).
- KAPITA: desain UI/UX platform rekomendasi kampus (Figma), biru neon.

KEAHLIAN: Desain Web Figma, Canva, Landing Page Design, Mobile App Design, HTML, CSS, JavaScript, Flutter/Dart, Humas, Kolaborasi Tim, Microsoft Office, organisasi.

Kontak: WhatsApp wa.me/6281285356113, Instagram @dllikrnwn. Tersedia untuk freelance & part-time.`;

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Menangani dua gaya pemanggilan:
// - v2: handler(request) -> request = Web Request (punya .method / .json)
// - v1: handler(event)   -> event = { httpMethod, body }
export default async function handler(input) {
  try {
    const isWebRequest = typeof input?.url === "string" && typeof input.json === "function";
    const method = isWebRequest ? input.method : input.httpMethod;

    if (method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }
    if (method !== "POST") {
      return json({ error: "Method not allowed" }, 405);
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return json({ error: "Server belum dikonfigurasi: GEMINI_API_KEY" }, 500);
    }

    let message = "";
    try {
      const payload = isWebRequest ? await input.json() : JSON.parse(input.body || "{}");
      message = typeof payload.message === "string" ? payload.message.trim().slice(0, 2000) : "";
    } catch {
      return json({ error: "Format permintaan tidak valid" }, 400);
    }
    if (!message) {
      return json({ error: "Pesan kosong" }, 400);
    }

    const reply = await askGemini(apiKey, `${SYSTEM_PROMPT}\n\nPertanyaan pengunjung:\n${message}`);
    return json({ reply });
  } catch (err) {
    console.error("Gemini error:", err?.message || err);
    return json({ error: "Terjadi kendala pada AI, coba lagi." }, 502);
  }
}

async function askGemini(apiKey, prompt) {
  // 1) Jalur resmi untuk model 3.x: Interactions API (thinking dihitung terpisah)
  try {
    const text = await askInteractions(apiKey, prompt);
    if (text) return text;
  } catch (e) {
    console.error("Interactions error:", e.message);
  }
  // 2) Fallback: generateContent klasik
  return askGenerateContent(apiKey, prompt);
}

async function askInteractions(apiKey, prompt) {
  const headers = {
    "Content-Type": "application/json",
    "Api-Revision": "2026-05-20",
    "x-goog-api-key": apiKey,
  };

  const res = await fetch(INTERACTIONS_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: MODEL,
      input: prompt,
      generation_config: { max_output_tokens: 600 },
      background: false,
      stream: false,
    }),
  });
  let data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error?.message || `HTTP ${res.status}`);
  }

  // Poll sampai selesai
  const deadline = Date.now() + 25000;
  while (data.status !== "completed" && data.status !== "failed" && Date.now() < deadline && data.id) {
    await new Promise((r) => setTimeout(r, 800));
    const p = await fetch(`${INTERACTIONS_URL}/${encodeURIComponent(data.id)}`, { headers }).catch(() => null);
    data = p ? await p.json().catch(() => data) : data;
  }

  const steps = data?.steps || [];
  const lastInput = steps.map((s) => s.type).lastIndexOf("user_input");
  return steps
    .slice(lastInput + 1)
    .filter((s) => s.type === "model_output")
    .flatMap((s) => s.content || [])
    .filter((c) => c?.text)
    .map((c) => c.text)
    .join("");
}

async function askGenerateContent(apiKey, prompt) {
  const res = await fetch(GC_URL + "?key=" + apiKey, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 1500 },
    }),
  });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data?.error?.message || "";
    if (/quota|rate.limit/i.test(msg)) {
      return "Maaf, kuota AI gratis hari ini sudah habis (maks 20 tanya/hari). Coba lagi besok, atau hubungi faadlikurniawan9@gmail.com ya.";
    }
    throw new Error(msg || `HTTP ${res.status}`);
  }

  return data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: CORS_HEADERS });
}