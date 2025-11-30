import type {
  League,
  StandingsResponse,
  StandingsGroup,
  StandingsTeam,
  ScoreboardResponse,
  ScoreboardGame,
  TeamResponse,
  ScheduleResponse,
  ScheduleGame,
  GameResponse,
  PlayoffsResponse,
  PlayoffConference,
  ESPNEvent,
  ESPNStandingsGroup,
} from "./types.js";
import {
  getScoreboardUrl,
  getStandingsUrl,
  getTeamUrl,
  getScheduleUrl,
  getGameUrl,
} from "./endpoints.js";
import { resolveTeam } from "./leagues.js";
import { ESPNApiError, TeamNotFoundError } from "../utils/errors.js";

export class ESPNClient {
  private async fetch<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new ESPNApiError(
        `ESPN API request failed: ${response.statusText}`,
        response.status,
        url
      );
    }
    return response.json() as Promise<T>;
  }

  /**
   * Get current standings for a league
   */
  async getStandings(league: League, group?: string): Promise<StandingsResponse> {
    const url = getStandingsUrl(league);
    const data = await this.fetch<{ children: ESPNStandingsGroup[]; season: { year: number } }>(url);

    const groups: StandingsGroup[] = [];

    for (const child of data.children || []) {
      // Filter by group if specified
      if (group) {
        const groupLower = group.toLowerCase();
        const childNameLower = child.name.toLowerCase();
        if (!childNameLower.includes(groupLower)) {
          continue;
        }
      }

      const teams: StandingsTeam[] = [];
      for (const entry of child.standings?.entries || []) {
        const stats = entry.stats || [];
        const getStat = (name: string): number => {
          const stat = stats.find((s) => s.name === name);
          return stat?.value ?? 0;
        };

        const streakStat = stats.find((s) => s.name === "streak");
        const clinchStat = stats.find((s) => s.name === "clincher");

        teams.push({
          id: entry.team.id,
          name: entry.team.displayName,
          abbreviation: entry.team.abbreviation,
          wins: getStat("wins"),
          losses: getStat("losses"),
          ties: league === "nfl" ? getStat("ties") : undefined,
          pct: getStat("winPercent"),
          gamesBack: getStat("gamesBehind"),
          streak: streakStat?.displayValue || "",
          playoffSeed: getStat("playoffSeed") || undefined,
          clinched: clinchStat?.displayValue || undefined,
        });
      }

      if (teams.length > 0) {
        groups.push({
          name: child.name,
          teams,
        });
      }
    }

    return {
      league,
      season: data.season?.year || new Date().getFullYear(),
      groups,
    };
  }

  /**
   * Get current or scheduled games
   */
  async getScoreboard(
    league: League,
    options?: { week?: number; date?: string }
  ): Promise<ScoreboardResponse> {
    const url = getScoreboardUrl(league, options);
    const data = await this.fetch<{ events: ESPNEvent[]; week?: { number: number }; day?: { date: string } }>(url);

    const games: ScoreboardGame[] = [];

    for (const event of data.events || []) {
      const competition = event.competitions?.[0];
      if (!competition) continue;

      const homeComp = competition.competitors.find((c) => c.homeAway === "home");
      const awayComp = competition.competitors.find((c) => c.homeAway === "away");

      if (!homeComp || !awayComp) continue;

      const getRecord = (comp: typeof homeComp): string => {
        const records = comp.records || [];
        const overall = records[0];
        return overall?.summary || "";
      };

      let status: "scheduled" | "in_progress" | "final";
      const stateType = competition.status.type.state;
      if (stateType === "pre") {
        status = "scheduled";
      } else if (stateType === "in") {
        status = "in_progress";
      } else {
        status = "final";
      }

      games.push({
        id: event.id,
        status,
        startTime: event.date,
        homeTeam: {
          id: homeComp.team.id,
          name: homeComp.team.displayName,
          abbreviation: homeComp.team.abbreviation,
          score: homeComp.score ? parseInt(homeComp.score, 10) : undefined,
          record: getRecord(homeComp),
        },
        awayTeam: {
          id: awayComp.team.id,
          name: awayComp.team.displayName,
          abbreviation: awayComp.team.abbreviation,
          score: awayComp.score ? parseInt(awayComp.score, 10) : undefined,
          record: getRecord(awayComp),
        },
        venue: competition.venue?.fullName,
        broadcast: competition.broadcasts?.[0]?.names?.[0],
      });
    }

    return {
      league,
      week: data.week?.number || options?.week,
      date: data.day?.date || options?.date || new Date().toISOString().split("T")[0],
      games,
    };
  }

  /**
   * Get detailed team information
   */
  async getTeam(league: League, teamQuery: string): Promise<TeamResponse> {
    const team = resolveTeam(league, teamQuery);
    if (!team) {
      throw new TeamNotFoundError(teamQuery, league);
    }

    const url = getTeamUrl(league, team.id);
    const data = await this.fetch<{
      team: {
        id: string;
        displayName: string;
        abbreviation: string;
        location: string;
        name: string;
        logos?: { href: string }[];
        record?: {
          items?: { summary: string; stats: { name: string; value: number }[] }[];
        };
        standingSummary?: string;
      };
    }>(url);

    const teamData = data.team;
    const recordItem = teamData.record?.items?.[0];
    const stats = recordItem?.stats || [];

    const getStat = (name: string): number => {
      const stat = stats.find((s) => s.name === name);
      return stat?.value ?? 0;
    };

    // Parse standing summary (e.g., "1st in AFC East")
    const standingSummary = teamData.standingSummary || "";
    const divisionMatch = standingSummary.match(/(\d+)(?:st|nd|rd|th) in (.+)/);

    return {
      id: teamData.id,
      name: teamData.displayName,
      abbreviation: teamData.abbreviation,
      location: teamData.location,
      nickname: teamData.name,
      conference: "", // Would need additional API call
      division: divisionMatch?.[2] || "",
      record: {
        wins: getStat("wins"),
        losses: getStat("losses"),
        ties: league === "nfl" ? getStat("ties") : undefined,
        pct: getStat("winPercent"),
      },
      standing: {
        division: divisionMatch ? parseInt(divisionMatch[1], 10) : 0,
        conference: 0, // Would need additional API call
        playoffSeed: getStat("playoffSeed") || undefined,
      },
      streak: stats.find((s) => s.name === "streak")?.value?.toString() || "",
      logo: teamData.logos?.[0]?.href || "",
    };
  }

  /**
   * Get team schedule
   */
  async getSchedule(league: League, teamQuery: string): Promise<ScheduleResponse> {
    const team = resolveTeam(league, teamQuery);
    if (!team) {
      throw new TeamNotFoundError(teamQuery, league);
    }

    const url = getScheduleUrl(league, team.id);
    const data = await this.fetch<{
      team: { displayName: string };
      events: ESPNEvent[];
    }>(url);

    const games: ScheduleGame[] = [];

    for (const event of data.events || []) {
      const competition = event.competitions?.[0];
      if (!competition) continue;

      const teamComp = competition.competitors.find((c) => c.team.id === team.id);
      const oppComp = competition.competitors.find((c) => c.team.id !== team.id);

      if (!teamComp || !oppComp) continue;

      let status: "completed" | "scheduled" | "in_progress";
      const stateType = competition.status.type.state;
      if (stateType === "pre") {
        status = "scheduled";
      } else if (stateType === "in") {
        status = "in_progress";
      } else {
        status = "completed";
      }

      let result: ScheduleGame["result"];
      if (status === "completed" && teamComp.score && oppComp.score) {
        const teamScore = parseInt(teamComp.score, 10);
        const oppScore = parseInt(oppComp.score, 10);
        result = {
          win: teamComp.winner === true,
          score: `${teamScore}-${oppScore}`,
        };
      }

      games.push({
        id: event.id,
        week: event.week?.number,
        date: event.date,
        opponent: {
          name: oppComp.team.displayName,
          abbreviation: oppComp.team.abbreviation,
        },
        homeAway: teamComp.homeAway,
        result,
        status,
      });
    }

    return {
      team: data.team?.displayName || team.name,
      league,
      games,
    };
  }

  /**
   * Get detailed game information
   */
  async getGame(league: League, gameId: string): Promise<GameResponse> {
    const url = getGameUrl(league, gameId);
    const data = await this.fetch<{
      header: {
        id: string;
        competitions: {
          date: string;
          venue: { fullName: string };
          competitors: {
            id: string;
            team: { displayName: string; abbreviation: string };
            score: string;
            records?: { summary: string }[];
            homeAway: "home" | "away";
          }[];
          status: {
            type: { state: string; completed: boolean };
            period?: number;
            displayClock?: string;
          };
          broadcasts?: { names: string[] }[];
        }[];
      };
    }>(url);

    const competition = data.header?.competitions?.[0];
    if (!competition) {
      throw new ESPNApiError(`Game ${gameId} not found`);
    }

    const homeComp = competition.competitors.find((c) => c.homeAway === "home");
    const awayComp = competition.competitors.find((c) => c.homeAway === "away");

    if (!homeComp || !awayComp) {
      throw new ESPNApiError(`Invalid game data for ${gameId}`);
    }

    let status: "scheduled" | "in_progress" | "final";
    const stateType = competition.status.type.state;
    if (stateType === "pre") {
      status = "scheduled";
    } else if (stateType === "in") {
      status = "in_progress";
    } else {
      status = "final";
    }

    return {
      id: data.header.id,
      league,
      status,
      startTime: competition.date,
      venue: competition.venue?.fullName || "",
      homeTeam: {
        name: homeComp.team.displayName,
        abbreviation: homeComp.team.abbreviation,
        score: parseInt(homeComp.score || "0", 10),
        record: homeComp.records?.[0]?.summary || "",
      },
      awayTeam: {
        name: awayComp.team.displayName,
        abbreviation: awayComp.team.abbreviation,
        score: parseInt(awayComp.score || "0", 10),
        record: awayComp.records?.[0]?.summary || "",
      },
      period: competition.status.period?.toString(),
      clock: competition.status.displayClock,
      broadcast: competition.broadcasts?.[0]?.names?.[0],
    };
  }

  /**
   * Get playoff picture/standings
   */
  async getPlayoffs(league: League): Promise<PlayoffsResponse> {
    // Use standings endpoint and extract playoff-relevant info
    const standings = await this.getStandings(league);

    const conferences: PlayoffConference[] = [];
    const conferenceMap = new Map<string, PlayoffConference>();

    for (const group of standings.groups) {
      // Determine conference from group name
      let confName: string;
      if (group.name.includes("AFC") || group.name.includes("American")) {
        confName = "AFC";
      } else if (group.name.includes("NFC") || group.name.includes("National")) {
        confName = "NFC";
      } else if (group.name.includes("Eastern") || group.name.includes("East")) {
        confName = "Eastern Conference";
      } else if (group.name.includes("Western") || group.name.includes("West")) {
        confName = "Western Conference";
      } else {
        confName = group.name;
      }

      if (!conferenceMap.has(confName)) {
        conferenceMap.set(confName, { name: confName, seeds: [] });
      }

      const conf = conferenceMap.get(confName)!;

      for (const team of group.teams) {
        // Avoid duplicates
        if (conf.seeds.some((s) => s.team.abbreviation === team.abbreviation)) {
          continue;
        }

        let status: "division_leader" | "wild_card" | "in_hunt" | "eliminated";
        if (team.clinched === "y" || team.clinched === "z") {
          status = "division_leader";
        } else if (team.clinched === "x") {
          status = "wild_card";
        } else if (team.playoffSeed && team.playoffSeed <= getPlayoffSpots(league)) {
          status = "in_hunt";
        } else {
          status = "in_hunt";
        }

        conf.seeds.push({
          seed: team.playoffSeed || conf.seeds.length + 1,
          team: {
            name: team.name,
            abbreviation: team.abbreviation,
            record: `${team.wins}-${team.losses}${team.ties ? `-${team.ties}` : ""}`,
          },
          clinched: !!team.clinched,
          status,
        });
      }
    }

    // Sort seeds and add to conferences array
    for (const conf of conferenceMap.values()) {
      conf.seeds.sort((a, b) => a.seed - b.seed);
      conferences.push(conf);
    }

    return {
      league,
      season: standings.season,
      status: "in_progress",
      conferences,
    };
  }
}

function getPlayoffSpots(league: League): number {
  switch (league) {
    case "nfl":
      return 7;
    case "nhl":
    case "nba":
      return 8;
    default:
      return 8;
  }
}

// Export singleton instance
export const espnClient = new ESPNClient();
