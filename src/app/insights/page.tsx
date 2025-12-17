"use client";

import { useEffect, useState } from "react";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

type GAStats = {
  page: string;
  source: string;
  medium: string;
  campaign: string;
  language: string;
  pageViews: number;
  avgSessionDuration: number;
  bounceRate: number;
};

type ButtonClick = {
  buttonId: string;
  clicks: number;
};

type FunnelOption = {
  campaign: string;
  source: string;
  medium: string;
};

type FunnelAction = {
  scroll: number;
  imageClick: number;
};

type FunnelData = {
  inflow: number;
  action: FunnelAction;
  conversion: {
    buttons: ButtonClick[];
  };
};


export default function GAInsightsByDate() {
  const [data, setData] = useState<GAStats[]>([]);
  const [expandedPage, setExpandedPage] = useState<string | null>(null);
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"page" | "campaign" | "funnel">("page");

  // 퍼널 전용
  const [funnelStart, setFunnelStart] = useState("");
  const [funnelEnd, setFunnelEnd] = useState("");
  const [funnelOptions, setFunnelOptions] = useState<FunnelOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<FunnelOption | null>(null);
  const [funnelData, setFunnelData] = useState<FunnelData | null>(null);
  const [funnelLoading, setFunnelLoading] = useState(false);
  const [exposure, setExposure] = useState<number>(0);
  // 퍼널 페이지 선택
  const [selectedPage, setSelectedPage] = useState<string>("");
  // 전환 관련
  const [conversionMode, setConversionMode] = useState<
    "manual" | "all_buttons" | "button_ids"
  >("all_buttons");
  const [manualConversion, setManualConversion] = useState<number>(0);
  const [selectedButtonIds, setSelectedButtonIds] = useState<string[]>([]);


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
    if (tab !== "funnel") {
      fetchData(date);
    }
  }, [date, tab]);

  // -----------------------------
  // PAGE TAB LOGIC
  // -----------------------------

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
    const avgBounce =
      pageItems.reduce((sum, item) => sum + item.bounceRate, 0) / pageItems.length;
    return { avgDuration, avgBounce };
  };

  // -----------------------------
  // CAMPAIGN TAB LOGIC
  // -----------------------------

  const uniqueSources = [...new Set(data.map((item) => `${item.source} / ${item.medium}`))];

  const campaignsBySource = (sourceMediumLabel: string) => {
    const [source, medium] = sourceMediumLabel.split(" / ");

    return [
      ...new Set(
        data
          .filter((d) => d.source === source && d.medium === medium)
          .map((d) => d.campaign)
      ),
    ];
  };

  const pagesByCampaign = (sourceMediumLabel: string, campaignName: string) => {
    const [source, medium] = sourceMediumLabel.split(" / ");

    return [
      ...new Set(
        data
          .filter(
            (d) =>
              d.source === source &&
              d.medium === medium &&
              d.campaign === campaignName
          )
          .map((d) => d.page)
      ),
    ];
  };

  // 캠페인 기준 page 통계 계산 함수
  const getPageStatsByCampaign = (
    page: string,
    source: string,
    medium: string,
    campaign: string
  ) => {
    const filtered = data.filter(
      (d) =>
        d.page === page &&
        d.source === source &&
        d.medium === medium &&
        d.campaign === campaign
    );

    const pageViews = filtered.reduce((sum, v) => sum + v.pageViews, 0);
    const avgDuration =
      filtered.reduce((sum, v) => sum + v.avgSessionDuration, 0) /
      (filtered.length || 1);
    const avgBounce =
      filtered.reduce((sum, v) => sum + v.bounceRate, 0) /
      (filtered.length || 1);

    return { pageViews, avgDuration, avgBounce };
  };

  // -----------------------------
  // funnel TAB LOGIC
  // -----------------------------

  const fetchFunnelOptions = async () => {
    if (!funnelStart || !funnelEnd) return;

    const res = await fetch(
      `/api/jiwon?mode=funnel-options&start=${funnelStart}&end=${funnelEnd}`
    );
    const json = await res.json();
    setFunnelOptions(json);
  };

  const fetchFunnelData = async () => {
    if (!selectedOption) return;

    setFunnelLoading(true);

    const { campaign, source, medium } = selectedOption;

    const pageParam = selectedPage ? `&page=${encodeURIComponent(selectedPage)}` : "";

    const res = await fetch(
      `/api/jiwon?mode=funnel&start=${funnelStart}&end=${funnelEnd}` +
        `&campaign=${campaign}&source=${source}&medium=${medium}${pageParam}`
    );

    const json = await res.json();
    setFunnelData(json);
    setSelectedButtonIds([]);
    setFunnelLoading(false);
  };

  const buttonList: ButtonClick[] =
    funnelData?.conversion?.buttons ?? [];

  const buttonIdConversion = buttonList
    .filter((b) => selectedButtonIds.includes(b.buttonId))
    .reduce((sum, b) => sum + b.clicks, 0);

  const totalButtonConversion = buttonList.reduce(
    (sum, b) => sum + b.clicks,
    0
  );

  const finalConversion =
    conversionMode === "manual"
      ? manualConversion
      : conversionMode === "button_ids"
      ? buttonIdConversion
      : totalButtonConversion;

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
        <button
          className={`px-4 py-2 font-semibold rounded ${
            tab === "funnel" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("funnel")}
        >
          퍼널 분석
        </button>
      </div>

      {loading && (
        <p className="text-center py-10">📡 데이터를 불러오는 중...</p>
      )}
      {/* // -----------------------------
      // PAGE TAB
      // ----------------------------- */}
      {!loading && tab === "page" && (
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
                        onClick={() =>
                          setExpandedPage(expandedPage === page ? null : page)
                        }
                      >
                        <td className="border px-4 py-2 text-center">{page}</td>
                        <td className="border px-4 py-2 text-center">
                          {getPageTotalViews(page).toLocaleString()}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {Math.round(avgDuration)}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {avgBounce.toFixed(1)}
                        </td>
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
      )}
      {/* // -----------------------------
      // CAMPAIGN TAB
      // ----------------------------- */}
      {!loading && tab === "campaign" && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-center">캠페인</th>
                <th className="border px-4 py-2 text-center">세션/매체</th>
                <th className="border px-4 py-2 text-center">페이지</th>
                <th className="border px-4 py-2 text-center">총 조회수</th>
                <th className="border px-4 py-2 text-center">평균 체류시간(초)</th>
                <th className="border px-4 py-2 text-center">이탈률(%)</th>
              </tr>
            </thead>

            <tbody>
              {uniqueSources.length ? (
                // 전체 source/medium 기준 루프 → 캠페인 기준으로 재그룹
                [...new Set(data.map((d) => d.campaign))].map((campaignName) => {
                  const filteredCampaign = data.filter((d) => d.campaign === campaignName);

                  // 같은 캠페인에서 등장한 source/medium 리스트
                  const smList = [
                    ...new Set(filteredCampaign.map((d) => `${d.source} / ${d.medium}`)),
                  ];

                  return (
                    <React.Fragment key={campaignName}>
                      {/* 캠페인 이름 최상단 */}
                      <tr className="bg-green-100 font-semibold">
                        <td className="border px-4 py-2">{campaignName}</td>
                        <td className="border px-4 py-2" colSpan={5}></td>
                      </tr>

                      {smList.map((sm) => {
                        const [source, medium] = sm.split(" / ");

                        // 해당 캠페인 + Source/Medium 기준 page 목록
                        const pages = [
                          ...new Set(
                            data
                              .filter(
                                (d) =>
                                  d.campaign === campaignName &&
                                  d.source === source &&
                                  d.medium === medium
                              )
                              .map((d) => d.page)
                          ),
                        ];

                        return (
                          <React.Fragment key={`${campaignName}-${sm}`}>
                            {/* Source / Medium */}
                            <tr className="bg-gray-100">
                              <td className="border px-4 py-2"></td>
                              <td className="border px-4 py-2">{sm}</td>
                              <td className="border px-4 py-2" colSpan={4}></td>
                            </tr>

                            {pages.map((page, index) => {
                              const stats = getPageStatsByCampaign(
                                page,
                                source,
                                medium,
                                campaignName
                              );
                              const pageKey = `${campaignName}-${sm}-${page}-${index}`;

                              return (
                                <React.Fragment key={pageKey}>
                                  <tr
                                    className="bg-gray-50 cursor-pointer"
                                    onClick={() =>
                                      setExpandedPage(expandedPage === pageKey ? null : pageKey)
                                    }
                                  >
                                    <td className="border px-4 py-2"></td>
                                    <td className="border px-4 py-2"></td>
                                    <td className="border px-4 py-2">{page}</td>
                                    <td className="border px-4 py-2 text-center">
                                      {stats.pageViews.toLocaleString()}
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                      {Math.round(stats.avgDuration)}
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                      {stats.avgBounce.toFixed(1)}
                                    </td>
                                  </tr>

                                  {expandedPage === pageKey && (
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
                                              label={(entry) =>
                                                `${entry.name} (${entry.value})`
                                              }
                                            >
                                              {groupByLanguage(page).map((_, idx) => (
                                                <Cell
                                                  key={idx}
                                                  fill={COLORS[idx % COLORS.length]}
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
      {tab === "funnel" && (
        <div className="space-y-6">
          {/* 기간 선택 */}
          <div className="flex gap-4 justify-center">
            <input
              type="date"
              value={funnelStart}
              onChange={(e) => setFunnelStart(e.target.value)}
              className="border px-3 py-1 rounded"
            />
            <input
              type="date"
              value={funnelEnd}
              onChange={(e) => setFunnelEnd(e.target.value)}
              className="border px-3 py-1 rounded"
            />
            <button
              onClick={fetchFunnelOptions}
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              캠페인 불러오기
            </button>
          </div>

          {/* 캠페인 선택 */}
          <div className="max-w-xl mx-auto">
            <select
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setSelectedOption(JSON.parse(e.target.value))
              }
            >
              <option value="">캠페인 / 세션 / 매체 선택</option>
              {funnelOptions.map((opt, idx) => (
                <option
                  key={idx}
                  value={JSON.stringify(opt)}
                >
                  {opt.campaign} / {opt.source} / {opt.medium}
                </option>
              ))}
            </select>
          </div>

          {/* 페이지 선택 (선택 사항) */}
          {data.length > 0 && (
            <div className="max-w-xl mx-auto">
              <select
                className="w-full border px-3 py-2 rounded"
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value)}
              >
                <option value="">전체 페이지 (선택 안 함)</option>
                {[...new Set(data.map((d) => d.page))].map((page) => (
                  <option key={page} value={page}>
                    {page}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 조회 버튼 */}
          <div className="text-center">
            <button
              onClick={fetchFunnelData}
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              퍼널 분석 조회
            </button>
          </div>

          {/* 퍼널 결과 */}
          {funnelLoading && (
            <p className="text-center">퍼널 데이터 조회 중...</p>
          )}
          {funnelData && (
            <div className="max-w-xl mx-auto space-y-4">

              {/* 노출 */}
              <div className="border rounded p-4 bg-gray-50">
                <p className="font-semibold mb-2">노출</p>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="노출 수 입력"
                  value={exposure === 0 ? "" : exposure}
                  onChange={(e) => {
                    const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
                    setExposure(onlyNumber === "" ? 0 : Number(onlyNumber));
                  }}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* 유입 */}
              <div className="border rounded p-4 bg-blue-50">
                <p className="font-semibold">유입</p>
                <p className="text-xl">세션 수: {funnelData.inflow}</p>
                {exposure > 0 && (
                  <p className="text-sm text-gray-600">
                    유입률: {((funnelData.inflow / exposure) * 100).toFixed(1)}%
                  </p>
                )}
              </div>

              {/* 행동 */}
              <div className="border rounded p-4 bg-yellow-50">
                <p className="font-semibold">행동</p>
                <p>Scroll: {funnelData.action.scroll}</p>
                <p>Image Click: {funnelData.action.imageClick}</p>

                {exposure > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    행동률:{" "}
                    {(
                      ((funnelData.action.scroll + funnelData.action.imageClick) /
                        exposure) *
                      100
                    ).toFixed(1)}
                    %
                  </p>
                )}
              </div>

              {/* 전환 */}
              <div className="border rounded p-4 bg-green-50 space-y-2">
                <p className="font-semibold">전환</p>

                {/* 전환 방식 선택 */}
                <select
                  className="w-full border rounded px-3 py-2"
                  value={conversionMode}
                  onChange={(e) =>
                    setConversionMode(e.target.value as "manual" | "all_buttons" | "button_ids")
                  }
                >
                  <option value="all_buttons">전체 버튼 클릭 합</option>
                  <option value="button_ids">특정 버튼 선택</option>
                  <option value="manual">직접 입력</option>
                </select>

                {/* 직접 입력 */}
                {conversionMode === "manual" && (
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={manualConversion === 0 ? "" : manualConversion}
                    onChange={(e) => {
                      const v = e.target.value.replace(/[^0-9]/g, "");
                      setManualConversion(v === "" ? 0 : Number(v));
                    }}
                    className="w-full border rounded px-3 py-2"
                    placeholder="전환 수 입력"
                  />
                )}

                {/* button_id 선택 */}
                {conversionMode === "button_ids" && (
                  <div className="space-y-1">
                    {buttonList.map((b) => (
                      <label key={b.buttonId} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={selectedButtonIds.includes(b.buttonId)}
                          onChange={(e) => {
                            setSelectedButtonIds((prev) =>
                              e.target.checked
                                ? [...prev, b.buttonId]
                                : prev.filter((id) => id !== b.buttonId)
                            );
                          }}
                        />
                        {b.buttonId} ({b.clicks})
                      </label>
                    ))}
                  </div>
                )}

                <p className="text-xl mt-2">전환 수: {finalConversion}</p>

                {exposure > 0 && (
                  <p className="text-sm text-gray-600">
                    전환율: {((finalConversion / exposure) * 100).toFixed(1)}%
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
