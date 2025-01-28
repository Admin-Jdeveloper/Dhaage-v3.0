
"use client"

import React, { useEffect } from 'react'
// import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'


const page = () => {

  const { data : session } = useSession()
  console.log(session)
 


  return (
    <div>page</div>
  )
}

export default page