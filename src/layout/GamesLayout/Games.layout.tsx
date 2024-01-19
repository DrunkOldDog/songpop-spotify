'use client';

import { Box, Container } from '@chakra-ui/react';

import type { ReactNode } from 'react';

interface GamesLayoutProps {
  children: ReactNode;
}

export const GamesLayout = ({ children }: GamesLayoutProps) => {
  return (
    <Box backgroundColor={'blackAlpha.900'} color="#fff" height={'100vh'}>
      <Container>{children}</Container>
    </Box>
  );
};
