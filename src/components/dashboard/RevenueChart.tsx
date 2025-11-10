import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface RevenueChartProps {
  data: { date: string; revenue: number }[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <Card className="glass-card p-6">
      <h2 className="text-2xl font-bold mb-6">Faturamento ao Longo do Tempo</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--neon-cyan))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--neon-cyan))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Faturamento']}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--neon-cyan))"
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--neon-cyan))', r: 4 }}
              activeDot={{ r: 6, fill: 'hsl(var(--neon-cyan))', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
              fill="url(#revenueGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
