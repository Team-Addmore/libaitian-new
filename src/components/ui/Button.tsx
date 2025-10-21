import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Button 컴포넌트
 *
 * @param variant - 버튼 스타일: 'primary' | 'secondary' | 'outline' | 'ghost'
 * @param size - 버튼 크기: 'sm' | 'md' | 'lg'
 * @param href - 링크 URL (있으면 Link 컴포넌트로 렌더링)
 * @param onClick - 클릭 이벤트 핸들러
 * @param className - 추가 CSS 클래스
 * @param disabled - 비활성화 상태
 *
 * @example
 * <Button variant="primary" size="md">클릭</Button>
 * <Button variant="outline" href="/about">회사소개</Button>
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
}: ButtonProps) {
  // 기본 스타일
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // 변형 스타일
  const variantStyles = {
    primary: 'bg-brand-accent text-white hover:bg-brand-accent/90 focus:ring-brand-accent',
    secondary: 'bg-white text-black hover:bg-gray-200 focus:ring-gray-300',
    outline: 'border-2 border-brand-accent text-brand-primary hover:bg-brand-accent hover:text-white focus:ring-brand-accent',
    ghost: 'text-white hover:text-brand-accent focus:ring-brand-accent',
  };

  // 크기 스타일
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  // 링크 버튼
  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  // 일반 버튼
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
}
