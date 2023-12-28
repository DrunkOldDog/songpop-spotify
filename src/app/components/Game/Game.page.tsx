"use client";

import { Box } from "@chakra-ui/react";
import { Playlist } from "../Playlist";
import { GameOptions } from ".";

import type { Game } from "@/common/types";
import { useState } from "react";

interface GamePageProps {
  game: Game;
}

const GamePage = ({ game }: GamePageProps) => {
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

  const onSelect = (trackId: string) => {
    setSelectedTrackId(trackId);
  };

  return (
    <Box>
      <Playlist playlist={game.playlist} />

      <GameOptions
        tracks={game.tracks[0]}
        selectedTrackId={selectedTrackId}
        onSelect={onSelect}
      />
    </Box>
  );
};

export default GamePage;
