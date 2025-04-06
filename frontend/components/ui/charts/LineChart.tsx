import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";

interface LineChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  showAnimation?: boolean;
  className?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  showGrid?: boolean;
  height?: number;
}

export function LineChart({
  data,
  index,
  categories,
  colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
  valueFormatter = (value) => `${value}`,
  showAnimation = true,
  className,
  showLegend = true,
  showTooltip = true,
  showGrid = true,
  height = 300,
}: LineChartProps) {
  // Create a config object to pass to the ChartContainer
  const chartConfig = categories.reduce(
    (acc, category, i) => ({
      ...acc,
      [category]: {
        label: category,
        color: colors[i % colors.length],
      },
    }),
    {}
  );

  return (
    <ChartContainer className={className} config={chartConfig}>
      <RechartsLineChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 10,
        }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        <XAxis
          dataKey={index}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#888", fontSize: 12 }}
          tickMargin={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#888", fontSize: 12 }}
          tickFormatter={valueFormatter}
          tickMargin={10}
        />
        {showTooltip && (
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-md">
                    <div className="font-medium">{label}</div>
                    {payload.map((entry, index) => (
                      <div
                        key={`item-${index}`}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-muted-foreground">
                          {entry.name}:{" "}
                        </span>
                        <span className="font-medium">
                          {valueFormatter(entry.value as number)}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />
        )}
        {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={showAnimation}
            animationDuration={1000}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
}
