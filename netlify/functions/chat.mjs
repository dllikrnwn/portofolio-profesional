const MODEL = "gemini-3.6-flash";
const STREAM_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse`;

const SYSTEM_PROMPT = `Kamu adalah asisten virtual dari portfolio Fadli Kurniawan.
Jawab singkat dan jelas dalam 3-4 kalimat lengkap, ramah, dalam Bahasa Indonesia.
Gunakan hanya informasi berikut sebagai sumber fakta. Jika ditanya di luar ini, arahkan pertanyaan ke email faadlikurniawan9@gmail.com atau kontak lain.

Saat diminta memperkenalkan atau menceritakan Fadli, selalu sertakan nomor telepon 081285356113 dan Instagram @dllikrnwn.

PROFIL: Fadli Kurniawan, mahasiswa Sistem Informasi (S1) Universitas Bina Sarana Informatika (2024-2028). Web & UI/UX Designer dan Web Developer. Mahir wireframe, mockup, prototype di Figma dan Canva, serta pengembangan web full-stack dan aplikasi mobile. Terbiasa memakai AI sebagai tools pendukung desain dan development. Lokasi Jakarta Barat, Indonesia. Email faadlikurniawan9@gmail.com.

PENDIDIKAN:
- Sistem Informasi (S1), Universitas Bina Sarana Informatika (2024-2028).
- Teknik Komputer Jaringan, SMK Telkom Jakarta (2021-2023).

PENGALAMAN KERJA (proyek pribadi):
- FastraCode — Web Design & Development: UI/UX (Figma, Canva), responsive design, layout, user experience.
- Couple Album — Full-Stack Web: gallery foto/video/catatan; React, Vite, Tailwind, Framer Motion; Node/Express/MySQL; JWT+bcrypt; Cloudinary; Nodemailer; node-cron; download ZIP; deploy Vercel & Render.
- Mobile Attendance App — Full-Stack Mobile: Flutter, Riverpod, Dio; absensi GPS & foto selfie; Firebase Cloud Messaging; secure storage.
- SIPERPUST — Online Library Web: Laravel, PHP, MySQL, Sanctum; export PDF/Excel; Midtrans; Tailwind + Vite.

ORGANISASI:
- Wakil Ketua Himpunan Sistem Informasi (HIMSI) UBSI — koordinasi, pengawasan divisi (2024-sekarang).
- Humas UKM Musik UBSI — komunikasi publik, publikasi digital, event (2025-2026).

PROYEK:
- SIPERPUST — sistem informasi perpustakaan online (Laravel/PHP/MySQL).
- Mobile Attendance App — aplikasi absensi full-stack (Flutter + Laravel).
- FastraCode — landing page layanan desain & web dev (fastracode.vercel.app).
- Couple Album — aplikasi web kenangan foto/video (React + Node) (couple-album-3o23.vercel.app).

KEAHLIAN:
- Web & UI/UX: Figma, Canva, Landing Page Design, Responsive Design, Prototyping, Wireframing.
- Web Development & Mobile: HTML, CSS, JavaScript, PHP, Laravel, MySQL, React, Node.js/Express, Flutter/Dart.
- Tools & AI: VSCode, Google AI Studio, ChatGPT, Gemini, Opencode, AI-Assisted Development.

Kontak: WhatsApp wa.me/6281285356113, Instagram @dllikrnwn. Tersedia untuk freelance & part-time.`;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SSE_HEADERS = {
  "Content-Type": "text/event-stream; charset=utf-8",
  "Cache-Control": "no-cache",
  "Connection": "keep-alive",
  "X-Accel-Buffering": "no",
  ...CORS_HEADERS,
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

    const prompt = `${SYSTEM_PROMPT}\n\nPertanyaan pengunjung:\n${message}`;
    // SEGERA kembalikan stream — fetch ke Gemini terjadi di dalam start().
    return new Response(askGeminiStream(apiKey, prompt), { status: 200, headers: SSE_HEADERS });
  } catch (err) {
    console.error("Gemini error:", err?.message || err);
    return sseEvent({ reply: friendlyMessage(err?.message || "") });
  }
}

// Membuat ReadableStream SSE. Fetch ke Gemini dilakukan di dalam start(),
// sehingga Response (header) langsung keluar — bebas dari limit 10 dtk Netlify.
function askGeminiStream(apiKey, prompt) {
  return new ReadableStream({
    async start(controller) {
      let res;
      try {
        res = await fetch(STREAM_URL + "&key=" + apiKey, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "text/event-stream", "x-goog-api-key": apiKey },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 1200 },
          }),
        });
      } catch (e) {
        emitOne(controller, { reply: "Jaringan ke layanan AI terputus. Coba lagi ya." });
        close(controller);
        return;
      }

      if (!res.ok) {
        let msg = `HTTP ${res.status}`;
        try { msg = (await res.json()).error?.message || msg; } catch { /* default */ }
        emitOne(controller, { reply: friendlyMessage(msg) });
        close(controller);
        return;
      }
      if (!res.body) {
        emitOne(controller, { reply: "Layanan AI tidak mengirim data." });
        close(controller);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let emittedText = false;

      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, "\n");

          const lines = buffer.split("\n");
          buffer = lines.pop();
          for (const line of lines) {
            if (!line.startsWith("data:")) continue;
            const payload = line.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;
            let parsed;
            try { parsed = JSON.parse(payload); } catch { continue; }

            const parts = parsed?.candidates?.[0]?.content?.parts || [];
            const text = parts.map((p) => p.text || "").join("");
            if (text) {
              emittedText = true;
              controller.enqueue(enc(`data: ${JSON.stringify({ reply: text })}\n\n`));
            }
          }
        }
      } catch { /* koneksi terputus */ }

      if (!emittedText) {
        emitOne(controller, { reply: "AI tidak mengembalikan jawaban. Coba pertanyaan lain ya." });
      }
      close(controller);
    },
  });
}

function emitOne(controller, payload) {
  controller.enqueue(enc(`data: ${JSON.stringify(payload)}\n\n`));
}
function close(controller) {
  controller.enqueue(enc("data: [DONE]\n\n"));
  controller.close();
}
function enc(str) {
  return new TextEncoder().encode(str);
}

function sseEvent(payload) {
  return new Response(`data: ${JSON.stringify(payload)}\n\ndata: [DONE]\n\n`, {
    status: 200,
    headers: SSE_HEADERS,
  });
}

function friendlyMessage(msg) {
  if (/quota|rate.limit|temporar|high demand/i.test(msg)) {
    return "AI sedang penuh atau kuota gratis hari ini sudah habis (maks 20 tanya/hari). Coba lagi nanti ya — atau hubungi faadlikurniawan9@gmail.com.";
  }
  return "Maaf, terjadi kendala pada AI. Silakan coba lagi.";
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...CORS_HEADERS } });
}