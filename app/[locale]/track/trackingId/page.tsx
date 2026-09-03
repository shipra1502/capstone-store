async function getShipment(trackingId: string) {
  if (trackingId === "INVALID") return null;
  return {
    trackingId,
    status: "In Transit",
    lastUpdated: new Date().toLocaleString(),
  };
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ trackingId: string }>;
}) {
  const { trackingId } = await params;
  const shipment = await getShipment(trackingId);

  if (!shipment) {
    return <p>Shipment not found</p>;
  }

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold">Tracking: {shipment.trackingId}</h1>
      <p>Status: {shipment.status}</p>
      <p>Last updated: {shipment.lastUpdated}</p>
    </main>
  );
}
