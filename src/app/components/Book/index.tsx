"use client";

import Image from "next/image";
import Link from "next/link";

const Book = (props: any) => {
  const { book } = props;
  return (
    <>
      <div className="flex flex-col item-center m-4">
        <a className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none">
          <Image
            priority
            src={book.thumbnail}
            alt={book.title}
            width={450}
            height={350}
            className="rounded-t-md"
          />
          <div className="px-4 py-4 bg-slate-100 rounded-b-md">
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="mt-2 text-lg text-slate-600">{book.content}</p>
            <p className="mt-2 text-md text-slate-700">値段:{book.price}円</p>
          </div>
        </a>
      </div>
    </>
  );
};

export default Book;
