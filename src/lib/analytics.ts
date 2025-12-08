/**
 * Google Analytics 측정 함수들
 */

// GTM 이벤트 설정 타입 정의
interface GtagConfig {
  [key: string]: string | number | boolean | undefined;
}

// GTM 타입 정의
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string | Date,
      config?: GtagConfig
    ) => void;
    dataLayer: unknown[];
  }
}

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
  eventParams?: GtagConfig
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};