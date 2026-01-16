import { useState, useMemo } from "react";
import BracketView from "./BracketView.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";

// Mock tournament data - 32 teams in single elimination
const mockRCTournament = {
  teams: [
    "Phoenix Rising", "Dragon Slayers", "Thunder Knights", "Elite Gamers",
    "Victory Squad", "Crimson Force", "Iron Titans", "Shadow Warriors",
    "Apex Legends", "Nova Team", "Inferno Crew", "Stellar Squad",
    "Divine Gaming", "Chaos Masters", "Legends Unite", "Mystic Rangers",
    "Alpha Force", "Thunder Squad", "Victory Eagles", "Blaze Team",
    "Titan Power", "Storm Chasers", "Elite Warriors", "Sonic Speed",
    "Quantum Kings", "Vortex Gaming", "Solar Flares", "Thunder Bolt",
    "Eclipse Team", "Infinity Squad", "Nexus Warriors", "Prime Legends"
  ],
  rounds: {
    round1: [
      { teamA: "Phoenix Rising", teamB: "Dragon Slayers", scoreA: 0, scoreB: 0, status: "upcoming", time: null },
      { teamA: "Thunder Knights", teamB: "Elite Gamers", scoreA: 0, scoreB: 0, status: "upcoming", time: null },
      { teamA: "Victory Squad", teamB: "Crimson Force", scoreA: 0, scoreB: 0, status: "upcoming", time: null },
      { teamA: "Iron Titans", teamB: "Shadow Warriors", scoreA: 0, scoreB: 0, status: "upcoming", time: null },
      { teamA: "Apex Legends", teamB: "Nova Team", scoreA: 0, scoreB: 0, status: "upcoming", time: null },
      { teamA: "Inferno Crew", teamB: "Stellar Squad", scoreA: 0, scoreB: 0, status: "upcoming", time: null },
      { teamA: "Divine Gaming", teamB: "Chaos Masters", scoreA: 0, scoreB: 0, status: "upcoming", time: null },
      { teamA: "Legends Unite", teamB: "Mystic Rangers", scoreA: 0, scoreB: 0, status: "upcoming", time: null },
      { teamA: "Alpha Force", teamB: "Thunder Squad", scoreA: 0, scoreB: 0, status: "upcoming", time: null },
      { teamA: "Victory Eagles", teamB: "Blaze Team", scoreA: 0, scoreB: 0, status: "upcoming", time: null },
      { teamA: "Titan Power", teamB: "Storm Chasers", scoreA: 0, scoreB: 0, status: "upcoming", time: null },
      { teamA: "Elite Warriors", teamB: "Sonic Speed", scoreA: 0, scoreB: 0, status: "upcoming", time: null },
      { teamA: "Quantum Kings", teamB: "Vortex Gaming", scoreA: 0, scoreB: 0, status: "upcoming", time: null },
      { teamA: "Solar Flares", teamB: "Thunder Bolt", scoreA: 0, scoreB: 0, status: "upcoming", time: null },
      { teamA: "Eclipse Team", teamB: "Infinity Squad", scoreA: 0, scoreB: 0, status: "upcoming", time: null },
      { teamA: "Nexus Warriors", teamB: "Prime Legends", scoreA: 0, scoreB: 0, status: "upcoming", time: null },
    ],
  }
};

const RCBracket = ({ canEdit = false }) => {
  const [bracket, setBracket] = useState(() => {
    const rounds = mockRCTournament.rounds;
    
    return {
      columns: [
        {
          title: "Round 1 (32 Teams)",
          matches: rounds.round1.map(m => ({ ...m }))
        },
        {
          title: "Round 2 (16 Teams)",
          matches: Array(8).fill(null).map(() => ({
            teamA: "TBD",
            teamB: "TBD",
            scoreA: 0,
            scoreB: 0,
            status: "upcoming",
            time: null
          }))
        },
        {
          title: "Quarterfinals (8 Teams)",
          matches: Array(4).fill(null).map(() => ({
            teamA: "TBD",
            teamB: "TBD",
            scoreA: 0,
            scoreB: 0,
            status: "upcoming",
            time: null
          }))
        },
        {
          title: "Semifinals (4 Teams)",
          matches: Array(2).fill(null).map(() => ({
            teamA: "TBD",
            teamB: "TBD",
            scoreA: 0,
            scoreB: 0,
            status: "upcoming",
            time: null
          }))
        },
        {
          title: "Finals (2 Teams)",
          matches: [
            {
              teamA: "TBD",
              teamB: "TBD",
              scoreA: 0,
              scoreB: 0,
              status: "upcoming",
              time: null
            }
          ]
        }
      ]
    };
  });

  const handleScoreChange = (colIndex, matchIndex, scoreA, scoreB) => {
    if (!canEdit) return;

    setBracket(prev => {
      const newBracket = { ...prev };
      newBracket.columns = newBracket.columns.map((col, i) => {
        if (i === colIndex) {
          return {
            ...col,
            matches: col.matches.map((match, idx) => {
              if (idx === matchIndex) {
                return { ...match, scoreA, scoreB };
              }
              return match;
            })
          };
        }
        return col;
      });
      return newBracket;
    });
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card border-border/30 bg-black/50">
        <CardHeader>
          <CardTitle className="font-orbitron text-2xl">Real Cricket 24 - Tournament Bracket</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Single elimination tournament with 32 teams competing for victory.
          </p>
          {canEdit && (
            <p className="text-sm text-yellow-400 mb-4">
              ✓ Admin Mode: You can update match scores
            </p>
          )}
          <BracketView 
            bracket={bracket} 
            onScoreChange={canEdit ? handleScoreChange : null}
          />
        </CardContent>
      </Card>

      {/* Tournament Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="glass-card border-border/30">
          <CardHeader>
            <CardTitle className="font-orbitron text-lg">Tournament Format</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• <span className="text-yellow-400">32 Teams</span> in initial bracket</p>
            <p>• <span className="text-yellow-400">Single Elimination</span> format</p>
            <p>• Winners advance to next round</p>
            <p>• Best of 1 match per round</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-border/30">
          <CardHeader>
            <CardTitle className="font-orbitron text-lg">Tournament Stages</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• <span className="text-yellow-400">Round 1:</span> 16 matches (32 → 16)</p>
            <p>• <span className="text-yellow-400">Round 2:</span> 8 matches (16 → 8)</p>
            <p>• <span className="text-yellow-400">Round 3:</span> 4 matches (8 → 4)</p>
            <p>• <span className="text-yellow-400">Round 4:</span> 2 matches (4 → 2)</p>
            <p>• <span className="text-yellow-400">Finals:</span> 1 match (2 → 1)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RCBracket;
