/**
 * Google Analytics 측정 함수들
 */

// GTM 타입 정의
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

// 기본 페이지뷰 추적
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: url,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  }
};

// 스크롤 깊이 추적
export const trackScrollDepth = (depth: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll_depth', {
      event_category: 'engagement',
      event_label: `${depth}%`,
      value: depth,
    });
  }
};

// 이미지 클릭 추적
export const trackImageClick = (imageName: string, section?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'image_click', {
      event_category: 'interaction',
      event_label: imageName,
      section: section || 'unknown',
    });
  }
};

// 버튼 클릭 추적
export const trackButtonClick = (buttonName: string, section?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'button_click', {
      event_category: 'interaction',
      event_label: buttonName,
      section: section || 'unknown',
    });
  }
};

// 커스텀 이벤트 추적 (나중에 추가용)
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// UTM 파라미터 추출
export const getUTMParams = () => {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_term: params.get('utm_term'),
    utm_content: params.get('utm_content'),
  };
};