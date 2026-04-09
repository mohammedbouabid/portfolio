import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ListEditor from "./ListEditor";

export const dynamic = "force-dynamic";

const SCHEMAS = {
  education: { title: "EDUCATION", fields: [{ name: "period", label: "Period" }, { name: "title", label: "Title" }, { name: "school", label: "School" }] },
  skills: { title: "SKILLS", fields: [{ name: "group", label: "Group (languages|frameworks|databases|tools|ecommerce|personal)" }, { name: "label", label: "Label" }] },
  certifications: { title: "CERTIFICATIONS", fields: [{ name: "label", label: "Label" }, { name: "organization", label: "Organization" }] },
  languages: { title: "LANGUAGES", fields: [{ name: "name", label: "Name" }, { name: "level", label: "Level" }] },
  interests: { title: "INTERESTS", fields: [{ name: "label", label: "Label" }] }
} as const;

export default async function Page({ params }: { params: { model: string } }) {
  const schema = SCHEMAS[params.model as keyof typeof SCHEMAS];
  if (!schema) notFound();

  let items: any[] = [];
  switch (params.model) {
    case "education": items = await prisma.education.findMany({ orderBy: { order: "asc" } }); break;
    case "skills": items = await prisma.skill.findMany({ orderBy: { order: "asc" } }); break;
    case "certifications": items = await prisma.certification.findMany({ orderBy: { order: "asc" } }); break;
    case "languages": items = await prisma.language.findMany({ orderBy: { order: "asc" } }); break;
    case "interests": items = await prisma.interest.findMany({ orderBy: { order: "asc" } }); break;
  }

  return (
    <div className="space-y-6">
      <h1 className="font-headline font-black text-4xl uppercase italic">{schema.title}</h1>
      <ListEditor model={params.model} fields={schema.fields as any} items={items} />
    </div>
  );
}
