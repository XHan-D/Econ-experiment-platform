import { AdminShell } from "@/app/admin/shell";
import { sessions } from "@/app/platform-data";

export default function SessionsPage() {
  return (
    <AdminShell
      title="场次管理"
      description="场次页承接旧系统里的批次 / 场次配置，同时兼容你线下教室实验的真实组织方式：日期、教室、容量、状态和当前登入情况。"
    >
      <div className="grid gap-5 xl:grid-cols-3">
        {sessions.map((session) => (
          <article key={session.name} className="rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-lg">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{session.progress}</p>
            <h3 className="mt-3 font-serif text-2xl">{session.name}</h3>
            <div className="mt-5 space-y-3 text-sm text-stone-600">
              <div>教室：{session.room}</div>
              <div>容量：{session.capacity}</div>
              <div>登录链接：将与该场次绑定</div>
            </div>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
