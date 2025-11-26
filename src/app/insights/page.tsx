"use client";

import { useEffect, useState } from "react";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// 데이터 타입 정의
type PageStats = {
  page: string;
  language: string;
  pageViews: number;
  avgSessionDuration: number;
  bounceRate: number;
};

export default function GAPageTableByDate() {
  const [data, setData] = useState<PageStats[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
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

  // 페이지별 언어 데이터 집계
  const groupByLanguage = (page: string) => {
    const filtered = data.filter((item) => item.page === page);
    const langCount: Record<string, number> = {};

    filtered.forEach((item) => {
      // ko + ko-KR을 하나로 묶고 싶다면 split("-")[0] 사용 가능
      langCount[item.language] = (langCount[item.language] || 0) + item.pageViews;
    });

    return Object.entries(langCount).map(([lang, count]) => ({
      name: lang,
      value: count,
    }));
  };

  // 페이지별 총 조회수 계산
  const getPageTotalViews = (page: string) => {
    return data
      .filter((item) => item.page === page)
      .reduce((sum, item) => sum + item.pageViews, 0);
  };

  // 페이지별 평균 체류시간 & 이탈률
  const getPageAvg = (page: string) => {
    const pageItems = data.filter((d) => d.page === page);
    const avgDuration =
      pageItems.reduce((sum, item) => sum + item.avgSessionDuration, 0) / pageItems.length;
    const avgBounce =
      pageItems.reduce((sum, item) => sum + item.bounceRate, 0) / pageItems.length;
    return { avgDuration, avgBounce };
  };

  // 차트 색상
  const COLORS = ["#4e79a7", "#59a14f", "#f28e2b", "#e15759", "#76b7b2", "#edc948"];

  // 고유 페이지 목록
  const pages = [...new Set(data.map((item) => item.page))];

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
                <th className="border px-4 py-2 text-center">총 조회수</th>
                <th className="border px-4 py-2 text-center">평균 체류시간(초)</th>
                <th className="border px-4 py-2 text-center">이탈률(%)</th>
                <th className="border px-4 py-2 text-center">📌 언어 통계</th>
              </tr>
            </thead>
            <tbody>
              {pages.length ? (
                pages.map((page) => {
                  const { avgDuration, avgBounce } = getPageAvg(page);
                  return (
                    <React.Fragment key={page}>
                      {/* 페이지 요약 row */}
                      <tr
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => setExpandedRow(expandedRow === page ? null : page)}
                      >
                        <td className="border px-4 py-2 text-center">{page}</td>
                        <td className="border px-4 py-2 text-center">
                          {getPageTotalViews(page).toLocaleString()}
                        </td>
                        <td className="border px-4 py-2 text-center">{Math.round(avgDuration)}</td>
                        <td className="border px-4 py-2 text-center">{avgBounce.toFixed(1)}</td>
                        <td className="border px-4 py-2 text-center text-blue-600">
                          {expandedRow === page ? "닫기 ▲" : "보기 ▼"}
                        </td>
                      </tr>

                      {/* 상세 언어 PieChart row */}
                      {expandedRow === page && (
                        <tr>
                          <td colSpan={5} className="border bg-gray-50 px-4 py-6">
                            <h3 className="font-semibold text-center mb-4">
                              🌍 {page} 언어 사용 비율
                            </h3>
                            <div className="flex justify-center">
                              <PieChart width={350} height={300}>
                                <Pie
                                  data={groupByLanguage(page)}
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={100}
                                  dataKey="value"
                                  label={(entry) => `${entry.name} (${entry.value})`}
                                >
                                  {groupByLanguage(page).map((_, index) => (
                                    <Cell
                                      key={index}
                                      fill={COLORS[index % COLORS.length]}
                                    />
                                  ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                              </PieChart>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
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
