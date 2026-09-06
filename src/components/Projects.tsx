import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { ExternalLink, Github, X, Layers } from "lucide-react";
import { Project } from "../types";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const categories = ["All", "Web", "Mobile", "UI/UX"];
  const filteredProjects = activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-28 relative">
      <hr className="section-divider" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24">
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
              className="text-xs font-[var(--font-body)] tracking-[0.2em] text-[#a78bfa] uppercase mb-3"
            >03 / Karya</motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
              className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-white"
            >Galeri Proyek</motion.h2>
            <motion.div
              initial={{ width: 0 }} whileInView={{ width: "3rem" }} viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
              className="h-0.5 bg-gradient-to-r from-[#a78bfa] to-transparent mt-4 rounded-full"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-1 p-1 glass-panel rounded-xl self-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2.5 text-xs font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                  activeCategory === cat ? "text-white" : "text-[#7a7a90] hover:text-white"
                }`}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="filter-indicator"
                    className="absolute inset-0 bg-[#a78bfa] rounded-lg shadow-[0_2px_12px_rgba(167,139,250,0.2)]"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{cat === "All" ? "Semua" : cat}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="glass-panel text-center py-16 px-4 rounded-2xl max-w-md mx-auto mt-12">
            <Layers size={32} className="text-[#5a5a70] mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white mb-1">Belum Ada Proyek</h3>
            <p className="text-sm text-[#7a7a90]">Tidak ada proyek untuk kategori ini.</p>
          </div>
        )}

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectCardInner(props: { project: Project; onSelect: (p: Project) => void; key?: string | number }) {
  const { project, onSelect } = props;
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 30 });

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
      onClick={() => onSelect(project)}
      style={{ perspective: 1000, rotateX, rotateY }}
      className="surface-card card-spotlight rounded-2xl overflow-hidden group cursor-pointer flex flex-col h-full transition-shadow duration-300 hover:shadow-[0_0_60px_-15px_rgba(167,139,250,0.12)]"
    >
      <div className="relative h-52 sm:h-56 overflow-hidden bg-[#050508]">
        <img src={project.imageUrl} alt={project.title} referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.85] group-hover:brightness-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e16]/70 via-transparent to-transparent pointer-events-none" />
        
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 py-1 px-2 rounded-lg bg-black/50 text-xs text-[#a78bfa] border border-white/[0.06] backdrop-blur-sm">
          <Layers size={10} /> {project.category}
        </span>
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-[#a78bfa] transition-colors">{project.title}</h3>
          <p className="text-sm text-[#7a7a90] leading-relaxed line-clamp-2">{project.summary}</p>
        </div>
        <div className="mt-5 pt-4 border-t border-white/[0.05] flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5 max-w-[65%]">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="text-xs text-[#7a7a90] py-1 px-2 bg-[#050508] rounded-md">{tech}</span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs text-[#7a7a90] py-1 px-2 bg-[#050508] rounded-md">+{project.technologies.length - 3}</span>
            )}
          </div>
          <span className="text-[11px] text-[#a78bfa] flex items-center gap-1 shrink-0 group-hover:translate-x-1 transition-transform">
            Detail <ExternalLink size={11} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

const ProjectCard = ProjectCardInner;

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
      />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl z-10 no-print"
      >
        <button onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/40 border border-white/[0.06] text-[#7a7a90] hover:text-white transition-colors"
          aria-label="Close"><X size={16} /></button>

        <div className="relative h-48 sm:h-64 bg-[#050508]">
          <img src={project.imageUrl} alt={project.title} referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e16] to-transparent" />
          <span className="absolute bottom-4 left-5 inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md bg-[#a78bfa] text-[10px] text-white font-semibold shadow-[0_4px_12px_rgba(167,139,250,0.3)]">
            <Layers size={10} /> {project.category}
          </span>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight">{project.title}</h3>
            <p className="text-sm text-[#7a7a90] leading-relaxed">{project.summary}</p>
          </div>
          <div className="h-px bg-white/[0.05]" />

          <div className="space-y-3">
            <h4 className="text-[11px] uppercase font-[var(--font-body)] tracking-wider text-[#7a7a90]">Gambaran Proyek</h4>
            <p className="text-sm text-[#9494b0] leading-relaxed">{project.description}</p>
          </div>

          <div className="space-y-3 p-4 bg-[#050508] border border-white/[0.04] rounded-xl">
            <h4 className="text-[10px] uppercase font-[var(--font-body)] tracking-wider text-[#a78bfa]">Fitur Utama</h4>
            <ul className="space-y-2">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-[#7a7a90] leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a78bfa]/30 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-[10px] font-[var(--font-body)] tracking-wider text-[#7a7a90] uppercase">Teknologi</h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span key={tech} className="text-[11px] text-[#a78bfa] py-1 px-2.5 rounded-md bg-[#a78bfa]/8 border border-[#a78bfa]/15">{tech}</span>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/[0.05]" />

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-end">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 glass-panel hover:bg-[#16162a] text-[#c0c0d0] hover:text-white rounded-xl text-xs font-medium transition-all">
                <Github size={15} /> <span>Kode</span>
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#a78bfa] hover:bg-[#9272f5] text-white rounded-xl text-xs font-medium transition-colors shadow-[0_2px_12px_rgba(167,139,250,0.2)]">
                <ExternalLink size={15} /> <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
