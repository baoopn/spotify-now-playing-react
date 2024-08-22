import { ChakraProvider, Box, Flex, Text, Link } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import SpotifyNowPlaying from './spotify/SpotifyNowPlaying';
import SpotifyRecentTracks from './spotify/SpotifyRecentTracks';
import { ColorModeSwitcher } from './ColorModeSwitcher';
require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Box textAlign="right" p={3}>
        <ColorModeSwitcher initialColorMode="dark" />
      </Box>

      <Flex direction="column" justifyContent="center" alignItems="center" minHeight="90vh" mb={6}>
        <Box textAlign="start" mb={6} mx={12}>
          <h1>Explore the tracks I'm listening to right now and check out my recent Spotify activity.</h1>
          <Text mt={4}>
            Discover more about me and my work on my personal page: <Link href="https://baoopn.com" color="teal.500" isExternal>baoopn.com</Link>.
          </Text>
        </Box>

        <Flex direction={{ base: "column", md: "row" }} justifyContent="center" alignItems="top" gap={6} overflowY={{ base: "auto", md: "hidden" }} overflowX="auto">
          <SpotifyNowPlaying />
          <SpotifyRecentTracks />
        </Flex>
      </Flex>

    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);