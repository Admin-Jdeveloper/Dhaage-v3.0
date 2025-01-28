import Link from 'next/link';
import React from 'react';

import Image from 'next/image';
import mapping from "@/Data/Sidebar"


const Sidebar = () => {
  return (
   <section className='w-1/6 sticky mt-[10vh] left-0  max-lg:hidden bg-black' style={{height:'80vh',top:'10vh'}} >
<div className='flex flex-col justify-evenly  gap-14  pt-16 items-center w-full' >
    
{mapping.map((response)=>{

return(


<Link className='flex flex-row   gap-5' href={response.path} key={response.name}>
   <Image alt="nav" src={response.logo} width={24} height={24}   />
   <p className=' max-lg:hidden text-2xl text-gray-300 font-mono'>{response.name}</p>
</Link>



)



})}





     </div>








   </section>
  )
}

export default Sidebar