import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const WELCOME: Message = {
  role: "assistant",
  text: "Halo! Saya asisten virtual Fadli. Tanya apa saja tentang pengalaman, keahlian, atau proyeknya ya 🙂",
};

const SUGGESTIONS = ["Ceritakan tentang Fadli", "Apa saja proyeknya?", "Kontak yang bisa dihubungi"];

function TypingDots() {
  return (
    <div className="flex items-start">
      <div className="chat-bubble chat-bubble-assistant py-2 px-3">
        <span className="w-1.5 h-1.5 bg-accent-deep rounded-full inline-block animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 bg-accent-deep rounded-full inline-block animate-bounce [animation-delay:150ms] ml-1" />
        <span className="w-1.5 h-1.5 bg-accent-deep rounded-full inline-block animate-bounce [animation-delay:300ms] ml-1" />
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, isOpen]);

  const replaceLastAssistant = (text: string) => {
    setMessages((prev) => prev.map((m, i) => (i === prev.length - 1 ? { role: "assistant", text } : m)));
  };

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || loading) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const contentType = res.headers.get("content-type") || "";

      if (res.ok && contentType.includes("text/event-stream")) {
        // Stream: tampilkan bubble AI kosong dulu, isi bertahap
        setMessages((prev) => [...prev, { role: "assistant", text: "" }]);
        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let reply = "";

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split("\n\n");
          buffer = events.pop();
          for (const ev of events) {
            const line = ev.split("\n").find((l) => l.startsWith("data:"));
            if (!line) continue;
            const payload = line.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;
            try {
              const data = JSON.parse(payload);
              if (typeof data.reply === "string") {
                reply += data.reply;
                replaceLastAssistant(reply);
              } else if (data.error) {
                reply = data.error;
                replaceLastAssistant(data.error);
              }
            } catch { /* abaikan event tak dikenal */ }
          }
        }
        if (!reply.trim()) replaceLastAssistant("Maaf, tidak ada jawaban. Coba lagi nanti ya.");
      } else {
        // Bukan SSE (mis. error method): tampilkan pesan dari server apa adanya
        const data = await res.json().catch(() => ({}));
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: data.reply || data.error || "Maaf, terjadi kendala. Coba lagi." },
        ]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Maaf, terjadi kendala. Silakan coba lagi ya." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Tutup chat" : "Buka chat"}
        className="clay-btn fixed bottom-6 left-6 sm:left-auto sm:right-6 z-40 p-4 rounded-full cursor-pointer no-print"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed z-40 no-print bottom-24 left-4 right-4 sm:left-auto sm:right-6 sm:w-[380px] sm:bottom-24 clay-card overflow-hidden flex flex-col max-h-[70vh] sm:max-h-[560px]"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-base border-b border-line flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full clay-btn flex items-center justify-center">
                <Bot size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink leading-tight">Asisten Fadli</p>
                <p className="text-[10px] text-muted flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-deep inline-block" /> Online — Gemini AI
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-ink/[0.05] transition-colors cursor-pointer"
                aria-label="Tutup chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-base/60">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && (
                    <div className="h-6 w-6 shrink-0 rounded-full clay-btn flex items-center justify-center mb-1">
                      <Bot size={12} />
                    </div>
                  )}
                  <div className={`chat-bubble ${m.role === "user" ? "chat-bubble-user" : "chat-bubble-assistant"} max-w-[80%] text-[13px] leading-relaxed whitespace-pre-wrap`}>
                    {m.text}
                    {m.role === "assistant" && loading && m.text === "" && (
                      <span className="animate-pulse">…</span>
                    )}
                  </div>
                  {m.role === "user" && (
                    <div className="h-6 w-6 shrink-0 rounded-full clay-inset flex items-center justify-center text-muted mb-1">
                      <User size={12} />
                    </div>
                  )}
                </motion.div>
              ))}
              {loading && messages[messages.length - 1]?.text === "" && <TypingDots />}
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && !loading && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 bg-base/60">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-[11px] font-semibold text-accent-deep px-3 py-1.5 rounded-full bg-accent/15 border border-accent/30 hover:bg-accent/25 transition-colors cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="p-3 bg-base border-t border-line flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tulis pertanyaan..."
                aria-label="Pesan"
                maxLength={2000}
                className="flex-1 bg-surface border border-line rounded-full px-4 py-2.5 text-[13px] text-ink placeholder:text-muted/70 outline-none focus:border-accent/60 shadow-[inset_0_2px_4px_rgba(93,72,41,0.08)] transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Kirim pesan"
                className="clay-btn p-2.5 rounded-full cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}