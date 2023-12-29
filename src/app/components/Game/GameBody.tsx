import { Score } from "./Score";
import { Box, Heading } from "@chakra-ui/react";
import { GameOptions, type GameOptionsProps } from ".";
import { isGameFinished, isGameNotStarted } from "@/common/helpers";

interface GameBodyProps extends GameOptionsProps {
  score: number;
  currentRound: number;
}

export const GameBody = ({
  score,
  currentRound,
  ...gameOptionProps
}: GameBodyProps) => {
  if (isGameNotStarted(currentRound)) {
    return <Heading size="md">Go and start the game dude!</Heading>;
  }

  if (isGameFinished(currentRound)) {
    return <Score score={score} />;
  }

  return (
    <Box>
      Score: {score}
      <GameOptions {...gameOptionProps} />
    </Box>
  );
};
