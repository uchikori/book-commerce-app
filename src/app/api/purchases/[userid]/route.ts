import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//購入履歴検索API
export async function GET(
  req: NextRequest,
  { params }: { params: { userid: string } }
) {
  //ルートパラメーターからユーザーIDを取得
  const userId = params.userid;

  try {
    const purchases = await prisma.purchase.findMany({
      where: {
        userId: userId,
      },
    });
    return NextResponse.json(purchases);
  } catch (err) {
    return NextResponse.json(err);
  }
}
