"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LibaitianHomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const slides = [
    {
      type: 'image-only',
      image: '/images/s1-main-mobile.png',
      alt: 'LIBAITIAN 메인 이미지'
    },
    {
      type: 'image-with-text',
      image: '/images/s1-main2.jpg',
      title: '중국 개별 여행객을 위한',
      titleLine2: '로컬 가이드 모집',
      subtitle: '"단순한 관광이 아닌, 진짜 로컬을 알려주는 로컬 가이드"',
      titleColor: 'text-yellow-400',
      description: '여정의 조각을 리바이티엔의 인바운드 여행 플랫폼과 함께 특별한 경험을 만들어 갈 로컬 가이드를 모집합니다, 여행을 이야기로'
    }
  ];

  const cards = [
    {
      title: 'LOCAL-Friendly',
      subtitle: '로컬친화적',
      description: '부담없이 경험, 여행 중 지역의 사람들 만나',
      colorImage: '/images/s2-local-c.jpg',
      bwImage: '/images/s2-local-b.jpg'
    },
    {
      title: 'COMMUNITY-Friendly',
      subtitle: '지역사회와의 상생',
      description: '젊은이 아낌없이 돕는 지역에서 나눌공존 해',
      colorImage: '/images/s2-community-c.jpg',
      bwImage: '/images/s2-community-b.jpg'
    },
    {
      title: 'ECO-Friendly',
      subtitle: '친환경',
      description: '환경에 대한 소중함 자연이 자연을 보호하고',
      colorImage: '/images/s2-eco-c.jpg',
      bwImage: '/images/s2-eco-b.jpg'
    }
  ];

  const instagramPosts = [
    { image: '/images/s4-insta-1.jpg', link: 'https://instagram.com/libaitian.official' },
    { image: '/images/s4-insta-2.jpg', link: 'https://instagram.com/libaitian.official' },
    { image: '/images/s4-insta-3.jpg', link: 'https://instagram.com/libaitian.official' },
    { image: '/images/s4-insta-4.jpg', link: 'https://instagram.com/libaitian.official' },
    { image: '/images/s4-insta-5.jpg', link: 'https://instagram.com/libaitian.official' },
    { image: '/images/s4-insta-6.jpg', link: 'https://instagram.com/libaitian.official' },
    { image: '/images/s4-insta-7.jpg', link: 'https://instagram.com/libaitian.official' },
    { image: '/images/s4-insta-8.jpg', link: 'https://instagram.com/libaitian.official' }
  ];

  // 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-white font-['Pretendard']">
      {/* 섹션 1: 메인 슬라이드 */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-black">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            {slide.type === 'image-only' ? (
              // 첫 번째: 순수 이미지만 (이미지 위치를 위로 조정)
              <div className="relative w-full h-full bg-[#0a2426]">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-contain"
                  style={{ objectPosition: 'center center' }}
                  suppressHydrationWarning
                />
              </div>
            ) : (
              // 두 번째: 배경 이미지 + 텍스트 오버레이 (왼쪽 정렬)
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt="Background"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center px-4 md:px-8 lg:px-16 xl:px-24">
                  <div className="text-left text-white max-w-4xl">
                    <h2 className={`text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight break-keep ${slide.titleColor || 'text-white'}`}>
                      {slide.title}
                      <br />
                      {slide.titleLine2}
                    </h2>
                    <h3 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-semibold mt-4 md:mt-6 mb-6 md:mb-8 leading-relaxed break-keep">
                      {slide.subtitle}
                    </h3>
                    <p className="text-sm md:text-lg lg:text-xl xl:text-2xl font-light leading-relaxed mb-8 md:mb-10 break-keep">
                      {slide.description}
                    </p>
                    <a 
                      href="https://libaitian.kr/44"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-white hover:bg-gray-100 text-[#002427] px-6 py-2 md:px-8 md:py-3 lg:px-10 lg:py-4 rounded-lg text-base md:text-lg lg:text-xl font-bold transition shadow-lg hover:shadow-xl"
                    >
                      로컬 가이드 신청
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* 슬라이드 버튼 */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-[75%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all flex items-center justify-center text-white"
          aria-label="이전 슬라이드"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 다음 버튼 */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-[75%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all flex items-center justify-center text-white"
          aria-label="다음 슬라이드"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>
      
      {/* 섹션 2: 3개 이미지 카드 */}
      <section className="py-20 md:py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#002427] mb-6 break-keep">
              LIBAITIAN
            </h2>
            <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#002427] mb-4 leading-tight break-keep">
              당신의 여행 조각을 아카이빙 합니다.
            </h3>
            <p className="text-2xl md:text-3xl lg:text-5xl text-black leading-tight break-keep">
              Feel it. Remember it. Archive it.
            </p>
          </div>

          <div className="text-lg md:text-xl lg:text-2xl text-gray-700 text-center max-w-6xl mx-auto mb-20 leading-relaxed space-y-3">
            <p className="break-keep">여행을 단순한 방문이 아니라, '지속가능한 여행' 감정이 남는 '기억' 가능한 하루로 바꾸고자 합니다.</p>
            <p className="break-keep">감정 중심의 지속 가능한 여행 경험을 통해, 여행자가 지역과 깊이 연결되는 것을 목표로 합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {cards.map((card, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                    style={{
                      backgroundImage: `url(${card.colorImage})`,
                      opacity: hoveredCard === index ? 0 : 1
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-cover bg-center grayscale transition-opacity duration-500"
                    style={{
                      backgroundImage: `url(${card.bwImage})`,
                      opacity: hoveredCard === index ? 1 : 0
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 섹션 2-1: 관광 프로그램 */}
      <section className="py-20 md:py-32 px-4 bg-white font-pretendard">
        <div className="max-w-7xl mx-auto">
          {/* 투어 섹션 */}
          <div className="mb-20 md:mb-32">
            {/* 텍스트 영역 */}
            <div className="mb-12 md:mb-16">
              <div className="mb-8 md:mb-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#002427] mb-4 md:mb-6 break-keep">
                  김녕의 자연을 경험하다
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed break-keep">
                  푸른 김녕바다와 함께하는 특별한 투어 프로그램
                </p>
              </div>
              
              {/* 2x2 그리드 배열 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-10">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-2 h-2 bg-[#002427] rounded-full mt-2 md:mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#002427] mb-1 md:mb-2 break-keep">김녕바다</h3>
                    <p className="text-base md:text-lg lg:text-xl text-gray-700 break-keep">에메랄드빛 투명한 바다에서의 힐링</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-2 h-2 bg-[#002427] rounded-full mt-2 md:mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#002427] mb-1 md:mb-2 break-keep">로컬푸드</h3>
                    <p className="text-base md:text-lg lg:text-xl text-gray-700 break-keep">신선한 제주 로컬 식재료로 만든 특별한 맛</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-2 h-2 bg-[#002427] rounded-full mt-2 md:mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#002427] mb-1 md:mb-2 break-keep">김녕해안 지질트레일</h3>
                    <p className="text-base md:text-lg lg:text-xl text-gray-700 break-keep">유네스코 세계지질공원의 아름다운 트레일</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-2 h-2 bg-[#002427] rounded-full mt-2 md:mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#002427] mb-1 md:mb-2 break-keep">요트투어</h3>
                    <p className="text-base md:text-lg lg:text-xl text-gray-700 break-keep">바다 위에서 즐기는 프라이빗 요트 경험</p>
                  </div>
                </div>
              </div>

              {/* 투어 더 알아보기 버튼 */}
              <div>
                <Link
                  href="/travel"
                  className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-5 bg-[#002427] text-white text-base md:text-lg lg:text-xl font-semibold rounded-full hover:bg-[#003d42] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <span>투어 더 알아보기</span>
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* 영상 영역 - 여백 완전 제거 */}
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl bg-black" style={{ paddingTop: '56.25%' }}>
              <iframe
                src="https://www.youtube.com/embed/aTfovFfuFuE?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&playlist=aTfovFfuFuE&disablekb=1&fs=0&iv_load_policy=3"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  width: '180%',
                  height: '180%',
                  border: 'none',
                  pointerEvents: 'none'
                }}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                title="김녕 투어 영상"
              />
            </div>
          </div>

          {/* 스테이 섹션 */}
          <div className="bg-gray-50 -mx-4 px-4 py-16 md:py-20 lg:py-32 rounded-xl md:rounded-2xl">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#002427] mb-4 md:mb-6 break-keep">
                  나른하고 포근한 숙소
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-700 break-keep">
                  김녕에서의 편안한 휴식, 당신만의 특별한 공간
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16">
                {/* 숙소 이미지 1 - 클릭 가능 */}
                <Link href="/travel" className="block">
                  <div className="relative group overflow-hidden rounded-xl shadow-lg aspect-[4/3] cursor-pointer">
                    <img
                      src="/images/stay-1.jpg"
                      alt="김녕 숙소 외관"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>

                {/* 숙소 이미지 2 - 클릭 가능 */}
                <Link href="/travel" className="block">
                  <div className="relative group overflow-hidden rounded-xl shadow-lg aspect-[4/3] cursor-pointer">
                    <img
                      src="/images/stay-2.jpg"
                      alt="김녕 숙소 내부"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              </div>

              {/* 더 알아보기 버튼 */}
              <div className="text-center">
                <Link
                  href="/travel"
                  className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-5 bg-[#002427] text-white text-base md:text-lg lg:text-xl font-semibold rounded-full hover:bg-[#003d42] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <span>숙소 더 알아보기</span>
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 3: WeChat 소개 */}
      <section className="py-20 md:py-32 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          {/* 텍스트 영역 */}
          <div className="text-center mb-12">
            <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#002427] mb-6 leading-tight break-keep px-2">
              국내 최초 중화권 대상<br className="md:hidden" /> 인바운드 로컬투어 플랫폼
            </h3>
            <p className="text-base md:text-xl lg:text-2xl xl:text-3xl font-semibold text-black mb-8 break-keep px-2">
              - WeChat mini program for LIBAITIAN
            </p>
            <div className="space-y-2 text-xs md:text-base lg:text-lg xl:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto px-2">
              <p className="break-keep">- 중화권 고객을 위한 100% 중국어 UX,<br className="md:hidden" /> 원스텝 예약·WeChat Pay 결제.</p>
              <p className="break-keep">- 로컬 파트너와 큐레이션한<br className="md:hidden" /> 데이투어·테마 액티비티를 한 곳에서.</p>
              <p className="break-keep">- 체험·분위기·디테일 기반 콘텐츠가<br className="md:hidden" /> 즉시 예약으로 이어지는 전환 설계.</p>
              <p className="break-keep">- 미니앱에서 픽업·알림·환불까지,<br className="md:hidden" /> 여행 전 과정을 실시간</p>
            </div>
          </div>

          {/* 이미지 영역 */}
          <div className="mb-8">
            <img 
              src="/images/s3-wechatminip-feat.jpg" 
              alt="WeChat Platform"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>

          {/* 버튼 */}
          <div className="text-center">
            <Link href="/wechat">
              <button className="bg-[#002427] hover:bg-[#003a3f] text-white px-8 py-3 md:px-10 md:py-4 rounded-lg text-base md:text-lg font-semibold transition shadow-lg">
                더 알아보기 →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 섹션 4: 인스타그램 */}
      <section className="py-20 md:py-32 px-4 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#002427] mb-2 break-keep">
              @libaitian.official
            </h3>
            <p className="text-lg md:text-xl text-gray-600 break-keep">팔로우하고 최신 소식을 받아보세요</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {instagramPosts.map((post, index) => (
              <a
                key={index}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-lg"
              >
                <img
                  src={post.image}
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-auto transition group-hover:scale-105 duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />
              </a>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="https://instagram.com/libaitian.official"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#002427] hover:text-[#003a3f] font-semibold text-base md:text-lg transition"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              인스타그램에서 더 보기
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}