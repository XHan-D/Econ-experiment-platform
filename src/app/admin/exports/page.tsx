import { AdminShell } from "@/app/admin/shell";
import { exportSets } from "@/app/platform-data";

export default function ExportsPage() {
  return (
    <AdminShell
      title="导出中心"
      description="导出页按研究分析需要组织，不只导答案，还要导 AI 会话、异常行为、时间戳和奖金汇总。后续会补 CSV / JSON / DTA 适配。"
    >
      <div className="grid gap-5 xl:grid-cols-2">
        {exportSets.map((item) => (
          <article key={item.title} className="rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-lg">
            <h3 className="font-serif text-2xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-stone-600">{item.detail}</p>
            <button className="mt-6 rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-700">
              导出占位按钮
            </button>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
