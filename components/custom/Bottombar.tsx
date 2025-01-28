import Link from 'next/link';
import React from 'react';
import home from "@/public/assets/home.svg"
import Image from 'next/image';
// import "bootstrap-icons/font/bootstrap-icons.css";
import mapping from "@/Data/Sidebar"


const Bottombar = () => {
  return (
   <section className='  z-5 w-full fixed bottom-0  bg-black  ' style={{height:'10vh'}}>
<div className='flex flex-row  pt-5 justify-evenly  items-center w-full  lg:hidden sm:visible    ' >
    
{mapping.map((response)=>{



return(

  // className=' flex flex-row   gap-5  '
  <Link  key={response.name} href={response.path}>
  <Image alt="nav" src={response.logo} width={24} height={24}   />
 
   
  </Link>




)





})}


     </div>








   </section>
  )
}

export default Bottombar