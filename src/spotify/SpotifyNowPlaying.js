import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Image,
  Text,
  Link,
  Spinner,
  Progress,
  Tooltip,
} from "@chakra-ui/react";
// import getNowPlayingItem from "./SpotifyAPI";
import SpotifyLogo from "./SpotifyLogo";
import PlayingAnimation from "./PlayingAnimation";
import { CURRENTLY_PLAYING_ENDPOINT } from "./Constants";
import '../App.css';


const SpotifyNowPlaying = (props) => {
  const [loading, setLoading] = useState(true);
  const [track, setTrack] = useState({});

  // useEffect hook to fetch the currently playing item at regular intervals
  useEffect(() => {
    // Set up an interval to fetch the currently playing item every 1000 milliseconds
    const intervalId = setInterval(() => {
      fetch(CURRENTLY_PLAYING_ENDPOINT)
        .then(response => response.json())
        .then(track => {
          // Update the track state with the fetched data
          setTrack(track);
          // Set loading state to false once data is fetched
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching currently playing track:', error);
        });
    }, 1000);

    // Clean up function to clear the interval when the component unmounts or dependencies change
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box width="xs">
      {loading ?
        <Stack align="center" mb={8}>
          <Spinner size="md" speed="0.6s" thickness="3" color="gray.500"/>
        </Stack>
        :
        <Stack width="full" mb={track.isPlaying ? 2 : 4} spacing={3}>
          <Stack spacing={2} direction="row" align="center">
            <SpotifyLogo/>
            <Text fontWeight="semibold">{track.isPlaying ? 'Now Playing' : 'Currently Offline'}</Text>
            {track.isPlaying && <PlayingAnimation/>}
          </Stack>
          {track.isPlaying &&
            <Box p={4} borderRadius="lg" borderWidth={1}>
              <Stack direction="column" spacing={4} align="center">
                <Box position="relative">
                  <Image
                    src={track.albumImageUrl}
                    alt={`${track.title} by ${track.artist}`}
                    width={64}
                    height={64}
                    borderRadius="50%"
                    className="rotating-disk"
                  />
                  <div className="center-circle"></div>
                  <div className="smaller-white-circle"></div>
                </Box>
                <Stack spacing={1} overflow={"hidden"} width="full">
                  <Tooltip label={track.title} alignSelf="self-start" hasArrow>
                    <Link href={track.songUrl} alignSelf="self-start" isExternal>
                      <Text
                        fontWeight="semibold"
                        fontSize="x-large"
                        width="full"
                        isTruncated
                        color="alph"
                      >
                        {track.title}
                      </Text>
                    </Link>
                  </Tooltip>
                  <Tooltip label={track.artist} alignSelf="self-start" hasArrow>
                    <Text
                      color="gray.500"
                      isTruncated
                      alignSelf="self-start"
                    >
                      {track.artist}
                    </Text>
                  </Tooltip>
                  <Progress
                    size="xs"
                    colorScheme="green"
                    borderRadius="md"
                    value={(track.progress_ms / track.duration_ms) * 100}
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