import { useState, useMemo } from "react";
import BracketView from "./BracketView.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Trash2, Plus, Edit2, Check, X } from "lucide-react";

const defaultTeams = [
  "Phoenix Rising", "Dragon Slayers", "Thunder Knights", "Elite Gamers",
  "Victory Squad", "Crimson Force", "Iron Titans", "Shadow Warriors",
  "Apex Legends", "Nova Team", "Inferno Crew", "Stellar Squad",
  "Divine Gaming", "Chaos Masters", "Legends Unite", "Mystic Rangers",
  "Alpha Force", "Thunder Squad", "Victory Eagles", "Blaze Team",
  "Titan Power", "Storm Chasers", "Elite Warriors", "Sonic Speed",
  "Quantum Kings", "Vortex Gaming", "Solar Flares", "Thunder Bolt",
  "Eclipse Team", "Infinity Squad", "Nexus Warriors", "Prime Legends"
];

const RCBracket = ({ canEdit = false }) => {
  const [teams, setTeams] = useState(defaultTeams);
  const [newTeamName, setNewTeamName] = useState("");
  const [editingTeamIndex, setEditingTeamIndex] = useState(null);
  const [editingTeamValue, setEditingTeamValue] = useState("");
  
  const [bracket, setBracket] = useState(() => {
    const rounds = generateInitialBracket(defaultTeams);
    return rounds;
  });

  const [finalStage, setFinalStage] = useState({
    semifinals: [
      { id: "sf1", teamA: "TBD", teamB: "TBD", scoreA: 0, scoreB: 0, status: "upcoming", time: null },
      { id: "sf2", teamA: "TBD", teamB: "TBD", scoreA: 0, scoreB: 0, status: "upcoming", time: null },
    ],
    finals: { id: "final", teamA: "TBD", teamB: "TBD", scoreA: 0, scoreB: 0, status: "upcoming", time: null }
  });

  // Generate initial bracket structure
  function generateInitialBracket(teamList) {
    const cols = [
      {
        title: "Round 1 (32 Teams)",
        matches: Array(16).fill(null).map((_, i) => ({
          teamA: teamList[i * 2] || "TBD",
          teamB: teamList[i * 2 + 1] || "TBD",
          scoreA: 0,
          scoreB: 0,
          status: "upcoming",
          time: null
        }))
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
      }
    ];
    return { columns: cols };
  }

  // Add new team
  const handleAddTeam = () => {
    if (newTeamName.trim()) {
      const updatedTeams = [...teams, newTeamName.trim()];
      setTeams(updatedTeams);
      setNewTeamName("");
      setBracket(generateInitialBracket(updatedTeams));
    }
  };

  // Edit team
  const handleEditTeam = (index) => {
    setEditingTeamIndex(index);
    setEditingTeamValue(teams[index]);
  };

  const handleSaveTeam = (index) => {
    if (editingTeamValue.trim()) {
      const updatedTeams = [...teams];
      updatedTeams[index] = editingTeamValue.trim();
      setTeams(updatedTeams);
      setBracket(generateInitialBracket(updatedTeams));
      setEditingTeamIndex(null);
      setEditingTeamValue("");
    }
  };

  // Delete team
  const handleDeleteTeam = (index) => {
    const updatedTeams = teams.filter((_, i) => i !== index);
    setTeams(updatedTeams);
    setBracket(generateInitialBracket(updatedTeams));
  };

  // Handle bracket score change
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

  // Handle final stage score change
  const handleFinalScoreChange = (stage, matchId, scoreA, scoreB) => {
    if (!canEdit) return;

    setFinalStage(prev => {
      if (stage === "semifinals") {
        return {
          ...prev,
          semifinals: prev.semifinals.map(match => 
            match.id === matchId ? { ...match, scoreA, scoreB } : match
          )
        };
      } else if (stage === "finals") {
        return {
          ...prev,
          finals: { ...prev.finals, scoreA, scoreB }
        };
      }
      return prev;
    });
  };

  return (
    <div className="space-y-6">
      {/* Main Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMN 1: Teams */}
        <div className="space-y-4">
          <Card className="glass-card border-border/30 bg-black/50 sticky top-20 lg:top-24">
            <CardHeader>
              <CardTitle className="font-orbitron text-xl">Column 1: Teams</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">Total: {teams.length}</p>
            </CardHeader>
            <CardContent>
              {canEdit && (
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Add new team..."
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddTeam()}
                    className="flex-1 text-xs"
                    size="sm"
                  />
                  <Button onClick={handleAddTeam} size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              )}
              
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {teams.map((team, index) => (
                  <div key={index} className="relative">
                    {editingTeamIndex === index ? (
                      <div className="flex gap-1">
                        <Input
                          value={editingTeamValue}
                          onChange={(e) => setEditingTeamValue(e.target.value)}
                          className="flex-1 text-xs h-8"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveTeam(index)}
                          className="p-1 text-green-400 hover:bg-green-400/20 rounded"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => setEditingTeamIndex(null)}
                          className="p-1 text-red-400 hover:bg-red-400/20 rounded"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-border/40 rounded-lg p-2 flex items-center justify-between group hover:border-yellow-400/50 transition text-xs">
                        <span className="truncate font-medium">{team}</span>
                        {canEdit && (
                          <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition">
                            <button
                              onClick={() => handleEditTeam(index)}
                              className="p-0.5 text-blue-400 hover:bg-blue-400/20 rounded"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteTeam(index)}
                              className="p-0.5 text-red-400 hover:bg-red-400/20 rounded"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* COLUMN 2: Single Elimination Bracket */}
        <div className="space-y-4">
          <Card className="glass-card border-border/30 bg-black/50">
            <CardHeader>
              <CardTitle className="font-orbitron text-xl">Column 2: Elimination</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">32 → 4 Teams</p>
            </CardHeader>
            <CardContent>
              {canEdit && (
                <p className="text-xs text-yellow-400 mb-4">✓ Admin Mode: Edit scores</p>
              )}
              <div className="bg-black/30 border border-border/20 rounded-lg p-3 overflow-x-auto">
                <BracketView 
                  bracket={bracket} 
                  onScoreChange={canEdit ? handleScoreChange : null}
                />
              </div>

              {/* Subcolumns Summary */}
              <div className="mt-4 space-y-2">
                <div className="bg-blue-950/30 border border-blue-400/20 rounded p-2">
                  <p className="text-xs font-semibold text-blue-300 mb-1">Subcolumn 1: Round 1</p>
                  <p className="text-xs text-muted-foreground">16 matches | 32 → 16</p>
                </div>
                <div className="bg-purple-950/30 border border-purple-400/20 rounded p-2">
                  <p className="text-xs font-semibold text-purple-300 mb-1">Subcolumn 2: Round 2</p>
                  <p className="text-xs text-muted-foreground">8 matches | 16 → 8</p>
                </div>
                <div className="bg-pink-950/30 border border-pink-400/20 rounded p-2">
                  <p className="text-xs font-semibold text-pink-300 mb-1">Subcolumn 3: QF</p>
                  <p className="text-xs text-muted-foreground">4 matches | 8 → 4</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* COLUMN 3: Final Stage */}
        <div className="space-y-4">
          <Card className="glass-card border-border/30 bg-black/50">
            <CardHeader>
              <CardTitle className="font-orbitron text-xl">Column 3: Finals</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">Top 4 → Winner</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {canEdit && (
                <p className="text-xs text-yellow-400">✓ Admin Mode: Edit scores</p>
              )}

              {/* Subcolumn 1: Semifinals */}
              <div className="space-y-2">
                <div className="bg-cyan-950/30 border border-cyan-400/30 rounded-lg p-2.5">
                  <p className="text-xs font-semibold text-cyan-300 mb-3">Subcolumn 1: Semifinals</p>
                  <div className="space-y-2">
                    {finalStage.semifinals.map((match, idx) => (
                      <div key={match.id} className="rounded-md border border-border/40 bg-black/80 p-2">
                        <p className="text-xs text-muted-foreground mb-1">SF {idx + 1}</p>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs truncate">{match.teamA}</span>
                          {canEdit ? (
                            <Input
                              type="number"
                              className="w-10 h-6 text-right bg-orange-500 text-black border-none rounded font-bold text-xs"
                              value={match.scoreA}
                              onChange={(e) => handleFinalScoreChange("semifinals", match.id, Number(e.target.value) || 0, match.scoreB)}
                            />
                          ) : (
                            <span className="rounded bg-orange-500 px-1.5 py-0.5 font-orbitron text-black text-xs">{match.scoreA}</span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs truncate">{match.teamB}</span>
                          {canEdit ? (
                            <Input
                              type="number"
                              className="w-10 h-6 text-right bg-orange-500 text-black border-none rounded font-bold text-xs"
                              value={match.scoreB}
                              onChange={(e) => handleFinalScoreChange("semifinals", match.id, match.scoreA, Number(e.target.value) || 0)}
                            />
                          ) : (
                            <span className="rounded bg-orange-500 px-1.5 py-0.5 font-orbitron text-black text-xs">{match.scoreB}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subcolumn 2: Finals */}
              <div className="space-y-2">
                <div className="bg-yellow-950/40 border border-yellow-600/50 rounded-lg p-2.5">
                  <p className="text-xs font-semibold text-yellow-300 mb-3">Subcolumn 2: Championship</p>
                  <div className="rounded-md border-2 border-yellow-600/50 bg-black/80 p-2">
                    <p className="text-xs text-yellow-400 mb-2 font-semibold">Grand Finals</p>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold truncate">{finalStage.finals.teamA}</span>
                      {canEdit ? (
                        <Input
                          type="number"
                          className="w-10 h-6 text-right bg-yellow-500 text-black border-none rounded font-bold text-xs"
                          value={finalStage.finals.scoreA}
                          onChange={(e) => handleFinalScoreChange("finals", "final", Number(e.target.value) || 0, finalStage.finals.scoreB)}
                        />
                      ) : (
                        <span className="rounded bg-yellow-500 px-1.5 py-0.5 font-orbitron text-black font-bold text-xs">{finalStage.finals.scoreA}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold truncate">{finalStage.finals.teamB}</span>
                      {canEdit ? (
                        <Input
                          type="number"
                          className="w-10 h-6 text-right bg-yellow-500 text-black border-none rounded font-bold text-xs"
                          value={finalStage.finals.scoreB}
                          onChange={(e) => handleFinalScoreChange("finals", "final", finalStage.finals.scoreA, Number(e.target.value) || 0)}
                        />
                      ) : (
                        <span className="rounded bg-yellow-500 px-1.5 py-0.5 font-orbitron text-black font-bold text-xs">{finalStage.finals.scoreB}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tournament Summary Footer */}
      <Card className="glass-card border-border/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <CardHeader>
          <CardTitle className="font-orbitron text-lg">Tournament Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-yellow-400">{teams.length}</p>
            <p className="text-xs text-muted-foreground">Total Teams</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-cyan-400">28</p>
            <p className="text-xs text-muted-foreground">Total Matches</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">4</p>
            <p className="text-xs text-muted-foreground">Final Teams</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-pink-400">1</p>
            <p className="text-xs text-muted-foreground">Champion</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RCBracket;
