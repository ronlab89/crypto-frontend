import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

type Props = {
  title: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color?: string;
  }[];
};

export default function LineChart({ title, labels, datasets }: Props) {
  const chartData = {
    labels,
    datasets: datasets.map((ds) => ({
      label: ds.label,
      data: ds.data,
      borderColor: getColorFromTailwind(ds.color || "bg-blue-500"),
      backgroundColor: "transparent",
      tension: 0.3,
    })),
  };

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-2 text-zinc-700 dark:text-zinc-100">
        {title}
      </h3>
      <Line data={chartData} options={{ responsive: true }} />
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
