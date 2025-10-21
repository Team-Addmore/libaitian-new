import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">LIBAITIAN</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-white hover:text-brand-accent transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-white hover:text-brand-accent transition-colors">
              Libaitian-Trevel
            </Link>
            <Link href="/shop" className="text-white hover:text-brand-accent transition-colors">
              Libaitian-Wechat
            </Link>
            <Link href="/board" className="text-white hover:text-brand-accent transition-colors">
              •••
            </Link>
            {/* <Link href="/contact" className="text-white hover:text-brand-accent transition-colors">
              •••
            </Link> */}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-brand-accent transition-colors">
              검색
            </button>
            <Link href="/login" className="text-white hover:text-brand-accent transition-colors">
              로그인
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
