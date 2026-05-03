import type { PropsWithChildren, ReactNode } from "react";

interface SectionProps extends PropsWithChildren {
  id: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

export function Section({ id, title, subtitle, icon, children }: SectionProps) {
  return (
    <section
      id={id}
      className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-md shadow-slate-200/60 backdrop-blur md:p-7"
    >
      <div className="mb-5 flex items-center gap-3">
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 ring-1 ring-teal-100">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            {title}
          </h2>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}
