'use client';

import { useEffect, useState } from 'react';

interface AnalyticsRow {
  date: string;
  activeUsers: number;
  sessions: number;
  pageViews: number;
}

interface CountryRow {
  country: string;
  activeUsers: number;
  sessions: number;
}

interface DimensionValue {
  value: string;
}

interface MetricValue {
  value: string;
}

interface AnalyticsResponseRow {
  dimensionValues: DimensionValue[];
  metricValues: MetricValue[];
}

interface AnalyticsResponse {
  rows?: AnalyticsResponseRow[];
}

export default function JacobPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsRow[]>([]);
  const [countryData, setCountryData] = useState<CountryRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 페이지 로드 시 자동으로 데이터 가져오기
    fetchAnalyticsData();
    fetchCountryData();
  }, []);

  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/jacob', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate: '7daysAgo',
          endDate: 'today',
          reportType: 'daily',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '데이터 가져오기 실패');
      }

      const data: AnalyticsResponse = await response.json();
      const parsedData = parseAnalyticsResponse(data);
      setAnalyticsData(parsedData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다';
      setError(errorMessage);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCountryData = async () => {
    try {
      const response = await fetch('/api/jacob', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate: '7daysAgo',
          endDate: 'today',
          reportType: 'country',
        }),
      });

      if (!response.ok) {
        throw new Error('국가별 데이터 가져오기 실패');
      }

      const data: AnalyticsResponse = await response.json();
      const parsedData = parseCountryResponse(data);
      setCountryData(parsedData);
    } catch (err) {
      console.error('Country data error:', err);
    }
  };

  const parseAnalyticsResponse = (result: AnalyticsResponse): AnalyticsRow[] => {
    if (!result.rows) return [];
    return result.rows.map((row) => ({
      date: formatDate(row.dimensionValues[0].value),
      activeUsers: parseInt(row.metricValues[0].value),
      sessions: parseInt(row.metricValues[1].value),
      pageViews: parseInt(row.metricValues[2].value),
    }));
  };

  const parseCountryResponse = (result: AnalyticsResponse): CountryRow[] => {
    if (!result.rows) return [];
    return result.rows.map((row) => ({
      country: row.dimensionValues[0].value,
      activeUsers: parseInt(row.metricValues[0].value),
      sessions: parseInt(row.metricValues[1].value),
    }));
  };

  const formatDate = (dateString: string): string => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}-${month}-${day}`;
  };

  const getTotals = () => ({
    totalUsers: analyticsData.reduce((sum, row) => sum + row.activeUsers, 0),
    totalSessions: analyticsData.reduce((sum, row) => sum + row.sessions, 0),
    totalPageViews: analyticsData.reduce((sum, row) => sum + row.pageViews, 0),
  });

  const handleRefresh = () => {
    fetchAnalyticsData();
    fetchCountryData();
  };

  if (isLoading && analyticsData.length === 0) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h1>Google Analytics Dashboard</h1>
        <p>데이터 로딩 중...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1>Google Analytics Dashboard</h1>

      {error && (
        <div style={{
          padding: '15px',
          backgroundColor: '#fee',
          border: '1px solid #fcc',
          borderRadius: '8px',
          marginBottom: '20px',
        }}>
          ⚠️ {error}
        </div>
      )}

      <div style={{ marginBottom: '30px' }}>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            backgroundColor: '#34a853',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.6 : 1,
          }}
        >
          {isLoading ? '로딩 중...' : '🔄 새로고침'}
        </button>
      </div>

      {analyticsData.length > 0 && (
        <>
          {/* 요약 카드 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '30px',
          }}>
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
                활성 사용자
              </h3>
              <p style={{ fontSize: '32px', fontWeight: '600', margin: 0 }}>
                {getTotals().totalUsers.toLocaleString()}
              </p>
            </div>
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
                세션
              </h3>
              <p style={{ fontSize: '32px', fontWeight: '600', margin: 0 }}>
                {getTotals().totalSessions.toLocaleString()}
              </p>
            </div>
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
                페이지뷰
              </h3>
              <p style={{ fontSize: '32px', fontWeight: '600', margin: 0 }}>
                {getTotals().totalPageViews.toLocaleString()}
              </p>
            </div>
          </div>

          {/* 국가별 데이터 */}
          {countryData.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>국가별 방문자 (상위 10개)</h2>
              <div style={{
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                overflow: 'hidden',
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>
                        국가
                      </th>
                      <th style={{ padding: '16px', textAlign: 'right', fontWeight: '600' }}>
                        활성 사용자
                      </th>
                      <th style={{ padding: '16px', textAlign: 'right', fontWeight: '600' }}>
                        세션
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {countryData.map((row, index) => (
                      <tr key={index} style={{ borderTop: '1px solid #e0e0e0' }}>
                        <td style={{ padding: '16px' }}>{row.country}</td>
                        <td style={{ padding: '16px', textAlign: 'right' }}>
                          {row.activeUsers.toLocaleString()}
                        </td>
                        <td style={{ padding: '16px', textAlign: 'right' }}>
                          {row.sessions.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 일별 데이터 */}
          <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>최근 7일 데이터</h2>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>
                  날짜
                </th>
                <th style={{ padding: '16px', textAlign: 'right', fontWeight: '600' }}>
                  활성 사용자
                </th>
                <th style={{ padding: '16px', textAlign: 'right', fontWeight: '600' }}>
                  세션
                </th>
                <th style={{ padding: '16px', textAlign: 'right', fontWeight: '600' }}>
                  페이지뷰
                </th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.map((row, index) => (
                <tr key={index} style={{ borderTop: '1px solid #e0e0e0' }}>
                  <td style={{ padding: '16px' }}>{row.date}</td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    {row.activeUsers.toLocaleString()}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    {row.sessions.toLocaleString()}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    {row.pageViews.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}