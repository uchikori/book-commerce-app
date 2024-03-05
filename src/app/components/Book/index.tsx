"use client";

import BookType from "@/app/types/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type BookProps = {
  book: BookType;
};

const Book = (props: BookProps) => {
  const { book } = props;

  const router = useRouter();

  //セッションの取得(データオブジェクトをsessionとして受け取る)
  const { data: session } = useSession();
  //セッションオブジェクトが存在する場合のみuserを取得
  const user = session?.user;

  //モーダル開閉の状態変数
  const [showModal, setShowModal] = useState(false);

  //モダールの表示関数
  const handlePurchaseClick = () => {
    setShowModal(true);
  };
  //モーダルの非表示関数
  const handleCancel = () => {
    setShowModal(false);
  };

  const startCheckout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: book.title,
            price: book.price,
          }),
        }
      );
      const responseData = await response.json();

      console.log(responseData);
      console.log(responseData.checkout_url);

      if (responseData) {
        router.push(responseData.checkout_url);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePurchaceConfirm = () => {
    if (!user) {
      setShowModal(false);
      //ログインページへリダイレクト
      router.push("/login");
    } else {
      //Stripeで決済
      startCheckout();
    }
  };

  return (
    <>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .modal {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <div className="flex flex-col items-center m-4">
        <a
          onClick={handlePurchaseClick}
          className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
        >
          <Image
            priority
            src={book.thumbnail.url}
            alt={book.title}
            width={450}
            height={350}
            className="rounded-t-md w-full object-cover"
          />
          <div className="px-4 py-4 bg-slate-100 rounded-b-md">
            <h2 className="text-lg font-semibold overflow-hidden line-clamp-2">
              {book.title}
            </h2>
            <p className="mt-2 text-lg text-slate-600 overflow-hidden line-clamp-3">
              {book.content}
            </p>
            <p className="mt-2 text-md text-slate-700">値段:{book.price}円</p>
          </div>
        </a>

        {/* モーダル */}
        {showModal && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900 bg-opacity-50 flex justify-center items-center modal">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-xl mb-4">本を購入しますか？</h3>
              <button
                onClick={handlePurchaceConfirm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                購入する
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Book;
