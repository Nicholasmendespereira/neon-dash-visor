import { Card } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  sparklineData?: number[];
  icon?: React.ReactNode;
}

export const MetricCard = ({ title, value, change, sparklineData, icon }: MetricCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="glass-card p-6 hover:neon-glow transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-muted-foreground text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-gradient">{value}</p>
        </div>
        {icon && (
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className={`flex items-center gap-1 text-sm font-medium ${
          isPositive ? 'text-neon-cyan' : 'text-secondary'
        }`}>
          {isPositive ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
          {Math.abs(change)}%
        </div>

        {sparklineData && sparklineData.length > 0 && (
          <div className="flex-1 h-8">
            <Sparkline data={sparklineData} color={isPositive ? 'cyan' : 'magenta'} />
          </div>
        )}
      </div>
    </Card>
  );
};

interface SparklineProps {
  data: number[];
  color: 'cyan' | 'magenta';
}

const Sparkline = ({ data, color }: SparklineProps) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  const strokeColor = color === 'cyan' ? 'hsl(var(--neon-cyan))' : 'hsl(var(--neon-magenta))';

  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
        className="drop-shadow-[0_0_8px_currentColor]"
      />
    </svg>
  );
};
