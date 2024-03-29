'use client';

import { Box, Center } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { GAME_ROUNDS, START_ROUND } from '@/common/constants';
import { HOME } from '@/common/routes';

import { Playlist } from '../Playlist';

import { GameButtons } from './GameButtons';
import { GameBody } from './GameBody';

import type { Game } from '@/common/types';

interface GamePageProps {
  game: Game;
}

const GamePage = ({ game }: GamePageProps) => {
  const audioRef = useRef<HTMLAudioElement>();
  const startTime = useRef(new Date());
  const { push } = useRouter();

  const [currentRound, setCurrentRound] = useState(-1);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

  useEffect(() => {
    // pause song when returning to home page
    return () => audioRef.current?.pause();
  }, []);

  useEffect(() => {
    // added -1 because round start at position 0
    if (currentRound === START_ROUND - 1 || currentRound > GAME_ROUNDS - 1) {
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const currentSong = game.tracks[currentRound].find(
      ({ isCurrent }) => isCurrent
    );

    audioRef.current = new Audio(currentSong?.preview_url);
    audioRef.current.play();
  }, [game, currentRound]);

  const onNextRound = () => {
    startTime.current = new Date();
    setSelectedTrackId(null);
    setCurrentRound(currentRound + 1);
  };

  return (
    <Box h={'100svh'}>
      <Center flexDirection={'column'} h={'100%'} gap={8}>
        <Playlist playlist={game.playlist} />

        <GameBody
          startTime={startTime.current}
          currentRound={currentRound}
          onTrackSelect={setSelectedTrackId}
          tracks={game.tracks[currentRound]}
          selectedTrackId={selectedTrackId}
        />

        <GameButtons
          currentRound={currentRound}
          onNextRound={onNextRound}
          onGameFinished={() => push(HOME)}
        />
      </Center>
    </Box>
  );
};

export default GamePage;
