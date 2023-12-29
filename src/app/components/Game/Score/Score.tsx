import { Heading } from "@chakra-ui/react";

interface ScoreProps {
  score: number;
}

export const Score = ({ score }: ScoreProps) => {
  return <Heading size="md">Your score is: {score}</Heading>;
};
