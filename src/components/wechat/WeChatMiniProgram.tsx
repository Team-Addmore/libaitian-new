export default function WeChatMiniProgram() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#002427]">
          위챗 미니프로그램이 무엇인가요?
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 이미지 영역 - TODO: 이미지 추가 예정 */}
          <div className="order-2 md:order-1">
            <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">이미지 영역</p>
            </div>
          </div>

          {/* 텍스트 영역 */}
          <div className="order-1 md:order-2">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                <span className="font-bold text-[#002427]">10억명 이상이 매일 사용하는</span> 중국 메신저 서비스
              </p>

              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#ffae00] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>별도 결제수단 연결 불필요</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#ffae00] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>사용자가 즉시 구매와 지불 가능</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#ffae00] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>앱 설치나 로그인 불필요</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#ffae00] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>검색, 친구 공유 등으로 접근 가능</span>
                </li>
              </ul>

              <div className="pt-4">
                <a
                  href="http://blog.bettercode.kr/2022/03/16/위챗-미니프로그램-자세히-알기"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#002427] hover:text-[#ffae00] font-semibold transition-colors"
                >
                  자세히 알아보기
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
