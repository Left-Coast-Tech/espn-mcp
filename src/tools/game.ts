import type { League } from "../espn/types.js";
import { espnClient } from "../espn/client.js";
import { isValidLeague } from "../espn/leagues.js";
import { InvalidLeagueError, formatError } from "../utils/errors.js";

export const gameTool = {
  name: "get_game",
  description:
    "Get detailed information about a specific game including box score if completed.",
  inputSchema: {
    type: "object" as const,
    properties: {
      league: {
        type: "string",
        enum: ["nfl", "nhl", "nba"],
        description: "The sports league",
      },
      gameId: {
        type: "string",
        description: "ESPN game ID",
      },
    },
    required: ["league", "gameId"],
  },
};

export async function handleGetGame(args: {
  league: string;
  gameId: string;
}): Promise<string> {
  try {
    if (!isValidLeague(args.league)) {
      throw new InvalidLeagueError(args.league);
    }

    const game = await espnClient.getGame(args.league as League, args.gameId);
    return JSON.stringify(game, null, 2);
  } catch (error) {
    return formatError(error);
  }
}
