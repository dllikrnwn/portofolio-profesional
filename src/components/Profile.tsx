import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { MapPin, Mail, Phone } from "lucide-react";
import { Profile as ProfileType, SkillCategory } from "../types";

interface ProfileProps {
  profile: ProfileType;
  categories: SkillCategory[];
}

function AnimatedNumber({ target, delay = 0 }: { target: number; delay?: number }) {
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

function SkillMarquee({ categories }: { categories: SkillCategory[] }) {
  const allSkills = categories.flatMap(c => c.skills.map(s => ({ name: s.name, level: s.level })));

  return (
    <div className="relative overflow-hidden -mx-6 md:mx-0">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none" />
      
      <div className="flex marquee-track py-4">
        {[...allSkills, ...allSkills].map((skill, i) => (
          <div
            key={i}
            className="flex-shrink-0 mx-2 px-4 py-2 glass-panel rounded-lg text-sm text-[#c0c0d0] flex items-center gap-2 whitespace-nowrap"
          >
            <span className="text-[10px] text-[#a78bfa]/60 font-mono">{Math.round(skill.level * 20)}%</span>
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Profile({ profile, categories }: ProfileProps) {
  const categoryIcons: Record<string, string> = { cat1: "🎨", cat2: "⚙️", cat3: "📋" };
  const [sectionRef, setSectionRef] = useState<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!sectionRef) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => setProgress(e.intersectionRatio)),
      { threshold: Array.from({ length: 20 }, (_, i) => i / 20) }
    );
    observer.observe(sectionRef);
    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section id="profile" ref={setSectionRef} className="py-28 relative">
      <hr className="section-divider" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24">
        {/* Section header with animated accent line */}
        <div className="mb-16 relative">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-[var(--font-body)] tracking-[0.2em] text-[#a78bfa] uppercase mb-3"
          >
            01 / Profil
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
            className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-white"
          >
            Tentang Diri Saya
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
            className="h-0.5 bg-gradient-to-r from-[#a78bfa] to-transparent mt-4 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Photo card with parallax */}
          <motion.div 
            className="lg:col-span-4 lg:sticky lg:top-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            style={{ transform: `translateY(${(1 - progress) * 20}px)` }}
          >
            <div className="glass-panel rounded-2xl overflow-hidden group">
              <div className="h-64 w-full bg-[#0a0a10] overflow-hidden relative">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover brightness-[0.8] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e16] via-transparent to-transparent" />
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#a78bfa] to-[#7c3aed]" />
              </div>

              <div className="p-6 space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{profile.name}</h3>
                  <p className="text-xs text-[#a78bfa] font-[var(--font-body)] mt-0.5">{profile.title}</p>
                </div>
                
                <div className="h-px bg-white/[0.05]" />

                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center gap-2.5 text-[#7a7a90]">
                    <MapPin size={14} className="shrink-0 text-[#a78bfa]/40" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#7a7a90]">
                    <Mail size={14} className="shrink-0 text-[#a78bfa]/40" />
                    <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors break-all">{profile.email}</a>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#7a7a90]">
                    <Phone size={14} className="shrink-0 text-[#a78bfa]/40" />
                    <span>{profile.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-[#050508] border border-white/[0.03] rounded-xl text-center">
                    <p className="text-xl font-bold text-[#a78bfa] font-mono"><AnimatedNumber target={1} delay={500} /></p>
                    <p className="text-[10px] text-[#5a5a70] uppercase tracking-wider mt-0.5">Pengalaman</p>
                  </div>
                  <div className="p-3 bg-[#050508] border border-white/[0.03] rounded-xl text-center">
                    <p className="text-xl font-bold text-[#a78bfa] font-mono"><AnimatedNumber target={6} delay={700} /></p>
                    <p className="text-[10px] text-[#5a5a70] uppercase tracking-wider mt-0.5">Proyek</p>
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
              className="surface-card rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-8 h-[2px] w-20 bg-gradient-to-r from-[#a78bfa] to-transparent" />
              <h3 className="text-sm font-semibold text-white mb-4">Ringkasan Profesional</h3>
              <p className="text-sm text-[#7a7a90] leading-[1.8]">{profile.bio}</p>
            </motion.div>

            {/* Skills marquee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
            >
              <h3 className="text-sm font-semibold text-white mb-5">Keahlian</h3>
              <SkillMarquee categories={categories} />
            </motion.div>

            {/* Skill detail cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category, catIdx) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 60, damping: 20, delay: catIdx * 0.1 }}
                    className="surface-card rounded-2xl p-5 transition-all duration-300 hover:shadow-[0_0_50px_-15px_rgba(167,139,250,0.1)]"
                  >
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.05]">
                      <span className="text-base">{categoryIcons[category.id]}</span>
                      <h4 className="font-semibold text-sm text-white">{category.name}</h4>
                    </div>

                    <div className="space-y-3">
                      {category.skills.map((skill, idx) => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-[#c0c0d0]">{skill.name}</span>
                            <span className="font-mono text-[10px] text-[#7a7a90]">
                              {Math.round(skill.level * 20)}%
                            </span>
                          </div>
                          <div className="h-1 bg-[#050508] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                              viewport={{ once: true }}
                              transition={{ type: "spring", stiffness: 50, damping: 20, delay: catIdx * 0.05 + idx * 0.03 }}
                              className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] via-[#a78bfa] to-[#c4b5fd]"
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
