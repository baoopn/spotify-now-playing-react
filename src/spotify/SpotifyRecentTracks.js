import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Image,
  Text,
  Link,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
// import { getRecentlyPlayedTracks } from "./SpotifyAPI";
import SpotifyLogo from "./SpotifyLogo";
import { RECENTLY_PLAYED_ENDPOINT } from "./Constants";

const SpotifyRecentTracks = (props) => {
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(RECENTLY_PLAYED_ENDPOINT)
        .then(response => response.json())
        .then(results => {
          setTracks(results);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching recently played tracks:', error);
        });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box width="xs">
      {loading ?
        <Stack align="center" mb={8}>
          <Spinner size="md" speed="0.6s" thickness="3" color="gray.500"/>
        </Stack>
        :
        <Stack width="full" spacing={3}>
          <Stack spacing={2} direction="row" align="center">
            <SpotifyLogo/>
            <Text fontWeight="semibold">Recently Played</Text>
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
                  <Tooltip label={track.title} hasArrow>
                    <Link href={track.songUrl} alignSelf="self-start" isExternal>
                      <Text
                        fontWeight="semibold"
                        width="full"
                        isTruncated
                        color="alph"
                      >
                        {track.title}
                      </Text>
                    </Link>
                  </Tooltip>
                  <Tooltip label={track.artist} hasArrow>
                    <Text
                      color="gray.500"
                      isTruncated
                      alignSelf="self-start"
                    >
                      {track.artist}
                    </Text>
                  </Tooltip>
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