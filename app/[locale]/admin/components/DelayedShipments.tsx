import Link from "next/link";
import { getDelayedShipmentsFromDb, ShipmentRow } from "@/lib/shipments";

export default async function DelayedShipments({
  label,
  hoursDelayedLabel,
}: {
  label: string;
  hoursDelayedLabel: string;
}) {
  const delayed = await getDelayedShipmentsFromDb();
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-red-500" />
        <h2 className="text-sm font-semibold text-[#0B1120]">{label}</h2>
        <span className="ml-auto text-2xl font-bold text-red-600">
          {delayed.length}
        </span>
      </div>
      <ul className="space-y-1">
        {delayed.map((d: ShipmentRow) => (
          <li key={d.tracking_id}>
            <Link
              href={`/admin/shipments/${d.tracking_id}`}
              className="group flex items-center justify-between text-sm border border-transparent hover:border-slate-200 hover:bg-slate-50 -mx-2 px-2 py-2 rounded-lg transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="text-slate-500 font-mono">
                  {d.tracking_id}
                </span>
                <span className="text-[#0B1120]">
                  {Math.round(d.hours_since_update ?? 0)}
                  {hoursDelayedLabel}
                </span>
              </span>
              <span className="text-slate-300 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
