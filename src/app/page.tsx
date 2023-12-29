import { Container, Heading, Text } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { CreateGame } from "@/app/components/CreateGame";
import { Navbar } from "@/layout";
import type { Session } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return (
    <>
      <Navbar {...(session ?? ({} as Session))} />

      <Container pt={10}>
        {session ? (
          <>
            <Heading as="h1" textAlign={"center"} mb={4}>
              Insert your Spotify Playlist Shareable URL to start playing
            </Heading>
            <Text mb={4}>
              For instance
              https://open.spotify.com/playlist/11OuS0TQgnaWng2srx0DZv?si=fccb74f4071b4d43
            </Text>

            <CreateGame />
          </>
        ) : (
          <Heading as="h1">Please sign in to play</Heading>
        )}
      </Container>
    </>
  );
}
