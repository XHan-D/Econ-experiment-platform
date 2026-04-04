"use client";

import { useEffect, useMemo, useState } from "react";

import { usePlatformStore } from "@/app/use-platform-store";

const stageLabels = ["知情同意", "基本信息", "任务一", "任务一反馈", "任务二", "任务二反馈", "任务三", "任务三反馈", "最终问卷", "完成提交"];

function aiReply(taskTitle: string) {
  if (taskTitle.includes("Manuscript")) return "我建议你优先检查标题拼写、重复描述、时间计算和主观表达。";
  if (taskTitle.includes("Multi-item")) return "先抓最明显的逻辑错误和一致性错误，再补充修改建议。";
  return "先列结构提纲，再补充关键论点和结论。";
}

export default function ParticipantPage() {
  const { ready, store, ensureProgress, saveProgress, submitExperiment } = usePlatformStore();
  const [loginId, setLoginId] = useState("p001");
  const [password, setPassword] = useState("123456");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [draftMessage, setDraftMessage] = useState("");
  const [error, setError] = useState("");

  const participant = useMemo(() => store.participants.find((item) => item.id === currentUserId) ?? null, [currentUserId, store.participants]);
  const paper = useMemo(() => store.papers.find((item) => item.title === participant?.paper) ?? store.papers[0], [participant, store.papers]);
  const group = useMemo(() => store.groups.find((item) => item.code === participant?.group) ?? store.groups[0], [participant, store.groups]);
  const progress = useMemo(
    () => (participant ? store.progress.find((item) => item.participantId === participant.id) ?? null : null),
    [participant, store.progress]
  );
  const currentTaskIndex = progress ? Math.min(Math.floor(Math.max(progress.currentStage - 2, 0) / 2), 2) : 0;
  const currentTask = store.tasks[currentTaskIndex];
  const currentTaskProgress = progress?.taskProgress[currentTaskIndex];

  useEffect(() => {
    if (participant && paper && !progress) {
      ensureProgress(participant.id, paper.taskIds);
    }
  }, [ensureProgress, paper, participant, progress]);

  useEffect(() => {
    if (!participant || !progress) return;
    const writeAbnormal = () => {
      const next = {
        ...progress,
        abnormalLogs: [...progress.abnormalLogs, `${new Date().toLocaleString()}：检测到页面切出或隐藏`],
        updatedAt: new Date().toISOString(),
      };
      saveProgress(next);
    };
    const onVisibility = () => {
      if (document.hidden) writeAbnormal();
    };
    window.addEventListener("blur", writeAbnormal);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("blur", writeAbnormal);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [participant, progress, saveProgress]);

  function persist(next: NonNullable<typeof progress>) {
    saveProgress({ ...next, updatedAt: new Date().toISOString() });
  }

  if (!ready) return <main className="min-h-screen bg-stone-100 p-10">加载中...</main>;

  if (!currentUserId || !participant || !paper || !group) {
    return (
      <main className="min-h-screen bg-[linear-gradient(135deg,#f2ebdf_0%,#e6dbc9_40%,#dbe6f4_100%)] p-6 text-stone-900 md:p-10">
        <div className="mx-auto max-w-4xl rounded-[36px] border border-white/50 bg-white/80 p-8 shadow-2xl backdrop-blur md:p-10">
          <div className="inline-flex rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-xs uppercase tracking-[0.28em] text-stone-500">Participant Login</div>
          <h1 className="mt-5 font-serif text-5xl">实验登录</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-stone-600">
            登录后可以直接走知情同意、基本信息、三个任务、任务后反馈和最终问卷的完整流程。
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <input value={loginId} onChange={(event) => setLoginId(event.target.value)} className="rounded-2xl border border-stone-200 bg-white px-4 py-4 outline-none" placeholder="被试账号" />
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-2xl border border-stone-200 bg-white px-4 py-4 outline-none" placeholder="密码" />
          </div>
          <div className="mt-4 text-sm text-stone-500">演示账号：`p001 / 123456`、`p002 / 123456`</div>
          {error ? <div className="mt-4 text-sm text-red-600">{error}</div> : null}
          <button
            onClick={() => {
              const nextUser = store.participants.find((item) => item.id === loginId.trim() && item.password === password);
              if (!nextUser) {
                setError("账号或密码错误。");
                return;
              }
              setCurrentUserId(nextUser.id);
              setError("");
            }}
            className="mt-8 rounded-full bg-stone-900 px-8 py-4 text-sm font-medium text-white transition hover:bg-stone-700"
          >
            登录并开始实验
          </button>
        </div>
      </main>
    );
  }

  if (!progress) {
    return <main className="min-h-screen bg-stone-100 p-10">正在初始化实验进度...</main>;
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92),transparent_18%),linear-gradient(135deg,#edf3ff_0%,#d9e5f9_42%,#f4eee4_100%)] px-4 py-5 text-stone-900 md:px-8">
      <div className="mx-auto max-w-[1500px]">
        <section className="rounded-[28px] border border-white/60 bg-white/70 px-6 py-5 shadow-xl backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 text-sm text-stone-600">
              <span className="rounded-full bg-white px-4 py-2">被试编号：{participant.id}</span>
              <span className="rounded-full bg-white px-4 py-2">组别：{participant.group}</span>
              <span className="rounded-full bg-white px-4 py-2">场次：{participant.session}</span>
              <span className="rounded-full bg-white px-4 py-2">试卷：{participant.paper}</span>
            </div>
            <button onClick={() => setCurrentUserId(null)} className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700">
              退出登录
            </button>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.84fr_1.16fr]">
          <aside className="space-y-6">
            <section className="rounded-[30px] border border-white/60 bg-white/78 p-6 shadow-xl backdrop-blur">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Flow</p>
              <div className="mt-5 space-y-3">
                {stageLabels.map((label, index) => (
                  <button
                    key={label}
                    onClick={() => persist({ ...progress, currentStage: index })}
                    className={`flex w-full items-center gap-4 rounded-[22px] px-4 py-4 text-left ${progress.currentStage === index ? "bg-stone-900 text-white" : index < progress.currentStage ? "bg-blue-50 text-blue-900" : "bg-stone-50 text-stone-700"}`}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-sm font-medium text-stone-900">{index + 1}</div>
                    <div className="text-sm font-medium">{label}</div>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-[30px] border border-white/60 bg-white/78 p-6 shadow-xl backdrop-blur">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Abnormal Logs</p>
              <div className="mt-4 max-h-72 space-y-3 overflow-auto text-sm leading-6 text-stone-600">
                {progress.abnormalLogs.length ? progress.abnormalLogs.map((item, index) => <div key={`${item}-${index}`} className="rounded-2xl bg-stone-50 p-3">{item}</div>) : <div className="rounded-2xl bg-stone-50 p-4">暂无异常行为记录。</div>}
              </div>
            </section>
          </aside>

          <section className="rounded-[34px] border border-white/60 bg-white/82 p-6 shadow-xl backdrop-blur md:p-8">
            {progress.currentStage === 0 ? (
              <div>
                <h1 className="font-serif text-4xl">知情同意</h1>
                <div className="mt-6 rounded-[28px] bg-stone-50 p-6 text-sm leading-8 text-stone-700">
                  <p>本研究旨在探究人们在人工智能辅助下完成任务的人机互动行为和任务表现。</p>
                  <p>任务环节预计 25 分钟，问卷环节预计 10 分钟，总计约 35 分钟。</p>
                  <p>过程中禁止离开或关闭本页面，异常行为将记录到后台。</p>
                  <p>请勿在任务或 AI 对话中输入任何可识别个人身份信息。</p>
                </div>
                <label className="mt-6 flex items-center gap-3 text-sm text-stone-700">
                  <input type="checkbox" checked={progress.consentAccepted} onChange={(event) => persist({ ...progress, consentAccepted: event.target.checked })} />
                  我已阅读并理解上述说明，自愿参加本次实验。
                </label>
                <button disabled={!progress.consentAccepted} onClick={() => persist({ ...progress, currentStage: 1 })} className="mt-6 rounded-full bg-stone-900 px-8 py-3 text-sm font-medium text-white disabled:opacity-40">
                  进入下一步
                </button>
              </div>
            ) : null}

            {progress.currentStage === 1 ? (
              <div>
                <h1 className="font-serif text-4xl">基本信息与激励说明</h1>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <input value={progress.profile.major} onChange={(event) => persist({ ...progress, profile: { ...progress.profile, major: event.target.value } })} className="rounded-2xl border border-stone-200 bg-white px-4 py-4 outline-none" placeholder="专业" />
                  <input value={progress.profile.grade} onChange={(event) => persist({ ...progress, profile: { ...progress.profile, grade: event.target.value } })} className="rounded-2xl border border-stone-200 bg-white px-4 py-4 outline-none" placeholder="年级" />
                  <input value={progress.profile.gender} onChange={(event) => persist({ ...progress, profile: { ...progress.profile, gender: event.target.value } })} className="rounded-2xl border border-stone-200 bg-white px-4 py-4 outline-none" placeholder="性别" />
                </div>
                <div className="mt-6 rounded-[24px] bg-blue-50 p-5 text-sm leading-7 text-blue-900">
                  <div>当前组别：{group.title}</div>
                  <div className="mt-2">{group.incentiveText}</div>
                  {group.aiEnabled ? <div className="mt-2">{group.aiPenaltyText}</div> : null}
                </div>
                <button onClick={() => persist({ ...progress, currentStage: 2 })} className="mt-6 rounded-full bg-stone-900 px-8 py-3 text-sm font-medium text-white">
                  开始任务一
                </button>
              </div>
            ) : null}

            {progress.currentStage >= 2 && progress.currentStage <= 7 ? (
              progress.currentStage % 2 === 0 ? (
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-stone-500">正式任务 {currentTaskIndex + 1} / 3</p>
                      <h1 className="mt-2 font-serif text-4xl">{currentTask.subtitle}</h1>
                    </div>
                    <div className="rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600">限时 {currentTask.durationMinutes} 分钟</div>
                  </div>
                  <div className="mt-6 rounded-[26px] bg-stone-50 p-6 text-sm leading-7 text-stone-700">
                    <p>{currentTask.instruction}</p>
                    <p className="mt-3">{currentTask.requirement}</p>
                    <p className="mt-3">评分标准：{currentTask.scoring}</p>
                    <p className="mt-3">激励说明：{group.incentiveText}</p>
                  </div>
                  <div className="mt-6 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
                    <div>
                      <div className="rounded-[26px] border border-stone-200 bg-white p-6 text-sm leading-7 text-stone-700">{currentTask.material}</div>
                      <textarea
                        value={currentTaskProgress?.answer ?? ""}
                        onChange={(event) => {
                          const nextTaskProgress = progress.taskProgress.map((item, index) => index === currentTaskIndex ? { ...item, answer: event.target.value } : item);
                          persist({ ...progress, taskProgress: nextTaskProgress });
                        }}
                        className="mt-6 min-h-[320px] w-full rounded-[28px] border border-stone-200 bg-white px-5 py-4 text-sm leading-7 outline-none"
                        placeholder="在这里输入答案。"
                      />
                    </div>
                    <div className="space-y-5">
                      <div className="rounded-[26px] border border-stone-200 bg-white p-5">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-stone-800">AI 互动区</p>
                          <button
                            disabled={!group.aiEnabled}
                            onClick={() => {
                              const nextTaskProgress = progress.taskProgress.map((item, index) => index === currentTaskIndex ? { ...item, usedAi: !item.usedAi } : item);
                              persist({ ...progress, taskProgress: nextTaskProgress });
                            }}
                            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
                          >
                            {currentTaskProgress?.usedAi ? "关闭 AI" : "开启 AI"}
                          </button>
                        </div>
                        <div className="mt-4 min-h-48 space-y-3 rounded-[20px] bg-stone-50 p-4 text-sm leading-6 text-stone-700">
                          {currentTaskProgress?.usedAi ? (
                            currentTaskProgress.aiMessages.length ? (
                              currentTaskProgress.aiMessages.map((message, index) => (
                                <div key={`${message.timestamp}-${index}`} className={`rounded-2xl p-3 ${message.role === "assistant" ? "bg-blue-50" : "bg-white"}`}>
                                  <strong>{message.role === "assistant" ? "AI" : "被试"}：</strong>{message.content}
                                </div>
                              ))
                            ) : <div>已开启 AI，对话会记录在这里。</div>
                          ) : <div>B 组不显示 AI，A 组可按需开启。</div>}
                        </div>
                        {group.aiEnabled && currentTaskProgress?.usedAi ? (
                          <div className="mt-4 flex gap-3">
                            <input value={draftMessage} onChange={(event) => setDraftMessage(event.target.value)} className="flex-1 rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none" placeholder="输入给 AI 的问题" />
                            <button
                              onClick={() => {
                                if (!draftMessage.trim()) return;
                                const nextTaskProgress = progress.taskProgress.map((item, index) =>
                                  index === currentTaskIndex
                                    ? {
                                        ...item,
                                        usedAi: true,
                                        aiMessages: [
                                          ...item.aiMessages,
                                          { role: "user", content: draftMessage.trim(), timestamp: new Date().toISOString() },
                                          { role: "assistant", content: aiReply(currentTask.title), timestamp: new Date().toISOString() },
                                        ],
                                      }
                                    : item
                                );
                                persist({ ...progress, taskProgress: nextTaskProgress });
                                setDraftMessage("");
                              }}
                              className="rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white"
                            >
                              发送
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => persist({ ...progress, currentStage: progress.currentStage + 1 })} className="mt-6 rounded-full bg-stone-900 px-8 py-3 text-sm font-medium text-white">
                    提交本任务并进入反馈
                  </button>
                </div>
              ) : (
                <div>
                  <h1 className="font-serif text-4xl">任务后反馈</h1>
                  <textarea
                    value={currentTaskProgress?.reflection ?? ""}
                    onChange={(event) => {
                      const nextTaskProgress = progress.taskProgress.map((item, index) => index === currentTaskIndex ? { ...item, reflection: event.target.value } : item);
                      persist({ ...progress, taskProgress: nextTaskProgress });
                    }}
                    className="mt-6 min-h-[220px] w-full rounded-[28px] border border-stone-200 bg-white px-5 py-4 text-sm leading-7 outline-none"
                    placeholder="请描述你在刚才任务中的完成体验。"
                  />
                  <button onClick={() => persist({ ...progress, currentStage: progress.currentStage + 1 })} className="mt-6 rounded-full bg-stone-900 px-8 py-3 text-sm font-medium text-white">
                    {currentTaskIndex === 2 ? "进入最终问卷" : "进入下一任务"}
                  </button>
                </div>
              )
            ) : null}

            {progress.currentStage === 8 ? (
              <div>
                <h1 className="font-serif text-4xl">最终问卷</h1>
                <div className="mt-6 space-y-4">
                  <input value={progress.finalSurvey.aiAttitude} onChange={(event) => persist({ ...progress, finalSurvey: { ...progress.finalSurvey, aiAttitude: event.target.value } })} className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-4 outline-none" placeholder="你如何看待在工作中使用 AI？" />
                  <input value={progress.finalSurvey.effort} onChange={(event) => persist({ ...progress, finalSurvey: { ...progress.finalSurvey, effort: event.target.value } })} className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-4 outline-none" placeholder="你觉得自己今天投入程度如何？" />
                  <textarea value={progress.finalSurvey.comments} onChange={(event) => persist({ ...progress, finalSurvey: { ...progress.finalSurvey, comments: event.target.value } })} className="min-h-[220px] w-full rounded-[28px] border border-stone-200 bg-white px-5 py-4 text-sm leading-7 outline-none" placeholder="其他补充意见" />
                </div>
                <button
                  onClick={() => {
                    const submittedAt = new Date().toISOString();
                    const nextProgress = { ...progress, submitted: true, currentStage: 9, updatedAt: submittedAt };
                    submitExperiment({ participantId: participant.id, session: participant.session, group: participant.group, paper: participant.paper, submittedAt, abnormalLogs: nextProgress.abnormalLogs, taskProgress: nextProgress.taskProgress, finalSurvey: nextProgress.finalSurvey }, nextProgress);
                  }}
                  className="mt-6 rounded-full bg-stone-900 px-8 py-3 text-sm font-medium text-white"
                >
                  提交全部实验结果
                </button>
              </div>
            ) : null}

            {progress.currentStage === 9 ? (
              <div>
                <h1 className="font-serif text-4xl">提交成功</h1>
                <div className="mt-6 rounded-[28px] bg-stone-50 p-6 text-sm leading-8 text-stone-700">
                  <p>你的实验数据已经提交。</p>
                  <p>系统已记录任务答案、AI 会话、异常行为与最终问卷。</p>
                  <p>管理员现在可以在后台查看你的状态和导出结果。</p>
                </div>
              </div>
            ) : null}
          </section>
        </section>
      </div>
    </main>
  );
}
