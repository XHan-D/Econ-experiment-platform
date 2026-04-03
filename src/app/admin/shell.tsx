"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { adminNav } from "@/app/platform-data";

type AdminShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function AdminShell({ title, description, children }: AdminShellProps) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#efe7db_0%,#f7f2eb_22%,#f6f8fc_100%)] text-stone-900">
      <div className="grid min-h-screen lg:grid-cols-[290px_1fr]">
        <aside className="border-r border-stone-200/80 bg-[linear-gradient(180deg,#fffaf3_0%,#f1e4d3_100%)] p-6 lg:p-8">
          <div className="rounded-[28px] border border-stone-200 bg-white/80 p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Admin Console</p>
            <h1 className="mt-3 font-serif text-3xl">实验后台</h1>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              对齐旧操作手册的核心能力，但把创建路径、信息结构和管理入口做得更顺手。
            </p>
          </div>

          <nav className="mt-6 space-y-3">
            {adminNav.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-[24px] border px-4 py-4 transition ${
                    active
                      ? "border-stone-900 bg-stone-900 text-white shadow-lg shadow-stone-900/10"
                      : "border-stone-200 bg-white/75 text-stone-700 hover:bg-white"
                  }`}
                >
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className={`mt-1 text-xs leading-5 ${active ? "text-stone-300" : "text-stone-500"}`}>
                    {item.description}
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="p-6 lg:p-10">
          <header className="rounded-[32px] border border-white/60 bg-white/75 p-8 shadow-xl backdrop-blur">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Workspace</p>
            <h2 className="mt-3 font-serif text-4xl">{title}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">{description}</p>
          </header>

          <div className="mt-8">{children}</div>
        </section>
      </div>
    </main>
  );
}
