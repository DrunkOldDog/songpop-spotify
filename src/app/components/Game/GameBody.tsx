import { GAME_ROUNDS, START_ROUND } from "@/common/constants";
import { Score } from "./Score";
import { Box, Heading } from "@chakra-ui/react";
import { GameOptions, type GameOptionsProps } from ".";

interface GameBodyProps extends GameOptionsProps {
  score: number;
  currentRound: number;
}

export const GameBody = ({
  score,
  currentRound,
  ...gameOptionProps
}: GameBodyProps) => {
  if (currentRound < START_ROUND) {
    return <Heading size="md">Go and start the game dude!</Heading>;
  }

  if (currentRound >= GAME_ROUNDS) {
    return <Score score={score} />;
  }

  return (
    <Box>
      Score: {score}
      <GameOptions {...gameOptionProps} />
    </Box>
  );
};
