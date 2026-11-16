import { NextRequest, NextResponse } from "next/server";

const DEFAULT_BILLING_API_BASE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8090"
    : "https://app.itsmartbilling.com";

const BILLING_API_BASE =
  process.env.BILLING_API_BASE || DEFAULT_BILLING_API_BASE;

const BILLING_BOOKING_DOCUMENTS_ENDPOINT =
  process.env.BILLING_BOOKING_DOCUMENTS_ENDPOINT ||
  "/api/public/ship-it-smart/bookings/documents";

const BILLING_BOOKINGS_SECRET =
  process.env.BILLING_BOOKINGS_SECRET || process.env.BILLING_QUOTES_SECRET || "";

export async function POST(req: NextRequest) {
  let incoming: FormData;
  try {
    incoming = await req.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_form", message: "Invalid request body." },
      { status: 400 },
    );
  }

  const token = incoming.get("token");
  if (typeof token !== "string" || !token) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation_error",
        message: "Missing upload token.",
      },
      { status: 400 },
    );
  }

  const files = incoming
    .getAll("documents")
    .filter((entry): entry is File => entry instanceof File);
  if (files.length === 0) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation_error",
        message: "Attach at least one document.",
      },
      { status: 400 },
    );
  }

  const outgoing = new FormData();
  outgoing.append("token", token);
  for (const file of files) {
    outgoing.append("Documents", file, file.name);
  }

  const billingResponse = await fetch(
    `${BILLING_API_BASE}${BILLING_BOOKING_DOCUMENTS_ENDPOINT}`,
    {
      method: "POST",
      headers: {
        ...(BILLING_BOOKINGS_SECRET
          ? { "x-ship-it-smart-secret": BILLING_BOOKINGS_SECRET }
          : {}),
      },
      body: outgoing,
    },
  );

  const contentType = billingResponse.headers.get("content-type") || "";
  const billingResult = contentType.includes("application/json")
    ? await billingResponse.json()
    : await billingResponse.text();

  if (!billingResponse.ok) {
    const message =
      typeof billingResult === "object" && billingResult !== null
        ? (billingResult as { message?: string }).message
        : undefined;
    return NextResponse.json(
      {
        ok: false,
        error: "billing_failed",
        message: message || "Failed to upload booking documents.",
        details: billingResult,
      },
      { status: billingResponse.status },
    );
  }

  return NextResponse.json({ ok: true, data: billingResult });
}
