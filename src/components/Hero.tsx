import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, FileText, Instagram, MessageCircle, Mail } from "lucide-react";
import { Profile } from "../types";

interface HeroProps {
  profile: Profile;
  onOpenResume: () => void;
}

function LetterReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 12, delay: delay + i * 0.04 }}
          className="inline-block"
          style={{ transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </>
  );
}

function FloatingShape({ delay, duration, x, y, size, shape }: {
  delay: number; duration: number; x: number; y: number; size: number; shape: "circle" | "ring" | "line"
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, -15, 0], rotate: [0, 5, -3, 0] }}
      transition={{ opacity: { delay, duration: 1 }, y: { duration, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: duration * 1.3, repeat: Infinity, ease: "easeInOut" } }}
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {shape === "circle" && (
        <div className="rounded-full bg-[#a78bfa]/5" style={{ width: size, height: size }} />
      )}
      {shape === "ring" && (
        <div className="rounded-full border border-[#a78bfa]/10" style={{ width: size, height: size }} />
      )}
      {shape === "line" && (
        <div className="h-px bg-gradient-to-r from-transparent via-[#a78bfa]/20 to-transparent" style={{ width: size }} />
      )}
    </motion.div>
  );
}

export default function Hero({ profile, onOpenResume }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const firstName = profile.name.split(" ")[0];
  const lastName = profile.name.split(" ").slice(1).join(" ");

  return (
    <section
      id="portfolio-hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Mesh gradient backdrop */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_25%_50%,rgba(124,58,237,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_75%_60%,rgba(167,139,250,0.04)_0%,transparent_50%)]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_50%,transparent_100%)]" />
      </div>

      {/* Floating shapes */}
      <FloatingShape delay={0.5} duration={7} x={15} y={20} size={120} shape="circle" />
      <FloatingShape delay={0.8} duration={9} x={75} y={15} size={80} shape="ring" />
      <FloatingShape delay={1.2} duration={6} x={85} y={65} size={200} shape="line" />
      <FloatingShape delay={0.3} duration={8} x={60} y={75} size={60} shape="circle" />
      <FloatingShape delay={1} duration={10} x={10} y={70} size={150} shape="line" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full z-10 pt-32 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Giant Typography */}
          <div className="lg:col-span-8 space-y-4">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#a78bfa]/5 border border-[#a78bfa]/10 text-xs font-[var(--font-body)] text-[#a78bfa]/70 mb-6">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-50 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                </span>
                Tersedia untuk Freelance & Part-Time
              </div>
            </motion.div>

            {/* Giant name */}
            <div className="space-y-1 md:space-y-2">
              <h1 className="overflow-hidden">
                <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-sans font-black tracking-[-0.04em] leading-[0.9] text-stroke">
                  <LetterReveal text={firstName} delay={0.3} />
                </span>
              </h1>
              <h1 className="overflow-hidden">
                <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-sans font-black tracking-[-0.04em] leading-[0.9] gradient-text">
                  <LetterReveal text={lastName} delay={0.6} />
                </span>
              </h1>
            </div>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 1 }}
              className="text-base sm:text-lg text-[#9494b0] tracking-tight pt-4 max-w-xl"
            >
              {profile.title}
            </motion.p>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 1.1 }}
              className="text-sm text-[#7a7a90] leading-[1.7] max-w-lg"
            >
              {profile.subTitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 1.2 }}
              className="flex flex-col sm:flex-row items-start gap-3 pt-4"
            >
              <button
                onClick={() => { document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="group flex items-center justify-center gap-2 px-7 py-3.5 bg-[#a78bfa] hover:bg-[#9272f5] text-white font-semibold rounded-xl transition-all duration-200 text-sm shadow-[0_4px_30px_rgba(167,139,250,0.25)] hover:shadow-[0_8px_40px_rgba(167,139,250,0.35)] hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Hubungi Saya</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={onOpenResume}
                className="flex items-center justify-center gap-2 px-7 py-3.5 glass-panel hover:bg-[#16162a] text-[#c0c0d0] hover:text-white rounded-xl transition-all duration-200 text-sm cursor-pointer"
              >
                <FileText size={15} />
                <span>Unduh Resume</span>
              </button>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="flex items-center gap-3 pt-6"
            >
              {profile.socials.instagram && (
                <a href={profile.socials.instagram} target="_blank" rel="noopener noreferrer"
                   className="p-2.5 glass-panel rounded-lg text-[#5a5a70] hover:text-[#e1306c] hover:border-[#e1306c]/20 transition-all duration-200 hover:-translate-y-0.5"
                   title="Instagram">
                  <Instagram size={16} />
                </a>
              )}
              {profile.socials.whatsapp && (
                <a href={profile.socials.whatsapp} target="_blank" rel="noopener noreferrer"
                   className="p-2.5 glass-panel rounded-lg text-[#5a5a70] hover:text-[#25d366] hover:border-[#25d366]/20 transition-all duration-200 hover:-translate-y-0.5"
                   title="WhatsApp">
                  <MessageCircle size={16} />
                </a>
              )}
              {profile.socials.email && (
                <a href={profile.socials.email}
                   className="p-2.5 glass-panel rounded-lg text-[#5a5a70] hover:text-[#a78bfa] hover:border-[#a78bfa]/20 transition-all duration-200 hover:-translate-y-0.5"
                   title="Email">
                  <Mail size={16} />
                </a>
              )}
            </motion.div>
          </div>

          {/* Right: Abstract monogram */}
          <div className="hidden lg:flex lg:col-span-4 justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.8 }}
              className="relative"
            >
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 border border-[#a78bfa]/5 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-16 border border-[#7c3aed]/3 rounded-full"
              />

              {/* Main card */}
              <div className="glass-panel rounded-2xl p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#a78bfa]/5 via-transparent to-[#7c3aed]/5 pointer-events-none" />
                <div className="text-center space-y-4 relative">
                  <div className="text-6xl font-black tracking-[-0.06em] gradient-text opacity-80">FK</div>
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#a78bfa]/30 to-transparent mx-auto" />
                  <div className="text-[9px] text-[#7a7a90] font-[var(--font-body)] uppercase tracking-[0.25em] space-y-0.5">
                    <div>UI/UX Design</div>
                    <div>Web Developer</div>
                  </div>
                </div>
              </div>

              {/* Accent dots */}
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-3 right-4 w-1.5 h-1.5 rounded-full bg-[#a78bfa]/25" />
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -bottom-2 left-6 w-1 h-1 rounded-full bg-[#7c3aed]/20" />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-[#5a5a70] font-[var(--font-body)] tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-7 rounded-full border border-[#5a5a70]/50 flex justify-center pt-1.5"
        >
          <div className="w-0.5 h-1.5 rounded-full bg-[#a78bfa]/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
