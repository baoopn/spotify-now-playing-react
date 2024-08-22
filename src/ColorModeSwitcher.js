import React from 'react';
import { useColorMode, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export function ColorModeSwitcher(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
      {...props}
    />
  );
}