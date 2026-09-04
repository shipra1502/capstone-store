import { getShipment } from "@/lib/shipments";
import { updateStatus } from "./actions";

export default async function AdminShipmentPage({
  params,
}: {
  params: Promise<{ trackingId: string }>;
}) {
  const { trackingId } = await params;
  const shipment = await getShipment(trackingId);

  if (!shipment) return <p className="p-8">Shipment not found</p>;

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold mb-4">Update: {shipment.trackingId}</h1>
      <p className="mb-2">Current status: {shipment.status}</p>

      <form action={updateStatus.bind(null, trackingId)} className="flex gap-2">
        <select name="status" className="border px-3 py-2 rounded">
          <option>In Transit</option>
          <option>Out for Delivery</option>
          <option>Delivered</option>
          <option>Delayed</option>
        </select>
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Update Status
        </button>
      </form>
    </main>
  );
}
