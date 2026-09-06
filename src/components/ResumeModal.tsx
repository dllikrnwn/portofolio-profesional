import { motion } from "motion/react";
import { X, Printer, MapPin, Mail, Phone, Globe, Briefcase, Award, Code } from "lucide-react";
import { Profile, Experience, Project, SkillCategory } from "../types";

interface ResumeModalProps {
  onClose: () => void;
  profile: Profile;
  experiences: Experience[];
  projects: Project[];
  skills: SkillCategory[];
}

export default function ResumeModal({
  onClose,
  profile,
  experiences,
  projects,
  skills
}: ResumeModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer pointer-events-auto"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0e0e16] border border-white/[0.08] rounded-2xl z-10 flex flex-col no-print"
      >
        <div className="px-6 py-3 border-b border-white/[0.06] flex justify-between items-center bg-[#050508]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#a78bfa]">Resume</span>
            <span className="text-[#5a5a70] text-xs hidden sm:inline">|</span>
            <p className="font-medium text-sm text-[#9494b0] hidden sm:block">CV_Fadli_Kurniawan.pdf</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#a78bfa] hover:bg-[#9272f5] text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer">
              <Printer size={13} /><span>Simpan PDF</span>
            </button>
            <button onClick={onClose}
              className="p-1.5 rounded-lg bg-[#0e0e16] border border-white/[0.06] text-[#7a7a90] hover:text-white transition-colors" aria-label="Close">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="p-3 bg-[#a78bfa]/5 border-b border-white/[0.04] text-center text-xs text-[#a78bfa]/80">
          Simpan sebagai PDF dari menu cetak yang terbuka.
        </div>

        <div className="p-4 sm:p-10 overflow-x-auto bg-[#050508] flex justify-center items-start flex-1">
          <div className="w-full md:min-w-[210mm] md:max-w-[210mm] bg-white text-[#1e293b] shadow-2xl p-6 sm:p-12 rounded-lg flex flex-col justify-between select-text text-left font-[var(--font-body)] text-xs">
            
            <div className="border-b-2 border-slate-200 pb-5 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "Outfit, sans-serif" }}>{profile.name}</h1>
                <p className="text-[#6366f1] font-bold text-sm">{profile.title}</p>
                <p className="text-slate-500 max-w-lg leading-relaxed text-[11px]">
                  {profile.subTitle}
                </p>
              </div>

              <div className="space-y-1 text-left md:text-right text-[11px] text-slate-500 shrink-0">
                <div className="flex items-center justify-start md:justify-end gap-1.5">
                  <MapPin size={11} />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center justify-start md:justify-end gap-1.5">
                  <Mail size={11} />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center justify-start md:justify-end gap-1.5">
                  <Phone size={11} />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center justify-start md:justify-end gap-1.5">
                  <Globe size={11} />
                  <span>github.com/fadlikurniawan</span>
                </div>
              </div>
            </div>

            <div className="py-4 space-y-2 border-b border-slate-200">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Award size={13} className="text-[#6366f1]" />
                Ringkasan Karir
              </h3>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                {profile.bio}
              </p>
            </div>

            <div className="py-4 space-y-4 border-b border-slate-200">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Briefcase size={13} className="text-[#6366f1]" />
                Pengalaman Profesional
              </h3>

              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                      <div>
                        <span className="font-bold text-slate-800">{exp.role}</span>
                        <span className="text-slate-500"> &bull; {exp.company}</span>
                      </div>
                      <span className="text-slate-400 sm:font-medium shrink-0 text-[10px]">{exp.period}</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600">
                      {exp.description.map((desc, dIdx) => (
                        <li key={dIdx} className="text-[11px] leading-relaxed pl-0.5">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              
              <div className="space-y-2">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Code size={13} className="text-[#6366f1]" />
                  Keahlian
                </h3>
                <div className="space-y-2">
                  {skills.map((cat) => (
                    <div key={cat.id}>
                      <p className="font-bold text-[10px] text-slate-400 uppercase tracking-wider">{cat.name}</p>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {cat.skills.map(s => s.name).join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Award size={13} className="text-[#6366f1]" />
                  Pendidikan
                </h3>
                <div className="space-y-2 text-[11px]">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-0.5">
                      <p className="font-bold text-slate-800">Sistem Informasi</p>
                      <span className="text-slate-400 text-[10px]">2024 - Sekarang</span>
                    </div>
                    <p className="text-slate-500">Universitas Bina Sarana Informatika</p>
                  </div>
                  <div className="h-px bg-slate-100" />
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-0.5">
                      <p className="font-bold text-slate-800">Teknik Komputer Jaringan</p>
                      <span className="text-slate-400 text-[10px]">2020 - 2023</span>
                    </div>
                    <p className="text-slate-500">SMK Telkom Jakarta</p>
                  </div>
                  <div className="h-px bg-slate-100" />
                  <div>
                    <p className="font-bold text-slate-800">Hobi & Aktivitas</p>
                    <p className="text-slate-500 mt-0.5">Bermusik, Konten digital & Design grafis</p>
                  </div>
                </div>
              </div>

            </div>

            <div className="border-t border-slate-200 pt-3 text-center text-[9px] text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-1">
              <span>Dibuat dari Portofolio Interaktif Fadli Kurniawan.</span>
              <span>https://fadlikurniawan.com</span>
            </div>

          </div>
        </div>
      </motion.div>

      {/* Printable resume for PDF export */}
      <div id="printable-resume-pdf">
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1.5px solid #334155", paddingBottom: "15px", marginBottom: "15px" }}>
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: "bold", margin: "0", color: "#0f172a", fontFamily: "Outfit, sans-serif" }}>{profile.name}</h1>
            <p style={{ fontSize: "12px", color: "#6366f1", fontWeight: "bold", margin: "4px 0 2px 0" }}>{profile.title}</p>
            <p style={{ fontSize: "10px", color: "#64748b", margin: "0", maxWidth: "480px" }}>{profile.subTitle}</p>
          </div>
          <div style={{ textAlign: "right", fontSize: "10px", color: "#475569", lineHeight: "1.4" }}>
            <p style={{ margin: "2px 0" }}>{profile.location}</p>
            <p style={{ margin: "2px 0" }}>{profile.email}</p>
            <p style={{ margin: "2px 0" }}>{profile.phone}</p>
            <p style={{ margin: "2px 0" }}>github.com/fadlikurniawan</p>
          </div>
        </div>

        <div style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: "12px", marginBottom: "12px" }}>
          <h3 style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", color: "#475569", margin: "0 0 6px 0", letterSpacing: "1px" }}>
            Ringkasan Karir
          </h3>
          <p style={{ fontSize: "10px", color: "#334155", margin: "0", lineHeight: "1.5" }}>{profile.bio}</p>
        </div>

        <div style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: "12px", marginBottom: "12px" }}>
          <h3 style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", color: "#475569", margin: "0 0 10px 0", letterSpacing: "1px" }}>
            Pengalaman Profesional
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "10.5px", color: "#1e293b", margin: "0 0 3px 0" }}>
                  <span>{exp.role} <span style={{ fontWeight: "normal", color: "#64748b" }}>&bull; {exp.company}</span></span>
                  <span style={{ fontSize: "10px", color: "#64748b" }}>{exp.period}</span>
                </div>
                <ul style={{ margin: "0", paddingLeft: "15px", color: "#334155", fontSize: "10px", lineHeight: "1.4" }}>
                  {exp.description.map((desc, dIdx) => (
                    <li key={dIdx} style={{ marginBottom: "2px" }}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "25px" }}>
          <div style={{ flex: "1" }}>
            <h3 style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", color: "#475569", borderBottom: "1px solid #e2e8f0", paddingBottom: "4px", marginBottom: "6px", letterSpacing: "1px" }}>
              Keahlian
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {skills.map((cat) => (
                <div key={cat.id}>
                  <p style={{ fontSize: "9px", fontWeight: "bold", color: "#64748b", margin: "0 0 2px 0", textTransform: "uppercase" }}>{cat.name}</p>
                  <p style={{ fontSize: "9.5px", color: "#334155", margin: "0" }}>
                    {cat.skills.map(s => s.name).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: "1" }}>
            <h3 style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", color: "#475569", borderBottom: "1px solid #e2e8f0", paddingBottom: "4px", marginBottom: "6px", letterSpacing: "1px" }}>
              Pendidikan
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "10px", color: "#1e293b" }}>
                  <span>Sistem Informasi</span>
                  <span style={{ fontSize: "9px", color: "#64748b" }}>2024 - Sekarang</span>
                </div>
                <p style={{ fontSize: "9.5px", color: "#475569", margin: "1px 0" }}>Universitas Bina Sarana Informatika</p>
              </div>
              <div style={{ borderTop: "1px dashed #e2e8f0", paddingTop: "4.5px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "10px", color: "#1e293b" }}>
                  <span>Teknik Komputer Jaringan</span>
                  <span style={{ fontSize: "9px", color: "#64748b" }}>2020 - 2023</span>
                </div>
                <p style={{ fontSize: "9.5px", color: "#475569", margin: "1px 0" }}>SMK Telkom Jakarta</p>
              </div>
              <div style={{ borderTop: "1px dashed #e2e8f0", paddingTop: "4.5px" }}>
                <p style={{ fontSize: "10px", fontWeight: "bold", color: "#1e293b", margin: "0 0 2px 0" }}>Hobi & Aktivitas</p>
                <p style={{ fontSize: "9.5px", color: "#475569", margin: "0" }}>Bermusik, Konten digital & Design grafis</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #cbd5e1", marginTop: "25px", paddingTop: "6px", display: "flex", justifyContent: "space-between", fontSize: "8.5px", color: "#94a3b8" }}>
          <span>Portofolio Fadli Kurniawan.</span>
          <span>https://fadlikurniawan.com</span>
        </div>

      </div>

    </div>
  );
}
