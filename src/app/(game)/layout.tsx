import { GamesLayout } from '@/layout/GamesLayout';

import type { ReactNode } from 'react';

interface GamesLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: GamesLayoutProps) {
  return <GamesLayout>{children}</GamesLayout>;
}
