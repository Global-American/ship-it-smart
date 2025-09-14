import { Router } from "express";
import { z } from "zod";
import { sendContactEmail } from "../lib/mailer.js";

const router = Router();

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  company: z.string().optional().default(""),
  message: z.string().min(1),
  selectedBrands: z.array(z.string()).optional().default([]),
});

router.post("/", async (req, res, next) => {
  try {
    const data = contactSchema.parse(req.body);
    await sendContactEmail(data);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
