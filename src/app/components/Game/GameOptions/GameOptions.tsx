"use client";

import { GameTrack } from "@/common/types";
import { SimpleGrid } from "@chakra-ui/react";
import { GameOption } from "./Option";

export interface GameOptionsProps {
  tracks: GameTrack[];
  selectedTrackId: string | null;
  onSelect: (selectedTrackId: string, isCorrect: boolean) => void;
}

export const GameOptions = ({
  tracks,
  selectedTrackId,
  onSelect,
}: GameOptionsProps) => {
  return (
    <SimpleGrid columns={2} spacing={2} width="100%">
      {tracks.map((track) => (
        <GameOption
          key={track.id}
          track={track}
          selectedTrackId={selectedTrackId}
          onSelect={(trackId) => onSelect(trackId, track.isCurrent)}
        />
      ))}
    </SimpleGrid>
  );
};
