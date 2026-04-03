import Link from "next/link";

import { ParticipantShell } from "@/app/participant/shell";
import { groupCards, participantStages, taskOverview } from "@/app/platform-data";

export default function ParticipantPage() {
  return (
    <ParticipantShell
      badge="Participant Flow"
      title="被试端流程总览"
      description="被试端按正式实验路径组织：知情同意、基础信息、激励说明、三个任务、任务后反馈与最终问卷。真正作答页单独放在 workspace。"
      actions={
        <>
          <Link
            href="/participant/workspace"
            className="rounded-full bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-500"
          >
            打开正式作答页
          </Link>
          <Link
            href="/admin"
            className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
          >
            查看后台
          </Link>
        </>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="space-y-6">
          <article className="rounded-[32px] border border-white/60 bg-white/75 p-6 shadow-xl backdrop-blur">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Flow Stages</p>
            <div className="mt-5 grid gap-3">
              {participantStages.map((stage, index) => (
                <div key={stage} className="flex items-center gap-4 rounded-[22px] bg-stone-50 px-4 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-sm font-medium text-white">
                    {index + 1}
                  </div>
                  <div className="text-sm font-medium text-stone-700">{stage}</div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[32px] border border-white/60 bg-white/75 p-6 shadow-xl backdrop-blur">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Task Design</p>
            <div className="mt-5 space-y-4">
              {taskOverview.map((task) => (
                <div key={task.title} className="rounded-[22px] bg-stone-50 p-5">
                  <h3 className="font-medium text-stone-900">{task.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{task.reward}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="space-y-6">
          <article className="rounded-[32px] border border-white/60 bg-white/75 p-6 shadow-xl backdrop-blur">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Group Logic</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {groupCards.map((group) => (
                <div key={group.code} className="rounded-[22px] bg-stone-50 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{group.code}</p>
                  <h3 className="mt-2 font-medium text-stone-900">{group.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{group.note}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[32px] bg-stone-950 p-6 text-stone-100 shadow-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-400">Participant Constraints</p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-stone-300">
              <p>任务或 AI 对话中不得输入可识别个人身份信息。</p>
              <p>系统将记录切屏、最小化和重新进入页面等异常行为。</p>
              <p>A 组任务内可自行决定是否与 AI 对话，B 组不显示任何 AI 区域。</p>
              <p>正式任务页会根据 I / II / III 组自动切换对应的激励说明。</p>
            </div>
          </article>
        </section>
      </div>
    </ParticipantShell>
  );
}
