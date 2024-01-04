"use client";

import { Box, Center, useFocusEffect } from "@chakra-ui/react";
import { GAME_ROUNDS, START_ROUND } from "@/common/constants";
import { getSongScore } from "@/common/helpers";
import { HOME } from "@/common/routes";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { GameButtons } from "./GameButtons";
import { Playlist } from "../Playlist";
import { GameBody } from "./GameBody";

import type { Game } from "@/common/types";

interface GamePageProps {
  game: Game;
}

const GamePage = ({ game }: GamePageProps) => {
  const audioRef = useRef<HTMLAudioElement>();
  const startTime = useRef(new Date());
  const { push } = useRouter();

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentRound, setCurrentRound] = useState(-1);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

  useEffect(() => {
    // pause song when returning to home page
    return () => audioRef.current?.pause();
  }, []);

  useEffect(() => {
    // added -1 because round start at position 0
    if (currentRound === START_ROUND - 1 || currentRound > GAME_ROUNDS - 1) {
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
      const endTime = new Date();
      const totalTime =
        (endTime.getTime() - startTime.current.getTime()) / 1000;

      const newSongScore = Math.round(getSongScore(totalTime, streak));
      setScore((prevScore) => prevScore + newSongScore);
      setStreak((prevStreak) => prevStreak + 1);
    } else {
      setStreak(0);
    }
  };

  const onNextRound = () => {
    startTime.current = new Date();
    setSelectedTrackId(null);
    setCurrentRound(currentRound + 1);
  };

  return (
    <Box h={"100svh"}>
      <Center flexDirection={"column"} h={"100%"} gap={8}>
        <Playlist playlist={game.playlist} />

        <GameBody
          score={score}
          streak={streak}
          currentRound={currentRound}
          tracks={game.tracks[currentRound]}
          selectedTrackId={selectedTrackId}
          onSelect={onSelect}
        />

        <GameButtons
          currentRound={currentRound}
          onNextRound={onNextRound}
          onGameFinished={() => push(HOME)}
        />
      </Center>
    </Box>
  );
};

export default GamePage;
