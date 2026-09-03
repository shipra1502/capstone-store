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
    <div className="border rounded p-4">
      <h2 className="font-semibold mb-2">📦 Driver Load</h2>
      <ul>
        {load.map((d) => (
          <li key={d.driver}>
            {d.driver} — {d.assigned} deliveries
          </li>
        ))}
      </ul>
    </div>
  );
}
