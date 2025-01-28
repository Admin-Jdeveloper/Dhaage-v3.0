import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from 'next-auth/providers/credentials';
import  prisma  from "@/lib/prismasingleton"
;

const handler = NextAuth({
  
    // Configure one or more authentication providers
   
      
      providers: [
        GoogleProvider({
          clientId: process.env.NEXT_PUBLIC_CLIENT_ID ,
          clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET  ,
          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            },
            
          },
         
        }),
    //     CredentialsProvider({
    //       name: "Credentials",
    //       credentials: {
    //         email: { label: "Email", type: "text" },
    //         password: { label: "Password", type: "password" },
    //       },
    //       async authorize(credentials, req) {
    //         const { email, password } = credentials;
    // console.log(credentials)
           
    //           return { id: "user.id", name: "user.name", email: "user.email" };
    //         // }
    
    //         // Return null if authentication fails
    //         return null;
    //       },
    //     }),
    CredentialsProvider({
   
      name: "Credentials",
    
      credentials: {
        
        username: { label: "Username", type: "email ", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
     
        async authorize(credentials, req) {
          try{
            console.log("reached signin credentials authorize function");
      
          // Ensure username and password are provided
          if (!credentials?.username || !credentials?.password) {
            throw new Error("Missing username or password");
          }
      
          // Find the user by email (assumes email is unique in your schema)
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.username, // username corresponds to email
            },
          });
      console.log(user)
          if (!user) {
            throw new Error("No user found with this email");
          }
          const isPasswordValid = (credentials.password == user.password)
          // Verify the password (use bcrypt for hashed passwords)
          console.log("Provided password:", credentials.password);
          console.log("Stored password:", user.password);
console.log(isPasswordValid)          
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }
      
          // Return the user object on successful authentication
          // return { id: user.id, name: user.name, email: user.email };
          return user
          }
          catch(err){console.log(err)}
        },
    }),
      ],
      session:{
strategy:"jwt",
maxAge:24*60*60

      },
      callbacks: {
        // async redirect({ url, baseUrl }) {
        //   // Redirect to the specified URL or default to the baseUrl
        //   return url.startsWith(baseUrl) ? url : `${baseUrl}/home`;
        // },
        async signIn({ account, profile }) {
          // Example: Only allow users with a specific domain
          if (account?.provider === "google" ) {

          const result =  await prisma.user.findUnique({
              where:{

          email: profile?.email

              }}
            )
if(result){
  
  console.log("found User")
  return false}
          await  prisma.user.create(
              {
              data:{
name:profile?.name,
email:profile?.email,
profilepic:profile?.picture

              }

            })
            console.log("Created New User")
            console.log(profile)



            return true; // Allow sign-in
          }
          // if(account?.provider === "Credentials")
          // {

          //   return true;
          // }
          return true
        },
        async session({ session, token }) {
          session.user.id = token.sub;
          return session;
        },
        async jwt({ token, user }) {
          if (user) token.sub = user.id;
          console.log(token)
          console.log(user)
          return token;
        },
      },
      secret: "jj",
      // pages: {
      //   signIn: "/auth/signin", // Optional: Custom sign-in page
      // },
    
      // callbacks: {
      //   async session({ session, token, user }) {
      //     // Add additional fields to the session object
      //     session.user.id = token.sub; // Add user ID from Google
      //     session.user.accessToken = token.accessToken; // Add accessToken if needed
      //     return session;
      //   },
      //   async jwt({ token, account, user }) {
      //     if (account) {
      //       // Add account details to the token
      //       token.accessToken = account.access_token;
      //     }
      //     return token;
      //   },
      // },
      pages: {
    signIn: "/auth/signin", // Custom sign-in page
      // Custom error page
},
}
  
)

export { handler as GET, handler as POST ,   }


