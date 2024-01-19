'use client';

import { Box, Heading, Image, Text } from '@chakra-ui/react';

import type { Playlist as PlaylistType } from '@/common/types';

interface PlaylistProps {
  playlist: PlaylistType;
}

export const Playlist = ({ playlist }: PlaylistProps) => (
  <Box display={'flex'} flexDir={'column'} alignItems={'center'}>
    <Image
      alt={playlist.name}
      src={playlist.images[0].url}
      height={[40, 48, 56, 56]}
      mb={4}
    />

    <Box maxW={360} textAlign="center">
      <Heading as="h2" size={'lg'}>
        {playlist.name}
      </Heading>
      <Text>{playlist.description}</Text>
    </Box>
  </Box>
);
