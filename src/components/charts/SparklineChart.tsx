import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip
);

type Props = {
  title: string;
  value: string;
  subtitle: string;
  dataPoints: number[];
  isPositive?: boolean;
};

export default function SparklineChart({
  title,
  value,
  subtitle,
  dataPoints,
  isPositive = true,
}: Props) {
  const sparklineData = {
    labels: ["1h", "24h", "7d", "30d"],
    datasets: [
      {
        data: dataPoints,
        borderColor: isPositive ? "#16a34a" : "#dc2626",
        backgroundColor: "transparent",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const sparklineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: { display: false },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: import("chart.js").TooltipItem<"line">) =>
            `${ctx.parsed.y?.toFixed(2)}%`,
        },
      },
    },
    elements: {
      line: { borderWidth: 2 },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow flex flex-col justify-between">
      <div>
        <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
        <p className="text-xl font-bold">{value}</p>
        <p
          className={`text-sm ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {subtitle}
        </p>
      </div>
      <div className="w-[80vw] sm:w-[38vw] md:w-[40vw] lg:w-[19vw] xl:w-[20vw] 2xl:w-[21vw] h-16 mt-2">
        <Line data={sparklineData} options={sparklineOptions} />
      </div>
    </div>
  );
}
