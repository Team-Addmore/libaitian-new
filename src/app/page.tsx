"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a2f21]">
      {/* 메인 콘텐츠 - 고정 높이 */}
      <main 
        className="relative cursor-pointer overflow-hidden"
        style={{ height: 'calc(100vh - 300px)' }}  // Footer 높이만큼 빼기
        onClick={() => router.push("/home")}
      >
        {/* 데스크톱 이미지 */}
        <Image
          src="/images/s1-main.png"
          alt="LIBAITIAN"
          fill
          priority
          className="hidden md:block object-cover"
          quality={100}
        />
        
        {/* 모바일 이미지 */}
        <Image
          src="/images/s1-main-mobile.png"
          alt="LIBAITIAN"
          fill
          priority
          className="md:hidden object-contain"
          quality={100}
        />
        
        {/* 하단 힌트 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <p className="text-white text-sm animate-pulse">
            화면을 터치하세요
          </p>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}