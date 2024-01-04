import { Score } from "./Score";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { GameOptions, type GameOptionsProps } from ".";
import { isGameFinished, isGameNotStarted } from "@/common/helpers";

interface GameBodyProps extends GameOptionsProps {
  score: number;
  streak: number;
  currentRound: number;
}

export const GameBody = ({
  score,
  streak,
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
    <Box w={"100%"}>
      <Flex justifyContent={"space-between"}>
        <Text>Score: {score}</Text>
        {streak > 0 && <Text fontWeight={"bold"}>{streak} 🔥</Text>}
      </Flex>

      <GameOptions {...gameOptionProps} />
    </Box>
  );
};
