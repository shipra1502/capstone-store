// lib/shipments.ts
import fs from "fs/promises";
import path from "path";

type Shipment = {
  trackingId: string;
  status: string;
  lastUpdated: string;
};

const DATA_FILE = path.join(process.cwd(), "data", "shipments.json");

async function readStore(): Promise<Record<string, Shipment>> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {
      q2132424: {
        trackingId: "q2132424",
        status: "In Transit",
        lastUpdated: new Date().toLocaleString(),
      },
    };
  }
}

async function writeStore(data: Record<string, Shipment>) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function getShipment(
  trackingId: string,
): Promise<Shipment | null> {
  const store = await readStore();
  return store[trackingId] ?? null;
}

export async function updateShipmentStatus(trackingId: string, status: string) {
  const store = await readStore();
  if (!store[trackingId]) throw new Error("Shipment not found");
  store[trackingId] = {
    ...store[trackingId],
    status,
    lastUpdated: new Date().toLocaleString(),
  };
  await writeStore(store);
}
