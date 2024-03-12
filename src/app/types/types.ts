//microCMSの記事情報の型
export type BookType = {
  id: string;
  title: string;
  content: string;
  price: number;
  thumbnail: { url: string };
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  name?: string;
  email?: string;
  image?: string;
};

export type Purchase = {
  id: string;
  userId: string;
  bookId: string;
  createdAt: string;
  user: User;
};
