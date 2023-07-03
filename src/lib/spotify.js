import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
  'user-read-email',
  'user-read-private',
  'playlist-read-private',
  'playlist-read-collaborative',
  'streaming',
  'user-library-read',
  'user-library-modify',
  'user-read-playback-position',
  'user-top-read',
  'user-read-recently-played',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-follow-read',
].join(',');

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params).toString();

export const loginUrl =
  'https://accounts.spotify.com/authorize?' + queryParamString;

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

export const fetchUser = () => {
  return spotifyApi.getMe();
};

export const fetchUserPlaylists = () => {
  return spotifyApi.getUserPlaylists();
};

export const fetchTopArtists = (limit, timeRange) => {
  return spotifyApi.getMyTopArtists({
    limit: limit,
    time_range: timeRange,
  });
};

export const fetchDataArtist = (id) => {
  return spotifyApi.getArtist(id);
};

export const fetchTopTracks = (limit, timeRange) => {
  return spotifyApi.getMyTopTracks({
    limit: limit,
    time_range: timeRange,
  });
};

export const fetchRecentlyPlayedTracks = () => {
  return spotifyApi.getMyRecentlyPlayedTracks();
};

export const fetchPlaylistDetails = (id) => {
  return spotifyApi.getPlaylist(id);
};

export const fetchPlaylistTracks = (id, limit, offset) => {
  return spotifyApi.getPlaylistTracks(id, { limit, offset });
};

export const fetchCurrentPlayingTrack = () => {
  return spotifyApi.getMyCurrentPlayingTrack();
};

export const fetchCurrentPlaybackState = () => {
  return spotifyApi.getMyCurrentPlaybackState();
};

export const play = () => {
  return spotifyApi.play();
};

export const pause = () => {
  return spotifyApi.pause();
};

export const skipToPrevious = () => {
  return spotifyApi.skipToPrevious();
};

export const skipToNext = () => {
  return spotifyApi.skipToNext();
};

export const adjustVolume = (volume) => {
  return spotifyApi.setVolume(volume);
};

export const setShuffle = (state) => {
  return spotifyApi.setShuffle(state);
};

export const setRepeat = (state) => {
  return spotifyApi.setRepeat(state);
};

export const fetchAvailableDevices = () => {
  return spotifyApi.getMyDevices();
};

export const fetchTrackDetail = (id) => {
  return spotifyApi.getTrack(id);
};

export const fetchAudioFeaturesForTrack = (id) => {
  return spotifyApi.getAudioFeaturesForTrack(id);
};

export const fetchUserData = async () => {
  const playlists = await fetchUserPlaylists();
  const topArtists = await fetchTopArtists(10, 'long_term');
  const topTracks = await fetchTopTracks(10, 'long_term');

  return { playlists, topArtists, topTracks };
};
