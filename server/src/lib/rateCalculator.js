export function calculateRate({ weightKg, distanceKm, speed, carrier }) {
  const base = 5; // base fee
  const weightFactor = Math.max(0.5, weightKg) * 0.8;
  const distanceFactor = Math.max(1, distanceKm / 100) * 1.2;
  const speedMultiplier =
    speed === "express" ? 2 : speed === "overnight" ? 3 : 1;
  const carrierAdj =
    carrier === "fedex"
      ? 1.05
      : carrier === "ups"
      ? 1.0
      : carrier === "usps"
      ? 0.95
      : 1;
  const price =
    (base + weightFactor + distanceFactor) * speedMultiplier * carrierAdj;
  return Number(price.toFixed(2));
}
