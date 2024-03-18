import Image from "next/image";
import Book from "./components/Book";
import { getAllBooks } from "./lib/microcms/client";
import { BookType, Purchase, User } from "./types/types";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "./lib/next-auth/options";

export default async function Home() {
  //microCMSから全書籍情報を取得
  const books = await getAllBooks();

  //サーバーサイドでのNext-AUthセッション取得
  const session = await getServerSession(nextAuthOptions);
  //セッションからユーザー情報を取得
  const user = session?.user as User;

  let purchaseBookIds: string[];
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
    // const purchasesData = await response.json();

    purchaseBookIds = purchasesData.map((item: Purchase) => {
      return item.bookId;
    });
  }

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-20 mt-20">
        <h2 className="text-center w-full font-bold text-3xl md-2">
          Book commerce
        </h2>
        <div className="max-w-screen-xl w-11/12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {books.map((book: BookType) => {
            return (
              <Book
                key={book.id}
                book={book}
                isPurchased={purchaseBookIds?.includes(book.id)}
                user={user}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}
