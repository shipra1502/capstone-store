async function getDriverLoad() {
  await new Promise((res) => setTimeout(res, 3500));
  return [
    { driver: "Ahmed", assigned: 5 },
    { driver: "Fatima", assigned: 3 },
  ];
}

export default async function DriverLoad() {
  const load = await getDriverLoad();
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        <h2 className="text-sm font-semibold text-[#0B1120]">Driver Load</h2>
      </div>
      <ul className="space-y-2">
        {load.map((d) => (
          <li key={d.driver} className="flex justify-between text-sm">
            <span className="text-[#0B1120]">{d.driver}</span>
            <span className="text-slate-500">{d.assigned} deliveries</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
