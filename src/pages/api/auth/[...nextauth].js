import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import { loginUrl, spotifyApi } from '../../../lib/spotify';

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.access_token);
    spotifyApi.setRefreshToken(token.refresh_token);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      access_token: refreshedToken.access_token,
      access_token_expires: Math.floor(
        Date.now() / 1000 + refreshedToken.expires_in
      ),
      refresh_token: refreshedToken.refresh_token ?? token.refresh_token,
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: loginUrl,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        spotifyApi.setAccessToken(account.access_token);
        spotifyApi.setRefreshToken(account.refresh_token);

        return {
          ...token,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          username: account.providerAccountId,
          access_token_expires: Math.floor(Date.now() / 1000 + 3600),
        };
      } else if (Date.now() / 1000 < token.access_token_expires) {
        console.log('existing access token is valid');

        return token;
      } else {
        console.log('access token has expired, refreshing...');

        return await refreshAccessToken(token);
      }
    },

    async session({ session, token }) {
      session.user.access_token = token.access_token;
      session.user.refresh_token = token.refresh_token;
      session.user.username = token.username;

      return session;
    },
  },
};

export default NextAuth(authOptions);
