"use client"


import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

/**
 * Authentication wrapper for providing session context.
 *
 * @param {Object} props
 * @param {ReactNode} props.children - The components that require access to the session context.
 * @returns {JSX.Element}
 */
interface AuthProps {
  children: ReactNode;
}

export default function Auth({ children }: AuthProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
