import { getDetailBook } from "@/app/lib/microcms/client";
import Image from "next/image";
import React from "react";

type DetailPageProps = {
  params: {
    id: string;
  };
};

const DetailPage = async (props: DetailPageProps) => {
  const { params } = props;

  const bookData = await getDetailBook(params.id);

  return (
    <div className="container mx-auto p-4">
      {/* <div className="w-full  md:w-9/12 mx-auto"> */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Image
          className="w-full h-80 object-cover object-center"
          width={bookData.thumbnail.width}
          height={bookData.thumbnail.height}
          alt={bookData.title}
          src={bookData.thumbnail.url}
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold">{bookData.title}</h2>
          <div
            className="text-gray-700 mt-2"
            dangerouslySetInnerHTML={{ __html: bookData.content }}
          />

          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              公開日:{new Date(bookData.createdAt).toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">
              最終更新:{new Date(bookData.updatedAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};
export default DetailPage;
