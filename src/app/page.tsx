export default function Home() {
  return (
    <>
      {/* Hero Section - 메인 비주얼 */}
      <section className="relative bg-black text-white" style={{ height: '792px' }}>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              LIBAITIAN
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              대한민국의 혁신을 이끌어가는 리바이티엔입니다
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/about"
                className="px-8 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
              >
                회사 소개
              </a>
              <a
                href="/products"
                className="px-8 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-black transition-colors"
              >
                제품 보기
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - 회사 소개 */}
      <section className="py-24 bg-white">
        <div className="max-w-[980px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-primary mb-4">회사 소개</h2>
            <p className="text-xl text-gray-600">리바이티엔은 혁신적인 기술로 미래를 선도합니다</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">비전</h3>
              <p className="text-gray-600">글로벌 시장을 선도하는 기업</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-2">혁신</h3>
              <p className="text-gray-600">끊임없는 연구개발</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">신뢰</h3>
              <p className="text-gray-600">고객과의 약속을 지킵니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - 제품 소개 */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[980px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-primary mb-4">주요 제품</h2>
            <p className="text-xl text-gray-600">최고의 품질을 자랑하는 제품들</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-4">제품 1</h3>
              <p className="text-gray-600 mb-4">제품에 대한 설명이 들어갑니다.</p>
              <a href="/products" className="text-brand-accent hover:underline">자세히 보기 →</a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-4">제품 2</h3>
              <p className="text-gray-600 mb-4">제품에 대한 설명이 들어갑니다.</p>
              <a href="/products" className="text-brand-accent hover:underline">자세히 보기 →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - 문의 */}
      <section className="py-24 bg-brand-primary text-white">
        <div className="max-w-[980px] mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">문의하기</h2>
          <p className="text-xl mb-8">궁금한 사항이 있으시면 언제든지 연락주세요</p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-brand-accent text-white font-medium rounded-md hover:bg-brand-accent/90 transition-colors"
          >
            문의하기
          </a>
        </div>
      </section>
    </>
  );
}
