import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, Mail, AlertCircle, RefreshCw, User, MessageSquare, BookOpen } from "lucide-react";
import { ContactMessage } from "../types";

export default function Contact() {
  const [formData, setFormData] = useState<ContactMessage>({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactMessage | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setErrorMsg(null);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!formData.name.trim()) { setErrorMsg("Masukkan nama lengkap."); return; }
    if (!formData.email.trim()) { setErrorMsg("Masukkan email."); return; }
    if (!validateEmail(formData.email)) { setErrorMsg("Format email tidak valid."); return; }
    if (!formData.subject.trim()) { setErrorMsg("Masukkan subjek."); return; }
    if (!formData.message.trim()) { setErrorMsg("Ketikkan pesan Anda."); return; }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({ ...formData });
      const mailtoUrl = `mailto:faadlikurniawan9@gmail.com?subject=${encodeURIComponent("[Portfolio] " + formData.subject)}&body=${encodeURIComponent("Halo Fadli,\n\nNama: " + formData.name + "\nEmail: " + formData.email + "\n\n" + formData.message)}`;
      window.location.href = mailtoUrl;
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="py-28 relative pb-36">
      <hr className="section-divider" />

      <div className="max-w-3xl mx-auto px-6 md:px-12 pt-24">
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="text-xs font-[var(--font-body)] tracking-[0.2em] text-[#a78bfa] uppercase mb-3"
          >04 / Kontak</motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
            className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-white"
          >Hubungi Saya</motion.h2>
          <motion.div
            initial={{ width: 0 }} whileInView={{ width: "3rem" }} viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
            className="h-0.5 bg-gradient-to-r from-[#a78bfa] to-transparent mt-4 rounded-full"
          />
        </div>

        <div className="glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#a78bfa] via-[#7c3aed] to-transparent" />

          <AnimatePresence mode="wait">
            {!submittedData ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
              >
                <div className="mb-6">
                  <h3 className="text-base font-semibold text-white">Let's collaborate</h3>
                  <p className="text-sm text-[#7a7a90] mt-1">Kirim penawaran proyek, kolaborasi, atau sekadar menyapa.</p>
                </div>

                {errorMsg && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-950/20 border border-red-900/25 text-red-400 text-xs rounded-lg flex items-center gap-2 mb-4">
                    <AlertCircle size={14} className="shrink-0" /><span>{errorMsg}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Nama" icon={<User size={14} />}>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                        placeholder="Nama lengkap" className="input-field" />
                    </Field>
                    <Field label="Email" icon={<Mail size={14} />}>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                        placeholder="email@domain.com" className="input-field" />
                    </Field>
                  </div>

                  <Field label="Subjek" icon={<BookOpen size={14} />}>
                    <input type="text" name="subject" value={formData.subject} onChange={handleInputChange}
                      placeholder="Judul pesan" className="input-field" />
                  </Field>

                  <Field label="Pesan" icon={<MessageSquare size={14} />}>
                    <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4}
                      placeholder="Tulis pesan Anda di sini..." className="input-field resize-none" />
                  </Field>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#a78bfa] to-[#7c3aed] hover:from-[#b8a8fa] hover:to-[#8b5cf6] disabled:from-[#1a1a2c] disabled:to-[#1a1a2c] disabled:text-[#5a5a70] text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-[0_4px_24px_rgba(167,139,250,0.2)] hover:shadow-[0_6px_30px_rgba(167,139,250,0.3)] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <><RefreshCw size={14} className="animate-spin" /><span>Mengirim...</span></>
                    ) : (
                      <><Send size={14} /><span>Kirim Pesan</span></>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                className="text-center py-6 space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="flex justify-center"
                >
                  <div className="p-3 bg-[#a78bfa]/10 border border-[#a78bfa]/20 rounded-full text-[#a78bfa]">
                    <CheckCircle size={36} />
                  </div>
                </motion.div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Pesan Disiapkan</h3>
                  <p className="max-w-md mx-auto text-sm text-[#7a7a90]">
                    Terima kasih, <strong className="text-white">{submittedData.name}</strong>. Email client akan terbuka.
                  </p>
                </div>

                <div className="bg-[#050508] border border-white/[0.04] rounded-xl p-5 text-left max-w-lg mx-auto space-y-3 text-sm">
                  <div><span className="text-[10px] uppercase tracking-wider text-[#a78bfa] font-semibold">Tujuan</span><p className="text-white mt-0.5">faadlikurniawan9@gmail.com</p></div>
                  <div><span className="text-[10px] uppercase tracking-wider text-[#5a5a70] font-semibold">Pengirim</span><p className="text-[#9494b0] mt-0.5">{submittedData.name}</p></div>
                  <div><span className="text-[10px] uppercase tracking-wider text-[#5a5a70] font-semibold">Subjek</span><p className="text-white mt-0.5">{submittedData.subject}</p></div>
                  <div className="h-px bg-white/[0.05]" />
                  <div><span className="text-[10px] uppercase tracking-wider text-[#5a5a70] font-semibold">Pesan</span><p className="text-[#7a7a90] italic mt-1">&quot;{submittedData.message}&quot;</p></div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                  <a href={`mailto:faadlikurniawan9@gmail.com?subject=${encodeURIComponent("[Portfolio] " + submittedData.subject)}&body=${encodeURIComponent("Halo Fadli,\n\nNama: " + submittedData.name + "\nEmail: " + submittedData.email + "\n\n" + submittedData.message)}`}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#a78bfa] to-[#7c3aed] text-white rounded-xl text-xs font-medium shadow-[0_2px_12px_rgba(167,139,250,0.2)]">
                    <Send size={13} /><span>Buka Email</span>
                  </a>
                  <a href="https://wa.me/6281285356113" target="_blank" rel="noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 glass-panel hover:bg-[#16162a] text-[#9494b0] rounded-xl text-xs font-medium transition-all">
                    <MessageSquare size={13} /><span>WhatsApp</span>
                  </a>
                  <button onClick={() => { setSubmittedData(null); setErrorMsg(null); }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-[#7a7a90] hover:text-white text-xs font-medium transition-colors cursor-pointer">
                    <RefreshCw size={13} /><span>Pesan Baru</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5 group">
      <label className="text-[10px] font-semibold text-[#5a5a70] block uppercase tracking-[0.15em] group-focus-within:text-[#a78bfa] transition-colors">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4a4a60] group-focus-within:text-[#a78bfa]/70 transition-colors">{icon}</span>
        {children}
      </div>
    </div>
  );
}
