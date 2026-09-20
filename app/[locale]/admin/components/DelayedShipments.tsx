import { getDelayedShipmentsFromDb } from "@/lib/shipments";

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
      <ul className="space-y-2">
        {delayed.map((d: any) => (
          <li key={d.tracking_id} className="flex justify-between text-sm">
            <span className="text-slate-500 font-mono">{d.tracking_id}</span>
            <span className="text-[#0B1120]">
              {Math.round(d.hours_since_update)}
              {hoursDelayedLabel}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
