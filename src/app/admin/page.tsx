const stats = [
  { label: "考试数量", value: "1" },
  { label: "组别数量", value: "6" },
  { label: "试卷数量", value: "2" },
  { label: "被试数量", value: "0" },
];

const nav = ["考试管理", "组别管理", "试卷管理", "题目管理", "场次管理", "被试管理", "数据导出"];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#f4ede3] text-stone-900">
      <div className="grid min-h-screen md:grid-cols-[280px_1fr]">
        <aside className="border-r border-stone-200 bg-[linear-gradient(180deg,#fffaf3_0%,#f1e5d4_100%)] p-6">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Admin Console</p>
          <h1 className="mt-3 font-serif text-3xl">实验后台</h1>
          <div className="mt-8 space-y-3">
            {nav.map((item) => (
              <div key={item} className="rounded-2xl border border-stone-200 bg-white/80 px-4 py-3 text-stone-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </aside>

        <section className="p-8 md:p-10">
          <div className="rounded-[28px] border border-white/50 bg-white/75 p-8 shadow-xl backdrop-blur">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Overview</p>
            <h2 className="mt-3 font-serif text-4xl">专业后台首页</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-4">
              {stats.map((item) => (
                <article key={item.label} className="rounded-[24px] bg-stone-50 p-5">
                  <p className="text-sm text-stone-500">{item.label}</p>
                  <strong className="mt-3 block text-3xl font-semibold text-stone-900">{item.value}</strong>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-[28px] border border-white/50 bg-white/75 p-8 shadow-xl">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Workflow</p>
              <h3 className="mt-3 font-serif text-3xl">比旧系统更顺手</h3>
              <ul className="mt-6 space-y-4 text-stone-600">
                <li>创建被试时直接绑定实验、场次、组别、试卷</li>
                <li>不用再来回跳多个页面再分配试卷</li>
                <li>题目和试卷管理按业务对象组织</li>
                <li>后续会加入复制试卷、复制题目、批量导入</li>
              </ul>
            </section>

            <section className="rounded-[28px] bg-stone-950 p-8 text-stone-100 shadow-xl">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-400">Next</p>
              <h3 className="mt-3 font-serif text-3xl">下一步</h3>
              <p className="mt-5 leading-8 text-stone-300">
                我接下来会继续把这里做成真正可用的后台，而不是现在这种只看样子的首页。
              </p>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
