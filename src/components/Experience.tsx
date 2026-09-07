import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Calendar, MapPin, Briefcase, Users } from "lucide-react";
import { Experience as ExperienceType } from "../types";

interface ExperienceProps {
  experiences: ExperienceType[];
  organizations: ExperienceType[];
}

function ExperienceColumn({
  title,
  icon,
  items,
}: {
  title: string;
  icon: ReactNode;
  items: ExperienceType[];
}) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-8">
        <span className="h-9 w-9 rounded-full clay-inset flex items-center justify-center text-accent-deep">
          {icon}
        </span>
        <h3 className="font-sans text-xl font-bold text-ink tracking-tight">
          {title}
        </h3>
      </div>

      <div className="relative pl-6 space-y-8">
        {/* Timeline line (static, green) */}
        <div className="absolute left-[9px] top-3 bottom-3 w-0.5 bg-accent/30 rounded-full" />

        {items.length === 0 && (
          <p className="text-sm text-muted">Belum ada data.</p>
        )}

        {items.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 20,
              delay: index * 0.08,
            }}
            className="relative group"
          >
            {/* Node */}
            <div className="absolute -left-[27px] top-2 h-4 w-4 rounded-full bg-accent border-[3px] border-base shadow-[0_0_0_4px_rgba(143,188,148,0.25)]" />

            <div className="clay-card clay-card-hover rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                <div>
                  <h4 className="text-base font-semibold text-ink leading-snug">
                    {exp.role}
                  </h4>
                  <p className="text-sm text-muted mt-0.5">{exp.company}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full clay-inset">
                    <Calendar size={11} /> {exp.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full clay-inset">
                    <MapPin size={11} /> {exp.location}
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-5">
                {exp.description.map((desc, dIdx) => (
                  <li
                    key={dIdx}
                    className="flex items-start gap-2.5 text-sm text-muted leading-relaxed"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs rounded-full py-1.5 px-3 bg-accent/10 text-accent-deep border border-accent/25"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Experience({
  experiences,
  organizations,
}: ExperienceProps) {
  return (
    <section id="experience" className="py-28 relative">
      <hr className="section-divider" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-24">
        {/* Section header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-body tracking-[0.2em] text-accent-deep uppercase mb-3"
          >
            Rekam Jejak
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
            Pengalaman
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10">
          <ExperienceColumn
            title="Pengalaman Kerja"
            icon={<Briefcase size={16} />}
            items={experiences}
          />
          <ExperienceColumn
            title="Organisasi"
            icon={<Users size={16} />}
            items={organizations}
          />
        </div>
      </div>
    </section>
  );
}
