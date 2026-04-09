import { prisma } from "./db";

export type ListModelKey = "education" | "skills" | "certifications" | "languages" | "interests";

export const listModels = {
  education: {
    delegate: () => prisma.education,
    fields: ["period", "title", "school"] as const
  },
  skills: {
    delegate: () => prisma.skill,
    fields: ["group", "label"] as const
  },
  certifications: {
    delegate: () => prisma.certification,
    fields: ["label", "organization"] as const
  },
  languages: {
    delegate: () => prisma.language,
    fields: ["name", "level"] as const
  },
  interests: {
    delegate: () => prisma.interest,
    fields: ["label"] as const
  }
} as const;

export function pickFields<T extends Record<string, any>>(data: T, fields: readonly string[]) {
  const out: Record<string, any> = {};
  for (const f of fields) if (f in data) out[f] = data[f];
  return out;
}
