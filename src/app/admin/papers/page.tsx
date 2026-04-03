"use client";

import { FormEvent, useState } from "react";

import { AdminShell } from "@/app/admin/shell";
import { PaperRecord, useAdminStore } from "@/app/admin/use-admin-store";

const blankPaper: PaperRecord = {
  title: "",
  sections: "",
  note: "",
};

export default function PapersPage() {
  const { store, setPapers } = useAdminStore();
  const [draft, setDraft] = useState<PaperRecord>(blankPaper);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.title.trim()) return;
    setPapers([...store.papers, { ...draft, title: draft.title.trim() }]);
    setDraft(blankPaper);
  }

  function updatePaper(index: number, patch: Partial<PaperRecord>) {
    setPapers(store.papers.map((paper, paperIndex) => (paperIndex === index ? { ...paper, ...patch } : paper)));
  }

  function removePaper(index: number) {
    setPapers(store.papers.filter((_, paperIndex) => paperIndex !== index));
  }

  return (
    <AdminShell
      title="试卷与题目"
      description="现在这页已经能直接新增和修改试卷。下一步我会把每张试卷继续细化到题目级配置。"
    >
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={handleSubmit} className="rounded-[28px] border border-white/60 bg-white/80 p-7 shadow-lg">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Create Paper</p>
          <div className="mt-5 space-y-4">
            <input
              value={draft.title}
              onChange={(event) => setDraft({ ...draft, title: event.target.value })}
              className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
              placeholder="试卷名称"
            />
            <textarea
              value={draft.sections}
              onChange={(event) => setDraft({ ...draft, sections: event.target.value })}
              className="min-h-28 w-full rounded-[22px] border border-stone-200 bg-white px-4 py-3 outline-none"
              placeholder="模块结构，例如：知情同意 / 激励说明 / 三个任务 / 终问卷"
            />
            <textarea
              value={draft.note}
              onChange={(event) => setDraft({ ...draft, note: event.target.value })}
              className="min-h-24 w-full rounded-[22px] border border-stone-200 bg-white px-4 py-3 outline-none"
              placeholder="备注"
            />
          </div>
          <button className="mt-6 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700">
            新增试卷
          </button>
        </form>

        <section className="rounded-[28px] border border-white/60 bg-white/80 p-7 shadow-lg">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Editable Papers</p>
          <div className="mt-5 space-y-4">
            {store.papers.map((paper, index) => (
              <article key={`${paper.title}-${index}`} className="rounded-[24px] bg-stone-50 p-5">
                <input
                  value={paper.title}
                  onChange={(event) => updatePaper(index, { title: event.target.value })}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 font-serif text-xl outline-none"
                />
                <textarea
                  value={paper.sections}
                  onChange={(event) => updatePaper(index, { sections: event.target.value })}
                  className="mt-4 min-h-24 w-full rounded-[22px] border border-stone-200 bg-white px-4 py-3 text-sm outline-none"
                />
                <textarea
                  value={paper.note}
                  onChange={(event) => updatePaper(index, { note: event.target.value })}
                  className="mt-4 min-h-20 w-full rounded-[22px] border border-stone-200 bg-white px-4 py-3 text-sm outline-none"
                />
                <button
                  onClick={() => removePaper(index)}
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
