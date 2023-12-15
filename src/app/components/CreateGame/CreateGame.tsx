"use client";

import { Button, Input } from "@chakra-ui/react";
import { FormEventHandler, useRef } from "react";

export const CreateGame = () => {
  const playlistInputRef = useRef<HTMLInputElement>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(playlistInputRef.current?.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        ref={playlistInputRef}
        placeholder="Paste your Spotify Playlist URL"
      />

      <Button type="submit">Create Game</Button>
    </form>
  );
};
