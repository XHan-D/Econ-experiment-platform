"use client";

import { FormEvent, useState } from "react";

import { AdminShell } from "@/app/admin/shell";
import { ExamRecord, useAdminStore } from "@/app/admin/use-admin-store";

const blankExam: ExamRecord = {
  name: "",
  status: "准备中",
  participants: 0,
  tasks: 3,
  questionnaires: 2,
};

export default function ExamsPage() {
  const { store, setExams } = useAdminStore();
  const [draft, setDraft] = useState<ExamRecord>(blankExam);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.name.trim()) return;
    setExams([...store.exams, { ...draft, name: draft.name.trim() }]);
    setDraft(blankExam);
  }

  function updateExam(index: number, patch: Partial<ExamRecord>) {
    setExams(store.exams.map((exam, examIndex) => (examIndex === index ? { ...exam, ...patch } : exam)));
  }

  function removeExam(index: number) {
    setExams(store.exams.filter((_, examIndex) => examIndex !== index));
  }

  return (
    <AdminShell
      title="考试管理"
      description="现在这页已经可以新增、修改和删除考试配置。当前版本先保存在浏览器本地，后续再直接接数据库。"
    >
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={handleSubmit} className="rounded-[28px] border border-white/60 bg-white/80 p-7 shadow-lg">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Create Exam</p>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-stone-700">实验名称</span>
              <input
                value={draft.name}
                onChange={(event) => setDraft({ ...draft, name: event.target.value })}
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
                placeholder="例如：Economic Incentives, AI, and Labor Productivity"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-stone-700">状态</span>
                <select
                  value={draft.status}
                  onChange={(event) => setDraft({ ...draft, status: event.target.value })}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
                >
                  <option>准备中</option>
                  <option>试运行中</option>
                  <option>已开放</option>
                  <option>已关闭</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-stone-700">预计被试数</span>
                <input
                  type="number"
                  value={draft.participants}
                  onChange={(event) => setDraft({ ...draft, participants: Number(event.target.value) })}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
                />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-stone-700">正式任务数</span>
                <input
                  type="number"
                  value={draft.tasks}
                  onChange={(event) => setDraft({ ...draft, tasks: Number(event.target.value) })}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-stone-700">问卷模块数</span>
                <input
                  type="number"
                  value={draft.questionnaires}
                  onChange={(event) => setDraft({ ...draft, questionnaires: Number(event.target.value) })}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
                />
              </label>
            </div>
          </div>
          <button className="mt-6 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700">
            新增实验
          </button>
        </form>

        <section className="rounded-[28px] border border-white/60 bg-white/80 p-7 shadow-lg">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Editable Exams</p>
          <div className="mt-5 space-y-4">
            {store.exams.map((exam, index) => (
              <article key={`${exam.name}-${index}`} className="rounded-[24px] bg-stone-50 p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone-500">实验名称</span>
                    <input
                      value={exam.name}
                      onChange={(event) => updateExam(index, { name: event.target.value })}
                      className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone-500">状态</span>
                    <select
                      value={exam.status}
                      onChange={(event) => updateExam(index, { status: event.target.value })}
                      className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
                    >
                      <option>准备中</option>
                      <option>试运行中</option>
                      <option>已开放</option>
                      <option>已关闭</option>
                    </select>
                  </label>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone-500">被试数</span>
                    <input
                      type="number"
                      value={exam.participants}
                      onChange={(event) => updateExam(index, { participants: Number(event.target.value) })}
                      className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone-500">任务数</span>
                    <input
                      type="number"
                      value={exam.tasks}
                      onChange={(event) => updateExam(index, { tasks: Number(event.target.value) })}
                      className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone-500">问卷数</span>
                    <input
                      type="number"
                      value={exam.questionnaires}
                      onChange={(event) => updateExam(index, { questionnaires: Number(event.target.value) })}
                      className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
                    />
                  </label>
                </div>
                <button
                  onClick={() => removeExam(index)}
                  className="mt-4 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                >
                  删除
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
