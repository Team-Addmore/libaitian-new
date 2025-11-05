import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 환경 변수 로드
    const propertyId = process.env.JACOB_GA_PROPERTY_ID;
    const serviceAccountEmail = process.env.JACOB_GA_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.JACOB_GA_PRIVATE_KEY;
    
    // 디버깅 로그
    console.log('=== API Route Debug ===');
    console.log('Property ID:', propertyId);
    console.log('Service Account:', serviceAccountEmail);
    console.log('Private Key exists:', !!privateKey);
    console.log('=====================');
    
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
      dimensions,
      metrics,
      orderBys,
      limit
    } = body;

    // Analytics Data Client 생성
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
    });

    // 리포트 요청 설정
    const requestBody: any = {
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: dimensions || [{ name: 'date' }],
      metrics: metrics || [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'screenPageViews' }
      ],
    };

    if (orderBys) {
      requestBody.orderBys = orderBys;
    } else {
      // 기본 정렬: 날짜 오름차순
      requestBody.orderBys = [{ dimension: { dimensionName: 'date' }, desc: false }];
    }

    if (limit) {
      requestBody.limit = limit;
    }

    // 데이터 요청
    const [response] = await analyticsDataClient.runReport(requestBody);

    console.log('API Response Success!');
    return NextResponse.json(response);
    
  } catch (error: any) {
    console.error('Analytics API Error:', error);
    
    return NextResponse.json(
      { 
        error: error.message || '알 수 없는 오류가 발생했습니다',
        details: error.toString()
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
    
  } catch (error: any) {
    console.error('Analytics API Error:', error);
    return NextResponse.json(
      { error: error.message || '알 수 없는 오류' },
      { status: 500 }
    );
  }
}