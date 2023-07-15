# Sisoo

> A web app for visualizing personalized Spotify data

Built with a bunch of things, but to name a few:

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Next.js App](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)

## Setup

1. [Register a Spotify App](https://developer.spotify.com/dashboard/applications) and add `http://localhost:3000/api/auth/callback/spotify` as a Redirect URI in the app settings
2. Create an `.env` file in the root of the project based on `.env.example`
3. `pnpm install`
4. `pnpm dev`

## Deploying to Vercel

1. Import Git Repository

2. Set Vercel environment variables

   ```bash
   CLIENT_ID=XXXXX
   CLIENT_SECRET=XXXXX
   REDIRECT_URI=https://app-name.vercel.app/api/auth/callback/spotify
   JWT_SECRET=XXXXX
   ```

3. Start deployment

4. Add `http://app-name.vercel.app/api/auth/callback/spotify` as a Redirect URI in the spotify application settings

5. Once the app is live on Vercel, hitting http://app-name.vercel.app/login should be the same as hitting http://localhost:3000/login
