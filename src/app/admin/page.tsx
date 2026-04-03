import { AdminShell } from "@/app/admin/shell";
import { exams, groupCards, participants, sessions } from "@/app/platform-data";

const overviewStats = [
  { label: "进行中的实验", value: "1" },
  { label: "已配置组别", value: "6" },
  { label: "待用试卷", value: "2" },
  { label: "被试账号", value: "128" },
];

export default function AdminPage() {
  return (
    <AdminShell
      title="专业后台首页"
      description="这版首页按实验真实运营来组织信息：先看总控，再看组别概率、场次、被试状态和当天提醒。后面接数据库后，这里会变成实时仪表盘。"
    >
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {overviewStats.map((item) => (
              <article key={item.label} className="rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-lg">
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{item.label}</p>
                <strong className="mt-4 block text-4xl font-semibold text-stone-900">{item.value}</strong>
              </article>
            ))}
          </div>

          <section className="rounded-[28px] border border-white/60 bg-white/80 p-7 shadow-lg">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Experiment Snapshot</p>
            {exams.map((exam) => (
              <article key={exam.name} className="mt-5 rounded-[24px] bg-stone-50 p-6">
                <h3 className="font-serif text-2xl">{exam.name}</h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-stone-500">状态</p>
                    <p className="mt-2 text-lg">{exam.status}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-stone-500">已分配被试</p>
                    <p className="mt-2 text-lg">{exam.participants}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-stone-500">正式任务</p>
                    <p className="mt-2 text-lg">{exam.tasks}</p>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="rounded-[28px] border border-white/60 bg-white/80 p-7 shadow-lg">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Live Participants</p>
            <div className="mt-5 space-y-4">
              {participants.map((participant) => (
                <article key={participant.id} className="rounded-[24px] bg-stone-50 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-medium text-stone-900">{participant.id}</h3>
                      <p className="mt-1 text-sm text-stone-600">
                        {participant.session} · {participant.paper}
                      </p>
                    </div>
                    <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-700">
                      {participant.group}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-stone-600">
                    <span>状态：{participant.status}</span>
                    <span>异常：{participant.abnormal}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>

        <section className="space-y-6">
          <section className="rounded-[28px] border border-white/60 bg-white/80 p-7 shadow-lg">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Group Allocation</p>
            <div className="mt-5 grid gap-4">
              {groupCards.map((group) => (
                <article key={group.code} className="rounded-[24px] border border-stone-200 bg-stone-50 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{group.code}</p>
                      <h3 className="mt-2 font-medium text-stone-900">{group.title}</h3>
                    </div>
                    <div className="rounded-full bg-white px-3 py-2 text-sm font-medium text-stone-700">
                      {group.probability}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-stone-600">{group.note}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] bg-stone-950 p-7 text-stone-100 shadow-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-400">Field Notes</p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-stone-300">
              <p>本轮重点保留操作手册里的考试、组别、试卷、场次、被试、导出六大模块。</p>
              <p>同时把旧系统里创建流程绕、重复配置多的问题收敛成更短的后台路径。</p>
              <p>下一步接真实数据后，这里会实时显示在线人数、当前任务进度和异常行为提醒。</p>
            </div>
          </section>

          <section className="rounded-[28px] border border-white/60 bg-white/80 p-7 shadow-lg">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Upcoming Sessions</p>
            <div className="mt-5 space-y-4">
              {sessions.map((session) => (
                <article key={session.name} className="rounded-[24px] bg-stone-50 p-5">
                  <h3 className="font-medium text-stone-900">{session.name}</h3>
                  <p className="mt-2 text-sm text-stone-600">
                    {session.room} · {session.capacity} · {session.progress}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </section>
      </div>
    </AdminShell>
  );
}
