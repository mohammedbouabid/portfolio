import { PrismaClient } from "@prisma/client";
import {
  profile,
  experiences,
  education,
  skills,
  languages,
  interests,
  certifications,
  projects
} from "../src/data/portfolio";

const prisma = new PrismaClient();

async function main() {
  await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: profile.name,
      alias: profile.alias,
      title: profile.title,
      location: profile.location,
      email: profile.email,
      phone: profile.phone,
      github: profile.github,
      linkedin: profile.linkedin,
      summary: profile.summary,
      manifesto: profile.manifesto,
      portrait: "https://picsum.photos/seed/bouabid/800/1000"
    }
  });

  await prisma.project.deleteMany();
  for (const [i, p] of projects.entries()) {
    await prisma.project.create({
      data: {
        slug: p.slug,
        title: p.title,
        category: p.category,
        role: p.role,
        period: p.period,
        stack: JSON.stringify(p.stack),
        summary: p.summary,
        problem: p.problem,
        approach: p.approach,
        outcome: p.outcome,
        cover: p.cover,
        comingSoon: !!p.comingSoon,
        order: i
      }
    });
  }

  await prisma.experience.deleteMany();
  for (const [i, e] of experiences.entries()) {
    await prisma.experience.create({
      data: {
        company: e.company,
        role: e.role,
        period: e.period,
        location: e.location,
        bullets: JSON.stringify(e.bullets),
        stack: JSON.stringify(e.stack),
        order: i
      }
    });
  }

  await prisma.education.deleteMany();
  for (const [i, e] of education.entries()) {
    await prisma.education.create({ data: { ...e, order: i } });
  }

  await prisma.skill.deleteMany();
  let so = 0;
  for (const group of ["languages", "frameworks", "databases", "tools", "ecommerce", "personal"] as const) {
    for (const label of (skills as Record<string, string[]>)[group]) {
      await prisma.skill.create({ data: { group, label, order: so++ } });
    }
  }

  await prisma.certification.deleteMany();
  for (const [i, c] of certifications.entries()) {
    const [label, organization] = c.split(" — ").map((s) => s.trim());
    await prisma.certification.create({ data: { label, organization: organization || null, order: i } });
  }

  await prisma.language.deleteMany();
  for (const [i, l] of languages.entries()) {
    await prisma.language.create({ data: { ...l, order: i } });
  }

  await prisma.interest.deleteMany();
  for (const [i, l] of interests.entries()) {
    await prisma.interest.create({ data: { label: l, order: i } });
  }

  console.log("Seed complete.");
}

main().finally(() => prisma.$disconnect());
