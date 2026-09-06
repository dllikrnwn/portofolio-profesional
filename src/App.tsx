import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ResumeModal from "./components/ResumeModal";
import { profileData, experiencesData, projectsData, skillCategories } from "./data";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { useMousePosition } from "./hooks/useMousePosition";

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollProgress = useScrollProgress();
  const cursor = useMousePosition();

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
        style={{ 
          background: "linear-gradient(90deg, #7c3aed, #a78bfa, #c4b5fd)",
          scaleX: scrollProgress
        }}
      />

      {/* Cursor spotlight glow */}
      <div
        className="cursor-glow fixed pointer-events-none z-[9998]"
        style={{
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.03) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          left: cursor.x,
          top: cursor.y,
        }}
      />

      <div className="relative min-h-screen flex flex-col selection:bg-[#a78bfa]/20 selection:text-[#a78bfa]">
        
        <Navbar onOpenResume={() => setIsResumeOpen(true)} />

        <main className="flex-1">
          <Hero profile={profileData} onOpenResume={() => setIsResumeOpen(true)} />
          <Profile profile={profileData} categories={skillCategories} />
          <Experience experiences={experiencesData} />
          <Projects projects={projectsData} />
          <Contact />
        </main>

        <footer id="portfolio-footer" className="bg-[#050508] border-t border-white/[0.03] py-12 relative z-10 no-print">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-1 order-2 md:order-1">
              <p className="text-sm text-[#7a7a90]">&copy; {new Date().getFullYear()} Fadli Kurniawan.</p>
              <p className="text-[11px] text-[#4a4a60]">React, TypeScript & Tailwind CSS.</p>
            </div>
            <div className="flex items-center gap-4 order-1 md:order-2">
              {profileData.socials.instagram && (
                <a href={profileData.socials.instagram} target="_blank" rel="noopener noreferrer"
                   className="text-[#4a4a60] hover:text-[#e1306c] transition-colors duration-200" title="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="18" cy="6" r="1.5" fill="currentColor"/></svg>
                </a>
              )}
              {profileData.socials.whatsapp && (
                <a href={profileData.socials.whatsapp} target="_blank" rel="noopener noreferrer"
                   className="text-[#4a4a60] hover:text-[#25d366] transition-colors duration-200" title="WhatsApp">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </a>
              )}
              {profileData.socials.email && (
                <a href={profileData.socials.email}
                   className="text-[#4a4a60] hover:text-[#a78bfa] transition-colors duration-200" title="Email">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </a>
              )}
            </div>
          </div>
        </footer>

        <AnimatePresence>
          {isResumeOpen && (
            <ResumeModal
              profile={profileData}
              experiences={experiencesData}
              projects={projectsData}
              skills={skillCategories}
              onClose={() => setIsResumeOpen(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-6 right-6 z-40 p-3 bg-[#a78bfa]/10 hover:bg-[#a78bfa]/20 text-[#a78bfa] rounded-full border border-[#a78bfa]/20 transition-all duration-200 no-print cursor-pointer backdrop-blur-sm"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}
