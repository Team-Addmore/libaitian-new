import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';

interface ReportRequest {
  property: string;
  dateRanges: Array<{ startDate: string; endDate: string }>;
  dimensions: Array<{ name: string }>;
  metrics: Array<{ name: string }>;
  orderBys?: Array<{
    dimension?: { dimensionName: string };
    metric?: { metricName: string };
    desc?: boolean;
  }>;
  limit?: number;
}

export async function POST(request: Request) {
  try {
    // 환경 변수 로드
    const propertyId = process.env.JACOB_GA_PROPERTY_ID;
    const serviceAccountEmail = process.env.JACOB_GA_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.JACOB_GA_PRIVATE_KEY;
    
    // 환경 변수 검증
    if (!propertyId || !serviceAccountEmail || !privateKey) {
      return NextResponse.json(
        { 
          error: '환경 변수가 설정되지 않았습니다',
          debug: {
            hasPropertyId: !!propertyId,
            hasEmail: !!serviceAccountEmail,
            hasKey: !!privateKey,
          }
        },
        { status: 500 }
      );
    }

    // 요청 본문 파싱
    const body = await request.json();
    const { 
      startDate = '7daysAgo', 
      endDate = 'today',
      reportType = 'daily' // 추가: 리포트 타입 구분
    } = body;

    // Analytics Data Client 생성
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
    });

    let requestBody: ReportRequest;

    // 리포트 타입에 따라 다른 요청 생성
    if (reportType === 'country') {
      // 국가별 데이터
      requestBody = {
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'country' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' }
        ],
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
        limit: 10
      };
    } else {
      // 일별 데이터 (기본)
      requestBody = {
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'date' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'screenPageViews' }
        ],
        orderBys: [{ dimension: { dimensionName: 'date' }, desc: false }]
      };
    }

    // 데이터 요청
    const [response] = await analyticsDataClient.runReport(requestBody);

    console.log(`API Response Success! (${reportType})`);
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Analytics API Error:', error);
    
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다';
    const errorDetails = error instanceof Error ? error.toString() : String(error);

    return NextResponse.json(
      { 
        error: errorMessage || '알 수 없는 오류가 발생했습니다',
        details: errorDetails
      },
      { status: 500 }
    );
  }
}

// GET 메서드 (테스트용)
export async function GET() {
  try {
    const propertyId = process.env.JACOB_GA_PROPERTY_ID;
    const serviceAccountEmail = process.env.JACOB_GA_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.JACOB_GA_PRIVATE_KEY;
    
    console.log('=== GET Test ===');
    console.log('Property ID:', propertyId);
    console.log('Service Account:', serviceAccountEmail);
    console.log('Private Key exists:', !!privateKey);
    console.log('===============');
    
    if (!propertyId || !serviceAccountEmail || !privateKey) {
      return NextResponse.json(
        { 
          error: '환경 변수가 설정되지 않았습니다',
          debug: {
            propertyId: !!propertyId,
            serviceAccountEmail: !!serviceAccountEmail,
            privateKey: !!privateKey
          }
        },
        { status: 500 }
      );
    }

    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
    });

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'screenPageViews' }
      ],
      orderBys: [{ dimension: { dimensionName: 'date' }, desc: false }],
    });

    console.log('GET Response Success!');
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Analytics API Error:', error);
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}