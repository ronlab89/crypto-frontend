import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { useDarkMode } from "@/hooks/useDarkMode";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  title: string;
  showTitle?: boolean;
  labels: string[];
  data: number[];
  colors?: string[]; // tailwind classes
  width?: string;
  height?: string;
  labelFontSize?: number;
  titleFontSize?: number;
  fontFamily?: string;
};

export default function DoughnutChart({
  title,
  showTitle,
  labels,
  data,
  colors,
  width,
  height,
  labelFontSize,
  titleFontSize,
  fontFamily,
}: Props) {
  const isDarkMode = useDarkMode();

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? "#e5e7eb" : "#1f2937",
          font: {
            size: labelFontSize || 10,
            family: fontFamily || "Roboto, sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: title ?? "",
        color: isDarkMode ? "#e5e7eb" : "#1f2937",
        font: {
          size: titleFontSize || 16,
          family: fontFamily || "Roboto, sans-serif",
        },
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Dominancia",
        data,
        backgroundColor: (colors ?? labels.map(() => "#3b82f6")).map(
          getColorFromTailwind
        ),
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
      <Doughnut data={chartData} options={options} />
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
  return tailwindToHex[tw] ?? tw;
}
