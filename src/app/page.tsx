import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#f6efe7_0%,#ead9c4_50%,#e6cfb8_100%)] text-stone-900">
      <section className="mx-auto flex min-h-screen max-w-7xl items-center px-8 py-16">
        <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[32px] border border-white/40 bg-white/70 p-10 shadow-2xl backdrop-blur">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Behavioral Economics Lab</p>
            <div className="mt-4 inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-900">
              本地工作流测试：这一条是新改的
            </div>
            <h1 className="mt-4 font-serif text-5xl leading-tight">AI 辅助工作经济学实验平台</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
              这是正式产品路线的起点。接下来我们会把它扩成真正可上线的实验系统，而不是开发草稿。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/admin" className="rounded-full bg-orange-600 px-6 py-3 text-white shadow-lg shadow-orange-900/20">
                进入 Admin 后台
              </Link>
              <Link href="/participant" className="rounded-full border border-stone-300 bg-white px-6 py-3 text-stone-800">
                进入被试端
              </Link>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[28px] border border-white/40 bg-white/70 p-8 shadow-xl backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Phase 1</p>
              <h2 className="mt-3 font-serif text-3xl">现在先做什么</h2>
              <ul className="mt-5 space-y-3 text-stone-600">
                <li>专业后台框架</li>
                <li>更好的双栏作答页</li>
                <li>考试 / 组别 / 试卷 / 题目管理</li>
                <li>后续接数据库和 API</li>
              </ul>
            </div>
            <div className="rounded-[28px] border border-white/40 bg-stone-950 p-8 text-stone-100 shadow-xl">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Status</p>
              <h2 className="mt-3 font-serif text-3xl">服务器项目已启动</h2>
              <p className="mt-4 leading-8 text-stone-300">
                你现在看到的是第一步。后面我会继续把它做成你要的专业后台和正式被试端。
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
