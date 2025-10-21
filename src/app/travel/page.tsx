import { FaMapMarkerAlt, FaPhoneAlt, FaInstagram, FaBook } from "react-icons/fa";

export default function TravelPage() {
  return (
    <main>
      {/* 메인 제목 */}
      <section className="flex items-center justify-center min-h-[30vh] bg-gray-300">
        <h1 className="text-black font-black text-8xl">NURAT-STAY</h1>
      </section>

      {/* 첫 번째 숙소 섹션 */}
      <section className="flex flex-col md:flex-row items-center max-w-6xl mx-auto my-16 gap-8 px-4">
        {/* 왼쪽 이미지 */}
        <div className="w-full md:w-1/2">
          <img
            src="https://cdn.imweb.me/thumbnail/20240719/7ff017ad5d192.jpg"
            alt="숙소 사진"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* 오른쪽 설명 */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">느랏,청굴물 (NURAT,Cheonggulmul)</h2>
          <div className="border-t border-gray-300 mb-10"></div>

          <div className="space-y-4 text-gray-700 text-lg">
            {/* 주소 */}
            <div className="flex items-center gap-10">
              <FaMapMarkerAlt className="text-gray-500 w-5 h-5" />
              <span>제주 제주시 구좌읍 김녕로 1길 75-1, 2층</span>
            </div>

            {/* 전화번호 */}
            <div className="flex items-center gap-10">
              <FaPhoneAlt className="text-gray-500 w-5 h-5" />
              <span>0507-1382-9654</span>
            </div>

            {/* 인스타그램 */}
            <div className="flex items-center gap-10">
              <FaInstagram className="text-gray-500 w-5 h-5" />
              <span>@nurat_cheonggulmul</span>
            </div>

            {/* 설명 */}
            <div className="flex items-center gap-10">
              <FaBook className="text-gray-500 w-5 h-5" />
              <span>
                '나른하다'의 제주어인 '느랏'의 의미처럼 제주다운 편안함을 제공하는 느랏,청굴물입니다.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 두 번째 숙소 섹션 */}
      <section className="flex flex-col md:flex-row items-center max-w-6xl mx-auto my-16 gap-8 px-4">
        {/* 왼쪽 이미지 */}
        <div className="w-full md:w-1/2">
          <img
            src="https://cdn.imweb.me/thumbnail/20250319/9642f622d7ec0.jpg"
            alt="숙소 사진"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* 오른쪽 설명 */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">느랏,김녕아치 (NURAT,Arch)</h2>
          <div className="border-t border-gray-300 mb-10"></div>

          <div className="space-y-4 text-gray-700 text-lg">
            {/* 주소 */}
            <div className="flex items-center gap-10">
              <FaMapMarkerAlt className="text-gray-500 w-5 h-5" />
              <span>제주 제주시 구좌읍 김녕로3길 6-11</span>
            </div>

            {/* 전화번호 */}
            <div className="flex items-center gap-10">
              <FaPhoneAlt className="text-gray-500 w-5 h-5" />
              <span>0507-1382-9654</span>
            </div>

            {/* 인스타그램 */}
            <div className="flex items-center gap-10">
              <FaInstagram className="text-gray-500 w-5 h-5" />
              <span>@nurat_arch</span>
            </div>

            {/* 설명 */}
            <div className="flex items-center gap-10">
              <FaBook className="text-gray-500 w-5 h-5" />
              <span>
                '나른하다'의 제주어인 '느랏'의 의미처럼 제주다운 편안함을 제공하는 느랏,김녕아치입니다.
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
