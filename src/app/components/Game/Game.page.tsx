"use client";

import { Box, Button } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import { Playlist } from "../Playlist";
import { GameOptions } from ".";

import type { Game } from "@/common/types";

interface GamePageProps {
  game: Game;
}

const GamePage = ({ game }: GamePageProps) => {
  const audioRef = useRef<HTMLAudioElement>();
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(-1);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

  useEffect(() => {
    if (currentRound === -1) {
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const currentSong = game.tracks[currentRound].find(
      ({ isCurrent }) => isCurrent
    );

    audioRef.current = new Audio(currentSong?.preview_url);
    audioRef.current.play();
  }, [game, currentRound]);

  const onSelect = (trackId: string, isCorrect: boolean) => {
    setSelectedTrackId(trackId);

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const onNextRound = () => {
    if (currentRound >= 9) {
      return;
    }

    setSelectedTrackId(null);
    setCurrentRound(currentRound + 1);
  };

  return (
    <Box>
      <Playlist playlist={game.playlist} />
      Score: {score}
      {currentRound >= 0 && (
        <GameOptions
          tracks={game.tracks[currentRound]}
          selectedTrackId={selectedTrackId}
          onSelect={onSelect}
        />
      )}
      <Button onClick={onNextRound} disabled={currentRound >= 9}>
        {currentRound >= 0 ? "Next Round" : "Start Game"}
      </Button>
    </Box>
  );
};

export default GamePage;
