import type { League, LeagueConfig, Team } from "./types.js";

export const LEAGUE_CONFIG: Record<League, LeagueConfig> = {
  nfl: { sport: "football", league: "nfl" },
  nhl: { sport: "hockey", league: "nhl" },
  nba: { sport: "basketball", league: "nba" },
};

// NFL Teams (32 teams)
const NFL_TEAMS: Team[] = [
  // AFC East
  { id: "2", name: "Buffalo Bills", abbreviation: "BUF", location: "Buffalo", nickname: "Bills" },
  { id: "15", name: "Miami Dolphins", abbreviation: "MIA", location: "Miami", nickname: "Dolphins" },
  { id: "17", name: "New England Patriots", abbreviation: "NE", location: "New England", nickname: "Patriots" },
  { id: "20", name: "New York Jets", abbreviation: "NYJ", location: "New York", nickname: "Jets" },
  // AFC North
  { id: "33", name: "Baltimore Ravens", abbreviation: "BAL", location: "Baltimore", nickname: "Ravens" },
  { id: "4", name: "Cincinnati Bengals", abbreviation: "CIN", location: "Cincinnati", nickname: "Bengals" },
  { id: "5", name: "Cleveland Browns", abbreviation: "CLE", location: "Cleveland", nickname: "Browns" },
  { id: "23", name: "Pittsburgh Steelers", abbreviation: "PIT", location: "Pittsburgh", nickname: "Steelers" },
  // AFC South
  { id: "34", name: "Houston Texans", abbreviation: "HOU", location: "Houston", nickname: "Texans" },
  { id: "11", name: "Indianapolis Colts", abbreviation: "IND", location: "Indianapolis", nickname: "Colts" },
  { id: "30", name: "Jacksonville Jaguars", abbreviation: "JAX", location: "Jacksonville", nickname: "Jaguars" },
  { id: "10", name: "Tennessee Titans", abbreviation: "TEN", location: "Tennessee", nickname: "Titans" },
  // AFC West
  { id: "7", name: "Denver Broncos", abbreviation: "DEN", location: "Denver", nickname: "Broncos" },
  { id: "12", name: "Kansas City Chiefs", abbreviation: "KC", location: "Kansas City", nickname: "Chiefs" },
  { id: "13", name: "Las Vegas Raiders", abbreviation: "LV", location: "Las Vegas", nickname: "Raiders" },
  { id: "24", name: "Los Angeles Chargers", abbreviation: "LAC", location: "Los Angeles", nickname: "Chargers" },
  // NFC East
  { id: "6", name: "Dallas Cowboys", abbreviation: "DAL", location: "Dallas", nickname: "Cowboys" },
  { id: "19", name: "New York Giants", abbreviation: "NYG", location: "New York", nickname: "Giants" },
  { id: "21", name: "Philadelphia Eagles", abbreviation: "PHI", location: "Philadelphia", nickname: "Eagles" },
  { id: "28", name: "Washington Commanders", abbreviation: "WSH", location: "Washington", nickname: "Commanders" },
  // NFC North
  { id: "3", name: "Chicago Bears", abbreviation: "CHI", location: "Chicago", nickname: "Bears" },
  { id: "8", name: "Detroit Lions", abbreviation: "DET", location: "Detroit", nickname: "Lions" },
  { id: "9", name: "Green Bay Packers", abbreviation: "GB", location: "Green Bay", nickname: "Packers" },
  { id: "16", name: "Minnesota Vikings", abbreviation: "MIN", location: "Minnesota", nickname: "Vikings" },
  // NFC South
  { id: "1", name: "Atlanta Falcons", abbreviation: "ATL", location: "Atlanta", nickname: "Falcons" },
  { id: "29", name: "Carolina Panthers", abbreviation: "CAR", location: "Carolina", nickname: "Panthers" },
  { id: "18", name: "New Orleans Saints", abbreviation: "NO", location: "New Orleans", nickname: "Saints" },
  { id: "27", name: "Tampa Bay Buccaneers", abbreviation: "TB", location: "Tampa Bay", nickname: "Buccaneers" },
  // NFC West
  { id: "22", name: "Arizona Cardinals", abbreviation: "ARI", location: "Arizona", nickname: "Cardinals" },
  { id: "14", name: "Los Angeles Rams", abbreviation: "LAR", location: "Los Angeles", nickname: "Rams" },
  { id: "25", name: "San Francisco 49ers", abbreviation: "SF", location: "San Francisco", nickname: "49ers" },
  { id: "26", name: "Seattle Seahawks", abbreviation: "SEA", location: "Seattle", nickname: "Seahawks" },
];

// NHL Teams (32 teams)
const NHL_TEAMS: Team[] = [
  // Atlantic Division
  { id: "1", name: "Boston Bruins", abbreviation: "BOS", location: "Boston", nickname: "Bruins" },
  { id: "7", name: "Buffalo Sabres", abbreviation: "BUF", location: "Buffalo", nickname: "Sabres" },
  { id: "17", name: "Detroit Red Wings", abbreviation: "DET", location: "Detroit", nickname: "Red Wings" },
  { id: "13", name: "Florida Panthers", abbreviation: "FLA", location: "Florida", nickname: "Panthers" },
  { id: "8", name: "Montreal Canadiens", abbreviation: "MTL", location: "Montreal", nickname: "Canadiens" },
  { id: "9", name: "Ottawa Senators", abbreviation: "OTT", location: "Ottawa", nickname: "Senators" },
  { id: "14", name: "Tampa Bay Lightning", abbreviation: "TB", location: "Tampa Bay", nickname: "Lightning" },
  { id: "10", name: "Toronto Maple Leafs", abbreviation: "TOR", location: "Toronto", nickname: "Maple Leafs" },
  // Metropolitan Division
  { id: "12", name: "Carolina Hurricanes", abbreviation: "CAR", location: "Carolina", nickname: "Hurricanes" },
  { id: "29", name: "Columbus Blue Jackets", abbreviation: "CBJ", location: "Columbus", nickname: "Blue Jackets" },
  { id: "2", name: "New Jersey Devils", abbreviation: "NJD", location: "New Jersey", nickname: "Devils" },
  { id: "3", name: "New York Islanders", abbreviation: "NYI", location: "New York", nickname: "Islanders" },
  { id: "4", name: "New York Rangers", abbreviation: "NYR", location: "New York", nickname: "Rangers" },
  { id: "5", name: "Philadelphia Flyers", abbreviation: "PHI", location: "Philadelphia", nickname: "Flyers" },
  { id: "6", name: "Pittsburgh Penguins", abbreviation: "PIT", location: "Pittsburgh", nickname: "Penguins" },
  { id: "15", name: "Washington Capitals", abbreviation: "WSH", location: "Washington", nickname: "Capitals" },
  // Central Division
  { id: "30", name: "Minnesota Wild", abbreviation: "MIN", location: "Minnesota", nickname: "Wild" },
  { id: "18", name: "Nashville Predators", abbreviation: "NSH", location: "Nashville", nickname: "Predators" },
  { id: "19", name: "St. Louis Blues", abbreviation: "STL", location: "St. Louis", nickname: "Blues" },
  { id: "16", name: "Chicago Blackhawks", abbreviation: "CHI", location: "Chicago", nickname: "Blackhawks" },
  { id: "21", name: "Colorado Avalanche", abbreviation: "COL", location: "Colorado", nickname: "Avalanche" },
  { id: "25", name: "Dallas Stars", abbreviation: "DAL", location: "Dallas", nickname: "Stars" },
  { id: "52", name: "Winnipeg Jets", abbreviation: "WPG", location: "Winnipeg", nickname: "Jets" },
  { id: "37", name: "Utah Hockey Club", abbreviation: "UTA", location: "Utah", nickname: "Hockey Club" },
  // Pacific Division
  { id: "24", name: "Anaheim Ducks", abbreviation: "ANA", location: "Anaheim", nickname: "Ducks" },
  { id: "20", name: "Calgary Flames", abbreviation: "CGY", location: "Calgary", nickname: "Flames" },
  { id: "22", name: "Edmonton Oilers", abbreviation: "EDM", location: "Edmonton", nickname: "Oilers" },
  { id: "26", name: "Los Angeles Kings", abbreviation: "LA", location: "Los Angeles", nickname: "Kings" },
  { id: "28", name: "San Jose Sharks", abbreviation: "SJS", location: "San Jose", nickname: "Sharks" },
  { id: "55", name: "Seattle Kraken", abbreviation: "SEA", location: "Seattle", nickname: "Kraken" },
  { id: "23", name: "Vancouver Canucks", abbreviation: "VAN", location: "Vancouver", nickname: "Canucks" },
  { id: "54", name: "Vegas Golden Knights", abbreviation: "VGK", location: "Vegas", nickname: "Golden Knights" },
];

// NBA Teams (30 teams)
const NBA_TEAMS: Team[] = [
  // Atlantic Division
  { id: "2", name: "Boston Celtics", abbreviation: "BOS", location: "Boston", nickname: "Celtics" },
  { id: "17", name: "Brooklyn Nets", abbreviation: "BKN", location: "Brooklyn", nickname: "Nets" },
  { id: "18", name: "New York Knicks", abbreviation: "NYK", location: "New York", nickname: "Knicks" },
  { id: "20", name: "Philadelphia 76ers", abbreviation: "PHI", location: "Philadelphia", nickname: "76ers" },
  { id: "28", name: "Toronto Raptors", abbreviation: "TOR", location: "Toronto", nickname: "Raptors" },
  // Central Division
  { id: "4", name: "Chicago Bulls", abbreviation: "CHI", location: "Chicago", nickname: "Bulls" },
  { id: "5", name: "Cleveland Cavaliers", abbreviation: "CLE", location: "Cleveland", nickname: "Cavaliers" },
  { id: "8", name: "Detroit Pistons", abbreviation: "DET", location: "Detroit", nickname: "Pistons" },
  { id: "11", name: "Indiana Pacers", abbreviation: "IND", location: "Indiana", nickname: "Pacers" },
  { id: "15", name: "Milwaukee Bucks", abbreviation: "MIL", location: "Milwaukee", nickname: "Bucks" },
  // Southeast Division
  { id: "1", name: "Atlanta Hawks", abbreviation: "ATL", location: "Atlanta", nickname: "Hawks" },
  { id: "30", name: "Charlotte Hornets", abbreviation: "CHA", location: "Charlotte", nickname: "Hornets" },
  { id: "14", name: "Miami Heat", abbreviation: "MIA", location: "Miami", nickname: "Heat" },
  { id: "19", name: "Orlando Magic", abbreviation: "ORL", location: "Orlando", nickname: "Magic" },
  { id: "27", name: "Washington Wizards", abbreviation: "WAS", location: "Washington", nickname: "Wizards" },
  // Northwest Division
  { id: "7", name: "Denver Nuggets", abbreviation: "DEN", location: "Denver", nickname: "Nuggets" },
  { id: "16", name: "Minnesota Timberwolves", abbreviation: "MIN", location: "Minnesota", nickname: "Timberwolves" },
  { id: "22", name: "Oklahoma City Thunder", abbreviation: "OKC", location: "Oklahoma City", nickname: "Thunder" },
  { id: "23", name: "Portland Trail Blazers", abbreviation: "POR", location: "Portland", nickname: "Trail Blazers" },
  { id: "26", name: "Utah Jazz", abbreviation: "UTA", location: "Utah", nickname: "Jazz" },
  // Pacific Division
  { id: "9", name: "Golden State Warriors", abbreviation: "GSW", location: "Golden State", nickname: "Warriors" },
  { id: "12", name: "Los Angeles Clippers", abbreviation: "LAC", location: "Los Angeles", nickname: "Clippers" },
  { id: "13", name: "Los Angeles Lakers", abbreviation: "LAL", location: "Los Angeles", nickname: "Lakers" },
  { id: "21", name: "Phoenix Suns", abbreviation: "PHX", location: "Phoenix", nickname: "Suns" },
  { id: "23", name: "Sacramento Kings", abbreviation: "SAC", location: "Sacramento", nickname: "Kings" },
  // Southwest Division
  { id: "6", name: "Dallas Mavericks", abbreviation: "DAL", location: "Dallas", nickname: "Mavericks" },
  { id: "10", name: "Houston Rockets", abbreviation: "HOU", location: "Houston", nickname: "Rockets" },
  { id: "29", name: "Memphis Grizzlies", abbreviation: "MEM", location: "Memphis", nickname: "Grizzlies" },
  { id: "3", name: "New Orleans Pelicans", abbreviation: "NOP", location: "New Orleans", nickname: "Pelicans" },
  { id: "24", name: "San Antonio Spurs", abbreviation: "SAS", location: "San Antonio", nickname: "Spurs" },
];

const TEAMS_BY_LEAGUE: Record<League, Team[]> = {
  nfl: NFL_TEAMS,
  nhl: NHL_TEAMS,
  nba: NBA_TEAMS,
};

/**
 * Resolve a team query to a Team object
 * Supports abbreviation, city, nickname, or full name matching
 */
export function resolveTeam(league: League, query: string): Team | null {
  const teams = TEAMS_BY_LEAGUE[league];
  if (!teams) return null;

  const normalized = query.toLowerCase().trim();

  for (const team of teams) {
    // Check abbreviation (case-insensitive)
    if (team.abbreviation.toLowerCase() === normalized) {
      return team;
    }
    // Check nickname
    if (team.nickname.toLowerCase() === normalized) {
      return team;
    }
    // Check location/city
    if (team.location.toLowerCase() === normalized) {
      return team;
    }
    // Check full name
    if (team.name.toLowerCase() === normalized) {
      return team;
    }
    // Check partial match on full name
    if (team.name.toLowerCase().includes(normalized)) {
      return team;
    }
  }

  return null;
}

/**
 * Get all teams for a league
 */
export function getTeams(league: League): Team[] {
  return TEAMS_BY_LEAGUE[league] || [];
}

/**
 * Validate if a string is a valid league
 */
export function isValidLeague(league: string): league is League {
  return league === "nfl" || league === "nhl" || league === "nba";
}
