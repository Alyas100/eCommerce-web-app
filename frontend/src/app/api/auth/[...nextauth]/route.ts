import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Function to save user to backend database
async function saveUserToBackend(user: any, account: any) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        name: user.name,
        image: user.image,
        googleId: account.providerAccountId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save user to backend");
    }

    const result = await response.json();
    console.log("User saved to backend", result);
    return result;
  } catch (error) {
    console.error("Error saving user to backend:", error);
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      // This runs every time user signs in
      if (account?.provider === "google") {
        await saveUserToBackend(user, account);
      }
      return true; // Allow sign in to continue
    },
    async jwt({ token, account, profile, user }) {
      // Store additional user info in token
      if (account) {
        token.accessToken = account.access_token;
        // later can store backend user ID in the token here
        // token.backendId = backendUser.id;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
