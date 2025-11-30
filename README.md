# ESPN MCP Server

A Model Context Protocol (MCP) server that provides access to ESPN's public API for live sports data.

## Supported Leagues

- NFL (National Football League)
- NHL (National Hockey League)
- NBA (National Basketball Association)

## Features

- Current standings and playoff picture
- Live scores and game schedules
- Team information and statistics
- Flexible team name resolution (city, nickname, or abbreviation)

## Installation

```bash
npm install -g @left-coast-tech/espn-mcp-server
```

Or clone and build:

```bash
git clone https://github.com/Left-Coast-Tech/espn-mcp.git
cd espn-mcp
npm install
npm run build
```

## Usage with Claude Desktop

Add to your Claude Desktop config (`~/.config/claude/claude_desktop_config.json` on Mac/Linux or `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "espn": {
      "command": "npx",
      "args": ["@left-coast-tech/espn-mcp-server"]
    }
  }
}
```

Or if installed globally:

```json
{
  "mcpServers": {
    "espn": {
      "command": "@left-coast-tech/espn-mcp-server"
    }
  }
}
```

## Usage with Claude Code

Add to your project's `.mcp.json`:

```json
{
  "espn": {
    "command": "npx",
    "args": ["espn-mcp-server"]
  }
}
```

## Available Tools

### get_standings

Get current standings for a league.

```
league: "nfl" | "nhl" | "nba" (required)
group: conference or division filter (optional)
```

Example: "Get NFL standings for the AFC East"

### get_scoreboard

Get current or upcoming games with scores.

```
league: "nfl" | "nhl" | "nba" (required)
week: NFL week number (optional)
date: YYYYMMDD format (optional)
```

Example: "What NFL games are on this week?"

### get_team

Get team information including record and standing.

```
league: "nfl" | "nhl" | "nba" (required)
team: team name, city, or abbreviation (required)
```

Example: "Get info on the Patriots"

### get_schedule

Get a team's schedule with results.

```
league: "nfl" | "nhl" | "nba" (required)
team: team name, city, or abbreviation (required)
```

Example: "Show me the Chiefs remaining schedule"

### get_game

Get details about a specific game.

```
league: "nfl" | "nhl" | "nba" (required)
gameId: ESPN game ID (required)
```

### get_playoffs

Get playoff bracket or playoff picture.

```
league: "nfl" | "nhl" | "nba" (required)
```

Example: "Show me the NBA playoff bracket"

## Examples

Once configured, you can ask Claude:

- "What are the current NFL standings?"
- "Who's leading the AFC North?"
- "What's the Broncos record?"
- "What NBA games are on tonight?"
- "Show me the NHL playoff picture"

## Data Source

This server uses ESPN's public API. Data is fetched in real-time and is not cached.

## License

MIT

## Contributing

Contributions welcome! Please open an issue or PR.
