import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
  'user-read-email',
  'user-read-private',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-modify-private',
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

export const fetchTopArtists = ({ limit, range }) => {
  return spotifyApi.getMyTopArtists({
    limit: limit,
    time_range: range,
  });
};

export const fetchDataArtist = (id) => {
  return spotifyApi.getArtist(id);
};

export const fetchTopTracks = ({ limit, range }) => {
  return spotifyApi.getMyTopTracks({
    limit: limit,
    time_range: range,
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

export const play = (uris) => {
  return spotifyApi.play({ uris });
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

export const fetchTrackAudioFeatures = (id) => {
  return spotifyApi.getAudioFeaturesForTrack(id);
};

export const fetchTracksAudioFeatures = (tracks) => {
  const ids = tracks.map(({ track }) => track.id);
  return spotifyApi.getAudioFeaturesForTracks(ids);
};

export const fetchTrackAudioAnalysis = (id) => {
  return spotifyApi.getAudioAnalysisForTrack(id);
};

const getTrackIds = (tracks) => tracks.map(({ track }) => track.id).join(',');

export const createPlaylist = (name) => {
  return spotifyApi.createPlaylist(name);
};

export const addTracksToPlaylist = (playlistID, tracks) => {
  return spotifyApi.addTracksToPlaylist(playlistID, tracks);
};

export const fetchUserData = async () => {
  const playlists = await fetchUserPlaylists();
  const topArtists = await fetchTopArtists({ limit: 10, range: 'long_term' });
  const topTracks = await fetchTopTracks({ limit: 10, range: 'long_term' });

  return { playlists, topArtists, topTracks };
};

export const fetchTrackData = async (id) => {
  const track = await fetchTrackDetail(id);
  const audioAnalysis = await fetchTrackAudioAnalysis(id);
  const audioFeatures = await fetchTrackAudioFeatures(id);

  return { track, audioAnalysis, audioFeatures };
};

export const getRecommendationsForTracks = (tracks) => {
  const seedTracks = getTrackIds(tracks.slice(0, 5));
  const seedArtists = '';
  const seedGenres = '';

  return spotifyApi.getRecommendations({
    limit: 25,
    seed_tracks: seedTracks,
    seed_artists: seedArtists,
    seed_genres: seedGenres,
  });
};
