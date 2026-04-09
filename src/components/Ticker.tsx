const ITEMS = [
  "OPEN TO OPPORTUNITIES",
  "ODOO 17 + MERN",
  "CASABLANCA, MA",
  "mo.bouabid.dev@gmail.com",
  "FULL STACK & ERP DEV",
  "AVAILABLE FOR FREELANCE"
];

export default function Ticker({ dark = false }: { dark?: boolean }) {
  const bg = dark ? "bg-on-surface text-surface" : "bg-primary text-white";
  return (
    <div className={`${bg} py-3 overflow-hidden whitespace-nowrap border-y-4 border-on-surface`}>
      <div className="inline-block animate-marquee">
        {[...ITEMS, ...ITEMS].map((t, i) => (
          <span key={i} className="font-label font-black text-sm tracking-[0.3em] px-4">
            {t} •
          </span>
        ))}
      </div>
    </div>
  );
}
