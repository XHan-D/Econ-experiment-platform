export type AdminNavItem = {
  href: string;
  label: string;
  description: string;
};

export const adminNav: AdminNavItem[] = [
  { href: "/admin", label: "总览", description: "查看实验配置、完成情况与关键提醒。" },
  { href: "/admin/exams", label: "考试管理", description: "配置实验轮次、任务结构、奖励说明与页面文案。" },
  { href: "/admin/groups", label: "组别与概率", description: "维护 A/B × I/II/III 六组和随机分配权重。" },
  { href: "/admin/papers", label: "试卷与题目", description: "组织问卷、任务、操纵检验与题目模板。" },
  { href: "/admin/sessions", label: "场次管理", description: "管理日期、教室、实验状态与现场容量。" },
  { href: "/admin/participants", label: "被试管理", description: "账号、分组、进度、异常行为和作答状态。" },
  { href: "/admin/exports", label: "导出中心", description: "导出作答、AI 日志、行为记录与酬金汇总。" },
];

export const groupCards = [
  { code: "A-I", title: "AI + Lump-sum", note: "可选择使用 AI，达到最低标准拿固定酬金。", probability: "16.7%" },
  { code: "A-II", title: "AI + Piece-rate", note: "可选择使用 AI，质量与效率共同决定酬金。", probability: "16.7%" },
  { code: "A-III", title: "AI + Tournament", note: "可选择使用 AI，组内相对排名决定酬金。", probability: "16.7%" },
  { code: "B-I", title: "No AI + Lump-sum", note: "不展示 AI 区域，固定标准激励。", probability: "16.7%" },
  { code: "B-II", title: "No AI + Piece-rate", note: "不展示 AI 区域，表现越好酬金越高。", probability: "16.7%" },
  { code: "B-III", title: "No AI + Tournament", note: "不展示 AI 区域，按小组相对排名计酬。", probability: "16.7%" },
];

export const exams = [
  { name: "Economic Incentives, AI, and Labor Productivity", status: "试运行中", participants: 128, tasks: 3, questionnaires: 2 },
];

export const sessions = [
  { name: "2026-04-06 上午场", room: "301 教室", capacity: "50 人", progress: "准备中" },
  { name: "2026-04-06 下午场", room: "302 教室", capacity: "50 人", progress: "待开放" },
  { name: "2026-04-07 晚场", room: "理教 204", capacity: "60 人", progress: "待开放" },
];

export const papers = [
  { title: "主实验试卷 v2.1", sections: "知情同意 / 激励说明 / 三个任务 / 任务后反馈 / 终问卷", note: "面向正式场次，支持 A/B × I/II/III 六组。" },
  { title: "AI 预热试卷", sections: "AI 预热 / 体验说明 / 正式任务入口", note: "仅用于培训被试理解 AI 界面，不计正式奖金。" },
];

export const participants = [
  { id: "P20260406001", session: "2026-04-06 上午场", group: "A-II", paper: "主实验试卷 v2.1", status: "任务二进行中", abnormal: "切屏 1 次" },
  { id: "P20260406002", session: "2026-04-06 上午场", group: "B-I", paper: "主实验试卷 v2.1", status: "已完成", abnormal: "无" },
  { id: "P20260406003", session: "2026-04-06 下午场", group: "A-III", paper: "AI 预热试卷", status: "待开始", abnormal: "无" },
];

export const exportSets = [
  { title: "作答数据", detail: "含每题回答、提交时间、模块完成时长、任务得分字段。" },
  { title: "AI 互动日志", detail: "含会话内容、轮次、时间戳、是否调用 AI 与模型字段。" },
  { title: "异常行为记录", detail: "含切屏、最小化、重新进入页面和系统提示记录。" },
  { title: "酬金汇总", detail: "基础报酬、附加酬金、AI 使用扣减与交通补贴汇总。" },
];

export const participantStages = [
  "知情同意",
  "基本信息",
  "激励说明",
  "任务一",
  "任务一反馈",
  "任务二",
  "任务二反馈",
  "任务三",
  "任务三反馈",
  "最终问卷",
];

export const taskOverview = [
  { title: "任务一 Manuscript Correction and Editing", reward: "根据 I / II / III 组显示固定门槛、分段绩效或小组排名奖励规则。" },
  { title: "任务二 Multi-item Decision Task", reward: "倒计时内完成多题作答，可按题级别记录 AI 使用情况。" },
  { title: "任务三 Open-ended Productivity Task", reward: "记录答案、AI 日志、用时与异常行为，为后续评分导出做准备。" },
];
