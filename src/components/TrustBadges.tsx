import { MapPin, Banknote, ShieldCheck } from "lucide-react";

interface TrustBadgesProps {
  variant?: "compact" | "full";
}

const badges = [
  { icon: MapPin, text: "Бесплатный выезд" },
  { icon: Banknote, text: "Деньги сразу" },
  { icon: ShieldCheck, text: "3 000+ сделок" },
];

const TrustBadges = ({ variant = "full" }: TrustBadgesProps) => {
  if (variant === "compact") {
    return (
      <div className="flex flex-wrap justify-center gap-2">
        {badges.map((b) => (
          <span
            key={b.text}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground"
            style={{ background: 'hsla(220, 20%, 25%, 0.5)' }}
          >
            <b.icon className="w-3.5 h-3.5 text-primary" />
            {b.text}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {badges.map((b) => (
        <div
          key={b.text}
          className="flex flex-col items-center gap-2 p-3 rounded-xl border border-[var(--glass-border)]"
          style={{ background: 'hsla(220, 20%, 16%, 0.4)' }}
        >
          <b.icon className="w-5 h-5 text-primary" />
          <span className="text-xs font-medium text-muted-foreground text-center leading-tight">{b.text}</span>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
