import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">LIBAITIAN</h3>
            <p className="text-sm mb-2">주식회사 리바이티엔</p>
            <p className="text-sm">대한민국의 혁신을 이끌어갑니다.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">바로가기</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:text-[#ffae00] transition-colors">
                  회사소개
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm hover:text-[#ffae00] transition-colors">
                  제품
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-sm hover:text-[#ffae00] transition-colors">
                  쇼핑몰
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">고객지원</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm hover:text-[#ffae00] transition-colors">
                  자주묻는질문
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-[#ffae00] transition-colors">
                  문의하기
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="text-sm hover:text-[#ffae00] transition-colors">
                  예약
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">연락처</h3>
            <ul className="space-y-2 text-sm">
              <li>Tel: 000-0000-0000</li>
              <li>Email: info@libaitian.kr</li>
              <li>운영시간: 평일 09:00 - 18:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} LIBAITIAN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
