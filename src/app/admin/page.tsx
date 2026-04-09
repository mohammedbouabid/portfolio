import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
  const [projects, experiences, edu, skills, certs, langs, ints] = await Promise.all([
    prisma.project.count(),
    prisma.experience.count(),
    prisma.education.count(),
    prisma.skill.count(),
    prisma.certification.count(),
    prisma.language.count(),
    prisma.interest.count()
  ]);
  const cards = [
    { href: "/admin/profile", label: "Profile", count: 1 },
    { href: "/admin/projects", label: "Projects", count: projects },
    { href: "/admin/experiences", label: "Experiences", count: experiences },
    { href: "/admin/lists/education", label: "Education", count: edu },
    { href: "/admin/lists/skills", label: "Skills", count: skills },
    { href: "/admin/lists/certifications", label: "Certifications", count: certs },
    { href: "/admin/lists/languages", label: "Languages", count: langs },
    { href: "/admin/lists/interests", label: "Interests", count: ints }
  ];
  return (
    <div className="space-y-8">
      <h1 className="font-headline font-black text-5xl uppercase italic">DASHBOARD</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="border-4 border-on-surface p-6 bg-white hover:bg-primary hover:text-white transition-colors manga-panel-shadow">
            <div className="font-label text-xs uppercase tracking-widest opacity-60">{c.count} entries</div>
            <div className="font-headline font-black text-2xl uppercase mt-2">{c.label} →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
