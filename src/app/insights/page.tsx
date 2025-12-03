"use client";

import { useEffect, useState } from "react";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

type GAStats = {
  page: string;
  sourceMedium: string;
  campaign: string;
  language: string;
  pageViews: number;
  avgSessionDuration: number;
  bounceRate: number;
};

export default function GAInsightsByDate() {
  const [data, setData] = useState<GAStats[]>([]);
  const [expandedPage, setExpandedPage] = useState<string | null>(null);
  const [expandedCampaign, setExpandedCampaign] = useState<string | null>(null);
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"page" | "campaign">("page");

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

  // 페이지별 통계
  const pages = [...new Set(data.map((item) => item.page))];
  const groupByLanguage = (page: string) => {
    const filtered = data.filter((item) => item.page === page);
    const langCount: Record<string, number> = {};
    filtered.forEach((item) => {
      langCount[item.language] = (langCount[item.language] || 0) + item.pageViews;
    });
    return Object.entries(langCount).map(([name, value]) => ({ name, value }));
  };
  const getPageTotalViews = (page: string) =>
    data.filter((d) => d.page === page).reduce((sum, item) => sum + item.pageViews, 0);
  const getPageAvg = (page: string) => {
    const pageItems = data.filter((d) => d.page === page);
    const avgDuration =
      pageItems.reduce((sum, item) => sum + item.avgSessionDuration, 0) / pageItems.length;
    const avgBounce = pageItems.reduce((sum, item) => sum + item.bounceRate, 0) / pageItems.length;
    return { avgDuration, avgBounce };
  };

  // 캠페인별 통계
  const sources = [...new Set(data.map((item) => item.sourceMedium))];
  const campaignsBySource = (source: string) =>
    [...new Set(data.filter((d) => d.sourceMedium === source).map((d) => d.campaign))];
  const pagesByCampaign = (source: string, campaign: string) =>
    data.filter((d) => d.sourceMedium === source && d.campaign === campaign).map((d) => d.page);

  const COLORS = ["#4e79a7", "#59a14f", "#f28e2b", "#e15759", "#76b7b2", "#edc948"];

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <h1 className="text-3xl font-bold text-center mb-6">📊 GA 통계</h1>

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

      {/* 탭 */}
      <div className="flex justify-center mb-6 gap-4">
        <button
          className={`px-4 py-2 font-semibold rounded ${
            tab === "page" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("page")}
        >
          페이지별 통계
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded ${
            tab === "campaign" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("campaign")}
        >
          캠페인별 통계
        </button>
      </div>

      {loading ? (
        <p className="text-center py-10">📡 데이터를 불러오는 중...</p>
      ) : tab === "page" ? (
        // 페이지별 통계
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-center">페이지</th>
                <th className="border px-4 py-2 text-center">총 조회수</th>
                <th className="border px-4 py-2 text-center">평균 체류시간(초)</th>
                <th className="border px-4 py-2 text-center">이탈률(%)</th>
                <th className="border px-4 py-2 text-center">언어 통계</th>
              </tr>
            </thead>
            <tbody>
              {pages.length ? (
                pages.map((page) => {
                  const { avgDuration, avgBounce } = getPageAvg(page);
                  return (
                    <React.Fragment key={page}>
                      <tr
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => setExpandedPage(expandedPage === page ? null : page)}
                      >
                        <td className="border px-4 py-2 text-center">{page}</td>
                        <td className="border px-4 py-2 text-center">
                          {getPageTotalViews(page).toLocaleString()}
                        </td>
                        <td className="border px-4 py-2 text-center">{Math.round(avgDuration)}</td>
                        <td className="border px-4 py-2 text-center">{avgBounce.toFixed(1)}</td>
                        <td className="border px-4 py-2 text-center text-blue-600">
                          {expandedPage === page ? "닫기 ▲" : "보기 ▼"}
                        </td>
                      </tr>

                      {expandedPage === page && (
                        <tr>
                          <td colSpan={5} className="border bg-gray-50 px-4 py-6">
                            <h3 className="font-semibold text-center mb-4">
                              {page} 언어 사용 비율
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
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
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
      ) : (
        // 캠페인별 통계
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-center">세션/매체</th>
                <th className="border px-4 py-2 text-center">캠페인</th>
                <th className="border px-4 py-2 text-center">페이지</th>
                <th className="border px-4 py-2 text-center">총 조회수</th>
                <th className="border px-4 py-2 text-center">평균 체류시간(초)</th>
                <th className="border px-4 py-2 text-center">이탈률(%)</th>
              </tr>
            </thead>
            <tbody>
              {sources.length ? (
                sources.map((source) => {
                  const campaigns = campaignsBySource(source);
                  return (
                    <React.Fragment key={source}>
                      <tr className="bg-gray-50 font-semibold">
                        <td className="border px-4 py-2">{source}</td>
                        <td className="border px-4 py-2" colSpan={5}></td>
                      </tr>

                      {campaigns.map((camp) => {
                        const pagesInCamp = pagesByCampaign(source, camp);
                        return (
                          <React.Fragment key={camp}>
                            <tr
                              className="bg-gray-100 cursor-pointer"
                              onClick={() =>
                                setExpandedCampaign(expandedCampaign === camp ? null : camp)
                              }
                            >
                              <td className="border px-4 py-2"></td>
                              <td className="border px-4 py-2">{camp}</td>
                              <td className="border px-4 py-2" colSpan={3}></td>
                            </tr>

                            {expandedCampaign === camp &&
                              pagesInCamp.map((page) => {
                                const { avgDuration, avgBounce } = getPageAvg(page);
                                return (
                                  <React.Fragment key={page}>
                                    <tr
                                      className="bg-gray-50 cursor-pointer"
                                      onClick={() =>
                                        setExpandedPage(expandedPage === page ? null : page)
                                      }
                                    >
                                      <td className="border px-4 py-2"></td>
                                      <td className="border px-4 py-2"></td>
                                      <td className="border px-4 py-2">{page}</td>
                                      <td className="border px-4 py-2 text-center">
                                        {getPageTotalViews(page).toLocaleString()}
                                      </td>
                                      <td className="border px-4 py-2 text-center">
                                        {Math.round(avgDuration)}
                                      </td>
                                      <td className="border px-4 py-2 text-center">
                                        {avgBounce.toFixed(1)}
                                      </td>
                                    </tr>

                                    {expandedPage === page && (
                                      <tr>
                                        <td colSpan={6} className="border bg-gray-50 px-4 py-6">
                                          <h3 className="font-semibold text-center mb-4">
                                            {page} 언어 사용 비율
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
                              })}
                          </React.Fragment>
                        );
                      })}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
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
