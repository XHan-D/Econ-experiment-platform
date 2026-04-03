"use client";

import { useEffect, useMemo, useState } from "react";

import {
  exams as defaultExams,
  exportSets as defaultExportSets,
  groupCards as defaultGroups,
  papers as defaultPapers,
  participants as defaultParticipants,
  sessions as defaultSessions,
} from "@/app/platform-data";

export type ExamRecord = {
  name: string;
  status: string;
  participants: number;
  tasks: number;
  questionnaires: number;
};

export type GroupRecord = {
  code: string;
  title: string;
  note: string;
  probability: string;
};

export type PaperRecord = {
  title: string;
  sections: string;
  note: string;
};

export type SessionRecord = {
  name: string;
  room: string;
  capacity: string;
  progress: string;
};

export type ParticipantRecord = {
  id: string;
  session: string;
  group: string;
  paper: string;
  status: string;
  abnormal: string;
};

export type ExportRecord = {
  title: string;
  detail: string;
};

export type AdminStore = {
  exams: ExamRecord[];
  groups: GroupRecord[];
  papers: PaperRecord[];
  sessions: SessionRecord[];
  participants: ParticipantRecord[];
  exportSets: ExportRecord[];
};

const STORAGE_KEY = "econ-platform-admin-store-v1";

const defaultStore: AdminStore = {
  exams: defaultExams,
  groups: defaultGroups,
  papers: defaultPapers,
  sessions: defaultSessions,
  participants: defaultParticipants,
  exportSets: defaultExportSets,
};

function readStore(): AdminStore {
  if (typeof window === "undefined") {
    return defaultStore;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultStore;
  }

  try {
    return { ...defaultStore, ...JSON.parse(raw) } as AdminStore;
  } catch {
    return defaultStore;
  }
}

function writeStore(store: AdminStore) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  window.dispatchEvent(new Event("econ-admin-store-updated"));
}

export function useAdminStore() {
  const [store, setStore] = useState<AdminStore>(defaultStore);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setStore(readStore());
      setReady(true);
    };

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("econ-admin-store-updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("econ-admin-store-updated", sync);
    };
  }, []);

  const api = useMemo(
    () => ({
      ready,
      store,
      replace(next: AdminStore) {
        setStore(next);
        writeStore(next);
      },
      reset() {
        setStore(defaultStore);
        writeStore(defaultStore);
      },
      setExams(exams: ExamRecord[]) {
        const next = { ...store, exams };
        setStore(next);
        writeStore(next);
      },
      setGroups(groups: GroupRecord[]) {
        const next = { ...store, groups };
        setStore(next);
        writeStore(next);
      },
      setPapers(papers: PaperRecord[]) {
        const next = { ...store, papers };
        setStore(next);
        writeStore(next);
      },
      setSessions(sessions: SessionRecord[]) {
        const next = { ...store, sessions };
        setStore(next);
        writeStore(next);
      },
      setParticipants(participants: ParticipantRecord[]) {
        const next = { ...store, participants };
        setStore(next);
        writeStore(next);
      },
    }),
    [ready, store]
  );

  return api;
}
