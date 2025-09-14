import { Router } from "express";
import { z } from "zod";
import {
  createShipment,
  getShipment,
  listShipments,
  updateShipmentStatus,
} from "../store.js";

const router = Router();

const createSchema = z.object({
  toName: z.string().min(1),
  toAddress: z.string().min(3),
  toPostal: z.string().min(2),
  fromName: z.string().min(1),
  fromAddress: z.string().min(3),
  fromPostal: z.string().min(2),
  parcel: z.object({
    weightKg: z.number().positive(),
    dimensionsCm: z.object({
      length: z.number().positive(),
      width: z.number().positive(),
      height: z.number().positive(),
    }),
  }),
  carrier: z.enum(["ups", "fedex", "usps"]),
});

router.get("/", (req, res) => {
  res.json({ shipments: listShipments() });
});

router.post("/", (req, res, next) => {
  try {
    const data = createSchema.parse(req.body);
    const shipment = createShipment(data);
    res.status(201).json(shipment);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", (req, res) => {
  const s = getShipment(req.params.id);
  if (!s) return res.status(404).json({ error: "Not found" });
  res.json(s);
});

router.post("/:id/status", (req, res) => {
  const { status } = req.body || {};
  if (!status) return res.status(400).json({ error: "status required" });
  const s = updateShipmentStatus(req.params.id, status);
  if (!s) return res.status(404).json({ error: "Not found" });
  res.json(s);
});

export default router;
