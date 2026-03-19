import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  aside?: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  aside,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.28em] text-rose/80">{eyebrow}</p>
        <h2 className="mt-2 font-serif text-[1.9rem] leading-tight text-pine sm:text-[2.2rem]">{title}</h2>
        {description ? <p className="mt-3 text-sm leading-6 text-pine/68 sm:text-[15px]">{description}</p> : null}
      </div>
      {aside ? <div className="text-sm text-pine/68">{aside}</div> : null}
    </div>
  );
}
