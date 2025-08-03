import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { useDarkMode } from "@/hooks/useDarkMode";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

type Props = {
  title: string;
  showTitle?: boolean;
  labels: string[];
  data: number[];
  label: string;
  color?: string;
  width?: string;
  height?: string;
  labelFontSize?: number;
  titleFontSize?: number;
  fontFamily?: string;
};

export default function RadarChart({
  title,
  showTitle,
  labels,
  data,
  label,
  color = "bg-blue-500",
  width = "w-full",
  height = "h-full",
  labelFontSize,
  titleFontSize,
  fontFamily,
}: Props) {
  const isDarkMode = useDarkMode();

  const options: ChartOptions<"radar"> = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? "#e5e7eb" : "#1f2937",
          font: {
            size: labelFontSize || 12,
            family: fontFamily || "Roboto, sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: title,
        color: isDarkMode ? "#e5e7eb" : "#1f2937",
        font: {
          size: titleFontSize || 16,
          family: fontFamily || "Roboto, sans-serif",
        },
      },
    },
    scales: {
      r: {
        pointLabels: {
          color: isDarkMode ? "#e5e7eb" : "#1f2937",
        },
        grid: {
          color: isDarkMode ? "#374151" : "#d1d5db",
        },
        angleLines: {
          color: isDarkMode ? "#374151" : "#d1d5db",
        },
        ticks: {
          color: isDarkMode ? "#e5e7eb" : "#1f2937",
          font: {
            size: labelFontSize || 12,
            family: fontFamily || "Roboto, sans-serif",
          },
        },
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: getColorFromTailwind(color) + "33", // 20% opacity
        borderColor: getColorFromTailwind(color),
        borderWidth: 2,
      },
    ],
  };

  return (
    <div
      className={`${width} ${height} p-2 bg-zinc-100/30 dark:bg-zinc-900 rounded-2xl shadow flex flex-col justify-center items-center`}
    >
      {showTitle ? (
        <h3 className="text-sm font-semibold mb-2 text-zinc-700 dark:text-zinc-100 self-start">
          {title}
        </h3>
      ) : null}
      <Radar data={chartData} options={options} />
    </div>
  );
}

function getColorFromTailwind(tw: string) {
  const tailwindToHex: Record<string, string> = {
    "bg-blue-500": "#3b82f6",
    "bg-green-500": "#10b981",
    "bg-red-500": "#ef4444",
    "bg-yellow-500": "#eab308",
    "bg-purple-500": "#8b5cf6",
  };
  return tailwindToHex[tw] ?? "#3b82f6";
}
