import type { League } from "../espn/types.js";
import { espnClient } from "../espn/client.js";
import { isValidLeague } from "../espn/leagues.js";
import { InvalidLeagueError, formatError } from "../utils/errors.js";

export const teamTool = {
  name: "get_team",
  description:
    "Get detailed information about a specific team including record, stats, and current standing.",
  inputSchema: {
    type: "object" as const,
    properties: {
      league: {
        type: "string",
        enum: ["nfl", "nhl", "nba"],
        description: "The sports league",
      },
      team: {
        type: "string",
        description:
          "Team name, city, or abbreviation (e.g., 'Patriots', 'New England', 'NE')",
      },
    },
    required: ["league", "team"],
  },
};

export async function handleGetTeam(args: {
  league: string;
  team: string;
}): Promise<string> {
  try {
    if (!isValidLeague(args.league)) {
      throw new InvalidLeagueError(args.league);
    }

    const team = await espnClient.getTeam(args.league as League, args.team);
    return JSON.stringify(team, null, 2);
  } catch (error) {
    return formatError(error);
  }
}
