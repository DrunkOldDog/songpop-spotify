import { MenuButton as ChakraMenuButton } from '@chakra-ui/react';
import styled from '@emotion/styled';

const MenuButton = styled(ChakraMenuButton)`
  color: #fff;
  svg {
    transition: fill 300ms var(--chakra-transition-easing-ease-in);
  }

  &:hover {
    color: #1ed760;

    svg {
      fill: #1ed760;
    }
  }
`;

export const Styled = { MenuButton };
