import { NextRequest, NextResponse } from "next/server";

type QuotePayload = Record<string, unknown>;

function toPrettyJson(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

function buildEmailBody(formData: QuotePayload): {
  text: string;
  html: string;
} {
  const from = (formData.from as Record<string, unknown> | undefined) ?? {};
  const to = (formData.to as Record<string, unknown> | undefined) ?? {};
  const packages = Array.isArray(formData.packages) ? formData.packages : [];

  const text = [
    "A new quote request was created.",
    "",
    `From: ${String(from.country ?? "N/A")} ${String(from.postcode ?? "")}`.trim(),
    `To: ${String(to.country ?? "N/A")} ${String(to.postcode ?? "")}`.trim(),
    `Packages: ${packages.length}`,
    "",
    "Full payload:",
    toPrettyJson(formData),
  ].join("\n");

  const html = `
    <h2>New Quote Request</h2>
    <p>A new quote request was created.</p>
    <ul>
      <li><strong>From:</strong> ${String(from.country ?? "N/A")} ${String(from.postcode ?? "")}</li>
      <li><strong>To:</strong> ${String(to.country ?? "N/A")} ${String(to.postcode ?? "")}</li>
      <li><strong>Packages:</strong> ${packages.length}</li>
    </ul>
    <p><strong>Full payload:</strong></p>
    <pre>${toPrettyJson(formData)}</pre>
  `;

  return { text, html };
}

export async function POST(req: NextRequest) {
  let body: {
    form_data?: QuotePayload;
    booking_id?: string;
    location?: string;
  };
  try {
    body = (await req.json()) as {
      form_data?: QuotePayload;
      booking_id?: string;
      location?: string;
    };
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json", message: "Invalid request body." },
      { status: 400 },
    );
  }

  if (!body.form_data) {
    return NextResponse.json(
      { ok: false, error: "validation_error", message: "Missing form_data." },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    skipped: true,
    message: "Quote notification email sending is currently disabled.",
  });
}
