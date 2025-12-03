import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = process.env.jiwon_GA_PROPERTY_ID;

// GA 서비스 계정 인증
const key = JSON.parse(process.env.jiwon_GA_CREDENTIALS || "{}");
const client = new BetaAnalyticsDataClient({
  credentials: {
    client_email: key.client_email,
    private_key: key.private_key,
  },
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const selectedDate = url.searchParams.get("date");

  if (!selectedDate) {
    return NextResponse.json({ error: "date query parameter is required" }, { status: 400 });
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
      { name: "screenPageViews" },        // 페이지 조회수
      { name: "activeUsers" },            // 활성 사용자 수
      { name: "bounceRate" },             // 이탈률
      { name: "averageSessionDuration" }, // 평균 세션 길이
    ],

    dimensions: [
      { name: "pagePath" },             // 방문한 페이지 경로
      { name: "sessionSourceMedium" },  // utm_source + utm_medium (예: instagram / social)
      { name: "sessionCampaignName" },  // utm_campaign 값
      { name: "languageCode" },         // 사용자의 브라우저 언어
    ],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
  };

  const [response] = await client.runReport(request);

  const result =
    response.rows?.map((row) => ({
      page: row.dimensionValues?.[0]?.value,
      sourceMedium: row.dimensionValues?.[1]?.value,
      campaign: row.dimensionValues?.[2]?.value,
      language: row.dimensionValues?.[3]?.value,
      pageViews: Number(row.metricValues?.[0]?.value),
      activeUsers: Number(row.metricValues?.[1]?.value),
      bounceRate: Number(row.metricValues?.[2]?.value),
      avgSessionDuration: Number(row.metricValues?.[3]?.value),
    })) || [];

  return NextResponse.json(result);
}
