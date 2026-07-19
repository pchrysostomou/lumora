import { NextResponse } from "next/server";

// POST /api/checkout
// With STRIPE_SECRET_KEY set: creates a Stripe Checkout Session and returns its URL.
// Without it: returns { demo: true } and the client completes a simulated order.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as
    | { title?: unknown; amount?: unknown; successPath?: unknown }
    | null;

  const title = typeof body?.title === "string" ? body.title.slice(0, 120) : null;
  const amount = typeof body?.amount === "number" ? body.amount : NaN;
  const successPath = typeof body?.successPath === "string" && body.successPath.startsWith("/")
    ? body.successPath
    : "/checkout/success";

  if (!title || !Number.isFinite(amount) || amount <= 0 || amount > 10000) {
    return NextResponse.json({ error: "Invalid checkout request" }, { status: 400 });
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ demo: true });
  }

  try {
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(key);
    const origin = req.headers.get("origin") ?? "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "eur",
          product_data: { name: title },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }],
      success_url: `${origin}${successPath}`,
      cancel_url: `${origin}/checkout`,
    });
    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "Payment provider is unavailable right now. Please try again." }, { status: 502 });
  }
}
