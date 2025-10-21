import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

/**
 * Container 컴포넌트
 * 페이지 콘텐츠의 최대 너비를 제한하고 가운데 정렬
 *
 * @param maxWidth - 최대 너비: 'sm' | 'md' | 'lg' | 'xl' | 'full'
 * @param className - 추가 CSS 클래스
 *
 * @example
 * <Container maxWidth="lg">
 *   <h1>콘텐츠</h1>
 * </Container>
 */
export default function Container({
  children,
  className = '',
  maxWidth = 'lg',
}: ContainerProps) {
  const maxWidthStyles = {
    sm: 'max-w-screen-sm',   // 640px
    md: 'max-w-screen-md',   // 768px
    lg: 'max-w-screen-lg',   // 1024px
    xl: 'max-w-screen-xl',   // 1280px
    full: 'max-w-full',
  };

  return (
    <div className={`container mx-auto px-4 ${maxWidthStyles[maxWidth]} ${className}`}>
      {children}
    </div>
  );
}
