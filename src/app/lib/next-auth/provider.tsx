"use client";
import { SessionProvider, useSession } from "next-auth/react";
import type { FC, PropsWithChildren } from "react";

const NextAuthProvider: FC<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
