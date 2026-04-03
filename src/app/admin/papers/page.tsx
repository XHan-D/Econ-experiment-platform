import { AdminShell } from "@/app/admin/shell";
import { papers } from "@/app/platform-data";

export default function PapersPage() {
  return (
    <AdminShell
      title="试卷与题目"
      description="参考旧操作手册里“试卷管理 / 题目管理”的拆分，但这里把它们放进同一条编辑链路：先定试卷，再挂载题目与模块。"
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <section className="rounded-[28px] border border-white/60 bg-white/80 p-7 shadow-lg">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Papers</p>
          <div className="mt-5 space-y-4">
            {papers.map((paper) => (
              <article key={paper.title} className="rounded-[24px] bg-stone-50 p-6">
                <h3 className="font-serif text-2xl">{paper.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{paper.sections}</p>
                <p className="mt-3 text-sm leading-6 text-stone-500">{paper.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-white/60 bg-white/80 p-7 shadow-lg">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Question Types</p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-stone-600">
            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-5">
              单选 / 多选 / 量表 / 开放题 / 多题任务 / 长文本作答
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-5">
              支持任务前说明页、最短阅读时长、是否展示 AI 区域、是否显示正计时或倒计时。
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-5">
              下一步接配置表后，会支持复制试卷、复制题目、批量导入与版本化。
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
