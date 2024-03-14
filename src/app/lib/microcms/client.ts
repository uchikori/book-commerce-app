import { BookType } from "@/app/types/types";
import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN || "",
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
});

export const getAllBooks = async () => {
  const allBooks = await client.get({
    endpoint: "bookcommerce",
    queries: {
      offset: 0,
      limit: 10,
    },
    customRequestInit: {
      cache: "no-store",
    },
  });
  return allBooks.contents;
};

export const getDetailBook = async (bookId: string) => {
  const detailBook = await client.get({
    endpoint: "bookcommerce",
    contentId: bookId,
    customRequestInit: {
      cache: "no-store",
    },
  });
  return detailBook;
};
