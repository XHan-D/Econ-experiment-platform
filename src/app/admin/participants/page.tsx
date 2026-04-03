import { AdminShell } from "@/app/admin/shell";
import { participants } from "@/app/platform-data";

export default function ParticipantsPage() {
  return (
    <AdminShell
      title="被试管理"
      description="创建账号、绑定场次、分组、试卷、查看状态和异常行为，都集中在这里。目标是比旧系统少一步跳转、少一层重复配置。"
    >
      <div className="overflow-hidden rounded-[28px] border border-white/60 bg-white/85 shadow-lg">
        <div className="grid grid-cols-[1.4fr_1.2fr_0.8fr_1.2fr_1fr_0.9fr] gap-4 border-b border-stone-200 bg-stone-50 px-6 py-4 text-xs uppercase tracking-[0.22em] text-stone-500">
          <div>被试 ID</div>
          <div>场次</div>
          <div>组别</div>
          <div>试卷</div>
          <div>状态</div>
          <div>异常记录</div>
        </div>
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="grid grid-cols-[1.4fr_1.2fr_0.8fr_1.2fr_1fr_0.9fr] gap-4 border-b border-stone-100 px-6 py-5 text-sm text-stone-700 last:border-b-0"
          >
            <div className="font-medium text-stone-900">{participant.id}</div>
            <div>{participant.session}</div>
            <div>{participant.group}</div>
            <div>{participant.paper}</div>
            <div>{participant.status}</div>
            <div>{participant.abnormal}</div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
