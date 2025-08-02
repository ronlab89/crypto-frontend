import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

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
  labels: string[];
  datasetLabel: string;
  data: number[];
  color?: string; // tailwind color class
};

export default function BarChart({
  title,
  labels,
  datasetLabel,
  data,
  color = "bg-blue-500",
}: Props) {
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
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-2 text-zinc-700 dark:text-zinc-100">
        {title}
      </h3>
      <Bar data={chartData} options={{ responsive: true }} />
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
