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

export default function FamTourPage() {
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
    '/images/schedule-1.webp',
    '/images/schedule-2.webp',
    '/images/schedule-3.webp',
    '/images/schedule-4.webp',
    '/images/schedule-5.webp',
    '/images/schedule-6.webp',
  ];

  // 페이지 진입 시 측정
  useEffect(() => {
    const utmParams = getUTMParams();
    trackPageView('/famtour', 'Fam Tour Landing');

    console.log('팸투어 랜딩페이지 진입 - UTM:', utmParams);

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
          {['/images/poster-1.webp', '/images/poster-2.webp', '/images/poster-3.webp'].map((poster, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentPosterSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              onClick={() => trackImageClick(`hero_poster_${index + 1}`, 'hero')}
            >
              <Image 
                src={poster} 
                alt={`팸투어 포스터 ${index + 1}`}
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
      <section className="bg-[#0f3f2e]/95 backdrop-blur-md py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 md:mb-4 text-white">
            Familiarization Tour
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-3 md:mb-4 text-white">
            제주 힐링 체험 팸투어
          </p>
          <p className="text-base md:text-xl text-teal-300">
            11월 13일 ~ 14일 (1박 2일)
          </p>
        </div>
      </section>

      {/* 일정표 섹션 */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 text-center">
            여행 일정
          </h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12 text-sm md:text-base">1박 2일 제주 힐링 체험</p>

          {/* Day 1 */}
          <div className="mb-12 md:mb-16">
            <div className="bg-teal-600 text-white px-4 md:px-8 py-3 md:py-4 rounded-t-lg">
              <h3 className="text-2xl md:text-3xl font-bold">Day 1 - 11월 13일 (목)</h3>
              <p className="text-teal-100 mt-1 text-sm md:text-base">전통 문화 체험 & 난타 공연</p>
            </div>
            
            <div className="bg-white rounded-b-lg shadow-lg overflow-hidden">
              {/* 09:00 */}
              <div className="border-b border-gray-200 p-4 md:p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-3 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-teal-100 rounded-lg flex items-center justify-center">
                      <span className="text-teal-700 font-bold text-base md:text-lg">09:00</span>
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">공항 픽업 & 미팅</h4>
                    <p className="text-sm md:text-base text-gray-700 mb-3">
                      행사 전체 일정·안전 수칙·콘텐츠 설명
                    </p>
                    <ul className="text-gray-600 space-y-1 text-xs md:text-sm">
                      <li>• 리바이티엔 미니프로그램/샤오홍슈 계정 안내</li>
                      <li>• 단톡방 초대 및 소통 채널 안내</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 10:00 */}
              <div className="border-b border-gray-200 p-4 md:p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-3 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-teal-100 rounded-lg flex items-center justify-center">
                      <span className="text-teal-700 font-bold text-base md:text-lg">10:00</span>
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">한복 체험</h4>
                    <p className="text-sm md:text-base text-gray-700 mb-3">
                      전통/퓨전 한복 선택 및 착장
                    </p>
                    <ul className="text-gray-600 space-y-1 text-xs md:text-sm">
                      <li>• 한복 대여점 이동 후 개인 취향에 맞는 한복 선택</li>
                      <li>• 인근 골목·거리에서 개인/2인/단체 스냅 촬영</li>
                      <li>• 짧은 릴스/틱톡용 영상 촬영</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 12:00 */}
              <div className="border-b border-gray-200 p-4 md:p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-3 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-teal-100 rounded-lg flex items-center justify-center">
                      <span className="text-teal-700 font-bold text-base md:text-lg">12:00</span>
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">중식 - 로컬 맛집 체험</h4>
                    <p className="text-sm md:text-base text-gray-700 mb-3">
                      제주 로컬 맛집에서 점심 식사 및 콘텐츠 촬영
                    </p>
                    <ul className="text-gray-600 space-y-1 text-xs md:text-sm">
                      <li>• 메뉴·식당 콘셉트 소개</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 13:30 */}
              <div className="border-b border-gray-200 p-4 md:p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-3 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-teal-100 rounded-lg flex items-center justify-center">
                      <span className="text-teal-700 font-bold text-base md:text-lg">13:30</span>
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">난타 공연 관람</h4>
                    <p className="text-sm md:text-base text-gray-700 mb-3">
                      위챗 미니프로그램 예약 시스템 체험 및 난타 공연 관람
                    </p>
                  </div>
                </div>
              </div>

              {/* 16:00 */}
              <div className="p-4 md:p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-3 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-teal-100 rounded-lg flex items-center justify-center">
                      <span className="text-teal-700 font-bold text-base md:text-lg">16:00</span>
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">숙소 체크인</h4>
                    <p className="text-sm md:text-base text-gray-700 mb-3">
                      청굴물/스테이오아 등 제주 로컬 숙소 체크인 및 룸투어
                    </p>
                    <div className="mt-3 inline-block bg-teal-100 px-3 py-1 rounded text-xs md:text-sm font-semibold text-teal-800">
                      🌙 자유 시간 및 휴식
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div>
            <div className="bg-emerald-600 text-white px-4 md:px-8 py-3 md:py-4 rounded-t-lg">
              <h3 className="text-2xl md:text-3xl font-bold">Day 2 - 11월 14일 (금)</h3>
              <p className="text-emerald-100 mt-1 text-sm md:text-base">하례리 힐링 프로그램</p>
            </div>
            
            <div className="bg-white rounded-b-lg shadow-lg overflow-hidden">
              {/* 09:00 */}
              <div className="border-b border-gray-200 p-4 md:p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-3 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-700 font-bold text-base md:text-lg">09:00</span>
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">각 숙소 픽업</h4>
                    <p className="text-sm md:text-base text-gray-700">
                      청굴물/스테이오아 → 하례리 이동
                    </p>
                  </div>
                </div>
              </div>

              {/* 10:00 */}
              <div className="border-b border-gray-200 p-4 md:p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-3 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-700 font-bold text-base md:text-lg">10:00</span>
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">웰컴 티 & 나만의 이름 만들기</h4>
                    <p className="text-sm md:text-base text-gray-700 mb-3">
                      하례 내창 공간에서 웰컴 허브티·수제 캐러멜 제공
                    </p>
                    <ul className="text-gray-600 space-y-1 text-xs md:text-sm">
                      <li>• 나만의 이름 만들기 체험</li>
                      <li>• 페이스페인팅 체험</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 11:00 */}
              <div className="border-b border-gray-200 p-4 md:p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-3 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-700 font-bold text-base md:text-lg">11:00</span>
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">물소리와 함께 걷는 짧은 트레킹 & 명상</h4>
                    <p className="text-sm md:text-base text-gray-700 mb-3">
                      효돈천 내창에서 자연과 함께하는 힐링 프로그램
                    </p>
                    <ul className="text-gray-600 space-y-1 text-xs md:text-sm">
                      <li>• 트레킹 및 명상 체험</li>
                      <li>• 유목/돌 줍기 프로그램</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 13:00 */}
              <div className="border-b border-gray-200 p-4 md:p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-3 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-700 font-bold text-base md:text-lg">13:00</span>
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">삼춘밥상</h4>
                    <p className="text-sm md:text-base text-gray-700 mb-3">
                      제주 전통 음식 점심 (돔베고기·보말 등)
                    </p>
                  </div>
                </div>
              </div>

              {/* 14:00 */}
              <div className="border-b border-gray-200 p-4 md:p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-3 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-700 font-bold text-base md:text-lg">14:00</span>
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">힐링 프로그램</h4>
                    <p className="text-sm md:text-base text-gray-700 mb-3">
                      싱잉볼 힐링 & 토템 컬러링 (유목/돌)
                    </p>
                  </div>
                </div>
              </div>

              {/* 15:30 */}
              <div className="border-b border-gray-200 p-4 md:p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-3 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-700 font-bold text-base md:text-lg">15:30</span>
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">프로그램 종료</h4>
                    <p className="text-sm md:text-base text-gray-700 mb-3">
                      프로그램 진행 소감 발표 및 마무리
                    </p>
                  </div>
                </div>
              </div>

              {/* 16:30 */}
              <div className="p-4 md:p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-3 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-700 font-bold text-base md:text-lg">16:30</span>
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">제주 공항</h4>
                    <p className="text-sm md:text-base text-gray-700">
                      제주시 이동 및 일정 종료
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 일정 이미지 슬라이드 섹션 */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
            프로그램 갤러리
          </h2>

          {/* 슬라이더 */}
          <div className="relative">
            {/* 슬라이드 이미지 */}
            <div className="relative h-[300px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl shadow-2xl">
              {scheduleImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                  onClick={() => trackImageClick(`schedule_image_${index + 1}`, 'gallery')}
                >
                  <Image src={image} alt={`일정 ${index + 1}`} fill className="object-cover cursor-pointer" />
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

      {/* CTA 섹션 */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-teal-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            지금 바로 참가 신청하세요
          </h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-teal-100">
            11월 13일~14일 | 제주 힐링 체험 팸투어
          </p>

          <div className="space-y-4 md:space-y-6">
            <button
              onClick={() => trackButtonClick('final_apply_cta', 'cta')}
              className="bg-white text-teal-600 px-8 md:px-12 py-3 md:py-4 rounded-lg text-lg md:text-xl font-bold hover:bg-gray-100 transition shadow-lg inline-block"
            >
              참가 신청하기
            </button>
            
            <div className="text-teal-50 space-y-2">
              <p className="text-base md:text-lg break-all">문의: libaitian.official@gmail.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}