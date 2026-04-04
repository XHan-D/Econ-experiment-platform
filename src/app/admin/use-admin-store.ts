"use client";

import { useMemo } from "react";

import { usePlatformStore } from "@/app/use-platform-store";

export type ExamRecord = {
  id?: string;
  name: string;
  status: string;
  participants: number;
  tasks: number;
  questionnaires: number;
  incentiveNote?: string;
};
export type GroupRecord = {
  code: string;
  title: string;
  note: string;
  probability: string;
};
export type PaperRecord = {
  id?: string;
  title: string;
  sections: string;
  note: string;
};
export type SessionRecord = {
  id?: string;
  name: string;
  room: string;
  capacity: string;
  progress: string;
};
export type ParticipantRecord = {
  id: string;
  password: string;
  name: string;
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

export function useAdminStore() {
  const platform = usePlatformStore();

  return useMemo(
    () => ({
      ready: platform.ready,
      store: {
        exams: platform.store.exams,
        groups: platform.store.groups.map((item) => ({
          code: item.code,
          title: item.title,
          note: item.incentiveText || item.aiPenaltyText,
          probability: String(item.probability),
        })),
        papers: platform.store.papers.map((item) => ({
          id: item.id,
          title: item.title,
          sections: item.sections.join(" / "),
          note: item.note,
        })),
        sessions: platform.store.sessions.map((item) => ({
          id: item.id,
          name: item.name,
          room: item.room,
          capacity: `${item.capacity} 人`,
          progress: item.status,
        })),
        participants: platform.store.participants.map((item) => ({
          id: item.id,
          password: item.password,
          name: item.name,
          session: item.session,
          group: item.group,
          paper: item.paper,
          status: item.status,
          abnormal:
            platform.store.progress.find((progress) => progress.participantId === item.id)?.abnormalLogs
              .slice(-1)[0] ?? "无",
        })),
        exportSets: [
          {
            title: "完整平台数据",
            detail: "包含后台配置、被试进度、任务答案、AI 会话、异常行为和最终提交。",
          },
        ],
        submissions: platform.store.submissions,
      },
      reset: platform.reset,
      setExams(exams: ExamRecord[]) {
        platform.update(
          "exams",
          exams.map((item, index) => ({
            id: item.id ?? platform.store.exams[index]?.id ?? `exam-${index + 1}`,
            name: item.name,
            status: item.status,
            participants: item.participants,
            tasks: item.tasks,
            questionnaires: item.questionnaires,
            incentiveNote: item.incentiveNote ?? platform.store.exams[index]?.incentiveNote ?? "",
          }))
        );
      },
      setGroups(groups: GroupRecord[]) {
        platform.update(
          "groups",
          groups.map((item, index) => ({
            ...platform.store.groups[index],
            code: item.code,
            title: item.title,
            incentiveText: item.note,
            probability: Number(item.probability) || 0,
          }))
        );
      },
      setPapers(papers: PaperRecord[]) {
        platform.update(
          "papers",
          papers.map((item, index) => ({
            id: item.id ?? platform.store.papers[index]?.id ?? `paper-${index + 1}`,
            title: item.title,
            sections: item.sections
              .split("/")
              .map((section) => section.trim())
              .filter(Boolean),
            taskIds: platform.store.papers[index]?.taskIds ?? ["task-1", "task-2", "task-3"],
            note: item.note,
          }))
        );
      },
      setSessions(sessions: SessionRecord[]) {
        platform.update(
          "sessions",
          sessions.map((item, index) => ({
            id: item.id ?? platform.store.sessions[index]?.id ?? `session-${index + 1}`,
            name: item.name,
            room: item.room,
            capacity: Number(String(item.capacity).replace(/\D/g, "")) || 0,
            status: item.progress,
          }))
        );
      },
      setParticipants(participants: ParticipantRecord[]) {
        platform.update(
          "participants",
          participants.map((item) => ({
            id: item.id,
            password: item.password,
            name: item.name || item.id,
            session: item.session,
            group: item.group,
            paper: item.paper,
            status: item.status,
          }))
        );
      },
    }),
    [platform]
  );
}
