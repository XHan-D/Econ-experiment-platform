"use client";

import { FormEvent, useState } from "react";

import { AdminShell } from "@/app/admin/shell";
import { SessionRecord, useAdminStore } from "@/app/admin/use-admin-store";

const blankSession: SessionRecord = {
  name: "",
  room: "",
  capacity: "50 人",
  progress: "准备中",
};

export default function SessionsPage() {
  const { store, setSessions } = useAdminStore();
  const [draft, setDraft] = useState<SessionRecord>(blankSession);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.name.trim()) return;
    setSessions([...store.sessions, { ...draft, name: draft.name.trim() }]);
    setDraft(blankSession);
  }

  function updateSession(index: number, patch: Partial<SessionRecord>) {
    setSessions(
      store.sessions.map((session, sessionIndex) =>
        sessionIndex === index ? { ...session, ...patch } : session
      )
    );
  }

  return (
    <AdminShell
      title="场次管理"
      description="现在这页已经可以新增和修改场次。后面接入登录后，每个场次会直接绑定专属入口和在线人数。"
    >
      <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
        <form onSubmit={handleSubmit} className="rounded-[28px] border border-white/60 bg-white/80 p-7 shadow-lg">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Create Session</p>
          <div className="mt-5 space-y-4">
            <input
              value={draft.name}
              onChange={(event) => setDraft({ ...draft, name: event.target.value })}
              className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
              placeholder="例如：2026-04-08 上午场"
            />
            <input
              value={draft.room}
              onChange={(event) => setDraft({ ...draft, room: event.target.value })}
              className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
              placeholder="教室"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                value={draft.capacity}
                onChange={(event) => setDraft({ ...draft, capacity: event.target.value })}
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
                placeholder="容量"
              />
              <select
                value={draft.progress}
                onChange={(event) => setDraft({ ...draft, progress: event.target.value })}
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
              >
                <option>准备中</option>
                <option>待开放</option>
                <option>进行中</option>
                <option>已结束</option>
              </select>
            </div>
          </div>
          <button className="mt-6 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700">
            新增场次
          </button>
        </form>

        <section className="grid gap-5 xl:grid-cols-2">
          {store.sessions.map((session, index) => (
            <article key={`${session.name}-${index}`} className="rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-lg">
              <input
                value={session.name}
                onChange={(event) => updateSession(index, { name: event.target.value })}
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 font-serif text-xl outline-none"
              />
              <div className="mt-4 space-y-4">
                <input
                  value={session.room}
                  onChange={(event) => updateSession(index, { room: event.target.value })}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    value={session.capacity}
                    onChange={(event) => updateSession(index, { capacity: event.target.value })}
                    className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
                  />
                  <select
                    value={session.progress}
                    onChange={(event) => updateSession(index, { progress: event.target.value })}
                    className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
                  >
                    <option>准备中</option>
                    <option>待开放</option>
                    <option>进行中</option>
                    <option>已结束</option>
                  </select>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </AdminShell>
  );
}
