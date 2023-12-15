'use client';

import { ChakraProvider as DefaultChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";

import type { ReactNode } from "react";

interface ChakraProviderProps {
  children: ReactNode;
}

export const ChakraProvider = ({ children }: ChakraProviderProps) => {
  return <DefaultChakraProvider theme={theme}>{children}</DefaultChakraProvider>;
};
