import { SITE_NAME, SUPPORT_EMAIL, WELCOME_DISCOUNT_CODE } from "./brand";

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

function money(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

// ---------------------------------------------------------------------------
// Bird transactional sending — us1 workspace, orders@fingerboardlab.com
// (Bird is the verified FBL sender; Resend was never wired up for this store.)
// ---------------------------------------------------------------------------

const BIRD_API_BASE = process.env.BIRD_API_BASE || "https://us1.platform.bird.com";
const DEFAULT_FROM_NAME = "Fingerboard Lab";

/** Owner copy of every order email. Override with ADMIN_NOTIFICATION_EMAIL. */
const OWNER_BCC_FALLBACK = "slyvesterchiko1@gmail.com";

function birdFrom(): { email: string; name: string } {
  const raw = process.env.ORDER_FROM_EMAIL || "orders@fingerboardlab.com";
  const m = /^(.*?)<([^>]+)>\s*$/.exec(raw);
  if (m)
    return {
      name: m[1]?.trim() || DEFAULT_FROM_NAME,
      email: m[2]?.trim() || raw,
    };
  return { name: DEFAULT_FROM_NAME, email: raw };
}

async function birdSend(params: {
  to: string;
  toName?: string | null;
  bcc?: string | null;
  subject: string;
  html: string;
  text: string;
}): Promise<{ sent: boolean; id?: string }> {
  const key = process.env.BIRD_API_KEY;
  if (!key || !params.to) return { sent: false };
  const from = birdFrom();
  try {
    const res = await fetch(`${BIRD_API_BASE}/v1/email/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [
          params.toName
            ? { email: params.to, name: params.toName }
            : { email: params.to },
        ],
        bcc: params.bcc ? [{ email: params.bcc }] : undefined,
        subject: params.subject,
        html: params.html,
        text: params.text,
        category: "transactional",
        track_opens: false,
        track_clicks: false,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[bird-send] Bird returned ${res.status}:`, body.slice(0, 300));
      return { sent: false };
    }
    const data = (await res.json().catch(() => null)) as { id?: string } | null;
    return { sent: true, id: data?.id };
  } catch (err) {
    console.error("[bird-send] fetch failed:", err);
    return { sent: false };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function orderDateLabel(d = new Date()): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

type OrderEmailItem = {
  title: string;
  quantity: number;
  unitAmount: number;
  image?: string | null;
};

type BrandedOrderParams = {
  orderNumber: string;
  orderDate: string;
  firstName: string;
  items: OrderEmailItem[];
  amountSubtotal: number;
  amountShipping: number;
  amountTotal: number;
  currency: string;
  shippingAddress: Record<string, string | null | undefined> | null;
  trackUrl: string;
};

/**
 * The branded dark order-confirmation template (matches the hand-sent
 * confirmation format used for the first FBL order).
 */
function brandedOrderEmailHtml(p: BrandedOrderParams): string {
  const accent = "#c8ff3d";
  const itemRows = p.items
    .map((it) => {
      const thumb = it.image
        ? `<img src="${escapeHtml(it.image)}" alt="${escapeHtml(it.title)}" width="64" height="64" style="width:64px; height:64px; object-fit:cover; background:#ffffff; border:1px solid #262626; border-radius:8px; display:block;">`
        : `<div style="width:64px; height:64px; background:#10140a; border:1px solid #2a3a15; border-radius:8px; text-align:center; line-height:64px; color:${accent}; font-size:20px; font-weight:800;">&#9670;</div>`;
      return `
          <tr>
            <td style="padding:20px 24px;">
              <table role="presentation" width="100%">
                <tr>
                  <td width="72" style="vertical-align:top;">${thumb}</td>
                  <td style="vertical-align:top; padding-left:14px;">
                    <div style="color:#fff; font-size:15px; font-weight:700;">${escapeHtml(it.title)}</div>
                    <div class="muted" style="font-size:13px; margin-top:3px;">Qty ${it.quantity}</div>
                  </td>
                  <td style="vertical-align:top; text-align:right; color:#fff; font-size:15px; font-weight:700;">
                    ${money(it.unitAmount * it.quantity, p.currency)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr><td style="border-top:1px solid #262626;"></td></tr>`;
    })
    .join("");

  const a = p.shippingAddress || {};
  const addrStreet = [a.line1, a.line2].filter(Boolean).map((v) => escapeHtml(String(v))).join("<br>");
  const addrCity = [a.city, a.state, a.postal_code].filter(Boolean).map((v) => escapeHtml(String(v))).join(", ");
  const addrCountry = a.country ? escapeHtml(String(a.country)) : "";
  const hasAddress = Boolean(addrStreet || addrCity);
  const shippingLabel = p.amountShipping > 0 ? money(p.amountShipping, p.currency) : "Free";

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${SITE_NAME} — Order Confirmation</title>
  <style>
    body { margin:0; padding:0; background:#0a0a0a; font-family: 'Inter', Arial, sans-serif; }
    .wrapper { max-width: 640px; margin: 0 auto; background:#0e0e0e; }
    .accent { color:${accent}; }
    a { color:${accent}; text-decoration:none; }
    .label { font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:${accent}; font-weight:700; }
    .muted { color:#8a8a8a; }
    table { border-collapse: collapse; width:100%; }
    @media (max-width: 480px) {
      .px { padding-left:20px !important; padding-right:20px !important; }
    }
  </style>
  </head>
  <body>
  <div class="wrapper">

    <table role="presentation" width="100%">
      <tr><td style="background:#000; padding:10px 32px; text-align:center;">
        <span style="color:${accent}; font-size:11px; letter-spacing:.08em; text-transform:uppercase; font-weight:700;">Order confirmed &nbsp;&#9670;&nbsp; Thanks for building with us</span>
      </td></tr>
    </table>

    <table role="presentation" width="100%">
      <tr>
        <td class="px" style="padding:28px 32px 0 32px;">
          <table role="presentation" width="100%">
            <tr>
              <td style="vertical-align:middle;">
                <span style="font-size:20px; font-weight:800; color:#ffffff;">Fingerboard<span class="accent">Lab</span></span>
              </td>
              <td style="text-align:right; vertical-align:middle;">
                <span class="label">#${escapeHtml(p.orderNumber)}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%">
      <tr>
        <td class="px" style="padding:36px 32px 8px 32px;">
          <div class="label" style="margin-bottom:10px;">&#8212; Order confirmed</div>
          <h1 style="margin:0; font-size:34px; line-height:1.15; color:#ffffff; font-weight:800;">
            You're building<br><span class="accent">something good.</span>
          </h1>
          <p class="muted" style="font-size:15px; line-height:1.6; margin-top:16px;">
            Hey ${escapeHtml(p.firstName)}, thanks for the order &#8212; here's everything you need. We'll
            email you again the moment it ships, with tracking.
          </p>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%">
      <tr>
        <td class="px" style="padding:20px 32px 0 32px;">
          <table role="presentation" width="100%" style="background:#161616; border:1px solid #262626; border-radius:12px; overflow:hidden;">
            <tr>
              <td style="padding:20px 24px;">
                <table role="presentation" width="100%">
                  <tr>
                    <td class="label">Order number</td>
                    <td class="label" style="text-align:right;">Order date</td>
                  </tr>
                  <tr>
                    <td style="color:#fff; font-size:15px; padding-top:4px; font-weight:700;">#${escapeHtml(p.orderNumber)}</td>
                    <td style="color:#fff; font-size:15px; padding-top:4px; text-align:right;">${escapeHtml(p.orderDate)}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr><td style="border-top:1px solid #262626;"></td></tr>
            ${itemRows}
            <tr>
              <td style="padding:20px 24px;">
                <table role="presentation" width="100%" style="font-size:13px;">
                  <tr>
                    <td class="muted" style="padding:4px 0;">Subtotal</td>
                    <td class="muted" style="padding:4px 0; text-align:right;">${money(p.amountSubtotal, p.currency)}</td>
                  </tr>
                  <tr>
                    <td class="muted" style="padding:4px 0;">Shipping</td>
                    <td class="muted" style="padding:4px 0; text-align:right;">${shippingLabel}</td>
                  </tr>
                  <tr>
                    <td style="padding-top:10px; color:#fff; font-weight:800; font-size:16px;">Total</td>
                    <td style="padding-top:10px; color:${accent}; font-weight:800; font-size:16px; text-align:right;">${money(p.amountTotal, p.currency)}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%">
      <tr>
        <td class="px" style="padding:20px 32px 0 32px;">
          <table role="presentation" width="100%" style="background:#10140a; border:1px solid #2a3a15; border-radius:12px;">
            <tr>
              <td style="padding:18px 22px;">
                <div class="label">Shipping status</div>
                <div style="color:#fff; font-size:15px; font-weight:700; margin-top:6px;">Preparing to ship</div>
                <div class="muted" style="font-size:13px; margin-top:4px;">Ships within 1&#8211;2 business days from our workshop. Tracking number follows as soon as it's on its way.</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${
      hasAddress
        ? `
    <table role="presentation" width="100%">
      <tr>
        <td class="px" style="padding:24px 32px 0 32px;">
          <div class="label" style="margin-bottom:8px;">Shipping to</div>
          <div style="color:#fff; font-size:14px; line-height:1.6;">
            ${addrStreet ? addrStreet + "<br>" : ""}${addrCity ? addrCity + "<br>" : ""}${addrCountry}
          </div>
        </td>
      </tr>
    </table>`
        : ""
    }

    <table role="presentation" width="100%">
      <tr>
        <td class="px" style="padding:32px 32px 8px 32px; text-align:center;">
          <a href="${escapeHtml(p.trackUrl)}" style="display:inline-block; background:${accent}; color:#0a0a0a; font-weight:800; font-size:14px; letter-spacing:.02em; padding:14px 28px; border-radius:8px;">
            Track your order &#8594;
          </a>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%">
      <tr>
        <td class="px" style="padding:36px 32px 32px 32px; border-top:1px solid #1d1d1d; margin-top:20px;">
          <p class="muted" style="font-size:12px; line-height:1.7; margin:0;">
            Questions about this order? Just reply to this email &#8212; a real person reads every one.<br>
            30-day returns, no drama. Worldwide shipping.
          </p>
          <p style="margin-top:16px; font-size:12px;">
            <span style="color:#fff; font-weight:700;">Fingerboard<span class="accent">Lab</span></span>
            <span class="muted"> &#8212; fingerboardlab.com</span>
          </p>
        </td>
      </tr>
    </table>

  </div>
  </body>
  </html>`;
}

function brandedOrderEmailText(p: BrandedOrderParams): string {
  const a = p.shippingAddress || {};
  const addr = [a.line1, a.line2, a.city, a.state, a.postal_code, a.country]
    .filter(Boolean)
    .join(", ");
  const shippingLabel = p.amountShipping > 0 ? money(p.amountShipping, p.currency) : "Free";
  const items = p.items
    .map((it) => `- ${it.title} x${it.quantity} — ${money(it.unitAmount * it.quantity, p.currency)}`)
    .join("\n");
  return [
    `Hi ${p.firstName},`,
    ``,
    `Order confirmed — thanks for building with us!`,
    ``,
    `Order #${p.orderNumber} (placed ${p.orderDate})`,
    items,
    `Shipping: ${shippingLabel}`,
    `Total: ${money(p.amountTotal, p.currency)}`,
    addr ? `` : null,
    addr ? `Shipping to: ${addr}` : null,
    ``,
    `Status: Preparing to ship. Ships within 1–2 business days; tracking follows as soon as it's on its way.`,
    ``,
    `Track your order: ${p.trackUrl}`,
    ``,
    `Questions about this order? Just reply to this email — a real person reads every one.`,
    `${SITE_NAME} — fingerboardlab.com`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

/**
 * Sends the branded order-confirmation email via Bird (orders@fingerboardlab.com)
 * to the customer, with a BCC copy to the store owner so every order is
 * visible in the owner's inbox. No-ops (returns { sent: false }) when
 * BIRD_API_KEY isn't set or there is no recipient — orders are still recorded
 * and viewable in /admin/orders regardless.
 */
export async function sendOrderConfirmationEmail(params: {
  to: string | null;
  orderId: string;
  items: OrderEmailItem[];
  amountSubtotal?: number | null;
  amountShipping?: number | null;
  amountTotal: number;
  currency: string;
  customerName?: string | null;
  shippingAddress?: Record<string, string | null | undefined> | null;
  orderNumber?: string;
  bcc?: string | null;
}): Promise<{ sent: boolean }> {
  if (!params.to) return { sent: false };

  const orderNumber =
    params.orderNumber || params.orderId.slice(0, 8).toUpperCase();
  const firstName =
    (params.customerName || params.to).trim().split(/\s+/)[0] || "there";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fingerboardlab.com";
  const trackUrl = `${siteUrl}/track?email=${encodeURIComponent(params.to)}`;
  // The owner is notified via sendOwnerOrderAlert (a direct, plain-text-first
  // email) instead of a BCC on the branded customer email — BCCs from a new
  // sender get spam-tabbed by Gmail; a direct [ORDER] alert does not.
  const bcc = params.bcc ?? null;

  const shared: BrandedOrderParams = {
    orderNumber,
    orderDate: orderDateLabel(),
    firstName,
    items: params.items,
    amountSubtotal:
      params.amountSubtotal ??
      params.amountTotal - (params.amountShipping ?? 0),
    amountShipping: params.amountShipping ?? 0,
    amountTotal: params.amountTotal,
    currency: params.currency,
    shippingAddress: params.shippingAddress ?? null,
    trackUrl,
  };

  return birdSend({
    to: params.to,
    bcc: bcc || null,
    subject: `Your ${SITE_NAME} order is confirmed (#${orderNumber})`,
    html: brandedOrderEmailHtml(shared),
    text: brandedOrderEmailText(shared),
  });
}

// ---------------------------------------------------------------------------
// Abandoned checkout recovery
// ---------------------------------------------------------------------------

function abandonedCartHtml(params: {
  items: { title: string; quantity: number; unitAmount: number }[];
  amountTotal: number;
  currency: string;
  recoveryUrl: string;
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
        <h1 style="color:#f3f1ea;font-size:22px;margin:0 0 8px;">Your setup is still in the cart.</h1>
        <p style="color:#8a8f98;font-size:14px;margin:0 0 24px;">
          You left before checking out. We saved everything. Use code <strong style="color:#c5f23c;">${WELCOME_DISCOUNT_CODE}</strong> at checkout for 10% off your first order.
        </p>
        <table role="presentation" width="100%">${rows}</table>
        <p style="margin:28px 0 0;">
          <a href="${params.recoveryUrl}" style="display:inline-block;background:#c5f23c;color:#0b0c0e;font-weight:bold;font-size:15px;padding:14px 26px;border-radius:10px;text-decoration:none;">Finish checkout</a>
        </p>
        <p style="color:#8a8f98;font-size:12px;margin-top:28px;">
          ${SITE_NAME} · You got this because you started a checkout. Reply "stop" and we will not email again.
        </p>
      </td></tr>
    </table>
  </div>`;
}

export async function sendAbandonedCartEmail(params: {
  to: string;
  items: { title: string; quantity: number; unitAmount: number }[];
  amountTotal: number;
  currency: string;
  recoveryUrl: string;
}): Promise<{ sent: boolean }> {
  if (!isResendConfigured()) return { sent: false };
  const from =
    process.env.RESEND_FROM_EMAIL || "Fingerboard Lab <onboarding@resend.dev>";
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
        subject: `Your ${SITE_NAME} cart is waiting (10% off inside)`,
        html: abandonedCartHtml(params),
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

  if (!process.env.BIRD_API_KEY) {
    console.warn(
      "[custom-order-notify] Skipped: BIRD_API_KEY not set.",
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

  const shortId = params.orderId.slice(0, 8).toUpperCase();

  const result = await birdSend({
    to: recipientEmail,
    subject: `[Action needed] New custom build order ${shortId}`,
    html: customOrderOwnerEmailHtml({ ...params, signedUrls }),
    text: `New custom build order ${shortId} from ${params.customerEmail} — total ${money(
      params.amountTotal,
      "usd",
    )}. Open /admin/orders to fulfil.`,
  });
  if (!result.sent) {
    console.error("[custom-order-notify] Bird send failed");
  }
  return { sent: result.sent };
}


/**
 * Direct owner alert for every paid order. Deliberately plain and
 * text-forward (no big images, transactional subject) so it survives Gmail's
 * spam filters. Subject reads: [ORDER] #receipt — name — total.
 */
export async function sendOwnerOrderAlert(params: {
  orderId: string;
  orderNumber: string;
  customerName: string | null;
  customerEmail: string | null;
  items: { title: string; quantity: number; unitAmount: number }[];
  amountTotal: number;
  currency: string;
  shippingAddress?: Record<string, string | null | undefined> | null;
}): Promise<{ sent: boolean }> {
  const owner = process.env.ADMIN_NOTIFICATION_EMAIL || OWNER_BCC_FALLBACK;
  if (!owner) return { sent: false };

  const total = money(params.amountTotal, params.currency);
  const name = params.customerName || params.customerEmail || "Unknown buyer";
  const rows = params.items
    .map(
      (it) =>
        `<li style="margin:0 0 6px;">${escapeHtml(it.title)} &times; ${it.quantity} &mdash; ${money(
          it.unitAmount * it.quantity,
          params.currency,
        )}</li>`,
    )
    .join("");
  const a = params.shippingAddress || {};
  const addr = [a.line1, a.line2, a.city, a.state, a.postal_code, a.country]
    .filter(Boolean)
    .join(", ");
  const itemLines = params.items
    .map((it) => `- ${it.title} x${it.quantity} — ${money(it.unitAmount * it.quantity, params.currency)}`)
    .join("\n");

  const html = `
  <div style="background:#0a0a0a;padding:24px 0;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#15171c;border-radius:12px;overflow:hidden;">
      <tr><td style="padding:24px;">
        <p style="margin:0 0 4px;color:#8a8f98;font-size:12px;letter-spacing:.08em;text-transform:uppercase;">New Fingerboard Lab order</p>
        <h1 style="margin:0 0 16px;color:#f3f1ea;font-size:20px;">#${escapeHtml(params.orderNumber)} &mdash; ${total}</h1>
        <p style="margin:0 0 2px;color:#8a8f98;font-size:12px;">Customer</p>
        <p style="margin:0 0 16px;color:#e8e8e8;font-size:14px;">${escapeHtml(name)}${params.customerEmail ? ` &lt;${escapeHtml(params.customerEmail)}&gt;` : ""}</p>
        <p style="margin:0 0 6px;color:#8a8f98;font-size:12px;">Items</p>
        <ul style="margin:0 0 16px;padding-left:18px;color:#e8e8e8;font-size:14px;">${rows}</ul>
        <p style="margin:0 0 2px;color:#8a8f98;font-size:12px;">Total paid</p>
        <p style="margin:0 0 16px;color:#c5f23c;font-size:16px;font-weight:bold;">${total}</p>
        ${addr ? `<p style="margin:0 0 2px;color:#8a8f98;font-size:12px;">Ship to</p><p style="margin:0 0 16px;color:#e8e8e8;font-size:14px;">${escapeHtml(addr)}</p>` : ""}
        <p style="margin:24px 0 0;color:#8a8f98;font-size:12px;">Order ID ${escapeHtml(params.orderId)} &middot; <a href="https://fingerboardlab.com/admin/orders" style="color:#c5f23c;">Open /admin/orders</a></p>
      </td></tr>
    </table>
  </div>`;

  const text = [
    `New Fingerboard Lab order #${params.orderNumber} — ${total}`,
    ``,
    `Customer: ${name}${params.customerEmail ? ` <${params.customerEmail}>` : ""}`,
    `Items:`,
    itemLines,
    `Total paid: ${total}`,
    addr ? `Ship to: ${addr}` : null,
    ``,
    `Order ID: ${params.orderId}`,
    `Manage: https://fingerboardlab.com/admin/orders`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return birdSend({
    to: owner,
    subject: `[ORDER] #${params.orderNumber} — ${name} — ${total}`,
    html,
    text,
  });
}