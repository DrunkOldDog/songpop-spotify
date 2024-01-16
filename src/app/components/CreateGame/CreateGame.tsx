"use client";

import { Button, Input, useToast } from "@chakra-ui/react";
import { FormEventHandler, useRef, useState } from "react";
import { createGame } from "@/app/actions/createGame";
import { getSession } from "next-auth/react";
import { getPlaylistIdFromInput } from "@/common/helpers";

import type { AxiosError } from "axios";

export const CreateGame = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const playlistInputRef = useRef<HTMLInputElement>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setLoading(true);
    const { user } = (await getSession()) || {};

    try {
      await createGame({
        playlistId: getPlaylistIdFromInput(
          playlistInputRef.current?.value ?? ""
        ),
        userId: user!.userId,
      });
    } catch (err) {
      const error = err as AxiosError;
      toast({
        title: "Something went wrong",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        ref={playlistInputRef}
        placeholder="Paste your Spotify Playlist URL"
        mb={6}
      />

      <Button width={"100%"} isLoading={loading} type="submit">
        Create Game
      </Button>
    </form>
  );
};
