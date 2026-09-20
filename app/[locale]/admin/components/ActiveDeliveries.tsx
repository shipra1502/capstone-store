// admin/components/ActiveDeliveries.tsx
import { getActiveShipments } from "@/lib/shipments";

export default async function ActiveDeliveries({ label }: { label: string }) {
  const deliveries = await getActiveShipments();
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-blue-500" />
        <h2 className="text-sm font-semibold text-[#0B1120]">{label}</h2>
        <span className="ml-auto text-2xl font-bold text-[#0B1120]">
          {deliveries.length}
        </span>
      </div>
      <ul className="space-y-2">
        {deliveries.map((d: any) => (
          <li key={d.tracking_id} className="flex justify-between text-sm">
            <span className="text-slate-500 font-mono">{d.tracking_id}</span>
            <span className="text-[#0B1120]">{d.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
