import { notFound } from "next/navigation";
import { getShipment } from "@/lib/shipments";
import type { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ trackingId: string }>;
}): Promise<Metadata> {
  const { trackingId } = await params;
  const shipment = await getShipment(trackingId);

  if (!shipment) {
    return { title: "Shipment Not Found" };
  }

  return {
    title: `Tracking ${shipment.trackingId} — ${shipment.status}`,
    description: `Live status for shipment ${shipment.trackingId}: ${shipment.status}, last updated ${shipment.lastUpdated}`,
  };
}

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
      {shipment.status === "Delivered" && (
        <div className="mt-4">
          <p className="font-semibold mb-2">Proof of delivery:</p>
          <Image
            src={`https://picsum.photos/seed/${shipment.trackingId}/400/300`}
            alt="Proof of delivery photo"
            width={400}
            height={300}
            className="rounded"
          />
        </div>
      )}
    </main>
  );
}
