async function getActiveDeliveries() {
  await new Promise((res) => setTimeout(res, 500));
  return [
    { id: "SHP-101", driver: "Ahmed" },
    { id: "SHP-102", driver: "Fatima" },
  ];
}

export default async function ActiveDeliveries() {
  const deliveries = await getActiveDeliveries();
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-blue-500" />
        <h2 className="text-sm font-semibold text-[#0B1120]">
          Active Deliveries
        </h2>
        <span className="ml-auto text-2xl font-bold text-[#0B1120]">
          {deliveries.length}
        </span>
      </div>
      <ul className="space-y-2">
        {deliveries.map((d) => (
          <li key={d.id} className="flex justify-between text-sm">
            <span className="text-slate-500 font-mono">{d.id}</span>
            <span className="text-[#0B1120]">{d.driver}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
