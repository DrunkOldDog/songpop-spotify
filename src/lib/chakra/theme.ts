import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    spotify: {
      white: "#fff",
      black: "#191414",
      500: "#1ed760",
      600: "#1db954",
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 100,
      },
      defaultProps: {
        colorScheme: "spotify",
      },
    },
  },
});
