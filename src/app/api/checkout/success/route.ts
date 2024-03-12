import prisma from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//購入履歴の保存
export async function POST(req: NextRequest, res: NextResponse) {
  //APIリクエストからsessionIDを取得
  const { sessionId } = await req.json();

  try {
    //stripeのセッションIDを渡し、sessionオブジェクトを取得
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log(session);

    //postgresのデータでuserIdとbookIdが一致するデータを取得（過去に一度購入している）
    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: session.client_reference_id!,
        bookId: session.metadata.bookId!,
      },
    });

    //同一の購入履歴が存在しない場合
    if (!existingPurchase) {
      //購入した書籍情報をprisma経由でvercelPostgresに保存
      const purchase = await prisma.purchase.create({
        data: {
          userId: session.client_reference_id!, //ユーザーID
          bookId: session.metadata.bookId!, //書籍ID
        },
      });
      return NextResponse.json({ purchase });
    }
    //同一の購入履歴が存在する場合
    else {
      return NextResponse.json({ message: "すでに購入済みの商品です" });
    }
  } catch (err) {
    //エラーハンドリング
    return NextResponse.json(err);
  }
}
