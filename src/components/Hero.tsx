import { motion } from "motion/react";
import {
  ArrowRight,
  FileText,
  Instagram,
  MessageCircle,
  Mail,
  MapPin,
  CircleDot,
} from "lucide-react";
import { Profile } from "../types";

interface HeroProps {
  profile: Profile;
  onOpenResume: () => void;
}

function Kicker() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.05 }}
      className="flex items-end justify-between border-b border-line pb-4"
    >
      <span className="text-[11px] font-semibold tracking-[0.25em] text-muted uppercase">
        Portfolio — 2026
      </span>
      <span className="text-[11px] font-semibold tracking-[0.25em] text-muted uppercase hidden sm:inline">
        Jakarta, Indonesia
      </span>
    </motion.div>
  );
}

export default function Hero({ profile, onOpenResume }: HeroProps) {
  const firstName = profile.name.split(" ")[0];
  const lastName = profile.name.split(" ").slice(1).join(" ");

  return (
    <section
      id="portfolio-hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Soft green wash — subtle, edge only */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_90%,rgba(143,188,148,0.16)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full z-10 pt-28 pb-24 flex-1 flex flex-col justify-center">
        <Kicker />

        {/* Name — single editorial line */}
        <h1 className="mt-8 font-sans font-extrabold tracking-[-0.03em] leading-[0.95] text-[clamp(2.9rem,10.5vw,8.5rem)]">
          <motion.span
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 18,
              delay: 0.15,
            }}
            className="block text-balance text-ink"
          >
            {firstName} <span className="text-accent-deep">{lastName}</span>
          </motion.span>
        </h1>

        {/* Role line */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-5 text-base sm:text-lg text-ink/75 tracking-tight"
        >
          {profile.title}
        </motion.p>

        {/* Editorial divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 h-px w-full origin-left bg-line"
        />

        {/* Info chips — replacing the photo */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl"
        >
          <div className="clay-card rounded-2xl px-5 py-4">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-muted uppercase mb-1">
              Lokasi
            </p>
            <p className="text-sm font-medium text-ink flex items-center gap-1.5">
              <MapPin size={13} className="text-accent-deep" />{" "}
              {profile.location}
            </p>
          </div>
          <div className="clay-card rounded-2xl px-5 py-4">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-muted uppercase mb-1">
              Status
            </p>
            <p className="text-sm font-medium text-ink flex items-center gap-1.5">
              <CircleDot size={13} className="text-accent-deep" /> Tersedia
              Freelance
            </p>
          </div>
          <div className="clay-card rounded-2xl px-5 py-4">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-muted uppercase mb-1">
              Email
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="text-sm font-medium text-ink hover:text-accent-deep transition-colors break-all"
            >
              {profile.email}
            </a>
          </div>
        </motion.div>

        {/* CTAs + subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.68 }}
          className="mt-9 flex flex-col-reverse sm:flex-row sm:items-center gap-6"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="clay-btn group flex items-center justify-center gap-2 px-6 py-3.5 text-sm cursor-pointer"
            >
              <span>Hubungi Saya</span>
              <ArrowRight
                size={15}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>
            <button
              onClick={onOpenResume}
              className="clay-ghost flex items-center justify-center gap-2 px-6 py-3.5 text-sm cursor-pointer"
            >
              <FileText size={15} />
              <span>Unduh Resume</span>
            </button>
          </div>

          <p className="text-sm text-muted leading-relaxed max-w-md sm:text-left">
            {profile.subTitle}
          </p>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="flex items-center gap-3 mt-10"
        >
          {profile.socials.instagram && (
            <a
              href={profile.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 clay-inset rounded-full text-muted hover:text-accent-deep transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              title="Instagram"
            >
              <Instagram size={15} />
            </a>
          )}
          {profile.socials.whatsapp && (
            <a
              href={profile.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 clay-inset rounded-full text-muted hover:text-accent-deep transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              title="WhatsApp"
            >
              <MessageCircle size={15} />
            </a>
          )}
          {profile.socials.email && (
            <a
              href={profile.socials.email}
              className="p-2.5 clay-inset rounded-full text-muted hover:text-accent-deep transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              title="Email"
            >
              <Mail size={15} />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
