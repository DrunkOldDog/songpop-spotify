import { getGame } from "@/app/actions/getGame";
import GamePage from "@/app/components/Game";

interface HostProps {
  params: { gameId: string };
}

/**
 * TODO: Add host validation for game
 * - Current userId is different of createdBy id
 * - No longer valid game
 */

const Host = async ({ params }: HostProps) => {
  const game = await getGame(params.gameId);

  return <GamePage game={game} />;
};

export default Host;
