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

export async function GET(req: Request) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("mode");

  // FUNNEL MODE
  if (mode === "funnel") {
    const start = url.searchParams.get("start");
    const end = url.searchParams.get("end");
    const campaign = url.searchParams.get("campaign");

    if (!start || !end || !campaign) {
      return NextResponse.json(
        { error: "start, end, campaign are required" },
        { status: 400 }
      );
    }

    const request = {
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: start, endDate: end }],
      dimensions: [{ name: "eventName" }],
      dimensionFilter: {
        filter: {
          fieldName: "sessionCampaignName",
          stringFilter: {
            value: campaign,
          },
        },
      },
      metrics: [{ name: "eventCount" }],
    };

    const [response] = await client.runReport(request);

    let sessions = 0;
    let scroll = 0;
    let imageClick = 0;
    let buttonClick = 0;

    response.rows?.forEach((row) => {
      const eventName = row.dimensionValues?.[0]?.value;
      const count = Number(row.metricValues?.[0]?.value || 0);

      if (eventName === "session_start") sessions += count;
      if (eventName === "scroll") scroll += count;
      if (eventName === "image_click") imageClick += count;
      if (eventName === "button_click") buttonClick += count;
    });

    return NextResponse.json({
      exposure: null, // 노출은 아직 없음
      inflow: sessions,
      action: {
        scroll,
        imageClick,
      },
      conversion: buttonClick,
    });
  }


  // PAGE / CAMPAIGN
  const selectedDate = url.searchParams.get("date");

  if (!selectedDate) {
    return NextResponse.json(
      { error: "date query parameter is required" },
      { status: 400 }
    );
  }

  const request = {
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: selectedDate, endDate: selectedDate }],
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
  };

  const [response] = await client.runReport(request);

  const result =
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

  return NextResponse.json(result);
}
