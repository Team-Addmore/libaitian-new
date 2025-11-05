"use client";

import { useEffect, useState } from "react";

export default function HyunDashboard() {
  const [data, setData] = useState<{ date: string; users: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/hyun")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-center">로딩 중...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">GA 대시보드</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">최근 1개월 방문자 수</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">날짜</th>
              <th className="border p-3 text-right">방문자 수</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border p-3">{item.date}</td>
                <td className="border p-3 text-right">{item.users}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
