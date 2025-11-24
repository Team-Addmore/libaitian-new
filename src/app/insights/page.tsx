"use client";

import { useEffect, useState } from "react";

export default function GAPageTableByDate() {
  const [data, setData] = useState<any[]>([]);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // 기본 오늘 날짜
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async (selectedDate: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/jiwon?date=${selectedDate}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(date);
  }, [date]);

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-6">📊 페이지별 통계</h1>

      {/* 날짜 선택 */}
      <div className="mb-6 flex justify-center items-center gap-3">
        <label className="font-semibold">조회할 날짜:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded px-3 py-1"
        />
      </div>

      {loading ? (
        <p className="text-center py-10">📡 데이터를 불러오는 중...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-center">페이지</th>
                <th className="border px-4 py-2 text-center">조회수</th>
                <th className="border px-4 py-2 text-center">평균 체류시간(초)</th>
                <th className="border px-4 py-2 text-center">이탈률(%)</th>
              </tr>
            </thead>
            <tbody>
              {data.length ? (
                data.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 text-center">{item.page}</td>
                    <td className="border px-4 py-2 text-center">{item.pageViews.toLocaleString()}</td>
                    <td className="border px-4 py-2 text-center">{Math.round(item.avgSessionDuration)}</td>
                    <td className="border px-4 py-2 text-center">{item.bounceRate.toFixed(1)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    선택한 날짜에 데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
