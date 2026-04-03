"use client";

import { AdminShell } from "@/app/admin/shell";
import { useAdminStore } from "@/app/admin/use-admin-store";

export default function ExportsPage() {
  const { store } = useAdminStore();

  function exportJson() {
    const blob = new Blob([JSON.stringify(store, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "econ-platform-export.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AdminShell
      title="导出中心"
      description="这页现在已经能真正导出当前浏览器里的后台演示数据，方便你验证管理页的修改是否都被收进去了。"
    >
      <div className="grid gap-5 xl:grid-cols-2">
        {store.exportSets.map((item) => (
          <article key={item.title} className="rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-lg">
            <h3 className="font-serif text-2xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-stone-600">{item.detail}</p>
            <button
              onClick={exportJson}
              className="mt-6 rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
            >
              导出当前演示数据
            </button>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
