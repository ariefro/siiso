import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-email",
  "user-read-private",
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
  "user-library-read",
  "user-library-modify",
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-follow-read",
].join(",");

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params).toString();

export const loginUrl =
  "https://accounts.spotify.com/authorize?" + queryParamString;

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

export const fetchUser = async () => {
  return await spotifyApi.getMe();
};

export const fetchPlaylists = async () => {
  return await spotifyApi.getUserPlaylists();
};

export const fetchTopArtists = async () => {
  return await spotifyApi.getMyTopArtists({
    limit: 10,
    time_range: "long_term",
  });
};

export const fetchTopTracks = async () => {
  return await spotifyApi.getMyTopTracks({
    limit: 10,
    time_range: "long_term",
  });
};

export const fetchUserData = async () => {
  const user = await fetchUser();
  const playlists = await fetchPlaylists();
  const topArtists = await fetchTopArtists();
  const topTracks = await fetchTopTracks();

  return { user, playlists, topArtists, topTracks };
};
