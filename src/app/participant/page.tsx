const steps = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export default function ParticipantPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_20%),linear-gradient(135deg,#edf3ff_0%,#dce7ff_46%,#f7f1ea_100%)] px-6 py-8 text-stone-900 md:px-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[30px] border border-white/60 bg-white/60 p-6 shadow-xl backdrop-blur">
          <p className="text-sm text-stone-500">组别：AI　场次：301教室　时间：2026.12.12</p>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[32px] border border-white/60 bg-white/72 p-6 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-500">题目 1 / 20</p>
                <h1 className="mt-2 font-serif text-3xl">新闻稿修改任务</h1>
              </div>
              <div className="rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-500">00:02</div>
            </div>

            <div className="mt-6 rounded-[24px] bg-stone-50 p-6">
              <p className="text-lg leading-8">
                你的角色是中学官方微信公众号新闻稿编辑。请阅读给定材料，将其修改为正式新闻稿。
              </p>
            </div>

            <label className="mt-6 block">
              <span className="mb-3 block text-sm font-medium text-stone-600">作答内容</span>
              <textarea
                className="min-h-[360px] w-full rounded-[24px] border border-stone-200 bg-white px-5 py-4 outline-none"
                placeholder="在这里输入被试答案"
              />
            </label>

            <div className="mt-6 flex justify-end">
              <button className="rounded-full bg-blue-600 px-8 py-3 text-white shadow-lg shadow-blue-900/20">下一题</button>
            </div>
          </article>

          <aside className="space-y-6">
            <section className="rounded-[32px] border border-white/60 bg-white/72 p-6 shadow-xl backdrop-blur">
              <p className="text-sm text-stone-500">题目总览</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {steps.map((step, index) => (
                  <div
                    key={step}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm ${
                      index < 4 ? "border-blue-300 bg-blue-100 text-blue-700" : "border-stone-200 bg-white text-stone-500"
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[32px] border border-white/60 bg-white/72 p-6 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-sm text-stone-500">AI 使用记录</p>
                <button className="rounded-full bg-blue-600 px-4 py-2 text-sm text-white">接入 AI 回答</button>
              </div>
              <div className="mt-5 min-h-[420px] rounded-[24px] bg-stone-50 p-5 text-stone-600">
                使用了 AI 的话，这里展示对话记录；没使用则保持为空。
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
