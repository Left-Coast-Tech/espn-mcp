import type { League } from "../espn/types.js";
import { espnClient } from "../espn/client.js";
import { isValidLeague } from "../espn/leagues.js";
import { InvalidLeagueError, formatError } from "../utils/errors.js";

export const standingsTool = {
  name: "get_standings",
  description:
    "Get current standings for a league. Returns win-loss records, division standings, and playoff positioning.",
  inputSchema: {
    type: "object" as const,
    properties: {
      league: {
        type: "string",
        enum: ["nfl", "nhl", "nba"],
        description: "The sports league",
      },
      group: {
        type: "string",
        description:
          "Optional: conference (afc, nfc, eastern, western) or division (afc-east, nfc-north, atlantic, pacific, etc.)",
      },
    },
    required: ["league"],
  },
};

export async function handleGetStandings(args: {
  league: string;
  group?: string;
}): Promise<string> {
  try {
    if (!isValidLeague(args.league)) {
      throw new InvalidLeagueError(args.league);
    }

    const standings = await espnClient.getStandings(args.league as League, args.group);
    return JSON.stringify(standings, null, 2);
  } catch (error) {
    return formatError(error);
  }
}
