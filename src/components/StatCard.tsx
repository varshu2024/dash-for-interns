import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  gradient?: string;
}

const StatCard = ({ title, value, icon: Icon, trend, gradient = "bg-gradient-primary" }: StatCardProps) => {
  return (
    <Card className="bg-card border-border shadow-card hover:shadow-glow transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
            {trend && (
              <p className="text-sm text-green-400 mt-1">{trend}</p>
            )}
          </div>
          <div className={`${gradient} rounded-xl p-3`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;