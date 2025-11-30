// League types
export type League = "nfl" | "nhl" | "nba";

export interface LeagueConfig {
  sport: string;
  league: string;
}

// Team types
export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  location: string;
  nickname: string;
}

export interface TeamRecord {
  wins: number;
  losses: number;
  ties?: number;
  pct: number;
}

// Standings types
export interface StandingsTeam {
  id: string;
  name: string;
  abbreviation: string;
  wins: number;
  losses: number;
  ties?: number;
  pct: number;
  gamesBack?: number;
  streak: string;
  playoffSeed?: number;
  clinched?: string;
}

export interface StandingsGroup {
  name: string;
  teams: StandingsTeam[];
}

export interface StandingsResponse {
  league: string;
  season: number;
  groups: StandingsGroup[];
}

// Scoreboard types
export interface ScoreboardTeam {
  id: string;
  name: string;
  abbreviation: string;
  score?: number;
  record: string;
}

export interface ScoreboardGame {
  id: string;
  status: "scheduled" | "in_progress" | "final";
  startTime: string;
  homeTeam: ScoreboardTeam;
  awayTeam: ScoreboardTeam;
  venue?: string;
  broadcast?: string;
}

export interface ScoreboardResponse {
  league: string;
  week?: number;
  date: string;
  games: ScoreboardGame[];
}

// Team detail types
export interface TeamStanding {
  division: number;
  conference: number;
  playoffSeed?: number;
}

export interface TeamResponse {
  id: string;
  name: string;
  abbreviation: string;
  location: string;
  nickname: string;
  conference: string;
  division: string;
  record: TeamRecord;
  standing: TeamStanding;
  streak: string;
  logo: string;
}

// Schedule types
export interface ScheduleOpponent {
  name: string;
  abbreviation: string;
}

export interface ScheduleResult {
  win: boolean;
  score: string;
}

export interface ScheduleGame {
  id: string;
  week?: number;
  date: string;
  opponent: ScheduleOpponent;
  homeAway: "home" | "away";
  result?: ScheduleResult;
  status: "completed" | "scheduled" | "in_progress";
}

export interface ScheduleResponse {
  team: string;
  league: string;
  games: ScheduleGame[];
}

// Game detail types
export interface GameTeamStats {
  name: string;
  abbreviation: string;
  score: number;
  record: string;
}

export interface GameResponse {
  id: string;
  league: string;
  status: "scheduled" | "in_progress" | "final";
  startTime: string;
  venue: string;
  homeTeam: GameTeamStats;
  awayTeam: GameTeamStats;
  period?: string;
  clock?: string;
  broadcast?: string;
}

// Playoffs types
export interface PlayoffTeam {
  name: string;
  abbreviation: string;
  record: string;
}

export interface PlayoffSeed {
  seed: number;
  team: PlayoffTeam;
  clinched: boolean;
  status: "division_leader" | "wild_card" | "in_hunt" | "eliminated";
}

export interface PlayoffConference {
  name: string;
  seeds: PlayoffSeed[];
}

export interface PlayoffsResponse {
  league: string;
  season: number;
  status: "not_started" | "in_progress" | "completed";
  conferences: PlayoffConference[];
}

// ESPN API raw response types (partial, for parsing)
export interface ESPNTeamRef {
  id: string;
  displayName: string;
  abbreviation: string;
  location?: string;
  name?: string;
  logos?: { href: string }[];
}

export interface ESPNRecord {
  items?: { summary: string; stats: { name: string; value: number }[] }[];
  summary?: string;
}

export interface ESPNCompetitor {
  id: string;
  team: ESPNTeamRef;
  score?: string;
  records?: ESPNRecord[];
  homeAway: "home" | "away";
  winner?: boolean;
}

export interface ESPNStatus {
  type: {
    id: string;
    name: string;
    state: string;
    completed: boolean;
  };
  period?: number;
  displayClock?: string;
}

export interface ESPNEvent {
  id: string;
  date: string;
  name: string;
  competitions: {
    id: string;
    venue?: { fullName: string };
    competitors: ESPNCompetitor[];
    status: ESPNStatus;
    broadcasts?: { names: string[] }[];
  }[];
  week?: { number: number };
}

export interface ESPNStandingsEntry {
  team: ESPNTeamRef;
  stats: { name: string; value: number; displayValue: string }[];
}

export interface ESPNStandingsGroup {
  name: string;
  standings: {
    entries: ESPNStandingsEntry[];
  };
}
