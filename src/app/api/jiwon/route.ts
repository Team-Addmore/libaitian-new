import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import type { protos } from "@google-analytics/data";

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

  /* ======================================================
   * FUNNEL OPTIONS
   * ====================================================== */
  if (mode === "funnel-options") {
    const start = url.searchParams.get("start");
    const end = url.searchParams.get("end");

    if (!start || !end) {
      return NextResponse.json(
        { error: "start and end are required" },
        { status: 400 }
      );
    }

    const request = {
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: start, endDate: end }],
      dimensions: [
        { name: "sessionCampaignName" },
        { name: "sessionSource" },
        { name: "sessionMedium" },
      ],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    };

    const [response] = await client.runReport(request);

    const options =
      response.rows?.map((row) => ({
        campaign: row.dimensionValues?.[0]?.value || "",
        source: row.dimensionValues?.[1]?.value || "",
        medium: row.dimensionValues?.[2]?.value || "",
        sessions: Number(row.metricValues?.[0]?.value || 0),
      })) || [];

    return NextResponse.json(options);
  }

  /* ======================================================
   * FUNNEL DATA
   * ====================================================== */
  if (mode === "funnel") {
    const start = url.searchParams.get("start");
    const end = url.searchParams.get("end");
    const campaign = url.searchParams.get("campaign");
    const source = url.searchParams.get("source");
    const medium = url.searchParams.get("medium");
    const pagePath = url.searchParams.get("page"); // 선택적

    if (!start || !end || !campaign || !source || !medium) {
      return NextResponse.json(
        { error: "start, end, campaign, source, medium are required" },
        { status: 400 }
      );
    }

    const dimensionFilter: protos.google.analytics.data.v1beta.IFilterExpression = {
      andGroup: {
        expressions: [
          {
            filter: {
              fieldName: "sessionCampaignName",
              stringFilter: { value: campaign },
            },
          },
          {
            filter: {
              fieldName: "sessionSource",
              stringFilter: { value: source },
            },
          },
          {
            filter: {
              fieldName: "sessionMedium",
              stringFilter: { value: medium },
            },
          },
        ],
      },
    };

    // 페이지 필터 (선택)
    if (pagePath) {
      dimensionFilter.andGroup?.expressions?.push({
        filter: {
          fieldName: "pagePath",
          stringFilter: { value: pagePath },
        },
      });
    }

    const request = {
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: start, endDate: end }],
      dimensions: [
        { name: "eventName" },
        { name: "customEvent:button_id" },
      ],
      dimensionFilter,
      metrics: [{ name: "eventCount" }],
    };

    const [response] = await client.runReport(request);

    let inflow = 0;
    let scroll = 0;
    let imageClick = 0;

    const buttonMap: Record<string, number> = {};

    response.rows?.forEach((row) => {
      const eventName = row.dimensionValues?.[0]?.value;
      const buttonId = row.dimensionValues?.[1]?.value || "";
      const count = Number(row.metricValues?.[0]?.value || 0);

      if (eventName === "session_start") inflow += count;
      if (eventName === "scroll") scroll += count;
      if (eventName === "image_click") imageClick += count;

      if (eventName === "button_click" && buttonId) {
        buttonMap[buttonId] = (buttonMap[buttonId] || 0) + count;
      }
    });

    return NextResponse.json({
      exposure: null, // 프론트 입력
      inflow,
      action: {
        scroll,
        imageClick,
      },
      conversion: {
        buttons: Object.entries(buttonMap).map(([buttonId, clicks]) => ({
          buttonId,
          clicks,
        })),
      },
    });
  }

  /* ======================================================
   * PAGE / CAMPAIGN (기존 일자별 통계)
   * ====================================================== */
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