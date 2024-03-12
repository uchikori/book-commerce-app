// "use client";
import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { User } from "@/app/types/types";
import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = async () => {
  //dataオブジェクトをsessionで再定義
  const session = await getServerSession(nextAuthOptions);
  // const { data: session } = useSession();
  const user = session?.user as User;

  return (
    <header className="bg-slate-600 text-gray-100 shadow-lg">
      <nav className="flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">
          Book Commerce
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text^sm font-medium"
          >
            ホーム
          </Link>

          <Link
            href={user ? "/profile" : "/api/auth/signin"}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text^sm font-medium"
          >
            {user ? "マイページ" : "ログイン"}
          </Link>

          {user ? (
            <Link
              // onClick={() => signOut()}
              href={"/api/auth/signout/"}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text^sm font-medium"
            >
              ログアウト
            </Link>
          ) : (
            ""
          )}

          <Link href="/profile">
            <Image
              width="50"
              height="50"
              src={user?.image || "/default_icon.png"}
              // src=""
              alt="profile_icon"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
