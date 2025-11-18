import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = process.env.jiwon_GA_PROPERTY_ID;

// 서비스 계정 인증
const key = JSON.parse(process.env.jiwon_GA_CREDENTIALS || "{}");
const client = new BetaAnalyticsDataClient({
  credentials: {
    client_email: key.client_email,
    private_key: key.private_key,
  },
});

export async function GET() {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 1); // 1개월 전

  const request = {
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: startDate.toISOString().split("T")[0],
        endDate: today.toISOString().split("T")[0],
      },
    ],
    metrics: [{ name: "activeUsers" }],
    dimensions: [{ name: "date" }],
  };

  const [response] = await client.runReport(request);

  const result = response.rows?.map((row) => ({
    date: row.dimensionValues?.[0]?.value,
    users: Number(row.metricValues?.[0]?.value),
  }));

  return NextResponse.json(result);
}
