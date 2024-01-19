import { Center, CenterProps, Text } from '@chakra-ui/react';
import { isNil } from 'lodash';

import type { GameTrack } from '@/common/types';

interface GameOptionProps {
  track: GameTrack;
  selectedTrackId: string | null;
  onSelect: (selectedTrackId: string) => void;
}

export const GameOption = ({
  track,
  selectedTrackId,
  onSelect,
}: GameOptionProps) => {
  const getGameOptionStyles = (): CenterProps => {
    if (isNil(selectedTrackId)) {
      return {
        backgroundColor: 'gray.700',
        _hover: { backgroundColor: 'gray.800' },
      };
    }

    return {
      backgroundColor: track.isCurrent ? 'green.400' : 'red.500',
    };
  };

  const onOptionClick = () => {
    // just trigger on select when no option was picked
    if (selectedTrackId) {
      return;
    }

    onSelect(track.id);
  };

  const styleProps = getGameOptionStyles();

  return (
    <Center
      fontWeight={'semibold'}
      borderWidth={2}
      borderRadius={'md'}
      height={20}
      cursor="pointer"
      color={'white'}
      textAlign="center"
      userSelect={'none'}
      p={4}
      onClick={onOptionClick}
      {...styleProps}
    >
      <Text noOfLines={2}>{track.name}</Text>
    </Center>
  );
};
