import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { registerTools } from "./tools/index.js";

export function createServer(): Server {
  const server = new Server(
    {
      name: "espn-mcp-server",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  registerTools(server);

  return server;
}
