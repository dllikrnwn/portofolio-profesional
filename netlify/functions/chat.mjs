const MODEL = "gemini-3.6-flash";
const STREAM_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse`;

const SYSTEM_PROMPT = `Kamu adalah asisten virtual dari portfolio Fadli Kurniawan.
Jawab singkat dan jelas dalam 3-4 kalimat lengkap, ramah, dalam Bahasa Indonesia.
Gunakan hanya informasi berikut sebagai sumber fakta. Jika ditanya di luar ini, arahkan pertanyaan ke email faadlikurniawan9@gmail.com atau kontak lain.

PROFIL: Fadli Kurniawan, mahasiswa Sistem Informasi. Web & UI/UX Designer (Landing Page & Mobile App). Mahir wireframe, mockup, prototype di Figma dan Canva, serta HTML, CSS, JavaScript dasar, Laravel, dan Flutter. Disiplin, detail-oriented, kreatif, kolaboratif. Lokasi Jakarta Barat, Indonesia. Email faadlikurniawan9@gmail.com.

PENGALAMAN KERJA:
- Full-Stack Web Development (Laravel + MySQL): perpustakaan online, autentikasi API, export PDF/Excel, payment gateway.
- Mobile Attendance App (Flutter + Laravel): absensi GPS & foto selfie, push notification FCM, arsitektur Riverpod.
- FastraCode: desain UI/UX & pengembangan web landing page modern responsif.

ORGANISASI:
- Wakil Ketua Himpunan Sistem Informasi (HIMSI) UBSI — koordinasi, pengawasan divisi.
- Humas UKM Musik UBSI — komunikasi publik, publikasi digital, event.

PROYEK:
- SIPERPUST — web perpustakaan online (Laravel/PHP/MySQL).
- Mobile Attendance — aplikasi absensi full-stack (Flutter/Laravel/Firebase).
- FastraCode — landing page layanan desain & web development.

KEAHLIAN: Desain Web Figma, Canva, Landing Page Design, Responsive Design, HTML, CSS, JavaScript, Laravel, PHP, MySQL, Flutter/Dart, AI-Assisted Development, Humas, Kolaborasi Tim.

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