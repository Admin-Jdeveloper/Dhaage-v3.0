
"use server"
// import { PrismaClient } from "@prisma/client";
import  prisma  from "@/lib/prismasingleton";





export const signup = async (userdata) => {

//  const prisma = new PrismaClient()


console.log(userdata)

const jj = await prisma.user.create({

data :{

name : userdata?.NAME,
password : userdata?.PASSWORD,
email : userdata?.Gmail

}

})

return ;

}


// export const signin = async (userdata : object) => {
 
//     const cookieStore = await cookies();
//     console.log(userdata)
    
//     const jj = await prisma.user.findUnique({
    
//     where :{
    
   
//     password : userdata.PASSWORD,
//     email : userdata.Gmail
    
//     }
    
//     })
// if(!jj){
//     return {message:"inauthorized"} ;
// }


//    cookieStore.set({
//         name: "userToken",         // Cookie name
//         value: jj.id,     // Cookie value
//         httpOnly: true,            // Prevent client-side access
//         secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//         path: "/",                 // Cookie is available site-wide
//         maxAge: 60 * 60 * 24 ,  // 7 days in seconds
//       });

    
    
//     return {message:"authorized"};
//     }