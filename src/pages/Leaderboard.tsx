import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award, ArrowLeft, Crown } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  totalRaised: number;
  referrals: number;
  avatar: string;
  isCurrentUser?: boolean;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const currentUser = localStorage.getItem("userName") || "Alex Chen";

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Simulate API call for leaderboard data
    setTimeout(() => {
      const mockData: LeaderboardEntry[] = [
        { rank: 1, name: "Sarah Johnson", totalRaised: 45230, referrals: 67, avatar: "SJ" },
        { rank: 2, name: "Mike Chen", totalRaised: 38920, referrals: 54, avatar: "MC" },
        { rank: 3, name: "Emily Rodriguez", totalRaised: 32150, referrals: 48, avatar: "ER" },
        { rank: 4, name: "James Wilson", totalRaised: 28740, referrals: 42, avatar: "JW" },
        { rank: 5, name: "Lisa Park", totalRaised: 24680, referrals: 39, avatar: "LP" },
        { rank: 6, name: "David Kim", totalRaised: 19350, referrals: 31, avatar: "DK" },
        { rank: 7, name: currentUser, totalRaised: 12450, referrals: 23, avatar: "AC", isCurrentUser: true },
        { rank: 8, name: "Anna Thompson", totalRaised: 11200, referrals: 19, avatar: "AT" },
        { rank: 9, name: "Chris Lee", totalRaised: 9850, referrals: 16, avatar: "CL" },
        { rank: 10, name: "Maria Garcia", totalRaised: 8430, referrals: 14, avatar: "MG" }
      ];
      setLeaderboardData(mockData);
    }, 500);
  }, [navigate, currentUser]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-400" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBackground = (rank: number, isCurrentUser?: boolean) => {
    if (isCurrentUser) {
      return "bg-gradient-primary/20 border-primary/30";
    }
    
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/20";
      case 2:
        return "bg-gradient-to-r from-gray-400/10 to-gray-500/10 border-gray-400/20";
      case 3:
        return "bg-gradient-to-r from-amber-600/10 to-amber-700/10 border-amber-600/20";
      default:
        return "bg-card border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="bg-gradient-primary bg-clip-text text-transparent text-2xl font-bold">
              InternPortal
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="bg-gradient-primary rounded-2xl p-8 mb-6">
            <Trophy className="h-12 w-12 text-white mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
            <p className="text-white/80">See how you stack up against other interns</p>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {leaderboardData.slice(0, 3).map((entry, index) => {
            const positions = [1, 0, 2]; // Center the #1, left #2, right #3
            const actualIndex = positions[index];
            const actualEntry = leaderboardData[actualIndex];
            
            return (
              <div 
                key={actualEntry.rank} 
                className={`text-center ${index === 1 ? 'order-1' : index === 0 ? 'order-2' : 'order-3'}`}
              >
                <div className={`bg-card border-2 rounded-2xl p-6 ${getRankBackground(actualEntry.rank)} ${
                  index === 1 ? 'transform scale-105' : ''
                }`}>
                  <div className="mb-4">
                    {getRankIcon(actualEntry.rank)}
                  </div>
                  <Avatar className="h-16 w-16 mx-auto mb-3">
                    <AvatarFallback className="bg-gradient-primary text-white text-lg font-bold">
                      {actualEntry.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-foreground mb-1">{actualEntry.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-1">
                    ${actualEntry.totalRaised.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {actualEntry.referrals} referrals
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Leaderboard */}
        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Full Rankings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2">
              {leaderboardData.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center justify-between p-4 border-l-4 transition-all duration-200 hover:bg-muted/50 ${
                    entry.isCurrentUser 
                      ? 'border-l-primary bg-gradient-primary/10' 
                      : 'border-l-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 flex justify-center">
                      {getRankIcon(entry.rank)}
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-secondary text-white font-medium">
                        {entry.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">{entry.name}</span>
                        {entry.isCurrentUser && (
                          <Badge className="bg-gradient-primary text-white">You</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {entry.referrals} referrals
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-foreground">
                      ${entry.totalRaised.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-success rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                ${leaderboardData[0]?.totalRaised.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Top Performer</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-secondary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Award className="h-6 w-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {leaderboardData.reduce((sum, entry) => sum + entry.totalRaised, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Total Raised</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Medal className="h-6 w-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {leaderboardData.length}
              </p>
              <p className="text-sm text-muted-foreground">Active Interns</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;