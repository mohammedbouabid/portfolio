import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline font-black text-4xl uppercase italic">NEW_PROJECT</h1>
      <ProjectForm initial={null} />
    </div>
  );
}
