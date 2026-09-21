// lib/shipments.ts
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL!);

let initialized = false;
async function ensureTable() {
  if (initialized) return;
  await sql`
    CREATE TABLE IF NOT EXISTS shipments (
      tracking_id TEXT PRIMARY KEY,
      status TEXT NOT NULL,
      last_updated TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`
    INSERT INTO shipments (tracking_id, status)
    VALUES ('q2132424', 'In Transit')
    ON CONFLICT (tracking_id) DO NOTHING
  `;
  initialized = true;
}

type Shipment = {
  trackingId: string;
  status: string;
  lastUpdated: string;
};

export async function getShipment(
  trackingId: string,
): Promise<Shipment | null> {
  await ensureTable();
  const rows = await sql`
    SELECT tracking_id, status, last_updated FROM shipments WHERE tracking_id = ${trackingId}
  `;
  const row = rows[0];
  if (!row) return null;
  return {
    trackingId: row.tracking_id,
    status: row.status,
    lastUpdated: row.last_updated,
  };
}

export async function updateShipmentStatus(trackingId: string, status: string) {
  await ensureTable();
  const result = await sql`
    UPDATE shipments SET status = ${status}, last_updated = now() WHERE tracking_id = ${trackingId}
    RETURNING tracking_id
  `;
  if (result.length === 0) throw new Error("Shipment not found");
}

export async function getActiveShipments() {
  await ensureTable();
  return sql`
    SELECT tracking_id, status FROM shipments
    WHERE status IN ('Order Placed', 'Picked Up', 'In Transit', 'Out for Delivery')
    ORDER BY last_updated DESC
  `;
}

export async function getDelayedShipmentsFromDb() {
  await ensureTable();
  return sql`
    SELECT
      tracking_id,
      status,
      EXTRACT(EPOCH FROM (now() - last_updated)) / 3600 AS hours_since_update
    FROM shipments
    WHERE status = 'Delayed'
    ORDER BY last_updated ASC
  `;
}

export async function getDriverLoadFromDb() {
  await ensureTable();
  return sql`
    SELECT driver, COUNT(*) as assigned
    FROM shipments
    WHERE driver IS NOT NULL
    GROUP BY driver
    ORDER BY assigned DESC
  `;
}

export async function createShipment(
  trackingId: string,
  driver?: string,
): Promise<boolean> {
  await ensureTable();
  const result = await sql`
    INSERT INTO shipments (tracking_id, status, driver)
    VALUES (${trackingId}, 'Order Placed', ${driver || null})
    ON CONFLICT (tracking_id) DO NOTHING
    RETURNING tracking_id
  `;
  return result.length > 0;
}

export async function deleteShipment(trackingId: string) {
  await ensureTable();
  await sql`DELETE FROM shipments WHERE tracking_id = ${trackingId}`;
}
