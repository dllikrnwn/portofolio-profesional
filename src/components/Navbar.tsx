import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, FileText } from "lucide-react";
import fadliPhoto from "../dli.59.28.jpeg";

interface NavbarProps {
  onOpenResume: () => void;
}

const navLinks = [
  { title: "Profil", href: "#profile" },
  { title: "Pengalaman", href: "#experience" },
  { title: "Proyek", href: "#projects" },
  { title: "Kontak", href: "#contact" }
];

export default function Navbar({ onOpenResume }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const scrollPosition = window.scrollY + 180;
      const sections = ["profile", "experience", "projects", "contact"];
      if (window.scrollY < 100) { setActiveSection("hero"); return; }
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(section); break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const el = document.getElementById(href.substring(1));
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <>
      <nav
        id="portfolio-root-nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="group flex items-center space-x-2.5"
          >
            <div className="h-8 w-8 rounded-lg overflow-hidden border border-white/10 transition-transform duration-300 group-hover:scale-105">
              <img src={fadliPhoto} alt="Fadli" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
            </div>
            <span className="text-base font-semibold text-white tracking-tight">
              Fadli<span className="text-[#a78bfa]">.K</span>
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                className={`relative px-3.5 py-2 text-sm rounded-lg transition-colors duration-200 ${
                  activeSection === link.href.substring(1)
                    ? "text-[#a78bfa]"
                    : "text-[#7a7a90] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {link.title}
                {activeSection === link.href.substring(1) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-3 right-3 h-[2px] bg-[#a78bfa] rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <button
              onClick={onOpenResume}
              className="group relative flex items-center gap-2 px-4 py-2 bg-[#a78bfa]/10 hover:bg-[#a78bfa]/15 text-[#a78bfa] text-xs font-semibold rounded-lg border border-[#a78bfa]/15 hover:border-[#a78bfa]/30 transition-all duration-200 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <FileText size={14} />
                <span>Resume</span>
              </span>
            </button>
          </div>

          <button
            aria-label="Toggle Menu"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#7a7a90] hover:text-white glass-panel rounded-lg"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-[280px] z-40 md:hidden glass-panel border-l border-white/[0.06] flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                <span className="text-sm font-semibold text-white">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/[0.05] text-[#7a7a90] hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col p-4 space-y-1 flex-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                    className={`py-3 px-4 rounded-lg text-sm transition-all flex items-center min-h-[44px] ${
                      activeSection === link.href.substring(1)
                        ? "bg-[#a78bfa]/10 text-[#a78bfa]"
                        : "text-[#9494b0] hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{link.title}</span>
                  </a>
                ))}

                <div className="h-px bg-white/[0.05] my-2" />

                <button
                  onClick={() => { setIsOpen(false); onOpenResume(); }}
                  className="flex items-center justify-center gap-2 py-3 bg-[#a78bfa]/10 hover:bg-[#a78bfa]/20 text-[#a78bfa] rounded-lg text-sm font-semibold border border-[#a78bfa]/15 transition-colors"
                >
                  <FileText size={16} />
                  <span>Resume</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
