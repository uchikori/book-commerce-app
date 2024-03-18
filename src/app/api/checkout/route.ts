// import Stripe from "stripe";

import { NextRequest, NextResponse } from "next/server";

// const stripe = new Stripe(process.env.STRIPE_SECRET_LEY!)
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest, res: NextResponse) {
  //titleとpriceをリクエストボディから受け取る
  const { title, price, bookId, userId } = await req.json();

  try {
    //stripeのチェックアウトセッションを作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      metadata: { bookId: bookId },
      client_reference_id: userId,
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: {
              name: title,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/book/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}`,
    });
    //作成したチェックアウトセッションのurlを返す
    return NextResponse.json({
      checkout_url: session.url,
    });
  } catch (err: any) {
    //エラーメッセージを返す
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
