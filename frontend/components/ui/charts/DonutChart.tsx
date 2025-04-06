import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";

interface DonutChartProps {
  data: any[];
  index: string;
  category: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  showAnimation?: boolean;
  className?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  showLabels?: boolean;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
}

export function DonutChart({
  data,
  index,
  category,
  colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
  valueFormatter = (value) => `${value}`,
  showAnimation = true,
  className,
  showLegend = true,
  showTooltip = true,
  showLabels = false,
  height = 300,
  innerRadius = 60,
  outerRadius = 80,
}: DonutChartProps) {
  // Create a config object to pass to the ChartContainer
  const chartConfig = data.reduce(
    (acc, entry, i) => ({
      ...acc,
      [entry[index]]: {
        label: entry[index],
        color: colors[i % colors.length],
      },
    }),
    {}
  );

  return (
    <ChartContainer className={className} config={chartConfig}>
      <RechartsPieChart
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <Pie
          data={data}
          nameKey={index}
          dataKey={category}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          isAnimationActive={showAnimation}
          animationDuration={1000}
          label={
            showLabels
              ? ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`
              : undefined
          }
          labelLine={showLabels}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        {showTooltip && (
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0];
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-md">
                    <div className="font-medium">{data.name}</div>
                    <div className="flex items-center gap-2 text-sm">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: data.color }}
                      />
                      <span className="font-medium">
                        {valueFormatter(data.value as number)}
                      </span>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
        )}
        {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
      </RechartsPieChart>
    </ChartContainer>
  );
}
