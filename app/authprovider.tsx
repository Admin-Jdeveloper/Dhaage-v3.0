"use client"

import { SessionProvider} from "next-auth/react"



export default function Auth  ({children} ){

return <SessionProvider>{children}</SessionProvider>

}