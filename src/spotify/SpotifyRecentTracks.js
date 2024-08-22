import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Image,
  Text,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { getRecentlyPlayedTracks } from "./SpotifyAPI";
import SpotifyLogo from "./SpotifyLogo";

const SpotifyRecentTracks = (props) => {
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getRecentlyPlayedTracks(
        props.client_id,
        props.client_secret,
        props.refresh_token
      ).then((results) => {
        setTracks(results);
        setLoading(false);
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, [props.client_id, props.client_secret, props.refresh_token]);

  return (
      <Box width="xs">
        {loading ?
          <Stack align="center" mb={8}>
            <Spinner size="md" speed="0.6s" thickness={3} color="gray.500" />
          </Stack>
          :
          <Stack width="full" spacing={3}>
            <Stack spacing={2} direction="row" align="center">
              <SpotifyLogo />
              <Text fontWeight="semibold">Recently played</Text>
            </Stack>
            {tracks.map((track, index) => (
              <Box key={index} p={2} borderRadius="lg" borderWidth={1}>
                <Stack direction="row" spacing={4} align="center">
                  <Image
                    alt={`${track.title} album art`}
                    src={track.albumImageUrl}
                    width={12}
                    height={12}
                    borderRadius="sm"
                  />
                  <Stack spacing={0} overflow="hidden">
                    <Link href={track.songUrl} target="_blank">
                      <Text
                        fontWeight="semibold"
                        width="full"
                        isTruncated
                        color="alph"
                      >
                        {track.title}
                      </Text>
                    </Link>
                    <Text
                      color="gray.500"
                      isTruncated
                    >
                      {track.artist}
                    </Text>
                    <Text></Text>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Stack>
        }
      </Box>
  )
};

export default SpotifyRecentTracks;