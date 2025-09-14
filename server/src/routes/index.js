import { Router } from "express";
import health from "./health.js";
import carriers from "./carriers.js";
import quotes from "./quotes.js";
import shipments from "./shipments.js";
import contact from "./contact.js";

const router = Router();

router.use("/health", health);
router.use("/carriers", carriers);
router.use("/quotes", quotes);
router.use("/shipments", shipments);
router.use("/contact", contact);

export default router;
