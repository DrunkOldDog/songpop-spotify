import { Box } from "@chakra-ui/react";

interface ScoreProps {
  score: number;
}

export const Score = ({ score }: ScoreProps) => {
  return <Box>Your score is: {score}</Box>;
};
