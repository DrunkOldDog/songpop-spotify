'use client';

import { Box, Button, Container, Flex } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';

import { Spotify } from '@/assets/icons';
import { NAVBAR_HEIGHT } from '@/common/constants';

import { User } from './User';

export const Navbar = ({ user }: Session) => {
  const { push } = useRouter();

  return (
    <Box
      bgColor={'#000'}
      height={{
        base: `${NAVBAR_HEIGHT.BASE}px`,
        lg: `${NAVBAR_HEIGHT.LARGE}px`,
      }}
    >
      <Container height={'100%'}>
        <Flex
          justifyContent={'space-between'}
          alignItems="center"
          height="100%"
        >
          <Box cursor={'pointer'} onClick={() => push('/')}>
            <Spotify fill="#fff" height={{ base: '26px', lg: '40px' }} />
          </Box>
          {!user ? (
            <Button
              size={{ base: 'sm', lg: 'md' }}
              onClick={() => signIn('spotify')}
            >
              Log In
            </Button>
          ) : (
            <User {...user} />
          )}
        </Flex>
      </Container>
    </Box>
  );
};
