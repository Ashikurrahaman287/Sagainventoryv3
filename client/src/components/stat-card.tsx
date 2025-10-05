import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  testId?: string;
}

export function StatCard({ title, value, change, icon: Icon, testId }: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card data-testid={testId}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <div className="text-sm font-medium text-muted-foreground">{title}</div>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-mono" data-testid={`${testId}-value`}>
          {value}
        </div>
        {change !== undefined && (
          <div className="flex items-center gap-1 text-xs mt-1">
            {isPositive && (
              <>
                <TrendingUp className="h-3 w-3 text-success" />
                <span className="text-success">+{change}%</span>
              </>
            )}
            {isNegative && (
              <>
                <TrendingDown className="h-3 w-3 text-destructive" />
                <span className="text-destructive">{change}%</span>
              </>
            )}
            {!isPositive && !isNegative && (
              <span className="text-muted-foreground">No change</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
