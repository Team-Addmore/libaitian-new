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

  // 슬라이드 현재 인덱스
  const [currentSlide, setCurrentSlide] = useState(0);

  // 일정 이미지 슬라이드 (나중에 실제 이미지 경로로 교체)
  const scheduleImages = [
    '/schedule-1.jpg',
    '/schedule-2.jpg',
    '/schedule-3.jpg',
    '/schedule-4.jpg',
    '/schedule-5.jpg',
    '/schedule-6.jpg',
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

  // 슬라이드 자동 넘김 (5초마다)
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
      {/* Hero 섹션 - 광고 이미지 */}
      <section className="relative w-full min-h-screen bg-black">
        <div className="relative w-full h-screen">
          {/* 여기에 광고 이미지 넣기 */}
          {/* 예시: <Image src="/fam-tour-hero.jpg" alt="Fam Tour" fill className="object-cover" /> */}
          
          {/* 임시 배경 (실제 이미지로 교체) */}
          <div 
            className="w-full h-full bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 flex items-center justify-center cursor-pointer"
            onClick={() => trackImageClick('hero_ad_image', 'hero')}
          >
            <div className="text-center text-white z-10 px-4">
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                Familiarization Tour
              </h1>
              <p className="text-2xl md:text-3xl mb-8">
                제주 힐링 체험 팸투어
              </p>
              <p className="text-xl text-teal-100">
                11월 13일 ~ 14일 (1박 2일)
              </p>
            </div>
          </div>
        </div>

        {/* 스크롤 다운 안내 */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* 설명 섹션 */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            팸투어 소개
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              제주의 숨은 매력을 직접 체험하고 기록하는 특별한 팸투어에 여러분을 초대합니다.
              전통 한복 체험부터 난타 공연, 제주 로컬 숙소, 그리고 하례리의 힐링 프로그램까지
              알찬 1박 2일 일정으로 준비했습니다.
            </p>
            
            <p>
              이번 투어는 단순한 관광이 아닌, 콘텐츠 크리에이터를 위한 체험형 프로그램입니다.
              리바이티엔 미니프로그램과 샤오홍슈를 통해 제주의 이야기를 전 세계에 공유할 수 있는 기회를 제공합니다.
            </p>

            <div className="bg-teal-50 p-6 rounded-lg my-8">
              <h3 className="text-xl font-bold text-teal-900 mb-3">프로그램 특징</h3>
              <ul className="space-y-2 text-gray-800">
                <li>• 전통 & 퓨전 한복 체험 및 전문 스냅 촬영</li>
                <li>• 난타 공연 관람 (위챗 미니프로그램 예약 시스템 체험)</li>
                <li>• 제주 로컬 숙소 체험 (청굴물/스테이오아)</li>
                <li>• 하례리 힐링 프로그램 (트레킹, 명상, 싱잉볼)</li>
                <li>• 제주 로컬 맛집 투어</li>
                <li>• 콘텐츠 제작 가이드 및 SNS 공유</li>
              </ul>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg my-8">
              <h3 className="text-xl font-bold text-amber-900 mb-3">촬영 콘텐츠 미션</h3>
              <p className="text-gray-800 mb-3">
                참가자들은 각 프로그램마다 샤오홍슈 스타일의 생생한 콘텐츠를 제작하게 됩니다.
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>📸 한복 착장 프로세스 및 스냅 촬영</li>
                <li>🍽️ 로컬 맛집의 생활감 있는 음식 컷</li>
                <li>🏠 숙소 룸투어 및 힐링 타임</li>
                <li>🎭 난타 공연 예약 시스템 화면</li>
                <li>🌿 트레킹 및 명상 프로그램 디테일</li>
                <li>🎨 토템 컬러링 완성작 인증샷</li>
              </ul>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => trackButtonClick('inquiry_cta', 'description')}
                className="bg-teal-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition shadow-lg"
              >
                참가 신청하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 일정표 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            여행 일정
          </h2>
          <p className="text-center text-gray-600 mb-12">1박 2일 제주 힐링 체험</p>

          {/* Day 1 */}
          <div className="mb-16">
            <div className="bg-teal-600 text-white px-8 py-4 rounded-t-lg">
              <h3 className="text-3xl font-bold">Day 1 - 11월 13일 (목)</h3>
              <p className="text-teal-100 mt-1">전통 문화 체험 & 난타 공연</p>
            </div>
            
            <div className="bg-white rounded-b-lg shadow-lg overflow-hidden">
              {/* 09:00 */}
              <div className="border-b border-gray-200 p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-teal-100 rounded-lg flex items-center justify-center">
                      <span className="text-teal-700 font-bold text-lg">09:00</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">공항 픽업 & 미팅</h4>
                    <p className="text-gray-700 mb-3">
                      행사 전체 일정·안전 수칙·콘텐츠 설명
                    </p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• 리바이티엔 미니프로그램/샤오홍슈 계정 안내</li>
                      <li>• 단톡방 초대 및 소통 채널 안내</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 10:00 */}
              <div className="border-b border-gray-200 p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-teal-100 rounded-lg flex items-center justify-center">
                      <span className="text-teal-700 font-bold text-lg">10:00</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">한복 체험</h4>
                    <p className="text-gray-700 mb-3">
                      전통/퓨전 한복 선택 및 착장
                    </p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• 한복 대여점 이동 후 개인 취향에 맞는 한복 선택</li>
                      <li>• 인근 골목·거리에서 개인/2인/단체 스냅 촬영</li>
                      <li>• 짧은 릴스/틱톡용 영상 촬영</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 12:00 */}
              <div className="border-b border-gray-200 p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-teal-100 rounded-lg flex items-center justify-center">
                      <span className="text-teal-700 font-bold text-lg">12:00</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">중식 - 로컬 맛집 체험</h4>
                    <p className="text-gray-700 mb-3">
                      제주 로컬 맛집에서 점심 식사 및 콘텐츠 촬영
                    </p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• 메뉴·식당 콘셉트 소개</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 13:30 */}
              <div className="border-b border-gray-200 p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-teal-100 rounded-lg flex items-center justify-center">
                      <span className="text-teal-700 font-bold text-lg">13:30</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">난타 공연 관람</h4>
                    <p className="text-gray-700 mb-3">
                      위챗 미니프로그램 예약 시스템 체험 및 난타 공연 관람
                    </p>
                  </div>
                </div>
              </div>

              {/* 16:00~ */}
              <div className="p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-teal-100 rounded-lg flex items-center justify-center">
                      <span className="text-teal-700 font-bold text-lg">16:00</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">숙소 체크인</h4>
                    <p className="text-gray-700 mb-3">
                      청굴물/스테이오아 등 제주 로컬 숙소 체크인 및 룸투어
                    </p>
                    <div className="mt-3 inline-block bg-teal-100 px-3 py-1 rounded text-sm font-semibold text-teal-800">
                      🌙 자유 시간 및 휴식
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div>
            <div className="bg-emerald-600 text-white px-8 py-4 rounded-t-lg">
              <h3 className="text-3xl font-bold">Day 2 - 11월 14일 (금)</h3>
              <p className="text-emerald-100 mt-1">하례리 힐링 프로그램</p>
            </div>
            
            <div className="bg-white rounded-b-lg shadow-lg overflow-hidden">
              {/* 09:00 */}
              <div className="border-b border-gray-200 p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-700 font-bold text-lg">09:00</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">각 숙소 픽업</h4>
                    <p className="text-gray-700">
                      청굴물/스테이오아 → 하례리 이동
                    </p>
                  </div>
                </div>
              </div>

              {/* 10:00 */}
              <div className="border-b border-gray-200 p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-700 font-bold text-lg">10:00</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">웰컴 티 & 나만의 이름 만들기</h4>
                    <p className="text-gray-700 mb-3">
                      하례 내창 공간에서 웰컴 허브티·수제 캐러멜 제공
                    </p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• 나만의 이름 만들기 체험</li>
                      <li>• 페이스페인팅 체험</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 11:00 */}
              <div className="border-b border-gray-200 p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-700 font-bold text-lg">11:00</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">물소리와 함께 걷는 짧은 트레킹 & 명상</h4>
                    <p className="text-gray-700 mb-3">
                      효돈천 내창에서 자연과 함께하는 힐링 프로그램
                    </p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• 트레킹 및 명상 체험</li>
                      <li>• 유목/돌 줍기 프로그램</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 13:00 */}
              <div className="border-b border-gray-200 p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-700 font-bold text-lg">13:00</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">삼춘밥상</h4>
                    <p className="text-gray-700 mb-3">
                      제주 전통 음식 점심 (돔베고기·보말 등)
                    </p>
                  </div>
                </div>
              </div>

              {/* 14:00 */}
              <div className="border-b border-gray-200 p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-700 font-bold text-lg">14:00</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">힐링 프로그램</h4>
                    <p className="text-gray-700 mb-3">
                      싱잉볼 힐링 & 토템 컬러링 (유목/돌)
                    </p>
                    <div className="mt-3 inline-block bg-gray-100 px-3 py-1 rounded text-xs text-gray-600">
                      📸 사운드볼 진동, 컬러링 & 싱잉볼 투어
                    </div>
                  </div>
                </div>
              </div>

              {/* 15:30 */}
              <div className="border-b border-gray-200 p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-700 font-bold text-lg">15:30</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">프로그램 종료</h4>
                    <p className="text-gray-700 mb-3">
                      프로그램 진행 소감 발표 및 마무리
                    </p>
                  </div>
                </div>
              </div>

              {/* 16:30 */}
              <div className="p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-700 font-bold text-lg">16:30</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">제주 공항</h4>
                    <p className="text-gray-700">
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
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            프로그램 갤러리
          </h2>

          {/* 슬라이더 */}
          <div className="relative">
            {/* 슬라이드 이미지 */}
            <div className="relative h-[600px] overflow-hidden rounded-xl shadow-2xl">
              {scheduleImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                  onClick={() => trackImageClick(`schedule_image_${index + 1}`, 'gallery')}
                >
                  {/* 여기에 실제 이미지 넣기 */}
                  {/* <Image src={image} alt={`일정 ${index + 1}`} fill className="object-cover" /> */}
                  
                  {/* 임시 배경 (실제 이미지로 교체) */}
                  <div
                    className="w-full h-full flex items-center justify-center cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, 
                        ${index === 0 ? '#667eea, #764ba2' : ''}
                        ${index === 1 ? '#f093fb, #f5576c' : ''}
                        ${index === 2 ? '#4facfe, #00f2fe' : ''}
                        ${index === 3 ? '#43e97b, #38f9d7' : ''}
                        ${index === 4 ? '#fa709a, #fee140' : ''}
                        ${index === 5 ? '#30cfd0, #330867' : ''}
                      )`
                    }}
                  >
                    <p className="text-white text-4xl font-bold">
                      프로그램 이미지 {index + 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 이전/다음 버튼 */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition"
              aria-label="이전 슬라이드"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition"
              aria-label="다음 슬라이드"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* 인디케이터 */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
              {scheduleImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
                  }`}
                  aria-label={`슬라이드 ${index + 1}로 이동`}
                />
              ))}
            </div>
          </div>

          {/* 슬라이드 카운터 */}
          <div className="text-center mt-6 text-gray-600">
            <span className="text-lg font-semibold">{currentSlide + 1}</span>
            <span className="mx-2">/</span>
            <span className="text-lg">{scheduleImages.length}</span>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">
            지금 바로 참가 신청하세요
          </h2>
          <p className="text-xl mb-8 text-teal-100">
            11월 13일~14일 | 제주 힐링 체험 팸투어
          </p>

          <div className="space-y-6">
            <button
              onClick={() => trackButtonClick('final_apply_cta', 'cta')}
              className="bg-white text-teal-600 px-12 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition shadow-lg inline-block"
            >
              참가 신청하기
            </button>
            
            <div className="text-teal-50 space-y-2">
              <p className="text-lg">문의: libaitian.official@gmail.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}