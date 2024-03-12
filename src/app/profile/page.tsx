import Image from "next/image";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../lib/next-auth/options";
import { BookType, Purchase, User } from "../types/types";
import { getDetailBook } from "../lib/microcms/client";
import PurchaseDetailBook from "../components/PurchaseDetailBook";

export default async function ProfilePage() {
  //サーバーサイドでのNext-Authのセッション取得
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;

  let purchasesDetailBooks: BookType[] = [];
  if (user) {
    const purchasesData = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`,
      { cache: "no-store" } //SSR
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      });

    //購入データのbookIdを元に書籍情報を取得
    purchasesDetailBooks = await Promise.all(
      purchasesData.map(
        async (item: Purchase) => await getDetailBook(item.bookId)
      )
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">プロフィール</h1>

      <div className="bg-white shadow-md rounded p-4">
        <div className="flex items-center">
          <Image
            priority
            src={user?.image || "/default_icon.png"}
            alt="user profile_icon"
            width={60}
            height={60}
            className="rounded-t-md "
          />
          <h2 className="text-lg ml-4 font-semibold">お名前：{user?.name}</h2>
        </div>
      </div>

      <span className="font-medium text-lg mb-4 mt-4 block">購入した記事</span>
      <div className="max-w-screen-xl w-11/12 justify-center mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {purchasesDetailBooks.map((book: BookType) => {
          return <PurchaseDetailBook key={book.id} book={book} />;
        })}
      </div>
    </div>
  );
}
