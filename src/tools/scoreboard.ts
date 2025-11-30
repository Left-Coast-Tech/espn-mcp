import type { League } from "../espn/types.js";
import { espnClient } from "../espn/client.js";
import { isValidLeague } from "../espn/leagues.js";
import { InvalidLeagueError, formatError } from "../utils/errors.js";

export const scoreboardTool = {
  name: "get_scoreboard",
  description:
    "Get current or upcoming games with scores. For NFL, can specify week number.",
  inputSchema: {
    type: "object" as const,
    properties: {
      league: {
        type: "string",
        enum: ["nfl", "nhl", "nba"],
        description: "The sports league",
      },
      week: {
        type: "number",
        description: "NFL only: week number (1-18 regular season, 19+ playoffs)",
      },
      date: {
        type: "string",
        description: "Optional: specific date in YYYYMMDD format",
      },
    },
    required: ["league"],
  },
};

export async function handleGetScoreboard(args: {
  league: string;
  week?: number;
  date?: string;
}): Promise<string> {
  try {
    if (!isValidLeague(args.league)) {
      throw new InvalidLeagueError(args.league);
    }

    const scoreboard = await espnClient.getScoreboard(args.league as League, {
      week: args.week,
      date: args.date,
    });
    return JSON.stringify(scoreboard, null, 2);
  } catch (error) {
    return formatError(error);
  }
}
