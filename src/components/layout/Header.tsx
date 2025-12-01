"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0f3f2e]/95 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-[50px] h-[50px]">
              <Image
                src="/images/28cfbff63b4be.png"
                alt="LIBAITIAN Logo"
                fill
                sizes="50px"
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-bold text-white">LIBAITIAN</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/home" className="text-white hover:text-[#ffae00] transition-colors">
              Home
            </Link>
            <Link href="/travel" className="text-white hover:text-[#ffae00] transition-colors">
              Libaitian-Travel
            </Link>
            <Link href="/wechat" className="text-white hover:text-[#ffae00] transition-colors">
              Libaitian-Wechat
            </Link>
            <Link href="/sololv" className="text-white hover:text-[#ffae00] transition-colors">
              Libaitian-SoloLv
            </Link>
            <Link href="/insights" className="text-white hover:text-[#ffae00] transition-colors">
              Visitor Insights
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
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

          {/* Mobile Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴"
          >
            {mobileMenuOpen ? (
              // X 아이콘
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // 아이콘
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10">
            <nav className="flex flex-col space-y-4 py-4">
              <Link
                href="/home"
                className="text-white hover:text-[#ffae00] transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/travel"
                className="text-white hover:text-[#ffae00] transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Libaitian-Trevel
              </Link>
              <Link
                href="/wechat"
                className="text-white hover:text-[#ffae00] transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Libaitian-Wechat
              </Link>
              <Link
                href="/sololv"
                className="text-white hover:text-[#ffae00] transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Libaitian-SoloLv
              </Link>
              <Link
                href="/jacob"
                className="text-white hover:text-[#ffae00] transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                GA-Jacob
              </Link>
              <Link
                href="/jiwon"
                className="text-white hover:text-[#ffae00] transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                GA-Jiwon
              </Link>
              
              {/* Mobile Actions */}
              <div className="border-t border-white/10 pt-4 px-4 space-y-3">
                <button className="w-full text-left text-white hover:text-[#ffae00] transition-colors py-2">
                  검색
                </button>
                <Link
                  href="/login"
                  className="block text-white hover:text-[#ffae00] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="block w-full text-center px-4 py-2 bg-white text-[#0f3f2e] font-medium rounded-md hover:bg-gray-200 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  회원가입
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}