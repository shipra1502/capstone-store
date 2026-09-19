"use client";
import { useRouter } from "next/navigation";

export function ShipmentSearch() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const trackingId = formData.get("trackingId");
    if (trackingId) router.push(`/admin/shipments/${trackingId}`);
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm mb-6">
      <h2 className="text-sm font-semibold text-[#0B1120] mb-3">
        Update a Shipment
      </h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          name="trackingId"
          placeholder="Enter tracking ID"
          className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm text-[#0B1120] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <button
          type="submit"
          className="bg-amber-400 hover:bg-amber-300 text-[#0B1120] font-semibold text-sm px-4 py-2 rounded-lg transition-colors hover:cursor-pointer"
        >
          Go
        </button>
      </form>
    </div>
  );
}
