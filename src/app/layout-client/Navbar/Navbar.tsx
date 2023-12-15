"use client";

import { Box, Button, Container, Flex, Icon } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User } from "./User";
import { FaSpotify } from "react-icons/fa";
import { Session } from "next-auth";

export const Navbar = ({ user }: Session) => {
  const { push } = useRouter();

  return (
    <Box bgColor={"#000"} height={{ base: "54px", lg: "80px" }}>
      <Container height={"100%"}>
        <Flex
          justifyContent={"space-between"}
          alignItems="center"
          height="100%"
        >
          <Box cursor={"pointer"} onClick={() => push("/")}>
            <Icon
              as={FaSpotify}
              fill="#fff"
              width={{ base: "26px", lg: "40px" }}
              height={{ base: "26px", lg: "40px" }}
            />
          </Box>
          {!user ? (
            <Button
              size={{ base: "sm", lg: "md" }}
              onClick={() => signIn("spotify")}
            >
              Log In
            </Button>
          ) : (
            <User />
          )}
        </Flex>
      </Container>
    </Box>
  );
};
