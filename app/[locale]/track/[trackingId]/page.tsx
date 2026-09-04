import { notFound } from "next/navigation";
import { getShipment } from "@/lib/shipments";

export default async function TrackPage({
  params,
}: {
  params: Promise<{ trackingId: string }>;
}) {
  const { trackingId } = await params;
  const shipment = await getShipment(trackingId);

  if (!shipment) notFound();

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold">Tracking: {shipment.trackingId}</h1>
      <p>Status: {shipment.status}</p>
      <p>Last updated: {shipment.lastUpdated}</p>
    </main>
  );
}
