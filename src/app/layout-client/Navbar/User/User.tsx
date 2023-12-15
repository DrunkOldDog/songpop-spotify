import {
  Avatar,
  Hide,
  Icon,
  Menu,
  MenuItem,
  MenuList,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { FaCaretDown } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { Styled } from "./User.styles";
import { Session } from "next-auth";

export const User = (user: Session['user']) => {
  return (
    <Menu>
      <Styled.MenuButton>
        <Wrap align={"center"}>
          <WrapItem>
            <Avatar
              name={user!.name ?? ""}
              src={user!.image ?? ""}
              size={{ base: "sm", lg: "md" }}
            />
          </WrapItem>
          <Hide below="lg">
            <WrapItem>
              <Text fontWeight={"bold"} transition="200ms">
                Profile
              </Text>
            </WrapItem>
          </Hide>

          <WrapItem>
            <Icon as={FaCaretDown} mt={0.5} fill="#fff" />
          </WrapItem>
        </Wrap>
      </Styled.MenuButton>
      <MenuList>
        <MenuItem onClick={() => signOut()} fontWeight="bold">
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
