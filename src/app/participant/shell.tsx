import Link from "next/link";
import type { ReactNode } from "react";

type ParticipantShellProps = {
  badge: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function ParticipantShell({
  badge,
  title,
  description,
  actions,
  children,
}: ParticipantShellProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92),transparent_20%),linear-gradient(135deg,#edf3ff_0%,#dce6f9_42%,#f4efe6_100%)] px-5 py-6 text-stone-900 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[30px] border border-white/60 bg-white/65 p-6 shadow-xl backdrop-blur md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <div className="inline-flex rounded-full border border-stone-200 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.28em] text-stone-500">
                {badge}
              </div>
              <h1 className="mt-4 font-serif text-4xl md:text-5xl">{title}</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">{description}</p>
            </div>
            <div className="flex flex-wrap gap-3">{actions}</div>
          </div>
        </div>

        <div className="mt-6">{children}</div>

        <div className="mt-6 flex justify-end">
          <Link
            href="/"
            className="rounded-full border border-stone-300 bg-white/80 px-5 py-3 text-sm font-medium text-stone-700 transition hover:bg-white"
          >
            返回首页
          </Link>
        </div>
      </div>
    </main>
  );
}
