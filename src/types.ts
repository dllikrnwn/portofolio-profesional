export interface Profile {
  name: string;
  title: string;
  subTitle: string;
  bio: string;
  avatarUrl: string;
  location: string;
  email: string;
  phone: string;
  resumePdfUrl: string;
  education: {
    program: string;
    institution: string;
    period: string;
  }[];
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    whatsapp?: string;
    email: string;
  };
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  category: "Web" | "Mobile" | "UI/UX" | "Cloud";
  summary: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl: string;
  features: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: {
    name: string;
    level: number; // 1-5
    icon?: string;
  }[];
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
