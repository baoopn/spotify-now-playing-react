import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Image,
  Text,
  Link,
  Spinner,
  Progress,
} from "@chakra-ui/react";
import getNowPlayingItem from "./SpotifyAPI";
import SpotifyLogo from "./SpotifyLogo";
import PlayingAnimation from "./PlayingAnimation";
import '../App.css';


const SpotifyNowPlaying = (props) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({});

  // useEffect hook to fetch the currently playing item at regular intervals
  useEffect(() => {
    // Set up an interval to fetch the currently playing item every 1000 milliseconds
    const intervalId = setInterval(() => {
      getNowPlayingItem(
        props.client_id,
        props.client_secret,
        props.refresh_token
      ).then((result) => {
        // Update the result state with the fetched data
        setResult(result);
        // Set loading state to false once data is fetched
        setLoading(false);
      });
    }, 1000);

  // Clean up function to clear the interval when the component unmounts or dependencies change
  return () => clearInterval(intervalId);
}, [props.client_id, props.client_secret, props.refresh_token]);

  return (
    <Box width="xs">
      {loading ?
        <Stack align="center" mb={8}>
          <Spinner size="md" speed="0.6s" thickness={3} color="gray.500" />
        </Stack>
        :
        <Stack width="full" mb={result.isPlaying ? 2 : 4} spacing={3}>
          <Stack spacing={2} direction="row" align="center">
            <SpotifyLogo />
            <Text fontWeight="semibold">{result.isPlaying ? 'Now playing' : "Currently offline"}</Text>
            {result.isPlaying && <PlayingAnimation />}
          </Stack>
          {result.isPlaying &&
            <Box p={4} borderRadius="lg" borderWidth={1}>
              <Stack direction="column" spacing={4} align="center">
                <Image
                  alt={`${result.title} album art`}
                  src={result.albumImageUrl}
                  width={72}
                  height={72}
                  borderRadius="md"
                />
                <Stack spacing={0} overflow="hidden" width="full">
                  <Link href={result.songUrl} target="_blank">
                    <Text
                      fontWeight="semibold"
                      width="full"
                      isTruncated
                      color="alph"
                    >
                      {result.title}
                    </Text>
                  </Link>
                  <Text
                    color="gray.500"
                    isTruncated
                  >
                    {result.artist}
                  </Text>
                  <Progress
                    size="xs"
                    colorScheme="green"
                    borderRadius="md"
                    value={(result.progress_ms / result.duration_ms) * 100}
                  />
                </Stack>
              </Stack>
            </Box>
          }
        </Stack>
      }
    </Box>
  )
};

export default SpotifyNowPlaying;