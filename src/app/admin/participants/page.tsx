"use client";

import { FormEvent, useState } from "react";

import { AdminShell } from "@/app/admin/shell";
import { ParticipantRecord, useAdminStore } from "@/app/admin/use-admin-store";

const blankParticipant: ParticipantRecord = {
  id: "",
  session: "",
  group: "A-I",
  paper: "",
  status: "待开始",
  abnormal: "无",
};

export default function ParticipantsPage() {
  const { store, setParticipants } = useAdminStore();
  const [draft, setDraft] = useState<ParticipantRecord>(blankParticipant);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.id.trim()) return;
    setParticipants([...store.participants, { ...draft, id: draft.id.trim() }]);
    setDraft(blankParticipant);
  }

  function updateParticipant(index: number, patch: Partial<ParticipantRecord>) {
    setParticipants(
      store.participants.map((participant, participantIndex) =>
        participantIndex === index ? { ...participant, ...patch } : participant
      )
    );
  }

  return (
    <AdminShell
      title="被试管理"
      description="现在这页已经能新增和修改被试记录，方便你先验证账号、分组、场次、试卷和状态的管理流程。"
    >
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={handleSubmit} className="rounded-[28px] border border-white/60 bg-white/80 p-7 shadow-lg">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Create Participant</p>
          <div className="mt-5 space-y-4">
            <input
              value={draft.id}
              onChange={(event) => setDraft({ ...draft, id: event.target.value })}
              className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
              placeholder="被试编号"
            />
            <input
              value={draft.session}
              onChange={(event) => setDraft({ ...draft, session: event.target.value })}
              className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
              placeholder="场次"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                value={draft.paper}
                onChange={(event) => setDraft({ ...draft, paper: event.target.value })}
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
                placeholder="试卷"
              />
              <select
                value={draft.group}
                onChange={(event) => setDraft({ ...draft, group: event.target.value })}
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
              >
                <option>A-I</option>
                <option>A-II</option>
                <option>A-III</option>
                <option>B-I</option>
                <option>B-II</option>
                <option>B-III</option>
              </select>
            </div>
          </div>
          <button className="mt-6 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700">
            新增被试
          </button>
        </form>

        <section className="space-y-4">
          {store.participants.map((participant, index) => (
            <article key={`${participant.id}-${index}`} className="rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-lg">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  value={participant.id}
                  onChange={(event) => updateParticipant(index, { id: event.target.value })}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 font-medium outline-none"
                />
                <input
                  value={participant.session}
                  onChange={(event) => updateParticipant(index, { session: event.target.value })}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
                />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <select
                  value={participant.group}
                  onChange={(event) => updateParticipant(index, { group: event.target.value })}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
                >
                  <option>A-I</option>
                  <option>A-II</option>
                  <option>A-III</option>
                  <option>B-I</option>
                  <option>B-II</option>
                  <option>B-III</option>
                </select>
                <input
                  value={participant.paper}
                  onChange={(event) => updateParticipant(index, { paper: event.target.value })}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
                />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <input
                  value={participant.status}
                  onChange={(event) => updateParticipant(index, { status: event.target.value })}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
                />
                <input
                  value={participant.abnormal}
                  onChange={(event) => updateParticipant(index, { abnormal: event.target.value })}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
                />
              </div>
            </article>
          ))}
        </section>
      </div>
    </AdminShell>
  );
}
