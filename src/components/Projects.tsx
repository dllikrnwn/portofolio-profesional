import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { ExternalLink, Github, X, Layers, ArrowUpRight } from "lucide-react";
import { Project } from "../types";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const categories = ["All", "Web", "Mobile", "UI/UX"];
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-28 relative">
      <hr className="section-divider" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xs font-body tracking-[0.2em] text-accent-deep uppercase mb-3"
            >
              PROJECT
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
              Galeri Proyek
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

          {/* Filter */}
          <div className="flex items-center gap-1 p-1 clay-card rounded-full self-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "text-[#1f3b26] font-semibold"
                    : "text-muted hover:text-ink"
                }`}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="filter-indicator"
                    className="absolute inset-0 clay-btn"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <span className="relative z-10">
                  {cat === "All" ? "Semua" : cat}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onSelect={setSelectedProject}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="clay-card text-center py-16 px-4 rounded-3xl max-w-md mx-auto mt-12">
            <Layers size={32} className="text-muted mx-auto mb-3" />
            <h3 className="text-base font-semibold text-ink mb-1">
              Belum Ada Proyek
            </h3>
            <p className="text-sm text-muted">
              Tidak ada proyek untuk kategori ini.
            </p>
          </div>
        )}

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectCard(props: {
  key?: string | number;
  project: Project;
  onSelect: (p: Project) => void;
  index: number;
}) {
  const { project, onSelect, index } = props;
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), {
    stiffness: 200,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
    ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const targetUrl = project.liveUrl || project.githubUrl;
  const featured = index === 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000, rotateX, rotateY }}
      className={`clay-card clay-spotlight rounded-3xl overflow-hidden group flex flex-col h-full ${
        featured ? "md:col-span-2 md:row-span-1" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-surface ${featured ? "md:flex md:gap-6 md:p-6" : ""}`}
      >
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Buka ${project.title}`}
          className={`relative block overflow-hidden shrink-0 ${featured ? "md:w-[46%]" : ""}`}
        >
          <img
            src={project.imageUrl}
            alt={project.title}
            referrerPolicy="no-referrer"
            className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${
              featured
                ? "h-52 sm:h-56 md:h-full md:min-h-[220px]"
                : "h-44 sm:h-48"
            }`}
          />
        </a>

        {!featured && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 py-1 px-2 rounded-full bg-surface/85 backdrop-blur text-[10px] font-semibold text-accent-deep border border-accent/30">
            <Layers size={10} /> {project.category}
          </span>
        )}

        <div
          className={`flex flex-col flex-1 ${featured ? "p-0 md:pt-2" : "p-5 sm:p-6"}`}
        >
          <span className="inline-flex items-center gap-1 py-1 px-2 rounded-full bg-accent/15 text-[10px] font-semibold text-accent-deep border border-accent/25 self-start mb-2.5 md:hidden">
            <Layers size={10} /> {project.category}
          </span>
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-semibold text-ink group-hover:text-accent-deep transition-colors inline-flex items-start gap-1.5 ${
              featured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
            }`}
          >
            {project.title}
            <ArrowUpRight
              size={16}
              className="opacity-0 group-hover:opacity-100 -mt-0.5 transition-opacity shrink-0"
            />
          </a>
          <p
            className={`text-sm text-muted leading-relaxed line-clamp-2 ${featured ? "mt-2.5" : "mt-2"}`}
          >
            {project.summary}
          </p>
        </div>
      </div>

      <div
        className={`flex items-center justify-between gap-2 border-t border-line ${featured ? "p-6 pt-4" : "p-5 sm:p-6 pt-4"}`}
      >
        <div className="flex flex-wrap gap-1.5 max-w-[55%]">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[10px] text-muted py-1 px-2 bg-accent/10 rounded-full border border-accent/20"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-[10px] text-muted py-1 px-2 bg-accent/10 rounded-full border border-accent/20">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buka demo"
              className="p-2 clay-inset rounded-full text-muted hover:text-accent-deep transition-all cursor-pointer"
              title="Buka halaman"
            >
              <ExternalLink size={13} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lihat kode"
              className="p-2 clay-inset rounded-full text-muted hover:text-accent-deep transition-all cursor-pointer"
              title="Lihat kode"
            >
              <Github size={13} />
            </a>
          )}
          <button
            onClick={() => onSelect(project)}
            className="text-[11px] font-semibold text-accent-deep flex items-center gap-1 px-3 py-2 rounded-full bg-accent/15 border border-accent/25 hover:bg-accent/25 transition-colors cursor-pointer"
          >
            Detail
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const targetUrl = project.liveUrl || project.githubUrl;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm cursor-pointer"
      />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto clay-card rounded-3xl z-10 no-print"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-surface border border-line text-muted hover:text-ink transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="relative h-48 sm:h-64 bg-surface">
          <img
            src={project.imageUrl}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
          <span className="absolute bottom-4 left-5 inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-accent text-[10px] font-bold text-[#1f3b26]">
            <Layers size={10} /> {project.category}
          </span>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-ink tracking-tight">
              {project.title}
            </h3>
            {targetUrl && (
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-deep hover:underline"
              >
                <ExternalLink size={12} /> Buka halaman proyek
              </a>
            )}
            <p className="text-sm text-muted leading-relaxed">
              {project.summary}
            </p>
          </div>
          <div className="h-px bg-line" />

          <div className="space-y-3">
            <h4 className="text-[11px] uppercase font-body tracking-wider text-muted">
              Gambaran Proyek
            </h4>
            <p className="text-sm text-ink/80 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="space-y-3 p-4 clay-inset rounded-2xl">
            <h4 className="text-[10px] uppercase font-body tracking-wider text-accent-deep font-bold">
              Fitur Utama
            </h4>
            <ul className="space-y-2">
              {project.features.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-muted leading-relaxed"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-[10px] font-body tracking-wider text-muted uppercase">
              Teknologi
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-semibold text-accent-deep py-1 px-2.5 rounded-full bg-accent/12 border border-accent/25"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="h-px bg-line" />

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-end">
            {targetUrl && (
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-btn w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs cursor-pointer"
              >
                <ExternalLink size={15} />{" "}
                <span>
                  {project.liveUrl ? "Lihat Live Demo" : "Lihat Kode"}
                </span>
              </a>
            )}
            {project.githubUrl && project.liveUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-ghost w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs cursor-pointer"
              >
                <Github size={15} /> <span>Kode</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
