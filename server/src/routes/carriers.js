import { Router } from "express";

const router = Router();

const carriers = [
  {
    id: "ups",
    name: "UPS",
    services: ["Ground", "2nd Day Air", "Next Day Air"],
  },
  {
    id: "fedex",
    name: "FedEx",
    services: ["Ground", "Express Saver", "2Day", "Overnight"],
  },
  {
    id: "usps",
    name: "USPS",
    services: ["Priority Mail", "First-Class", "Express Mail"],
  },
];

router.get("/", (req, res) => {
  res.json({ carriers });
});

export default router;
