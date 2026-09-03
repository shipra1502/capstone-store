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
    <div className="border rounded p-4">
      <h2 className="font-semibold mb-2">
        🚚 Active Deliveries ({deliveries.length})
      </h2>
      <ul>
        {deliveries.map((d) => (
          <li key={d.id}>
            {d.id} — {d.driver}
          </li>
        ))}
      </ul>
    </div>
  );
}
