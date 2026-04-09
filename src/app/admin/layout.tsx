import Link from "next/link";
import { headers } from "next/headers";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = headers().get("x-invoke-path") || "";
  const isLogin = path.includes("/admin/login");
  if (isLogin) return <>{children}</>;
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-surface">
      <aside className="md:w-64 md:min-h-screen border-b-4 md:border-b-0 md:border-r-4 border-on-surface bg-white p-6 space-y-6">
        <Link href="/admin" className="block font-headline font-black text-2xl uppercase italic underline decoration-4 decoration-primary">
          ADMIN_PANEL
        </Link>
        <nav className="flex flex-col gap-2 font-headline font-bold uppercase text-sm">
          <Link href="/admin" className="hover:text-primary">Dashboard</Link>
          <Link href="/admin/profile" className="hover:text-primary">Profile</Link>
          <Link href="/admin/projects" className="hover:text-primary">Projects</Link>
          <Link href="/admin/experiences" className="hover:text-primary">Experiences</Link>
          <Link href="/admin/lists/education" className="hover:text-primary">Education</Link>
          <Link href="/admin/lists/skills" className="hover:text-primary">Skills</Link>
          <Link href="/admin/lists/certifications" className="hover:text-primary">Certifications</Link>
          <Link href="/admin/lists/languages" className="hover:text-primary">Languages</Link>
          <Link href="/admin/lists/interests" className="hover:text-primary">Interests</Link>
        </nav>
        <div className="pt-6 border-t-4 border-on-surface space-y-2">
          <Link href="/" className="block text-xs uppercase font-bold tracking-widest text-zinc-500 hover:text-primary">← View site</Link>
          <form action="/api/admin/logout" method="post">
            <button className="text-xs uppercase font-bold tracking-widest text-primary">Logout</button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
