import { prisma } from "./db";

export type ProjectDTO = {
  id: number;
  slug: string;
  title: string;
  category: string;
  role: string;
  period: string;
  stack: string[];
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  cover: string;
  comingSoon: boolean;
  order: number;
};

const safeJson = (s: string): string[] => {
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
};

export async function getProfile() {
  const p = await prisma.profile.findUnique({ where: { id: 1 } });
  if (!p) throw new Error("Profile not seeded. Run: npm run db:seed");
  return p;
}

export async function getProjects(): Promise<ProjectDTO[]> {
  const rows = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({ ...r, stack: safeJson(r.stack) }));
}

export async function getProjectBySlug(slug: string): Promise<ProjectDTO | null> {
  const r = await prisma.project.findUnique({ where: { slug } });
  return r ? { ...r, stack: safeJson(r.stack) } : null;
}

export async function getExperiences() {
  const rows = await prisma.experience.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({ ...r, bullets: safeJson(r.bullets), stack: safeJson(r.stack) }));
}

export async function getEducation() {
  return prisma.education.findMany({ orderBy: { order: "asc" } });
}

export async function getSkills() {
  const rows = await prisma.skill.findMany({ orderBy: { order: "asc" } });
  const groups = ["languages", "frameworks", "databases", "tools", "ecommerce", "personal"] as const;
  const out: Record<(typeof groups)[number], string[]> = {
    languages: [],
    frameworks: [],
    databases: [],
    tools: [],
    ecommerce: [],
    personal: []
  };
  for (const r of rows) {
    if ((groups as readonly string[]).includes(r.group)) {
      out[r.group as (typeof groups)[number]].push(r.label);
    }
  }
  return out;
}

export async function getCertifications() {
  return prisma.certification.findMany({ orderBy: { order: "asc" } });
}

export async function getLanguages() {
  return prisma.language.findMany({ orderBy: { order: "asc" } });
}

export async function getInterests() {
  return prisma.interest.findMany({ orderBy: { order: "asc" } });
}
