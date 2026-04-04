"use client";

import { useEffect, useMemo, useState } from "react";

export type ExamConfig = {
  id: string;
  name: string;
  status: string;
  tasks: number;
  questionnaires: number;
  incentiveNote: string;
};

export type GroupConfig = {
  code: string;
  title: string;
  aiEnabled: boolean;
  incentiveType: "lump_sum" | "piece_rate" | "tournament";
  probability: number;
  aiPenaltyText: string;
  incentiveText: string;
};

export type PaperConfig = {
  id: string;
  title: string;
  sections: string[];
  taskIds: string[];
  note: string;
};

export type SessionConfig = {
  id: string;
  name: string;
  room: string;
  capacity: number;
  status: string;
};

export type ParticipantAccount = {
  id: string;
  password: string;
  name: string;
  session: string;
  group: string;
  paper: string;
  status: string;
};

export type TaskConfig = {
  id: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  instruction: string;
  material: string;
  requirement: string;
  scoring: string;
};

export type AiMessage = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

export type TaskProgress = {
  taskId: string;
  answer: string;
  usedAi: boolean;
  aiMessages: AiMessage[];
  reflection: string;
  startedAt?: string;
  submittedAt?: string;
};

export type ExperimentProgress = {
  participantId: string;
  currentStage: number;
  consentAccepted: boolean;
  profile: {
    major: string;
    grade: string;
    gender: string;
  };
  taskProgress: TaskProgress[];
  finalSurvey: {
    aiAttitude: string;
    effort: string;
    comments: string;
  };
  abnormalLogs: string[];
  submitted: boolean;
  updatedAt: string;
};

export type SubmissionRecord = {
  participantId: string;
  session: string;
  group: string;
  paper: string;
  submittedAt: string;
  abnormalLogs: string[];
  taskProgress: TaskProgress[];
  finalSurvey: ExperimentProgress["finalSurvey"];
};

export type PlatformStore = {
  exams: ExamConfig[];
  groups: GroupConfig[];
  papers: PaperConfig[];
  sessions: SessionConfig[];
  participants: ParticipantAccount[];
  tasks: TaskConfig[];
  progress: ExperimentProgress[];
  submissions: SubmissionRecord[];
};

const STORAGE_KEY = "econ-platform-store-v2";

const seedStore: PlatformStore = {
  exams: [
    {
      id: "exam-main",
      name: "Economic Incentives, AI, and Labor Productivity",
      status: "试运行中",
      tasks: 3,
      questionnaires: 2,
      incentiveNote: "A/B × I/II/III 六组，任务内 AI 受控接入。",
    },
  ],
  groups: [
    {
      code: "A-I",
      title: "AI + Lump-sum",
      aiEnabled: true,
      incentiveType: "lump_sum",
      probability: 16.7,
      aiPenaltyText: "若本任务中与 AI 对话，本任务附加奖励减少 0.25 元。",
      incentiveText: "达到最低标准即可获得固定额度酬金。",
    },
    {
      code: "A-II",
      title: "AI + Piece-rate",
      aiEnabled: true,
      incentiveType: "piece_rate",
      probability: 16.7,
      aiPenaltyText: "若本任务中与 AI 对话，本任务附加奖励减少 0.25 元。",
      incentiveText: "任务表现越好，酬金越高，并根据用时乘以相应系数。",
    },
    {
      code: "A-III",
      title: "AI + Tournament",
      aiEnabled: true,
      incentiveType: "tournament",
      probability: 16.7,
      aiPenaltyText: "若本任务中与 AI 对话，本任务附加奖励减少 0.25 元。",
      incentiveText: "按 10 人组内相对排名决定奖金和时间系数。",
    },
    {
      code: "B-I",
      title: "No AI + Lump-sum",
      aiEnabled: false,
      incentiveType: "lump_sum",
      probability: 16.7,
      aiPenaltyText: "",
      incentiveText: "达到最低标准即可获得固定额度酬金。",
    },
    {
      code: "B-II",
      title: "No AI + Piece-rate",
      aiEnabled: false,
      incentiveType: "piece_rate",
      probability: 16.7,
      aiPenaltyText: "",
      incentiveText: "任务表现越好，酬金越高，并根据用时乘以相应系数。",
    },
    {
      code: "B-III",
      title: "No AI + Tournament",
      aiEnabled: false,
      incentiveType: "tournament",
      probability: 16.7,
      aiPenaltyText: "",
      incentiveText: "按 10 人组内相对排名决定奖金和时间系数。",
    },
  ],
  papers: [
    {
      id: "paper-main",
      title: "主实验试卷 v2.1",
      sections: ["知情同意", "基本信息", "激励说明", "任务 1-3", "任务后反馈", "最终问卷"],
      taskIds: ["task-1", "task-2", "task-3"],
      note: "正式实验主试卷。",
    },
  ],
  sessions: [
    { id: "session-am", name: "2026-04-06 上午场", room: "301 教室", capacity: 50, status: "准备中" },
    { id: "session-pm", name: "2026-04-06 下午场", room: "302 教室", capacity: 50, status: "待开放" },
  ],
  participants: [
    { id: "p001", password: "123456", name: "演示被试 1", session: "2026-04-06 上午场", group: "A-II", paper: "主实验试卷 v2.1", status: "待开始" },
    { id: "p002", password: "123456", name: "演示被试 2", session: "2026-04-06 上午场", group: "B-I", paper: "主实验试卷 v2.1", status: "待开始" },
    { id: "admin-demo", password: "admin123", name: "系统演示账号", session: "2026-04-06 上午场", group: "A-I", paper: "主实验试卷 v2.1", status: "待开始" },
  ],
  tasks: [
    {
      id: "task-1",
      title: "Manuscript Correction and Editing",
      subtitle: "新闻稿修改任务",
      durationMinutes: 10,
      instruction: "你的角色是北京市某中学官方微信公众号新闻稿编辑。请审阅活动新闻初稿，并修改为可发布的正式新闻稿。",
      material:
        "2025 年 7 月 8 日上午，北京市某中学报告厅内气氛热烈，一场以“The Greatest Challenge Faceing My Generation”为主题的英语演讲比赛在此举行……",
      requirement: "不少于 500 字；人名、地名、剧名等关键信息不得缺漏。",
      scoring: "硬性错误改正 80 分；文段写作水平 20 分。",
    },
    {
      id: "task-2",
      title: "Multi-item Review Task",
      subtitle: "多题审核任务",
      durationMinutes: 8,
      instruction: "请逐条判断若干项目材料中的问题并作出修改建议。",
      material: "本任务将包含多条短材料，要求你在限定时间内快速完成判断与修改。",
      requirement: "逐题作答，每题提交后自动进入下一题。",
      scoring: "正确率和完成速度共同决定表现。",
    },
    {
      id: "task-3",
      title: "Open-ended Productivity Task",
      subtitle: "开放式生产力任务",
      durationMinutes: 10,
      instruction: "围绕给定主题完成一份结构完整、语言清晰的文字材料。",
      material: "请根据任务主题写出一份可直接使用的成果稿件。",
      requirement: "注意逻辑清晰、结构完整、语言规范。",
      scoring: "内容质量、结构和语言表达共同决定得分。",
    },
  ],
  progress: [],
  submissions: [],
};

function readStore(): PlatformStore {
  if (typeof window === "undefined") return seedStore;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return seedStore;
  try {
    return { ...seedStore, ...JSON.parse(raw) } as PlatformStore;
  } catch {
    return seedStore;
  }
}

function writeStore(next: PlatformStore) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("econ-platform-store-updated"));
}

function createEmptyProgress(participantId: string, taskIds: string[]): ExperimentProgress {
  return {
    participantId,
    currentStage: 0,
    consentAccepted: false,
    profile: { major: "", grade: "", gender: "" },
    taskProgress: taskIds.map((taskId) => ({
      taskId,
      answer: "",
      usedAi: false,
      aiMessages: [],
      reflection: "",
    })),
    finalSurvey: { aiAttitude: "", effort: "", comments: "" },
    abnormalLogs: [],
    submitted: false,
    updatedAt: new Date().toISOString(),
  };
}

export function usePlatformStore() {
  const [store, setStore] = useState<PlatformStore>(seedStore);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setStore(readStore());
      setReady(true);
    };
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("econ-platform-store-updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("econ-platform-store-updated", sync);
    };
  }, []);

  return useMemo(
    () => ({
      ready,
      store,
      reset() {
        setStore(seedStore);
        writeStore(seedStore);
      },
      replace(next: PlatformStore) {
        setStore(next);
        writeStore(next);
      },
      update<K extends keyof PlatformStore>(key: K, value: PlatformStore[K]) {
        const next = { ...store, [key]: value };
        setStore(next);
        writeStore(next);
      },
      ensureProgress(participantId: string, taskIds: string[]) {
        const existing = store.progress.find((item) => item.participantId === participantId);
        if (existing) return existing;
        const created = createEmptyProgress(participantId, taskIds);
        const next = { ...store, progress: [...store.progress, created] };
        setStore(next);
        writeStore(next);
        return created;
      },
      saveProgress(nextProgress: ExperimentProgress) {
        const next = {
          ...store,
          progress: store.progress.some((item) => item.participantId === nextProgress.participantId)
            ? store.progress.map((item) => (item.participantId === nextProgress.participantId ? nextProgress : item))
            : [...store.progress, nextProgress],
        };
        setStore(next);
        writeStore(next);
      },
      submitExperiment(submission: SubmissionRecord, progress: ExperimentProgress) {
        const nextParticipants = store.participants.map((participant) =>
          participant.id === submission.participantId ? { ...participant, status: "已完成" } : participant
        );
        const nextProgress = store.progress.some((item) => item.participantId === progress.participantId)
          ? store.progress.map((item) => (item.participantId === progress.participantId ? progress : item))
          : [...store.progress, progress];
        const nextSubmissions = [
          ...store.submissions.filter((item) => item.participantId !== submission.participantId),
          submission,
        ];
        const next = {
          ...store,
          participants: nextParticipants,
          progress: nextProgress,
          submissions: nextSubmissions,
        };
        setStore(next);
        writeStore(next);
      },
    }),
    [ready, store]
  );
}
