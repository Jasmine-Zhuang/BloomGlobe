import { DestinationBadge } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "soft";
  className?: string;
}

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium tracking-[0.18em] uppercase",
        tone === "accent" && "bg-rose text-white",
        tone === "soft" && "bg-[#f6eee8] text-pine/78",
        tone === "neutral" && "border border-white/70 bg-white/72 text-pine/72",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function DestinationBadgePill({
  badge,
  className,
}: {
  badge: DestinationBadge;
  className?: string;
}) {
  const tone = badge === "Peak Bloom" ? "accent" : "soft";

  return (
    <Badge tone={tone} className={className}>
      {badge}
    </Badge>
  );
}
