import { getDriverLoadFromDb, ShipmentRow } from "@/lib/shipments";

export default async function DriverLoad({
  label,
  deliveriesLabel,
}: {
  label: string;
  deliveriesLabel: string;
}) {
  const load = await getDriverLoadFromDb();
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        <h2 className="text-sm font-semibold text-[#0B1120]">{label}</h2>
      </div>
      <ul className="space-y-2">
        {load.map((d: ShipmentRow) => (
          <li key={d.driver} className="flex justify-between text-sm">
            <span className="text-[#0B1120]">{d.driver}</span>
            <span className="text-slate-500">
              {d.assigned} {deliveriesLabel}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
