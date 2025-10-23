import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0a2f21] text-gray-300">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section - Logo and Links */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6 md:mb-0">
            <Image
              src="https://cdn.imweb.me/thumbnail/20250903/28cfbff63b4be.png"
              alt="LIBAITIAN Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <h3 className="text-white text-lg font-bold">LIBAITIAN CO., LTD.</h3>
          </div>

          {/* Quick Links */}
          <div className="flex gap-4 text-sm">
            <Link href="/terms" className="hover:text-[#ffae00] transition-colors">
              이용약관
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="/privacy" className="hover:text-[#ffae00] transition-colors">
              개인정보처리방침
            </Link>
          </div>
        </div>

        {/* Contact and Business Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-white font-medium">Tel:</span> 0507-1334-4821
              </li>
              <li>
                <span className="text-white font-medium">Email:</span>{' '}
                <a href="mailto:libaitian.official@gmail.com" className="hover:text-[#ffae00] transition-colors">
                  libaitian.official@gmail.com
                </a>
              </li>
              <li className="text-xs text-gray-400 mt-2">
                월요일 - 금요일, 09:30 - 18:30<br />
                Day Off (토, 일, 공휴일)
              </li>
            </ul>
          </div>

          {/* Business Info */}
          <div>
            <h4 className="text-white font-semibold mb-3">Business Info</h4>
            <ul className="space-y-1 text-xs">
              <li>주식회사 리바이티엔 / 대표 : 오민정</li>
              <li>제주특별자치도 제주시 아란10길 4-1, 2층 202호</li>
              <li>사업자등록번호 : 819-87-02534</li>
              <li>통신판매업 신고번호 : 제2022-제주구좌-0104호</li>
              <li>개인정보보호책임자 : 오민정</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#0f3f2e] pt-6 text-center text-xs text-gray-400">
          <p>Copyright {new Date().getFullYear()}. LIBAITIAN All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
