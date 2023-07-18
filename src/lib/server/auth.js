import { PrismaAdapter } from '@next-auth/prisma-adapter';
//import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';

import prisma from '@/prisma/index';
import { createPaymentAccount, getPayment } from '@/prisma/services/customer';

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
      }
      
      // session.accessToken = token.account.accessToken
      return session
    },
  },
  debug: !(process.env.NODE_ENV === 'production'),
  // events: {
  //   signIn: async ({ user, isNewUser }) => {
  //     // const customerPayment = await getPayment(user.email);

  //     // if (isNewUser || customerPayment === null || user.createdAt === null) {
  //     //   await Promise.all([createPaymentAccount(user.email, user.id)]);
  //     // }
  //   },
  // },
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
