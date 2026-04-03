import { AdminShell } from "@/app/admin/shell";
import { exams, taskOverview } from "@/app/platform-data";

export default function ExamsPage() {
  return (
    <AdminShell
      title="考试管理"
      description="实验本身的总控页，用来管理任务结构、奖励规则、知情同意文案、AI 提示语和问卷模块。这里按你现有实验设计拆成任务与问卷两个层级。"
    >
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[28px] border border-white/60 bg-white/80 p-7 shadow-lg">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Active Exam</p>
          {exams.map((exam) => (
            <article key={exam.name} className="mt-5 rounded-[24px] bg-stone-50 p-6">
              <h3 className="font-serif text-2xl">{exam.name}</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-stone-500">状态</p>
                  <p className="mt-2 text-lg">{exam.status}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-stone-500">场次数</p>
                  <p className="mt-2 text-lg">3 个</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-stone-500">任务数</p>
                  <p className="mt-2 text-lg">{exam.tasks} 个正式任务</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-stone-500">问卷模块</p>
                  <p className="mt-2 text-lg">{exam.questionnaires} 段</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-[28px] border border-white/60 bg-white/80 p-7 shadow-lg">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Task Structure</p>
          <div className="mt-5 space-y-4">
            {taskOverview.map((task) => (
              <article key={task.title} className="rounded-[24px] border border-stone-200 bg-stone-50 p-5">
                <h3 className="font-medium text-stone-900">{task.title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{task.reward}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
