import type { League } from "./types.js";
import { LEAGUE_CONFIG } from "./leagues.js";

const SITE_BASE = "https://site.api.espn.com/apis/site/v2/sports";
const CORE_BASE = "https://sports.core.api.espn.com/v2/sports";

/**
 * Build the base URL path for a league
 */
function getLeaguePath(league: League): string {
  const config = LEAGUE_CONFIG[league];
  return `${config.sport}/${config.league}`;
}

/**
 * Get scoreboard endpoint URL
 */
export function getScoreboardUrl(league: League, options?: { week?: number; date?: string }): string {
  const path = getLeaguePath(league);
  let url = `${SITE_BASE}/${path}/scoreboard`;

  const params: string[] = [];
  if (options?.week) {
    params.push(`week=${options.week}`);
    params.push("seasontype=2"); // Regular season
  }
  if (options?.date) {
    params.push(`dates=${options.date}`);
  }

  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  return url;
}

/**
 * Get standings endpoint URL
 */
export function getStandingsUrl(league: League): string {
  const path = getLeaguePath(league);
  return `${SITE_BASE}/${path}/standings`;
}

/**
 * Get team info endpoint URL
 */
export function getTeamUrl(league: League, teamId: string): string {
  const path = getLeaguePath(league);
  return `${SITE_BASE}/${path}/teams/${teamId}`;
}

/**
 * Get team schedule endpoint URL
 */
export function getScheduleUrl(league: League, teamId: string): string {
  const path = getLeaguePath(league);
  return `${SITE_BASE}/${path}/teams/${teamId}/schedule`;
}

/**
 * Get game summary endpoint URL
 */
export function getGameUrl(league: League, gameId: string): string {
  const path = getLeaguePath(league);
  return `${SITE_BASE}/${path}/summary?event=${gameId}`;
}

/**
 * Get playoffs/bracket endpoint URL
 * Note: Playoffs data structure varies by league and season timing
 */
export function getPlayoffsUrl(league: League, year?: number): string {
  const path = getLeaguePath(league);
  const seasonYear = year || new Date().getFullYear();
  return `${CORE_BASE}/${path}/seasons/${seasonYear}/types/3/groups/standings`;
}

export { SITE_BASE, CORE_BASE };
