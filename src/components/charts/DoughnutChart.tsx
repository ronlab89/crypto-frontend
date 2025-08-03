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
  labels: string[];
  data: number[];
  colors?: string[]; // tailwind classes
};

export default function DoughnutChart({ title, labels, data, colors }: Props) {
  const isDarkMode = useDarkMode();

  const options: ChartOptions<"doughnut"> = {
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
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-2 text-zinc-700 dark:text-zinc-100">
        {title}
      </h3>
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
