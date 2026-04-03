"use client";

import { AdminShell } from "@/app/admin/shell";
import { useAdminStore } from "@/app/admin/use-admin-store";

export default function GroupsPage() {
  const { store, setGroups } = useAdminStore();

  function updateGroup(index: number, field: "title" | "note" | "probability", value: string) {
    setGroups(store.groups.map((group, groupIndex) => (groupIndex === index ? { ...group, [field]: value } : group)));
  }

  return (
    <AdminShell
      title="组别与概率"
      description="这里已经能直接修改 6 个组别的名称、说明和概率。现在先保存在浏览器本地，后面会接到后台数据库。"
    >
      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {store.groups.map((group, index) => (
          <article key={group.code} className="rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{group.code}</p>
                <input
                  value={group.title}
                  onChange={(event) => updateGroup(index, "title", event.target.value)}
                  className="mt-3 w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 font-serif text-xl outline-none"
                />
              </div>
              <input
                value={group.probability}
                onChange={(event) => updateGroup(index, "probability", event.target.value)}
                className="w-24 rounded-full border border-stone-200 bg-white px-3 py-2 text-center text-sm font-medium text-stone-700 outline-none"
              />
            </div>
            <textarea
              value={group.note}
              onChange={(event) => updateGroup(index, "note", event.target.value)}
              className="mt-4 min-h-28 w-full rounded-[22px] border border-stone-200 bg-white px-4 py-3 text-sm leading-7 text-stone-600 outline-none"
            />
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
