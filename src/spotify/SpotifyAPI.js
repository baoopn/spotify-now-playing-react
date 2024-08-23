import querystring from "querystring";

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=5`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const SECRETS_ENDPOINT = `/tokens`;

const fetchTokens = async () => {
  const response = await fetch(SECRETS_ENDPOINT);
  if (!response.ok) {
    throw new Error('Failed to fetch tokens');
  }
  return response.json();
};

const getAccessToken = async (client_id, client_secret, refresh_token) => {
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

export const getNowPlaying = async () => {
  const { clientId, clientSecret, refreshToken } = await fetchTokens();
  const { access_token } = await getAccessToken(clientId, clientSecret, refreshToken);

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getRecentlyPlayed = async () => {
  const { clientId, clientSecret, refreshToken } = await fetchTokens();
  const { access_token } = await getAccessToken(clientId, clientSecret, refreshToken);

  return fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export default async function getNowPlayingItem() {
  const response = await getNowPlaying();
  if (response.status === 204 || response.status > 400) {
    return false;
  }

  try {
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
  } catch (error) {
    return false;
  }
  
}

export async function getRecentlyPlayedTracks() {
  const response = await getRecentlyPlayed();
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