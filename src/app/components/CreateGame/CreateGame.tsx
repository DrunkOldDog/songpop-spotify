"use client";

import { Button, Input } from "@chakra-ui/react";
import { FormEventHandler, useRef } from "react";

import type { CreateGameBody } from "@/app/types";
import axios from "axios";
import { SERVER } from "@/app/common/server";

export const CreateGame = () => {
  const playlistInputRef = useRef<HTMLInputElement>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const body: CreateGameBody = {
      playlistId: playlistInputRef.current?.value ?? "",
    };

    const data = await axios.post(SERVER.CREATE_GAME, body);
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
