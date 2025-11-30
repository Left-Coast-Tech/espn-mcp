import type { League } from "../espn/types.js";
import { espnClient } from "../espn/client.js";
import { isValidLeague } from "../espn/leagues.js";
import { InvalidLeagueError, formatError } from "../utils/errors.js";

export const scheduleTool = {
  name: "get_schedule",
  description:
    "Get a team's schedule including past results and upcoming games.",
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
        description: "Team name, city, or abbreviation",
      },
    },
    required: ["league", "team"],
  },
};

export async function handleGetSchedule(args: {
  league: string;
  team: string;
}): Promise<string> {
  try {
    if (!isValidLeague(args.league)) {
      throw new InvalidLeagueError(args.league);
    }

    const schedule = await espnClient.getSchedule(args.league as League, args.team);
    return JSON.stringify(schedule, null, 2);
  } catch (error) {
    return formatError(error);
  }
}
