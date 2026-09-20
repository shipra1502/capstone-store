// admin/components/ShipmentManager.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ShipmentManager({
  createAction,
}: {
  createAction: (formData: FormData) => void;
}) {
  const [tab, setTab] = useState<"search" | "create">("search");
  const router = useRouter();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const trackingId = formData.get("trackingId");
    if (trackingId) router.push(`/admin/shipments/${trackingId}`);
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-6 overflow-hidden">
      <div className="flex border-b border-slate-100">
        <button
          onClick={() => setTab("search")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            tab === "search"
              ? "text-[#0B1120] border-b-2 border-amber-400"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Update Shipment
        </button>
        <button
          onClick={() => setTab("create")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            tab === "create"
              ? "text-[#0B1120] border-b-2 border-amber-400"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Create Shipment
        </button>
      </div>

      <div className="p-5">
        {tab === "search" ? (
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              name="trackingId"
              placeholder="Enter tracking ID to update"
              className="flex-1 px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-[#0B1120] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="bg-[#0B1120] hover:bg-[#1a2332] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              Find
            </button>
          </form>
        ) : (
          <form action={createAction} className="flex gap-2">
            <input
              name="trackingId"
              placeholder="Tracking ID"
              required
              className="flex-1 px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-[#0B1120] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <input
              name="driver"
              placeholder="Driver (optional)"
              className="flex-1 px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-[#0B1120] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-300 text-[#0B1120] font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
            >
              + Create
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
