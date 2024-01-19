import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';

import {
  getSongScore,
  isGameFinished,
  isGameNotStarted,
} from '@/common/helpers';

import { Score } from './Score';

import { GameOptions, type GameOptionsProps } from '.';

interface GameBodyProps extends Omit<GameOptionsProps, 'onSelect'> {
  startTime: Date;
  currentRound: number;
  onTrackSelect: (trackId: string) => void;
}

export const GameBody = ({
  startTime,
  currentRound,
  onTrackSelect,
  ...gameOptionProps
}: GameBodyProps) => {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  if (isGameNotStarted(currentRound)) {
    return <Heading size="md">Go and start the game dude!</Heading>;
  }

  if (isGameFinished(currentRound)) {
    return <Score score={score} />;
  }

  const onSelect = (trackId: string, isCorrect: boolean) => {
    onTrackSelect(trackId);

    if (isCorrect) {
      const endTime = new Date();
      const totalTime = (endTime.getTime() - startTime.getTime()) / 1000;

      const newSongScore = Math.round(getSongScore(totalTime, streak));
      setScore((prevScore) => prevScore + newSongScore);
      setStreak((prevStreak) => prevStreak + 1);
    } else {
      setStreak(0);
    }
  };

  return (
    <Box w={'100%'}>
      <Flex justifyContent={'space-between'}>
        <Text>Score: {score}</Text>
        {streak > 0 && <Text fontWeight={'bold'}>{streak} 🔥</Text>}
      </Flex>

      <GameOptions {...gameOptionProps} onSelect={onSelect} />
    </Box>
  );
};
