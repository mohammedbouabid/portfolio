import { getProfile } from "@/lib/content";
import ProfileForm from "./ProfileForm";

export const dynamic = "force-dynamic";

export default async function Page() {
  const p = await getProfile();
  return (
    <div className="space-y-6">
      <h1 className="font-headline font-black text-4xl uppercase italic">PROFILE</h1>
      <ProfileForm initial={p} />
    </div>
  );
}
