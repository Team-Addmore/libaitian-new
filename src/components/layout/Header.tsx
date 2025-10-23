import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#0f3f2e]/95 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="https://cdn.imweb.me/thumbnail/20250903/28cfbff63b4be.png"
              alt="LIBAITIAN Logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <span className="text-2xl font-bold text-white">LIBAITIAN</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/home" className="text-white hover:text-[#ffae00] transition-colors">
              Home
            </Link>
            <Link href="/travel" className="text-white hover:text-[#ffae00] transition-colors">
              Libaitian-Trevel
            </Link>
            <Link href="/wechat" className="text-white hover:text-[#ffae00] transition-colors">
              Libaitian-Wechat
            </Link>
            <Link href="/board" className="text-white hover:text-[#ffae00] transition-colors">
              •••
            </Link>
            {/* <Link href="/contact" className="text-white hover:text-[#ffae00] transition-colors">
              •••
            </Link> */}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-[#ffae00] transition-colors">
              검색
            </button>
            <Link href="/login" className="text-white hover:text-[#ffae00] transition-colors">
              로그인
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-white text-[#0f3f2e] font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
