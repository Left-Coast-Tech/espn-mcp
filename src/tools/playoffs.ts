import type { League } from "../espn/types.js";
import { espnClient } from "../espn/client.js";
import { isValidLeague } from "../espn/leagues.js";
import { InvalidLeagueError, formatError } from "../utils/errors.js";

export const playoffsTool = {
  name: "get_playoffs",
  description: "Get current playoff bracket or playoff picture/standings.",
  inputSchema: {
    type: "object" as const,
    properties: {
      league: {
        type: "string",
        enum: ["nfl", "nhl", "nba"],
        description: "The sports league",
      },
    },
    required: ["league"],
  },
};

export async function handleGetPlayoffs(args: { league: string }): Promise<string> {
  try {
    if (!isValidLeague(args.league)) {
      throw new InvalidLeagueError(args.league);
    }

    const playoffs = await espnClient.getPlayoffs(args.league as League);
    return JSON.stringify(playoffs, null, 2);
  } catch (error) {
    return formatError(error);
  }
}
