// lib/shipments.ts
type Shipment = {
  trackingId: string;
  status: string;
  lastUpdated: string;
};

// in-memory store — resets on server restart, fine for now
const shipments = new Map<string, Shipment>([
  [
    "q2132424",
    {
      trackingId: "q2132424",
      status: "In Transit",
      lastUpdated: new Date().toLocaleString(),
    },
  ],
]);

export async function getShipment(
  trackingId: string,
): Promise<Shipment | null> {
  return shipments.get(trackingId) ?? null;
}

export async function updateShipmentStatus(trackingId: string, status: string) {
  const existing = shipments.get(trackingId);
  if (!existing) throw new Error("Shipment not found");
  shipments.set(trackingId, {
    ...existing,
    status,
    lastUpdated: new Date().toLocaleString(),
  });
}
