import { NextRequest, NextResponse } from "next/server";

type BookingPayload = Record<string, unknown>;

const DEFAULT_BILLING_API_BASE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8090"
    : "https://app.itsmartbilling.com";

const BILLING_API_BASE =
  process.env.BILLING_API_BASE || DEFAULT_BILLING_API_BASE;

const BILLING_BOOKINGS_ENDPOINT =
  process.env.BILLING_BOOKINGS_ENDPOINT || "/api/public/ship-it-smart/bookings";

const BILLING_BOOKINGS_SECRET =
  process.env.BILLING_BOOKINGS_SECRET || process.env.BILLING_QUOTES_SECRET || "";

export async function POST(req: NextRequest) {
  let body: {
    payload?: BookingPayload;
  };
  try {
    body = (await req.json()) as {
      payload?: BookingPayload;
    };
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json", message: "Invalid request body." },
      { status: 400 },
    );
  }

  if (!body.payload) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation_error",
        message: "Missing payload.",
      },
      { status: 400 },
    );
  }

  const billingResponse = await fetch(
    `${BILLING_API_BASE}${BILLING_BOOKINGS_ENDPOINT}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(BILLING_BOOKINGS_SECRET
          ? { "x-ship-it-smart-secret": BILLING_BOOKINGS_SECRET }
          : {}),
      },
      body: JSON.stringify({
        type_of_form: "booking",
        form_data: body.payload,
        location: "Ship It Smart",
      }),
    },
  );

  if (!billingResponse.ok) {
    const errorText = await billingResponse.text();
    return NextResponse.json(
      {
        ok: false,
        error: "billing_failed",
        message: `Failed to submit booking request: ${billingResponse.statusText}`,
        details: errorText,
      },
      { status: billingResponse.status },
    );
  }

  const contentType = billingResponse.headers.get("content-type") || "";
  const billingResult = contentType.includes("application/json")
    ? await billingResponse.json()
    : await billingResponse.text();

  return NextResponse.json({
    ok: true,
    data:
      typeof billingResult === "object" && billingResult !== null
        ? (billingResult as { data?: unknown }).data ?? billingResult
        : billingResult,
  });
}
