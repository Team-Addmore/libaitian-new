"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title);

export default function GADashboard() {
  const [data, setData] = useState<{ date: string; users: number }[]>([]);

  useEffect(() => {
    fetch("/api/jiwon")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "일별 방문자 수",
        data: data.map((d) => d.users),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3,
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" as const },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">📊 최근 한 달 방문자 수</h1>

      {/* 그래프 + 표 나란히 */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8">
        {/* 그래프 */}
        <div className="bg-white rounded-lg shadow-lg p-6 w-full lg:w-2/3">
          <Line data={chartData} options={options} />
        </div>

        {/* 표 */}
        <div className="bg-white rounded-lg shadow-lg p-6 w-full lg:w-1/3 overflow-y-auto max-h-[500px]">
          <h2 className="text-lg font-semibold mb-4 text-center">📅 일자별 방문자 수</h2>
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">날짜</th>
                <th className="border px-3 py-2">방문자 수</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border px-3 py-2 text-center">{d.date}</td>
                  <td className="border px-3 py-2 text-center">{d.users}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
