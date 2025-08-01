import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/StatCard";
import { 
  DollarSign, 
  Users, 
  Trophy, 
  Gift, 
  Copy, 
  LogOut,
  BarChart3,
  Star,
  Target
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [dashboardData, setDashboardData] = useState({
    totalRaised: 0,
    referrals: 0,
    rank: 0
  });

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Get user data
    const name = localStorage.getItem("userName") || "Intern";
    setUserName(name);
    setReferralCode(`${name.toLowerCase().replace(/\s+/g, "")}2025`);

    // Simulate API call for dashboard data
    setTimeout(() => {
      setDashboardData({
        totalRaised: 12450,
        referrals: 23,
        rank: 7
      });
    }, 500);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  const rewards = [
    { name: "Welcome Badge", unlocked: true, icon: "🎉" },
    { name: "First Referral", unlocked: true, icon: "🤝" },
    { name: "$10K Milestone", unlocked: true, icon: "💰" },
    { name: "Top 10 Rank", unlocked: true, icon: "🏆" },
    { name: "$25K Milestone", unlocked: false, icon: "🎯" },
    { name: "Top 5 Rank", unlocked: false, icon: "⭐" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-primary bg-clip-text text-transparent text-2xl font-bold">
                InternPortal
              </div>
              <nav className="hidden md:flex space-x-6">
                <button className="text-primary font-medium">Dashboard</button>
                <button 
                  onClick={() => navigate("/leaderboard")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Leaderboard
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-foreground font-medium">Welcome, {userName}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-border"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-primary rounded-2xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}!</h1>
              <p className="text-white/80">You're making great progress in the program</p>
            </div>
            <div className="mt-4 md:mt-0 text-center">
              <p className="text-white/80 text-sm">Your Referral Code</p>
              <div className="flex items-center space-x-2 mt-1">
                <code className="bg-white/20 px-3 py-2 rounded-lg font-mono">
                  {referralCode}
                </code>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={copyReferralCode}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Donations Raised"
            value={`$${dashboardData.totalRaised.toLocaleString()}`}
            icon={DollarSign}
            trend="+12% this month"
            gradient="bg-gradient-success"
          />
          <StatCard
            title="Referrals Made"
            value={dashboardData.referrals}
            icon={Users}
            trend="+3 this week"
            gradient="bg-gradient-secondary"
          />
          <StatCard
            title="Current Rank"
            value={`#${dashboardData.rank}`}
            icon={Trophy}
            trend="↑2 positions"
            gradient="bg-gradient-primary"
          />
        </div>

        {/* Rewards Section */}
        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <Gift className="h-5 w-5" />
              <span>Rewards & Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.map((reward, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border ${
                    reward.unlocked
                      ? "bg-gradient-primary/10 border-primary/20"
                      : "bg-muted/50 border-border"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{reward.icon}</span>
                    <div>
                      <p className={`font-medium ${
                        reward.unlocked ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {reward.name}
                      </p>
                      <Badge 
                        variant={reward.unlocked ? "default" : "secondary"}
                        className={reward.unlocked ? "bg-gradient-primary text-white" : ""}
                      >
                        {reward.unlocked ? "Unlocked" : "Locked"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <BarChart3 className="h-5 w-5" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start bg-gradient-primary hover:opacity-90 text-white"
                onClick={() => navigate("/leaderboard")}
              >
                <Trophy className="h-4 w-4 mr-2" />
                View Leaderboard
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-border"
                onClick={copyReferralCode}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Referral Code
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <Target className="h-5 w-5" />
                <span>Next Milestone</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Progress to $25K</span>
                    <span className="text-sm font-medium text-foreground">
                      ${dashboardData.totalRaised.toLocaleString()} / $25,000
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(dashboardData.totalRaised / 25000) * 100}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  ${(25000 - dashboardData.totalRaised).toLocaleString()} remaining to unlock the next reward!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;