"use client";

import { Button, Input } from "@chakra-ui/react";
import { FormEventHandler, useRef } from "react";
import { createGame } from "@/app/actions/createGame";
import { getSession } from "next-auth/react";

export const CreateGame = () => {
  const playlistInputRef = useRef<HTMLInputElement>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const { user } = (await getSession()) || {};
    const data = await createGame({
      playlistId: playlistInputRef.current?.value ?? "",
      userId: user!.userId,
    });
    console.log({ data });
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
