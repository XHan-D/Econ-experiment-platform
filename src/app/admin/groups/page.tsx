import { AdminShell } from "@/app/admin/shell";
import { groupCards } from "@/app/platform-data";

export default function GroupsPage() {
  return (
    <AdminShell
      title="组别与概率"
      description="这里把 A/B × I/II/III 六组作为一级对象管理，不再让你在多个页面里手工拼。下一步接数据库后，这里会支持直接修改随机权重。"
    >
      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {groupCards.map((group) => (
          <article key={group.code} className="rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{group.code}</p>
                <h3 className="mt-3 font-serif text-2xl">{group.title}</h3>
              </div>
              <div className="rounded-full bg-stone-100 px-4 py-2 text-sm font-medium text-stone-700">
                {group.probability}
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-stone-600">{group.note}</p>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
