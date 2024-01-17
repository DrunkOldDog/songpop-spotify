"use client";

import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { createGame } from "@/app/actions/createGame";
import { getSession } from "next-auth/react";
import { getPlaylistIdFromInput } from "@/common/helpers";
import { createGameSchema } from "./CreateGame.schema";

import type { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = { playlistUrl: string };

export const CreateGame = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(createGameSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const { user } = (await getSession()) || {};

    try {
      await createGame({
        playlistId: getPlaylistIdFromInput(data.playlistUrl),
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb={6} isInvalid={Boolean(errors.playlistUrl)}>
        <Input
          {...register("playlistUrl", { required: true })}
          placeholder="Paste your Spotify Playlist URL"
        />
        {errors.playlistUrl && (
          <FormErrorMessage>{errors.playlistUrl.message}</FormErrorMessage>
        )}
      </FormControl>

      <Button width={"100%"} isLoading={loading} type="submit">
        Create Game
      </Button>
    </form>
  );
};
