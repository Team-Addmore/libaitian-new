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
  const selectedDate = url.searchParams.get("date"); // YYYY-MM-DD

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
      { name: "screenPageViews" },
      { name: "activeUsers" },
      { name: "bounceRate" },
      { name: "averageSessionDuration" },
    ],
    dimensions: [
      { name: "pagePath" },
      { name: "languageCode" } // 👈 추가된 부분
    ],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
  };

  const [response] = await client.runReport(request);

  const result =
    response.rows?.map((row) => ({
      page: row.dimensionValues?.[0]?.value,
      language: row.dimensionValues?.[1]?.value, // 👈 언어 포함
      pageViews: Number(row.metricValues?.[0]?.value),
      activeUsers: Number(row.metricValues?.[1]?.value),
      bounceRate: Number(row.metricValues?.[2]?.value),
      avgSessionDuration: Number(row.metricValues?.[3]?.value),
    })) || [];

  return NextResponse.json(result);
}
