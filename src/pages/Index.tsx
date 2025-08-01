import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Trophy, Users, DollarSign } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const features = [
    {
      icon: DollarSign,
      title: "Track Donations",
      description: "Monitor your fundraising progress in real-time"
    },
    {
      icon: Users,
      title: "Referral System",
      description: "Earn rewards by referring new participants"
    },
    {
      icon: Trophy,
      title: "Leaderboard",
      description: "Compete with other interns and climb the ranks"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="bg-gradient-primary bg-clip-text text-transparent text-6xl font-bold mb-6">
              InternPortal
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-6">
              Empowering the Next Generation
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our comprehensive intern program and track your progress, 
              donations, and achievements in one beautiful dashboard.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate("/signup")}
                className="bg-gradient-primary hover:opacity-90 text-white font-medium px-8"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate("/login")}
                className="border-border px-8"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-muted-foreground text-lg">
              Built for ambitious interns who want to make an impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-background border-border shadow-card hover:shadow-glow transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-primary rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-primary rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to start your journey?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Join thousands of interns who are already making a difference
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/signup")}
              className="bg-white text-primary hover:bg-white/90 font-medium px-8"
            >
              Create Your Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
