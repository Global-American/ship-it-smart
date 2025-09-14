const shipments = new Map();

export function createShipment(data) {
  const id = `shp_${Math.random().toString(36).slice(2, 10)}`;
  const now = new Date().toISOString();
  const record = {
    id,
    status: "created",
    createdAt: now,
    updatedAt: now,
    events: [{ at: now, status: "created" }],
    ...data,
  };
  shipments.set(id, record);
  return record;
}

export function getShipment(id) {
  return shipments.get(id) || null;
}

export function updateShipmentStatus(id, status) {
  const s = shipments.get(id);
  if (!s) return null;
  const now = new Date().toISOString();
  s.status = status;
  s.updatedAt = now;
  s.events.push({ at: now, status });
  shipments.set(id, s);
  return s;
}

export function listShipments() {
  return Array.from(shipments.values());
}
