"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"


// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
import { CustomFormField } from "./FormField"
import { signIn } from "next-auth/react"
import { signin, signup} from "@/actions/user.actions"
import {  useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { ToastAction } from "../ui/toast"
 const authFormSchema = (type : 'signin' | 'signup') => z.object({
  // sign up
  NAME: type === 'signin' ? z.string().optional() : z.string().min(3),
 
  
  // both
  Gmail: z.string().email(),
  PASSWORD: z.string().min(8),
})

// const formSchema = z.object({
//   NAME: z.string().min(2, {
//     message: "name must be at least 2 characters.",
//   }),
//   Gmail:z.string().email({message:"Not A Valid Email"}),
//  PASSWORD: z.string().min(2, {
//     message: "name must be at least 2 characters.",
//   }),
  

// })


export function ProfileForm({type}) {

const Router = useRouter();

const[buttonstate,setbutton]=React.useState(false)
  // const [auth,setauth] = React.useState('signup')
  // 1. Define your form.

  const formSchema = authFormSchema(type)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
  NAME: type=='signup' ? "" : undefined,
      Gmail:"",
      PASSWORD:""
    },
  })

  const onSubmit = async (values) => {

    // e.preventdefault()
   
    setbutton(true); // Disable button
    try {
      if (type === "signup") {
        await signup(values);
        setbutton(false)
        Router.push("/home");
        toast({ title: "SUCCESS", description: "Congrats!  SIGNED UP  🎉 " });
      } 
      if(type === 'signin')  {



        console.log(type)
        console.log(values)
        console.log("just before credential ")
        const result = await signIn("credentials", {
          redirect: false,
          username: values.Gmail,
          password: values.PASSWORD,
          
          // callbackUrl: "/home",
        });
        // const result = await signin(values)
console.log(result)
        console.log("REACHED AFTER CUSTOM SIGNIN")
  setbutton(false)
  if(!(result.ok)){
    return toast({ title: "Wrong Credentials", description: "Try Again ! " });
  }
  if(result?.ok){Router.push("/home")}
  return toast({ title: "Welcome Back User", description: "Successfully logged in  🎉 " });

        // if (result?.message== 'inauthorized') {
        //   setbutton(false)
        //   toast({ title: "Error", description: "Invalid credentials" });
        // } else {
        //   setbutton(false)
        //   Router.push("/home");
        // }
      }}
    catch (error) {
      console.error("Error during form submission:", error);
      setbutton(false)}
    // } finally {
    //   setbutton(false); // Re-enable button after submission
    // }
  };

  // 2. Define a submit handler.
  // async function onSubmit(values: z.infer<typeof formSchema>) {

   

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
//     if(auth=='signup'){signup(values) ;
//     console.log("Signup")
    
//   setbutton(false)
//   Router.push("/home")
//   }


// if(auth == "signin"){

// console.log("re")
// const result = await signIn("Credentials", {
//   redirect: false, // Prevent redirect
//   Gmail : values.Gmail,
//   PASSWORD : values.PASSWORD,
// });
// console.log("bottom")
// }
// console.log(values)
//     else{

// const data = await signin(values)
// if(data?.message == "authorized")

//   { 
//     setbutton(false)
//     redirect("/home")


//   }
// // console.log("Signin");
// else{


// setbutton(false)
//   const sue = () =>{
//   toast({
//     title: "Scheduled: Catch up ",
//     description: "Friday, February 10, 2023 at 5:57 PM",
//     action: (
//       <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
//     ),
//   });}
//   sue();

// }}
    // }
  
async function connectgoogle (){

const result = await signIn("google", { callbackUrl: "/home" })





}
// const  onsubmitlogin = async (e) => {

// e.preventDefault();

// console.log("reached before credentials")
// const username = "kkk"
// const password = "kkkk"
// const result = await signIn("credentials", {

//   username,
//   password,
//   redirect: false,
 
  
//   // callbackUrl: "/home",
// });
// console.log(result)
// if(result?.ok){
// Router.push("/home")

// }




  return (

    <div className="bg-slate-500 grid place-items-center w-[100vw] h-[100vh]" >
    <Form {...form}>

<div className="  w-[80vw] lg:w-[45vw] bg-white h-[80vh]  flex flex-col justify-center   pt-2 rounded-md shadow-md" >
<h1 className="text-2xl font-bold text-center mb-5 text-slate-900">{type === 'signup' ? "Signup" : "Login"}</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

<div  className="flex justify-center    flex-col gap-1 lg:gap-2" >
 {/* <p> DHAAGE  </p> */}
 {type=='signup' &&  <CustomFormField  label="NAME" desc="ENTER YOUR NAME"  formcontrol={form.control} /> }

 <CustomFormField label="Gmail" desc="Enter Your Email Id or Password"  formcontrol={form.control} />

       <CustomFormField label="PASSWORD" desc="MAKE YOUR PASSWORD"  formcontrol={form.control} />
     
     {/* <form onSubmit={(onsubmitlogin)}>
       <input name="PASSWORD" type="text" />
<input name="Gmail" type="text" />
<button type="submit" >submit</button>
</form> */}
{type =='signin'  ?     <a href="#" className="text-center" onClick={()=>{Router.push('/signup') }} > <p>New User ? Signup </p></a>  :    <a href="#" className="text-center" onClick={()=>{Router.push('/signin') }} > <p>Already have an account? login  </p> </a>   }

 

      <div className=" flex justify-center ">
        <Button className=" place-content-center w-1/2" disabled={buttonstate}  type="submit">Submit</Button>
        </div>

        <div className="text-center justify-center gap-x-2 lg:gap-x-4 flex flex-row "><p className="mt-3">  Login Through Google Account </p> <a href="#" onClick={connectgoogle} className="mt-3 underline text-blue-500"  > <p>Click</p></a></div>



</div>


      </form>

      </div>

    </Form>

    </div>
  )

}
