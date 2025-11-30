/**
 * Custom error class for ESPN API errors
 */
export class ESPNApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = "ESPNApiError";
  }
}

/**
 * Error for invalid league parameter
 */
export class InvalidLeagueError extends Error {
  constructor(league: string) {
    super(`Invalid league: "${league}". Must be one of: nfl, nhl, nba`);
    this.name = "InvalidLeagueError";
  }
}

/**
 * Error for team not found
 */
export class TeamNotFoundError extends Error {
  constructor(team: string, league: string) {
    super(`Team "${team}" not found in ${league.toUpperCase()}`);
    this.name = "TeamNotFoundError";
  }
}

/**
 * Format error for MCP tool response
 */
export function formatError(error: unknown): string {
  if (error instanceof ESPNApiError) {
    return `ESPN API Error: ${error.message}${error.statusCode ? ` (Status: ${error.statusCode})` : ""}`;
  }
  if (error instanceof InvalidLeagueError || error instanceof TeamNotFoundError) {
    return error.message;
  }
  if (error instanceof Error) {
    return `Error: ${error.message}`;
  }
  return "An unknown error occurred";
}
