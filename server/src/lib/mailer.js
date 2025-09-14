import nodemailer from "nodemailer";

let transporter;

function getTransporter() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } =
    process.env;
  if (!SMTP_HOST) {
    throw new Error("Email not configured: set SMTP_* env vars.");
  }
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: String(SMTP_SECURE).toLowerCase() === "true",
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });
  return transporter;
}

export async function sendContactEmail({
  name,
  email,
  phone = "",
  company = "",
  message,
  selectedBrands = [],
}) {
  const to = process.env.MAIL_TO || process.env.MAIL_FROM;
  const from = process.env.MAIL_FROM || "no-reply@ship-it-smart.local";
  if (!to) throw new Error("MAIL_TO or MAIL_FROM must be set");

  const subject = `New contact from ${name}`;
  const brandsText = selectedBrands.length
    ? selectedBrands.join(", ")
    : "None provided";
  const text = `New contact submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nServices of Interest: ${brandsText}\n\nMessage:\n${message}`;

  const html = `
    <h2>New contact submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || "—"}</p>
    <p><strong>Company:</strong> ${company || "—"}</p>
    <p><strong>Services of Interest:</strong> ${brandsText}</p>
    <p><strong>Message:</strong></p>
    <p>${message?.replace(/\n/g, "<br/>")}</p>
  `;

  const info = await getTransporter().sendMail({
    from,
    to,
    subject,
    text,
    html,
    replyTo: email,
  });
  return info;
}
