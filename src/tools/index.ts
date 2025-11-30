import type { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { standingsTool, handleGetStandings } from "./standings.js";
import { scoreboardTool, handleGetScoreboard } from "./scoreboard.js";
import { teamTool, handleGetTeam } from "./team.js";
import { scheduleTool, handleGetSchedule } from "./schedule.js";
import { gameTool, handleGetGame } from "./game.js";
import { playoffsTool, handleGetPlayoffs } from "./playoffs.js";

const tools = [
  standingsTool,
  scoreboardTool,
  teamTool,
  scheduleTool,
  gameTool,
  playoffsTool,
];

export function registerTools(server: Server): void {
  // Register list tools handler
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools };
  });

  // Register call tool handler
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    let result: string;

    switch (name) {
      case "get_standings":
        result = await handleGetStandings(args as { league: string; group?: string });
        break;
      case "get_scoreboard":
        result = await handleGetScoreboard(
          args as { league: string; week?: number; date?: string }
        );
        break;
      case "get_team":
        result = await handleGetTeam(args as { league: string; team: string });
        break;
      case "get_schedule":
        result = await handleGetSchedule(args as { league: string; team: string });
        break;
      case "get_game":
        result = await handleGetGame(args as { league: string; gameId: string });
        break;
      case "get_playoffs":
        result = await handleGetPlayoffs(args as { league: string });
        break;
      default:
        result = `Unknown tool: ${name}`;
    }

    return {
      content: [{ type: "text", text: result }],
    };
  });
}
