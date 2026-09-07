import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MapPin, Mail, Phone } from "lucide-react";
import { Profile as ProfileType, SkillCategory } from "../types";
import { projectsData } from "../data";

interface ProfileProps {
  profile: ProfileType;
  categories: SkillCategory[];
}

function AnimatedNumber({
  target,
  delay = 0,
}: {
  target: number;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const end = target;
    const duration = 1200;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * end);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, target]);

  return <span>{count}+</span>;
}

export default function Profile({ profile, categories }: ProfileProps) {
  const categoryIcons: Record<string, string> = {
    cat1: "🎨",
    cat2: "⚙️",
    cat3: "📋",
  };
  const allSkills = categories.flatMap((c) => c.skills.map((s) => s.name));

  return (
    <section id="profile" className="py-28 relative">
      <hr className="section-divider" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24">
        {/* Section header */}
        <div className="mb-16 relative">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-body tracking-[0.2em] text-accent-deep uppercase mb-3"
          >
            Profil
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 20,
              delay: 0.1,
            }}
            className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-ink"
          >
            Tentang Diri Saya
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 20,
              delay: 0.2,
            }}
            className="h-1 bg-accent mt-4 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Photo card */}
          <motion.div
            className="lg:col-span-4 lg:sticky lg:top-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
          >
            <div className="clay-card clay-card-hover rounded-3xl overflow-hidden group">
              <div className="h-64 w-full overflow-hidden relative">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              </div>

              <div className="p-6 space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-ink tracking-tight">
                    {profile.name}
                  </h3>
                  <p className="text-xs text-accent-deep font-semibold mt-0.5">
                    {profile.title}
                  </p>
                </div>

                <div className="h-px bg-line" />

                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center gap-2.5 text-muted">
                    <MapPin size={14} className="shrink-0 text-accent-deep" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-muted">
                    <Mail size={14} className="shrink-0 text-accent-deep" />
                    <a
                      href={`mailto:${profile.email}`}
                      className="hover:text-ink transition-colors break-all"
                    >
                      {profile.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-muted">
                    <Phone size={14} className="shrink-0 text-accent-deep" />
                    <span>{profile.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 clay-inset rounded-2xl text-center">
                    <p className="text-xl font-bold text-accent-deep font-mono">
                      <AnimatedNumber target={1} delay={500} />
                    </p>
                    <p className="text-[10px] text-muted uppercase tracking-wider mt-0.5">
                      Pengalaman
                    </p>
                  </div>
                  <div className="p-3 clay-inset rounded-2xl text-center">
                    <p className="text-xl font-bold text-accent-deep font-mono">
                      <AnimatedNumber
                        target={projectsData.length}
                        delay={700}
                      />
                    </p>
                    <p className="text-[10px] text-muted uppercase tracking-wider mt-0.5">
                      Proyek
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Bio + Skills */}
          <div className="lg:col-span-8 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
              className="clay-card rounded-3xl p-8 relative overflow-hidden"
            >
              <h3 className="text-sm font-semibold text-ink mb-4">
                Ringkasan Profesional
              </h3>
              <p className="text-[15px] text-muted leading-[1.85]">
                {profile.bio}
              </p>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
              className="clay-card rounded-3xl p-8"
            >
              <h3 className="text-sm font-semibold text-ink mb-5">Keahlian</h3>
              <div className="flex flex-wrap gap-2">
                {allSkills.map((name) => (
                  <span
                    key={name}
                    className="text-xs font-medium text-ink/80 px-3.5 py-2 rounded-full bg-accent/12 border border-accent/25"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Bento skill cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
            >
              <div className="grid grid-cols-1 gap-4">
                {categories.map((category, catIdx) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 60,
                      damping: 20,
                      delay: catIdx * 0.1,
                    }}
                    className="clay-card clay-card-hover rounded-3xl p-5 md:p-6"
                  >
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-line">
                      <span className="text-base">
                        {categoryIcons[category.id]}
                      </span>
                      <h4 className="font-semibold text-sm text-ink">
                        {category.name}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                      {category.skills.map((skill, idx) => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-ink/80">{skill.name}</span>
                            <span className="font-mono text-[10px] text-muted">
                              {Math.round(skill.level * 20)}%
                            </span>
                          </div>
                          <div className="h-2 bg-[#f0e8dc] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{
                                width: `${(skill.level / 5) * 100}%`,
                              }}
                              viewport={{ once: true }}
                              transition={{
                                type: "spring",
                                stiffness: 50,
                                damping: 20,
                                delay: catIdx * 0.05 + idx * 0.03,
                              }}
                              className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
