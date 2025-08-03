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
  labels: string[];
  data: number[];
  label: string;
  color?: string;
};

export default function RadarChart({
  title,
  labels,
  data,
  label,
  color = "bg-blue-500",
}: Props) {
  const isDarkMode = useDarkMode();

  const options: ChartOptions<"radar"> = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? "#e5e7eb" : "#1f2937",
        },
      },
      title: {
        display: true,
        text: title,
        color: isDarkMode ? "#e5e7eb" : "#1f2937",
        font: { size: 18 },
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
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-2 text-zinc-700 dark:text-zinc-100">
        {title}
      </h3>
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
