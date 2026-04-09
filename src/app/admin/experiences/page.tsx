import { getExperiences } from "@/lib/content";
import ExperiencesEditor from "./ExperiencesEditor";

export const dynamic = "force-dynamic";

export default async function Page() {
  const items = await getExperiences();
  return (
    <div className="space-y-6">
      <h1 className="font-headline font-black text-4xl uppercase italic">EXPERIENCES</h1>
      <ExperiencesEditor initial={items} />
    </div>
  );
}
