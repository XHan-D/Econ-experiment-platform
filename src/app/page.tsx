import Link from "next/link";

const coreModules = [
  "六组随机实验与可调权重分配",
  "任务内 AI 受控接入与完整日志留存",
  "考试 / 场次 / 组别 / 试卷 / 被试后台管理",
  "异常行为记录、导出与后续数据库扩展",
];

const roadmap = [
  "Admin 后台先落成可操作的信息架构，再接数据库和登录。",
  "被试端按知情同意、说明、任务、反馈、问卷的正式实验路径组织。",
  "后续接入生产部署、真实 AI API、自动保存与导出。",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_24%),linear-gradient(135deg,#f4eee3_0%,#eadfce_48%,#d9e4f5_100%)] text-stone-900">
      <section className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-16 md:px-10">
        <div className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[36px] border border-white/50 bg-white/72 p-8 shadow-[0_30px_80px_rgba(73,49,20,0.12)] backdrop-blur md:p-12">
            <div className="inline-flex rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-xs uppercase tracking-[0.3em] text-stone-500">
              Human-AI Experiment Platform
            </div>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-tight md:text-6xl">
              AI 辅助工作经济学实验平台
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600">
              这版不是展示页，而是按你 `Human-AI_project` 里现有的实验要求重组后的正式项目骨架。
              后台围绕考试、场次、组别、试卷、被试和导出组织；被试端围绕知情同意、激励说明、三个正式任务、AI
              使用记录和问卷反馈组织。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/admin"
                className="rounded-full bg-orange-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-orange-900/20 transition hover:bg-orange-500"
              >
                进入 Admin 后台
              </Link>
              <Link
                href="/participant"
                className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-800 transition hover:bg-stone-50"
              >
                进入被试端
              </Link>
              <Link
                href="/participant/workspace"
                className="rounded-full border border-sky-300 bg-sky-50 px-6 py-3 text-sm font-medium text-sky-900 transition hover:bg-sky-100"
              >
                查看正式作答页
              </Link>
            </div>
          </div>

          <div className="grid gap-6">
            <section className="rounded-[32px] border border-white/50 bg-white/75 p-8 shadow-xl backdrop-blur">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Core Modules</p>
              <h2 className="mt-4 font-serif text-3xl">已锁定的业务主线</h2>
              <ul className="mt-5 space-y-3 text-stone-600">
                {coreModules.map((item) => (
                  <li key={item} className="rounded-2xl bg-stone-50 px-4 py-4">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-[32px] bg-stone-950 p-8 text-stone-100 shadow-xl">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-400">Build Track</p>
              <h2 className="mt-4 font-serif text-3xl">当前开发节奏</h2>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-stone-300">
                {roadmap.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
