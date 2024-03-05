import Image from "next/image";
import Book from "./components/Book";
import { getAllBooks } from "./lib/microcms/client";
import BookType from "./types/types";

// const books = [
//   {
//     id: 1,
//     title: "Book 1",
//     thumbnail: "/thumbnails/discord-clone-udemy.png",
//     price: 2980,
//     author: {
//       id: 1,
//       name: "Author 1",
//       description: "Author 1 description",
//       profile_icon: "https://source.unsplash.com/random/2",
//     },
//     content: "Content 1",
//     created_at: new Date().toString(),
//     updated_at: new Date().toString(),
//   },
//   {
//     id: 2,
//     title: "Book 2",
//     thumbnail: "/thumbnails/notion-udemy.png",
//     price: 3980,
//     author: {
//       id: 2,
//       name: "Author 2",
//       description: "Author 2 description",
//       profile_icon: "https://source.unsplash.com/random/2",
//     },
//     content: "Content 2",
//     created_at: new Date().toString(),
//     updated_at: new Date().toString(),
//   },
//   {
//     id: 3,
//     title: "Book 3",
//     thumbnail: "/thumbnails/openai-chatapplication-udem.png",
//     price: 4980,
//     author: {
//       id: 3,
//       name: "Author 3",
//       description: "Author 3 description",
//       profile_icon: "https://source.unsplash.com/random/3",
//     },
//     content: "Content 3",
//     created_at: new Date().toString(),
//     updated_at: new Date().toString(),
//   },
// ];

export default async function Home() {
  const books = await getAllBooks();

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-20 mt-20">
        <h2 className="text-center w-full font-bold text-3xl md-2">
          Book commerce
        </h2>
        <div className="max-w-screen-xl w-11/12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {books.map((book: BookType) => {
            return <Book key={book.id} book={book} />;
          })}
        </div>
      </main>
    </>
  );
}
