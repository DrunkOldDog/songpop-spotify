import { isGameFinished, isGameNotStarted } from "@/common/helpers";
import { Button, HStack } from "@chakra-ui/react";

interface GameButtonsProps {
  currentRound: number;
  onNextRound: () => void;
  onGameFinished: () => void;
}

export const GameButtons = ({
  currentRound,
  onNextRound,
  onGameFinished,
}: GameButtonsProps) => {
  const getActionBtnLabel = () => {
    if (isGameNotStarted(currentRound)) {
      return "Start Game";
    }

    if (isGameFinished(currentRound)) {
      return "Finish Game";
    }

    return "Next Round";
  };

  return (
    <HStack>
      <Button
        onClick={isGameFinished(currentRound) ? onGameFinished : onNextRound}
      >
        {getActionBtnLabel()}
      </Button>
    </HStack>
  );
};
