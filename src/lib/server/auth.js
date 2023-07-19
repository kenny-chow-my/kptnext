
//import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  //adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // session.accessToken = token.accessToken
      // session.user.id = token.id
      console.log('here');
      console.log(session);
      console.log(token);
      console.log(user);
      if(session && session.user){
        session.user.id = token.email;
        session.user.accessToken = token.accessToken;
        session.user.idToken = token.idToken;
      }
      
      // session.accessToken = token.account.accessToken
      return session;
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  debug: !(process.env.NODE_ENV === 'production'),

  providers: [
    // EmailProvider({
    //   from: process.env.EMAIL_FROM,
    //   server: emailConfig,
    //   sendVerificationRequest: async ({ identifier: email, url }) => {
    //     const { host } = new URL(url);
    //     await sendMail({
    //       html: html({ email, url }),
    //       subject: `[Nextacular] Sign in to ${host}`,
    //       text: text({ email, url }),
    //       to: email,
    //     });
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      }),
  ],
  secret: process.env.NEXTAUTH_SECRET || null,
  session: {
    jwt: true,
  },
};
