"use client";

import { AdminShell } from "@/app/admin/shell";
import { usePlatformStore } from "@/app/use-platform-store";

export default function ExportsPage() {
  const { store } = usePlatformStore();

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
      description="这页现在会导出整套平台数据，包括后台配置、被试进度、任务答案、AI 会话、异常日志和最终提交。"
    >
      <div className="grid gap-5 xl:grid-cols-2">
        {[
          {
            title: "完整平台数据",
            detail: `当前已记录 ${store.submissions.length} 份正式提交，${store.progress.length} 份过程进度。`,
          },
          {
            title: "研究原始记录",
            detail: "导出后可直接检查实验配置、被试账号、任务答案、AI 对话和异常行为。",
          },
        ].map((item) => (
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
