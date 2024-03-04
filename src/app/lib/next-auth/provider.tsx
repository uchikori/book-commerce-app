"use client";
import { SessionProvider } from "next-auth/react";
import type { FC, PropsWithChildren } from "react";

const NextAuthProvider: FC<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
