import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Calendar, MapPin } from "lucide-react";
import { Experience as ExperienceType } from "../types";

interface ExperienceProps {
  experiences: ExperienceType[];
}

export default function Experience({ experiences }: ExperienceProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const ratio = e.intersectionRatio;
            setLineProgress(ratio);
          }
        });
      },
      { threshold: Array.from({ length: 20 }, (_, i) => i / 20) }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="py-28 relative">
      <hr className="section-divider" />
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-24">
        {/* Section header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-[var(--font-body)] tracking-[0.2em] text-[#a78bfa] uppercase mb-3"
          >
            02 / Rekam Jejak
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
            className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-white"
          >
            Pengalaman Kerja
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
            className="h-0.5 bg-gradient-to-r from-[#a78bfa] to-transparent mt-4 rounded-full"
          />
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative pl-6 sm:pl-8 space-y-10 ml-4">
          {/* Animated timeline line */}
          <div className="absolute left-[5px] sm:left-[5px] top-0 bottom-0 w-px bg-white/[0.05]">
            <motion.div
              className="w-full bg-gradient-to-b from-[#a78bfa] to-[#7c3aed]"
              style={{ height: `${lineProgress * 100}%` }}
            />
          </div>

          {experiences.map((exp, index) => {
            const isFirst = index === 0;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 60, damping: 20, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline node */}
                <div 
                  className={`absolute -left-[29px] sm:-left-[37px] top-1.5 h-5 w-5 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-300 ${
                    isFirst 
                      ? "bg-[#a78bfa] border-[#050508] shadow-[0_0_0_5px_rgba(167,139,250,0.15),0_0_20px_rgba(167,139,250,0.2)]" 
                      : "bg-[#0e0e16] border-white/[0.08] group-hover:border-[#a78bfa]/30"
                  }`}
                />

                <div className="surface-card rounded-2xl p-6 sm:p-7 transition-all duration-300 group-hover:shadow-[0_0_60px_-20px_rgba(167,139,250,0.12)]">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-[#a78bfa] transition-colors duration-200">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-[#9494b0] mt-0.5">{exp.company}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-[#7a7a90]">
                      <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md bg-[#050508] border border-white/[0.03]">
                        <Calendar size={11} /> {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md bg-[#050508] border border-white/[0.03]">
                        <MapPin size={11} /> {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-white/[0.05] my-4" />

                  <ul className="space-y-2.5 mb-5">
                    {exp.description.map((desc, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 text-sm text-[#7a7a90] leading-relaxed">
                        <span className="mt-2 h-1 w-1 rounded-full bg-[#a78bfa]/40 shrink-0" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="text-xs rounded-md py-1.5 px-2.5 bg-[#050508] text-[#7a7a90] border border-white/[0.03] hover:border-[#a78bfa]/15 hover:text-[#a78bfa] transition-all duration-200 cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
