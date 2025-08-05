import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
  type ChartOptions,
} from "chart.js";
import { useDarkMode } from "@/hooks/useDarkMode";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

type Props = {
  title: string;
  showTitle?: boolean;
  labels: string[];
  datasetLabel: string;
  data: number[];
  color?: string; // tailwind color class
  width?: string;
  height?: string;
  labelFontSize?: number;
  titleFontSize?: number;
  fontFamily?: string;
};

export default function BarChart({
  title,
  showTitle,
  labels,
  datasetLabel,
  data,
  color = "bg-blue-500",
  width = "w-full",
  height = "h-full",
  labelFontSize,
  titleFontSize,
  fontFamily,
}: Props) {
  const isDarkMode = useDarkMode();

  const options: ChartOptions<"bar"> = {
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
      x: {
        ticks: {
          color: isDarkMode ? "#e5e7eb" : "#1f2937",
          font: {
            size: labelFontSize || 10,
            family: fontFamily || "Roboto, sans-serif",
          },
        },
        grid: { color: isDarkMode ? "#374151" : "#d1d5db" },
      },
      y: {
        ticks: {
          color: isDarkMode ? "#e5e7eb" : "#1f2937",
          font: {
            size: labelFontSize || 10,
            family: fontFamily || "Roboto, sans-serif",
          },
        },
        grid: { color: isDarkMode ? "#374151" : "#d1d5db" },
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: datasetLabel,
        data,
        backgroundColor: getColorFromTailwind(color),
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
      <Bar data={chartData} options={options} />
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
