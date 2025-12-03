'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  trackPageView,
  trackScrollDepth,
  trackImageClick,
  trackButtonClick,
  getUTMParams,
} from '@/lib/analytics';

export default function SoloLvPage() {
  const [scrollTracked, setScrollTracked] = useState({
    '25': false,
    '50': false,
    '75': false,
    '100': false,
  });

  // 포스터 슬라이드
  const [currentPosterSlide, setCurrentPosterSlide] = useState(0);

  // 일정 이미지 슬라이드
  const [currentSlide, setCurrentSlide] = useState(0);

  const scheduleImages = [
    '/images/sololv/detail_miniapp/4_detail.webp',
    '/images/sololv/detail_miniapp/5_detail.webp',
    '/images/sololv/detail_miniapp/6_detail.webp',
  ];

  // 페이지 진입 시 측정
  useEffect(() => {
    const utmParams = getUTMParams();
    trackPageView('/sololv', 'Solo Leveling Musical');

    console.log('나 혼자만 레벨업 뮤지컬 페이지 진입 - UTM:', utmParams);

    // 스크롤 깊이 측정
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

      if (scrollPercent >= 25 && !scrollTracked['25']) {
        trackScrollDepth(25);
        setScrollTracked((prev) => ({ ...prev, '25': true }));
      }
      if (scrollPercent >= 50 && !scrollTracked['50']) {
        trackScrollDepth(50);
        setScrollTracked((prev) => ({ ...prev, '50': true }));
      }
      if (scrollPercent >= 75 && !scrollTracked['75']) {
        trackScrollDepth(75);
        setScrollTracked((prev) => ({ ...prev, '75': true }));
      }
      if (scrollPercent >= 99 && !scrollTracked['100']) {
        trackScrollDepth(100);
        setScrollTracked((prev) => ({ ...prev, '100': true }));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollTracked]);

  // 포스터 자동 슬라이드 (10초)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPosterSlide((prev) => (prev + 1) % 3);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // 일정 이미지 자동 슬라이드 (5초)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % scheduleImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [scheduleImages.length]);

  // 슬라이드 이동
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    trackButtonClick(`slide_${index + 1}`, 'schedule_slider');
  };

  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % scheduleImages.length;
    setCurrentSlide(newIndex);
    trackButtonClick('next_slide', 'schedule_slider');
  };

  const prevSlide = () => {
    const newIndex = (currentSlide - 1 + scheduleImages.length) % scheduleImages.length;
    setCurrentSlide(newIndex);
    trackButtonClick('prev_slide', 'schedule_slider');
  };

  return (
    <div className="w-full">
      {/* Hero 섹션 - 포스터 이미지 슬라이더 */}
      <section className="relative w-full h-screen bg-black">
        {/* 이미지 슬라이더 */}
        <div className="relative w-full h-full">
          {[
            '/images/sololv/detail_miniapp/1_detail.webp',
            '/images/sololv/detail_miniapp/2_detail.webp',
            '/images/sololv/detail_miniapp/3_detail.webp'
          ].map((poster, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentPosterSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              onClick={() => trackImageClick(`hero_poster_${index + 1}`, 'hero')}
            >
              <Image
                src={poster}
                alt={`나 혼자만 레벨업 포스터 ${index + 1}`}
                fill
                className="object-contain cursor-pointer bg-black"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* 이전/다음 버튼 */}
        <button
          onClick={() => {
            setCurrentPosterSlide((prev) => (prev - 1 + 3) % 3);
            trackButtonClick('hero_prev', 'hero');
          }}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 md:p-4 rounded-full transition z-20 backdrop-blur-sm"
          aria-label="이전 포스터"
        >
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => {
            setCurrentPosterSlide((prev) => (prev + 1) % 3);
            trackButtonClick('hero_next', 'hero');
          }}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 md:p-4 rounded-full transition z-20 backdrop-blur-sm"
          aria-label="다음 포스터"
        >
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* 하단 텍스트 섹션 */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 backdrop-blur-md py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 md:mb-4 text-white">
            我独自升级 on ICE {/* 나 혼자만 레벨업 on ICE */}
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-3 md:mb-4 text-white">
            Solo Leveling Musical
          </p>
          <p className="text-base md:text-xl text-blue-300">
            2025.12.24 - 12.31 | 首尔木洞滑冰场 {/* 서울목동아이스링크장 */}
          </p>
        </div>
      </section>

      {/* 공연 하이라이트 섹션 */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
            角色 & 演员 {/* 캐릭터 & 배우 */}
          </h2>

          {/* 캐릭터 & 캐스트 */}
          <div className="mb-12 md:mb-16">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* 주연 캐스트 */}
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/sololv/detail_miniapp/7_detail.webp"
                  alt="주연 캐스트"
                  fill
                  className="object-contain bg-slate-900"
                />
              </div>

              {/* 조연 캐스트 1 */}
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/sololv/detail_miniapp/8_detail.webp"
                  alt="조연 캐스트"
                  fill
                  className="object-contain bg-slate-900"
                />
              </div>

              {/* 조연 캐스트 2 */}
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/sololv/detail_miniapp/9_detail.webp"
                  alt="조연 캐스트"
                  fill
                  className="object-contain bg-slate-900"
                />
              </div>

              {/* 조연 캐스트 3 */}
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/sololv/detail_miniapp/10_detail.webp"
                  alt="조연 캐스트"
                  fill
                  className="object-contain bg-slate-900"
                />
              </div>

              {/* 액션 퍼포머 */}
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/sololv/detail_miniapp/11_detail.webp"
                  alt="액션 퍼포머"
                  fill
                  className="object-contain bg-slate-900"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 공연 장면 갤러리 섹션 */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
            公演精彩瞬间 {/* 공연의 멋진 순간 / 공연 하이라이트 */}
          </h2>

          {/* 슬라이더 */}
          <div className="relative">
            {/* 슬라이드 이미지 */}
            <div className="relative aspect-square max-w-[500px] md:max-w-[700px] lg:max-w-[900px] mx-auto overflow-hidden rounded-xl shadow-2xl bg-black">
              {scheduleImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                  onClick={() => trackImageClick(`schedule_image_${index + 1}`, 'gallery')}
                >
                  <Image src={image} alt={`일정 ${index + 1}`} fill className="object-contain cursor-pointer" />
                </div>
              ))}
            </div>

            {/* 이전/다음 버튼 */}
            <button
              onClick={prevSlide}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-4 rounded-full transition"
              aria-label="이전 슬라이드"
            >
              <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-4 rounded-full transition"
              aria-label="다음 슬라이드"
            >
              <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* 인디케이터 */}
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
              {scheduleImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition ${
                    index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
                  }`}
                  aria-label={`슬라이드 ${index + 1}로 이동`}
                />
              ))}
            </div>
          </div>

          {/* 슬라이드 카운터 */}
          <div className="text-center mt-4 md:mt-6 text-gray-600">
            <span className="text-base md:text-lg font-semibold">{currentSlide + 1}</span>
            <span className="mx-2">/</span>
            <span className="text-base md:text-lg">{scheduleImages.length}</span>
          </div>
        </div>
      </section>

      {/* 크리에이티브 팀 섹션 */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
            创作团队 {/* 창작팀 / 크리에이티브 팀 */}
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/images/sololv/detail_miniapp/12_detail.webp"
                alt="크리에이티브 팀"
                fill
                className="object-contain bg-slate-900"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 좌석 배치도 섹션 */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
            座位示意图 {/* 좌석 배치도 */}
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/images/sololv/detail_miniapp/13_seating.webp"
                alt="좌석 배치도"
                fill
                className="object-contain bg-slate-900"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 공지사항 섹션 */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
            公告事项 {/* 공지사항 */}
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/images/sololv/detail_miniapp/14_notice.webp"
                alt="공지사항"
                fill
                className="object-contain bg-slate-900"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            立即预订门票 {/* 지금 바로 티켓 예매하기 */}
          </h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-blue-200">
            2025.12.24 - 12.31 | 首尔木洞滑冰场 {/* 서울목동아이스링크장 */}
          </p>

          <div className="space-y-4 md:space-y-6">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfFVY13Ykh6ndvlWSwDw2-N2AIBjU4jafOdxTllK-FOZegvjg/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick('book_ticket_cta', 'cta')}
              className="bg-white text-slate-900 px-8 md:px-12 py-3 md:py-4 rounded-lg text-lg md:text-xl font-bold hover:bg-gray-100 transition shadow-lg inline-block"
            >
              预订门票 {/* 티켓 예매 */}
            </a>

            <div className="text-blue-100 space-y-2">
              <p className="text-base md:text-lg break-all">咨询: libaitian.official@gmail.com {/* 문의 */}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}