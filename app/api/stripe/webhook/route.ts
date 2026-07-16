import { getStripe } from "lib/stripe";
import { NextRequest, NextResponse } from "next/server";

// Stripe requires the raw request body to verify the signature.
export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    // Not configured yet — acknowledge so Stripe doesn't retry endlessly.
    return NextResponse.json({ received: true, note: "webhook secret not set" });
  }

  const signature = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature ?? "",
      webhookSecret,
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Signature verification failed: ${err.message}` },
      { status: 400 },
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      // Order is paid. Extend here: send confirmation email, notify fulfilment,
      // decrement stock, push to a spreadsheet, etc.
      console.log(
        "[stripe] paid order",
        session.id,
        session.customer_details?.email,
      );
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
