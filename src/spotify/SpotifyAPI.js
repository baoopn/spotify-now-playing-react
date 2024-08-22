import querystring from "querystring";


const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=5`; // Recently played tracks
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN;

const getAccessToken = async () => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

export const getNowPlaying = async (client_id, client_secret, refresh_token) => {
  const { access_token } = await getAccessToken(
    client_id,
    client_secret,
    refresh_token
  );

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

// Get recently played tracks
export const getRecentlyPlayed = async (client_id, client_secret, refresh_token) => {
  const { access_token } = await getAccessToken(
    client_id,
    client_secret,
    refresh_token
  );

  return fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export default async function getNowPlayingItem(
  client_id,
  client_secret,
  refresh_token
) {
  const response = await getNowPlaying(client_id, client_secret, refresh_token);
  if (response.status === 204 || response.status > 400) {
    return false;
  }

  const song = await response.json();
  const albumImageUrl = song.item.album.images[0].url;
  const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
  const isPlaying = song.is_playing;
  const songUrl = song.item.external_urls.spotify;
  const title = song.item.name;
  const progress_ms = song.progress_ms;
  const duration_ms = song.item.duration_ms;

  return {
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
    progress_ms,
    duration_ms,
  };
}

export async function getRecentlyPlayedTracks(
  client_id,
  client_secret,
  refresh_token
) {
  const response = await getRecentlyPlayed(client_id, client_secret, refresh_token);
  if (response.status > 400) {
    return false;
  }

  const data = await response.json();
  return data.items.map(track => ({
    albumImageUrl: track.track.album.images[0].url,
    artist: track.track.artists.map(artist => artist.name).join(", "),
    playedAt: track.played_at,
    songUrl: track.track.external_urls.spotify,
    title: track.track.name,
  }));
}