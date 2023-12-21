import { Container, Heading, Text } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { CreateGame } from "@/app/components/CreateGame";

export default async function Home() {
  const data = await getServerSession();

  return (
    <Container pt={10}>
      {data ? (
        <>
          <Heading as="h1">
            Insert your Spotify Playlist Shareable URL to start playing
          </Heading>
          <Text>
            For instance
            https://open.spotify.com/playlist/11OuS0TQgnaWng2srx0DZv?si=fccb74f4071b4d43
          </Text>

          <CreateGame />
        </>
      ) : (
        <Heading as="h1">Please sign in to play</Heading>
      )}
    </Container>
  );
}
