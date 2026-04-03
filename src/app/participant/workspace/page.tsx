const answered = [1, 2, 3, 4];

const promptPanels = [
  "基础报酬 35 元，附加报酬最高 35 元。",
  "请避免输入任何个人身份信息。",
  "切屏或最小化将记录到后台日志。",
];

export default function ParticipantWorkspacePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_18%),linear-gradient(135deg,#edf3ff_0%,#dce6fa_42%,#f6efe5_100%)] px-4 py-5 text-stone-900 md:px-8">
      <div className="mx-auto max-w-[1500px]">
        <section className="rounded-[28px] border border-white/60 bg-white/68 px-6 py-5 shadow-xl backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 text-sm text-stone-600">
              <span className="rounded-full bg-white px-4 py-2">被试编号：P20260406001</span>
              <span className="rounded-full bg-white px-4 py-2">组别：A-II</span>
              <span className="rounded-full bg-white px-4 py-2">场次：301 教室</span>
              <span className="rounded-full bg-white px-4 py-2">试卷：主实验试卷 v2.1</span>
            </div>
            <div className="rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-500">任务一剩余 09:12</div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <article className="rounded-[34px] border border-white/60 bg-white/78 p-6 shadow-xl backdrop-blur md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-stone-500">任务 1 / 3</p>
                <h1 className="mt-2 font-serif text-4xl">Manuscript Correction and Editing</h1>
              </div>
              <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">Piece-rate 激励</div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {promptPanels.map((panel) => (
                <div key={panel} className="rounded-[22px] bg-stone-50 px-4 py-4 text-sm leading-6 text-stone-600">
                  {panel}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[28px] bg-stone-50 p-6">
              <h2 className="font-medium text-stone-900">任务说明</h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                你的角色是北京市某中学官方微信公众号新闻稿编辑。请审阅活动新闻初稿，并修改为可发布的正式新闻稿。
                本任务限时 10 分钟，倒计时结束后将自动锁定。点击“下一题”即视为提交。
              </p>
            </div>

            <div className="mt-6 rounded-[28px] border border-stone-200 bg-white p-6">
              <h2 className="font-medium text-stone-900">初稿材料</h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                2025 年 7 月 8 日上午，北京市某中学报告厅内气氛热烈，一场以
                “The Greatest Challenge Faceing My Generation”为主题的英语演讲比赛在此举行……
              </p>
            </div>

            <label className="mt-6 block">
              <span className="mb-3 block text-sm font-medium text-stone-700">正式作答区</span>
              <textarea
                className="min-h-[380px] w-full rounded-[28px] border border-stone-200 bg-white px-5 py-4 text-sm leading-7 outline-none transition focus:border-blue-300"
                placeholder="在这里输入修改后的正式新闻稿。后续会接自动保存、断线恢复和提交锁定。"
              />
            </label>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-stone-500">评分标准：硬性错误改正 80 分，文段写作水平 20 分。</div>
              <button className="rounded-full bg-blue-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-500">
                下一题
              </button>
            </div>
          </article>

          <aside className="space-y-6">
            <section className="rounded-[34px] border border-white/60 bg-white/78 p-6 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500">题目总览</p>
                  <h2 className="mt-2 font-serif text-3xl">当前流程</h2>
                </div>
                <div className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white">任务一</div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {Array.from({ length: 10 }, (_, index) => index + 1).map((step) => {
                  const done = answered.includes(step);
                  return (
                    <div
                      key={step}
                      className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-medium ${
                        done
                          ? "border-blue-300 bg-blue-100 text-blue-800"
                          : "border-stone-200 bg-white text-stone-500"
                      }`}
                    >
                      {step}
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-[34px] border border-white/60 bg-white/78 p-6 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-stone-500">AI 互动区域</p>
                  <h2 className="mt-2 font-serif text-3xl">A 组可选开启</h2>
                </div>
                <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500">
                  开启 AI 对话
                </button>
              </div>

              <div className="mt-5 rounded-[26px] bg-stone-50 p-5 text-sm leading-7 text-stone-600">
                <p>
                  在完成本任务的过程中，你可以与人工智能（AI）助手进行对话。AI 助手可能提高你答题的效率和质量；如果你在本任务中与 AI
                  助手有任何对话，本任务的附加奖励将减少 0.25 元。
                </p>
              </div>

              <div className="mt-5 min-h-[300px] rounded-[26px] border border-stone-200 bg-white p-5 text-sm leading-7 text-stone-500">
                这里后续会展示真实的 AI 会话记录、轮次、时间戳与模型信息。B 组在同位置不会显示任何 AI 交互入口。
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
