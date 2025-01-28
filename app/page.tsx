import { ProfileForm } from '@/components/custom/Formelement'
import React from 'react'

const page = () => {
  return (
   <ProfileForm type="signin" />
  )
}

export default page



// "use client";

// import React, { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const result = await signIn("credentials", {
//       email,
//       password,
//       redirect: false, // Set to false for custom handling
//     });

//     if (result?.ok) {
//       // Redirect or perform post-login actions
//       router.push("/dashboard");
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginPage;
