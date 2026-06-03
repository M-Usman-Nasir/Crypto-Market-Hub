import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts";

interface SparklineChartProps {
  data?: number[] | null;
  color?: string;
  width?: string | number;
  height?: string | number;
}

export function SparklineChart({ data, color = "#00F0FF", width = "100%", height = 50 }: SparklineChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center text-xs text-muted-foreground font-mono" style={{ width, height }}>
        No data
      </div>
    );
  }

  const chartData = data.map((value, index) => ({
    index,
    value,
  }));

  const min = Math.min(...data);
  const max = Math.max(...data);

  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <YAxis domain={[min, max]} hide />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
