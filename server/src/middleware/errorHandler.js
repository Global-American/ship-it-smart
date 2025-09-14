export function errorHandler(err, req, res, next) {
  if (err?.name === "ZodError" || err?.issues) {
    return res
      .status(400)
      .json({ error: "Validation failed", details: err.issues || err.errors });
  }
  console.error(err);
  res.status(500).json({ error: err?.message || "Internal Server Error" });
}
