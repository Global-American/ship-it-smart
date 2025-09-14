import { Router } from "express";
import { z } from "zod";
import { calculateRate } from "../lib/rateCalculator.js";

const router = Router();

const quoteSchema = z.object({
  originPostal: z.string().min(2),
  destinationPostal: z.string().min(2),
  weightKg: z.number().positive(),
  dimensionsCm: z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive(),
  }),
  speed: z.enum(["standard", "express", "overnight"]).default("standard"),
  carrier: z.enum(["ups", "fedex", "usps"]).optional().default("ups"),
});

router.post("/", (req, res, next) => {
  try {
    const input = quoteSchema.parse(req.body);
    const distanceKm =
      Math.min(
        4000,
        Math.abs(
          parseInt(input.originPostal, 10) -
            parseInt(input.destinationPostal, 10)
        ) || 800
      ) * 0.5;
    const volumetricWeight =
      (input.dimensionsCm.length *
        input.dimensionsCm.width *
        input.dimensionsCm.height) /
      5000 /
      2.20462;
    const billableWeight = Math.max(input.weightKg, volumetricWeight);
    const amount = calculateRate({
      weightKg: billableWeight,
      distanceKm,
      speed: input.speed,
      carrier: input.carrier,
    });
    res.json({
      currency: "USD",
      amount,
      breakdown: {
        billableWeightKg: Number(billableWeight.toFixed(2)),
        distanceKm: Math.round(distanceKm),
      },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
