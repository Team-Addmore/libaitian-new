"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 현재 URL UTM 정보 가져오기
  const searchParams = useSearchParams();
  const utmQuery = {
    utm_source: searchParams.get("utm_source") || undefined,
    utm_medium: searchParams.get("utm_medium") || undefined,
    utm_campaign: searchParams.get("utm_campaign") || undefined,
  };

  // 링크 생성 함수 (쿼리 포함)
  const buildLink = (path: string) => ({
    pathname: path,
    query: utmQuery,
  });

  return (
    <header className="sticky top-0 z-50 bg-[#0f3f2e]/95 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href={buildLink("/")} className="flex items-center gap-3">
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
            <Link href={buildLink("/home")} className="text-white hover:text-[#ffae00]">Home</Link>
            <Link href={buildLink("/travel")} className="text-white hover:text-[#ffae00]">Libaitian-Travel</Link>
            <Link href={buildLink("/wechat")} className="text-white hover:text-[#ffae00]">Libaitian-Wechat</Link>
            <Link href={buildLink("/sololv")} className="text-white hover:text-[#ffae00]">Libaitian-SoloLv</Link>
            <Link href={buildLink("/insights")} className="text-white hover:text-[#ffae00]">Visitor Insights</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-white hover:text-[#ffae00]">검색</button>
            <Link href={buildLink("/login")} className="text-white hover:text-[#ffae00]">
              로그인
            </Link>
            <Link
              href={buildLink("/signup")}
              className="px-4 py-2 bg-white text-[#0f3f2e] rounded-md hover:bg-gray-200"
            >
              회원가입
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10">
            <nav className="flex flex-col space-y-4 py-4">
              <Link href={buildLink("/home")} onClick={() => setMobileMenuOpen(false)} className="text-white px-4 py-2">Home</Link>
              <Link href={buildLink("/travel")} onClick={() => setMobileMenuOpen(false)} className="text-white px-4 py-2">Libaitian-Travel</Link>
              <Link href={buildLink("/wechat")} onClick={() => setMobileMenuOpen(false)} className="text-white px-4 py-2">Libaitian-Wechat</Link>
              <Link href={buildLink("/sololv")} onClick={() => setMobileMenuOpen(false)} className="text-white px-4 py-2">Libaitian-SoloLv</Link>
              <Link href={buildLink("/insights")} onClick={() => setMobileMenuOpen(false)} className="text-white px-4 py-2">Visitor Insights</Link>

              {/* Mobile Actions */}
              <div className="border-t border-white/10 pt-4 px-4 space-y-3">
                <button className="text-white">검색</button>
                <Link href={buildLink("/login")} onClick={() => setMobileMenuOpen(false)} className="text-white">
                  로그인
                </Link>
                <Link
                  href={buildLink("/signup")}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2 bg-white text-[#0f3f2e] rounded-md"
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
