"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavItem {
  path: string;
  label: string;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clientUtm, setClientUtm] = useState<{ [key: string]: string }>({});
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const utm: { [key: string]: string | null } = {
      utm_source: searchParams.get("utm_source"),
      utm_medium: searchParams.get("utm_medium"),
      utm_campaign: searchParams.get("utm_campaign"),
    };

    const validUtm = Object.entries(utm).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      },
      {}
    );

    setClientUtm(validUtm);
  }, []);

  useEffect(() => {
    fetch("/navItems.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch navItems");
        return res.json();
      })
      .then((data: NavItem[]) => setNavItems(data))
      .catch((err) => console.error("navItems fetch error:", err));
  }, []);

  const buildLink = (path: string) => {
    if (Object.keys(clientUtm).length === 0) return path;
    const params = new URLSearchParams(clientUtm).toString();
    return `${path}?${params}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0f3f2e]/95 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* 로고 */}
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
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={buildLink(item.path)}
                className="text-white hover:text-[#ffae00]"
              >
                {item.label}
              </Link>
            ))}
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
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={buildLink(item.path)}
                  className="text-white hover:text-[#ffae00] transition-colors px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Actions */}
              <div className="border-t border-white/10 pt-4 px-4 space-y-3">
                <button className="text-white">검색</button>
                <Link
                  href={buildLink("/login")}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white block"
                >
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