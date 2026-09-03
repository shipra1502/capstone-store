async function getDelayedShipments() {
  await new Promise((res) => setTimeout(res, 2000));
  return [{ id: "SHP-089", delayHours: 4 }];
}

export default async function DelayedShipments() {
  const delayed = await getDelayedShipments();
  return (
    <div className="border rounded p-4">
      <h2 className="font-semibold mb-2">
        ⚠️ Delayed Shipments ({delayed.length})
      </h2>
      <ul>
        {delayed.map((d) => (
          <li key={d.id}>
            {d.id} — {d.delayHours}h delayed
          </li>
        ))}
      </ul>
    </div>
  );
}
