import { SITE_NAME, SUPPORT_EMAIL } from "./brand";

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

function money(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

function orderEmailHtml(params: {
  orderId: string;
  items: { title: string; quantity: number; unitAmount: number }[];
  amountTotal: number;
  currency: string;
}) {
  const rows = params.items
    .map(
      (it) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #23252b;color:#e8e8e8;font-size:14px;">
          ${it.title} <span style="color:#8a8f98;">× ${it.quantity}</span>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #23252b;color:#e8e8e8;font-size:14px;text-align:right;">
          ${money(it.unitAmount * it.quantity, params.currency)}
        </td>
      </tr>`,
    )
    .join("");

  return `
  <div style="background:#0b0c0e;padding:32px 0;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" style="max-width:520px;margin:0 auto;background:#15171c;border-radius:16px;overflow:hidden;">
      <tr><td style="padding:32px;">
        <div style="width:36px;height:36px;border-radius:10px;background:#c5f23c;margin-bottom:16px;"></div>
        <h1 style="color:#f3f1ea;font-size:22px;margin:0 0 8px;">Order confirmed. Grip it and rip it.</h1>
        <p style="color:#8a8f98;font-size:14px;margin:0 0 24px;">
          Order ${params.orderId.slice(0, 8).toUpperCase()} — we're on it. Ships within 1–2 business days.
        </p>
        <table role="presentation" width="100%">${rows}</table>
        <table role="presentation" width="100%" style="margin-top:12px;">
          <tr>
            <td style="color:#f3f1ea;font-weight:bold;font-size:15px;">Total</td>
            <td style="color:#c5f23c;font-weight:bold;font-size:15px;text-align:right;">
              ${money(params.amountTotal, params.currency)}
            </td>
          </tr>
        </table>
        <p style="color:#8a8f98;font-size:12px;margin-top:28px;">
          ${SITE_NAME} · Questions? Reply to this email or contact ${SUPPORT_EMAIL}
        </p>
      </td></tr>
    </table>
  </div>`;
}

/**
 * Sends a branded order-confirmation email via Resend. No-ops (returns
 * { sent: false }) when RESEND_API_KEY isn't set — this is an enhancement
 * layer, never a blocker: orders are recorded and viewable in /admin/orders
 * regardless of whether email is configured. Also bcc's the store owner so
 * there's a real notification channel with zero extra setup once one key
 * is added.
 */
export async function sendOrderConfirmationEmail(params: {
  to: string | null;
  orderId: string;
  items: { title: string; quantity: number; unitAmount: number }[];
  amountTotal: number;
  currency: string;
}): Promise<{ sent: boolean }> {
  if (!isResendConfigured() || !params.to) return { sent: false };

  const from =
    process.env.RESEND_FROM_EMAIL || "Fingerboard Lab <onboarding@resend.dev>";
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || SUPPORT_EMAIL;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [params.to],
        bcc: adminEmail ? [adminEmail] : undefined,
        subject: `Your ${SITE_NAME} order is confirmed`,
        html: orderEmailHtml(params),
      }),
    });
    return { sent: res.ok };
  } catch {
    return { sent: false };
  }
}

// ---------------------------------------------------------------------------
// Owner / operator notification — custom fingerboard build orders
// ---------------------------------------------------------------------------

/**
 * Parameters mirror the custom_orders DB row so the caller can pass them
 * straight out of the Supabase query result.
 */
export type CustomOrderNotificationParams = {
  orderId: string;
  customerEmail: string;
  size: string;
  woodUpgrade: boolean;
  rushProduction: boolean;
  quantity: number;
  notes: string | null;
  designHelpRequested: boolean;
  /** Paths stored in the custom-order-uploads Supabase Storage bucket. */
  filePaths: string[];
  /** Amount in cents. */
  amountTotal: number;
  /** Pre-signed download URLs keyed by the original file path. */
  signedUrls: Record<string, string>;
};

function customOrderOwnerEmailHtml(params: CustomOrderNotificationParams): string {
  const shortId = params.orderId.slice(0, 8).toUpperCase();

  const optionRows = [
    ["Size", params.size],
    ["Quantity", String(params.quantity)],
    ["Wood Upgrade", params.woodUpgrade ? "Yes — Select Hardwood" : "No"],
    ["Rush Production", params.rushProduction ? "Yes — 24-48h" : "No"],
    ["Total Paid", money(params.amountTotal, "usd")],
  ]
    .map(
      ([label, val]) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #23252b;color:#8a8f98;font-size:13px;width:40%;">${label}</td>
        <td style="padding:8px 0;border-bottom:1px solid #23252b;color:#e8e8e8;font-size:13px;">${val}</td>
      </tr>`,
    )
    .join("");

  const artworkSection = params.designHelpRequested
    ? `<p style="color:#f3f1ea;font-size:14px;margin:0 0 8px;"><strong>Artwork:</strong> Customer requested design help — no files uploaded.</p>`
    : params.filePaths.length === 0
      ? `<p style="color:#f3f1ea;font-size:14px;margin:0 0 8px;"><strong>Artwork:</strong> No files recorded.</p>`
      : `<p style="color:#f3f1ea;font-size:14px;margin:0 0 8px;"><strong>Uploaded design files</strong> (links expire in 7 days):</p>
         <ul style="margin:0 0 16px;padding-left:18px;">
           ${params.filePaths
             .map((fp) => {
               const url = params.signedUrls[fp];
               const filename = fp.split("/").pop() || fp;
               return url
                 ? `<li style="margin-bottom:6px;"><a href="${url}" style="color:#c5f23c;font-size:13px;">${filename}</a></li>`
                 : `<li style="margin-bottom:6px;color:#8a8f98;font-size:13px;">${filename} (signed URL unavailable)</li>`;
             })
             .join("")}
         </ul>`;

  const notesSection = params.notes
    ? `<div style="margin-top:20px;">
        <p style="color:#8a8f98;font-size:12px;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.05em;">Customer notes / instructions</p>
        <div style="background:#0b0c0e;border-radius:8px;padding:14px;color:#e8e8e8;font-size:13px;line-height:1.6;white-space:pre-wrap;">${params.notes.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
      </div>`
    : "";

  return `
  <div style="background:#0b0c0e;padding:32px 0;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#15171c;border-radius:16px;overflow:hidden;">
      <tr><td style="padding:32px;">
        <div style="width:36px;height:36px;border-radius:10px;background:#c5f23c;margin-bottom:16px;"></div>
        <h1 style="color:#f3f1ea;font-size:20px;margin:0 0 4px;">New Custom Build Order</h1>
        <p style="color:#8a8f98;font-size:13px;margin:0 0 24px;">Order ${shortId} — manual fulfilment required.</p>

        <p style="color:#8a8f98;font-size:12px;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.05em;">Customer</p>
        <p style="color:#e8e8e8;font-size:14px;margin:0 0 20px;">${params.customerEmail}</p>

        <p style="color:#8a8f98;font-size:12px;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.05em;">Order options</p>
        <table role="presentation" width="100%" style="margin-bottom:20px;">${optionRows}</table>

        ${artworkSection}
        ${notesSection}

        <p style="color:#8a8f98;font-size:11px;margin-top:28px;">Order ID: ${params.orderId}</p>
      </td></tr>
    </table>
  </div>`;
}

/**
 * Send an owner/operator alert email when a custom fingerboard build order is
 * paid. Generates 7-day signed Supabase Storage URLs for every uploaded file
 * so the recipient can download artwork immediately.
 *
 * Returns { sent: false } (without throwing) when:
 * - RESEND_API_KEY is missing
 * - No recipient address can be resolved (ADMIN_NOTIFICATION_EMAIL unset and
 *   SUPPORT_EMAIL fallback is empty)
 * - The Resend API call fails
 *
 * The Supabase client is needed to generate signed URLs; pass it in so this
 * function stays pure and testable (no hidden getSupabase() call).
 */
export async function sendCustomOrderOwnerNotification(
  params: Omit<CustomOrderNotificationParams, "signedUrls">,
  supabase: import("@supabase/supabase-js").SupabaseClient,
): Promise<{ sent: boolean }> {
  const recipientEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL || SUPPORT_EMAIL || null;

  if (!isResendConfigured()) {
    console.warn(
      "[custom-order-notify] Skipped: RESEND_API_KEY not set.",
    );
    return { sent: false };
  }

  if (!recipientEmail) {
    console.warn(
      "[custom-order-notify] Skipped: no recipient address — set ADMIN_NOTIFICATION_EMAIL.",
    );
    return { sent: false };
  }

  // Generate 7-day signed URLs for every uploaded design file.
  const SIGNED_URL_EXPIRY_SECONDS = 7 * 24 * 60 * 60; // 7 days
  const signedUrls: Record<string, string> = {};

  for (const filePath of params.filePaths) {
    try {
      const { data, error } = await supabase.storage
        .from("custom-order-uploads")
        .createSignedUrl(filePath, SIGNED_URL_EXPIRY_SECONDS);
      if (!error && data?.signedUrl) {
        signedUrls[filePath] = data.signedUrl;
      } else {
        console.warn(
          `[custom-order-notify] Could not sign URL for ${filePath}:`,
          error,
        );
      }
    } catch (err) {
      console.warn(
        `[custom-order-notify] Exception signing URL for ${filePath}:`,
        err,
      );
    }
  }

  const from =
    process.env.RESEND_FROM_EMAIL || "Fingerboard Lab <onboarding@resend.dev>";

  const shortId = params.orderId.slice(0, 8).toUpperCase();

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipientEmail],
        subject: `[Action needed] New custom build order ${shortId}`,
        html: customOrderOwnerEmailHtml({ ...params, signedUrls }),
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(
        `[custom-order-notify] Resend returned ${res.status}:`,
        body,
      );
      return { sent: false };
    }

    return { sent: true };
  } catch (err) {
    console.error("[custom-order-notify] fetch failed:", err);
    return { sent: false };
  }
}
