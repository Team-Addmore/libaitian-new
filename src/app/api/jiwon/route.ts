import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = process.env.jiwon_GA_PROPERTY_ID;

// GA 인증
const key = JSON.parse(process.env.jiwon_GA_CREDENTIALS || "{}");
const client = new BetaAnalyticsDataClient({
  credentials: {
    client_email: key.client_email,
    private_key: key.private_key,
  },
});

// Row 타입 정의
type GAResultRow = {
  page: string;
  source: string;
  medium: string;
  campaign: string;
  language: string;
  pageViews: number;
  activeUsers: number;
  bounceRate: number;
  avgSessionDuration: number;
};

// 그룹화 구조 타입
type GAGroupedRow = {
  source: string;
  medium: string;
  campaign: string;
  page: string;
  language: string;
  pageViews: number;
  activeUsers: number;
  bounceRateList: number[];
  durationList: number[];
};

// 그룹화 함수
function groupByTraffic(rows: GAResultRow[]) {
  const grouped: Record<string, GAGroupedRow> = {};

  rows.forEach((row) => {
    const key = `${row.source}|${row.medium}|${row.campaign}|${row.page}`;

    if (!grouped[key]) {
      grouped[key] = {
        source: row.source,
        medium: row.medium,
        campaign: row.campaign,
        page: row.page,
        language: row.language,

        pageViews: row.pageViews || 0,
        activeUsers: row.activeUsers || 0,

        bounceRateList: [row.bounceRate],
        durationList: [row.avgSessionDuration],
      };
    } else {
      grouped[key].pageViews += row.pageViews || 0;
      grouped[key].activeUsers += row.activeUsers || 0;

      grouped[key].bounceRateList.push(row.bounceRate);
      grouped[key].durationList.push(row.avgSessionDuration);
    }
  });

  return Object.values(grouped).map((g) => ({
    source: g.source,
    medium: g.medium,
    campaign: g.campaign,
    page: g.page,
    language: g.language,

    pageViews: g.pageViews,
    activeUsers: g.activeUsers,

    bounceRate:
      g.bounceRateList.reduce((a, b) => a + b, 0) /
      g.bounceRateList.length,

    avgSessionDuration:
      g.durationList.reduce((a, b) => a + b, 0) /
      g.durationList.length,
  }));
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const selectedDate = url.searchParams.get("date");

  if (!selectedDate) {
    return NextResponse.json(
      { error: "date query parameter is required" },
      { status: 400 }
    );
  }

  const request = {
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: selectedDate,
        endDate: selectedDate,
      },
    ],
    metrics: [
      { name: "screenPageViews" },
      { name: "activeUsers" },
      { name: "bounceRate" },
      { name: "averageSessionDuration" },
    ],
    dimensions: [
      { name: "pagePath" },
      { name: "sessionSource" },
      { name: "sessionMedium" },
      { name: "sessionCampaignName" },
      { name: "languageCode" },
    ],
    orderBys: [
      { metric: { metricName: "screenPageViews" }, desc: true },
    ],
  };

  const [response] = await client.runReport(request);

  const result: GAResultRow[] =
    response.rows?.map((row) => ({
      page: row.dimensionValues?.[0]?.value || "",
      source: row.dimensionValues?.[1]?.value || "",
      medium: row.dimensionValues?.[2]?.value || "",
      campaign: row.dimensionValues?.[3]?.value || "",
      language: row.dimensionValues?.[4]?.value || "",

      pageViews: Number(row.metricValues?.[0]?.value),
      activeUsers: Number(row.metricValues?.[1]?.value),
      bounceRate: Number(row.metricValues?.[2]?.value),
      avgSessionDuration: Number(row.metricValues?.[3]?.value),
    })) || [];

  const groupedResult = groupByTraffic(result);

  return NextResponse.json(groupedResult);
}
