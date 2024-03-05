//microCMSの記事情報の型
type BookType = {
  id: number;
  title: string;
  content: string;
  price: number;
  thumbnail: { url: string };
  createdAt: string;
  updatedAt: string;
};
export default BookType;
