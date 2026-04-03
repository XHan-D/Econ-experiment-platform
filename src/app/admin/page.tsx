"use client";

import { AdminShell } from "@/app/admin/shell";
import { useAdminStore } from "@/app/admin/use-admin-store";

export default function AdminPage() {
  const { ready, reset, store } = useAdminStore();

  const overviewStats = [
    { label: "进行中的实验", value: String(store.exams.length) },
    { label: "已配置组别", value: String(store.groups.length) },
    { label: "待用试卷", value: String(store.papers.length) },
    { label: "被试账号", value: String(store.participants.length) },
  ];

  return (
    <AdminShell
      title="专业后台首页"
      description="现在这页已经接上可修改的本地状态。你在考试、组别、试卷、场次、被试页面改动后，这里会同步变化。"
    >
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {overviewStats.map((item) => (
              <article key={item.label} className="rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-lg">
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{item.label}</p>
                <strong className="mt-4 block text-4xl font-semibold text-stone-900">
                  {ready ? item.value : "..."}
                </strong>
              </article>
            ))}
          </div>

          <section className="rounded-[28px] border border-white/60 bg-white/80 p-7 shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Experiment Snapshot</p>
              <button
                onClick={reset}
                className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
              >
                重置演示数据
              </button>
            </div>
            <div className="mt-5 space-y-4">
              {store.exams.map((exam) => (
                <article key={exam.name} className="rounded-[24px] bg-stone-50 p-6">
                  <h3 className="font-serif text-2xl">{exam.name}</h3>
                  <div className="mt-5 grid gap-4 sm:grid-cols-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">状态</p>
                      <p className="mt-2 text-lg">{exam.status}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">被试</p>
                      <p className="mt-2 text-lg">{exam.participants}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">任务数</p>
                      <p className="mt-2 text-lg">{exam.tasks}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">问卷段落</p>
                      <p className="mt-2 text-lg">{exam.questionnaires}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-white/60 bg-white/80 p-7 shadow-lg">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Live Participants</p>
            <div className="mt-5 space-y-4">
              {store.participants.slice(0, 3).map((participant) => (
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
              {store.groups.map((group) => (
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
            <p className="text-xs uppercase tracking-[0.28em] text-stone-400">现在可操作了什么</p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-stone-300">
              <p>考试页可以新增和修改实验配置。</p>
              <p>组别页可以直接改 6 组的标题、说明和概率。</p>
              <p>试卷、场次、被试页都能新增记录，并保存在浏览器本地。</p>
            </div>
          </section>

          <section className="rounded-[28px] border border-white/60 bg-white/80 p-7 shadow-lg">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Upcoming Sessions</p>
            <div className="mt-5 space-y-4">
              {store.sessions.map((session) => (
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
