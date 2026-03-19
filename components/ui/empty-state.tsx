import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-[1.5rem] border border-dashed border-[#e7d8d2] bg-white/60 px-5 py-8 text-center",
        className,
      )}
    >
      <p className="text-xs uppercase tracking-[0.28em] text-rose/75">No blooms selected</p>
      <h3 className="mt-3 font-serif text-2xl text-pine">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-pine/68">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
