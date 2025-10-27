"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  // 3초 후 자동 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 3000);

    return () => clearInterval(timer);
  }, [router]);

  // 클릭 시 즉시 이동
  const handleClick = () => {
    router.push("/home");
  };

  return (
    <section 
      className="relative bg-black cursor-pointer" 
      style={{ height: '100vh' }}
      onClick={handleClick}
    >
      {/* 배경 이미지 */}
      <Image
        src="/images/s1-main.png"
        alt="LIBAITIAN"
        fill
        priority
        className="object-cover"
        quality={100}
      />
      
      {/* 하단 힌트 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <p className="text-white text-sm animate-pulse">
          화면을 터치하세요
        </p>
      </div>
    </section>
  );
}