import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const propertyId = process.env.JACOB_GA_PROPERTY_ID;
    const serviceAccountEmail = process.env.JACOB_GA_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.JACOB_GA_PRIVATE_KEY;
    
    // 디버깅 로그
    console.log('=== API Route Debug ===');
    console.log('Property ID:', propertyId);
    console.log('Service Account:', serviceAccountEmail);
    console.log('Private Key exists:', !!privateKey);
    console.log('Private Key length:', privateKey?.length);
    console.log('=====================');
    
    // 환경 변수 검증
    if (!propertyId) {
      return NextResponse.json(
        { error: 'JACOB_GA_PROPERTY_ID가 설정되지 않았습니다' },
        { status: 500 }
      );
    }
    
    if (!serviceAccountEmail || !privateKey) {
      return NextResponse.json(
        { 
          error: '서비스 계정 인증 정보가 설정되지 않았습니다',
          debug: {
            hasEmail: !!serviceAccountEmail,
            hasKey: !!privateKey,
          }
        },
        { status: 500 }
      );
    }

    // 요청 본문 파싱
    const body = await request.json();
    const { startDate = '7daysAgo', endDate = 'today' } = body;

    // JWT 인증 설정
    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    // GA4 Data API 클라이언트 생성
    const analyticsdata = google.analyticsdata('v1beta');

    // 데이터 요청
    const response = await analyticsdata.properties.runReport({
      auth: auth,
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'date' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'screenPageViews' }
        ],
        orderBys: [{ dimension: { dimensionName: 'date' }, desc: false }],
      },
    });

    console.log('API Response Success!');
    
    return NextResponse.json(response.data);
    
  } catch (error: any) {
    console.error('Analytics API Error:', error);
    
    return NextResponse.json(
      { 
        error: error.message || '알 수 없는 오류가 발생했습니다',
        details: error.response?.data || error.toString()
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

    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analyticsdata = google.analyticsdata('v1beta');

    const response = await analyticsdata.properties.runReport({
      auth: auth,
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'date' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'screenPageViews' }
        ],
        orderBys: [{ dimension: { dimensionName: 'date' }, desc: false }],
      },
    });

    return NextResponse.json(response.data);
    
  } catch (error: any) {
    console.error('Analytics API Error:', error);
    return NextResponse.json(
      { error: error.message || '알 수 없는 오류' },
      { status: 500 }
    );
  }
}