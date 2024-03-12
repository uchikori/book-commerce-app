"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookType } from "@/app/types/types";

type PurchaseDetailBookProps = {
  book: BookType;
};
const PurchaseDetailBook = (props: PurchaseDetailBookProps) => {
  const { book } = props;

  return (
    <div className="flex flex-col items-center m-4">
      <Link
        href={`/book/${book.id}`}
        className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
      >
        <figure className="aspect-[16/9]">
          <Image
            priority
            src={book.thumbnail.url}
            alt={book.title}
            width={450}
            height={350}
            className="rounded-t-md w-full h-full object-cover"
          />
        </figure>
        <div className="px-4 py-4 bg-slate-100 rounded-b-md">
          <h2 className="text-lg font-semibold">{book.title}</h2>
          {/* <p className="mt-2 text-lg text-slate-600">この本は○○...</p> */}
          <p className="mt-2 text-md text-slate-700">値段：{book.price}円</p>
        </div>
      </Link>
    </div>
  );
};

export default PurchaseDetailBook;
