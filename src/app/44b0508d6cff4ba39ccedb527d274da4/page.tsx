'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

const PAGE_ID = "redpizzabackend-test"

const pageData = {
  "pageId": "redpizzabackend-test",
  "hero": {
    "title": "E30 M3",
    "subtitle": "test",
    "image": "https://mcfqfhjxvmxlmzuunyxq.supabase.co/storage/v1/object/public/red-pizza-images/c350702f8be94bdf8ef3a665473d2a76.webp",
    "layout": "left",
    "cta": {
      "text": "test",
      "link": "https://www.google.com",
      "type": "external"
    }
  },
  "sections": [
    {
      "title": "F80 M3",
      "content": "test",
      "image": "https://mcfqfhjxvmxlmzuunyxq.supabase.co/storage/v1/object/public/red-pizza-images/45bfdb66677447a19c66b3d32ad226aa.webp",
      "layout": "right",
      "cta": {
        "text": "test",
        "link": "https://www.naver.com",
        "type": "external"
      }
    }
  ] as Array<{
    layout?: string
    image?: string
    title?: string
    content?: string
    cta?: {
      type?: string
      link?: string
      text?: string
    }
  }>
}

const trackScrollDepthV2 = (pageId: string, depth: number) => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = window.gtag as (...args: unknown[]) => void;
    gtag('event', 'scroll_depth', {
      page_id: pageId,
      scroll_percentage: depth,
    });
  }
};

const trackButtonClickV2 = (pageId: string, buttonId: string) => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = window.gtag as (...args: unknown[]) => void;
    gtag('event', 'button_click', {
      page_id: pageId,
      button_id: buttonId,
    });
  }
};

export default function Page() {
  const firedDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      [25, 50, 75, 100].forEach((threshold) => {
        if (scrollPercent >= threshold && !firedDepths.current.has(threshold)) {
          firedDepths.current.add(threshold);
          trackScrollDepthV2(PAGE_ID, threshold);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroLayoutClasses = {
    center: "flex flex-col items-center text-center",
    left: "flex flex-col md:flex-row md:items-center gap-8",
    right: "flex flex-col md:flex-row-reverse md:items-center gap-8"
  }
  const heroLayout = (pageData.hero.layout || "center") as keyof typeof heroLayoutClasses

  return (
    <main>
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className={heroLayoutClasses[heroLayout]}>
            {pageData.hero.image && (
              <div className={heroLayout === "center" ? "w-full" : "w-full md:w-1/2"}>
                <img src={pageData.hero.image} alt={pageData.hero.title || ""} className="w-full h-auto rounded-lg" />
              </div>
            )}
            <div className={heroLayout === "center" ? "w-full" : "w-full md:w-1/2"}>
              {pageData.hero.title && (
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900">{pageData.hero.title}</h1>
              )}
              {pageData.hero.subtitle && (
                <p className="text-lg md:text-xl text-gray-600 mt-4">{pageData.hero.subtitle}</p>
              )}
              {pageData.hero.cta && pageData.hero.cta.link && pageData.hero.cta.text && (
                <>
                  {pageData.hero.cta.type === "internal" ? (
                    <Link href={pageData.hero.cta.link} onClick={() => trackButtonClickV2(PAGE_ID, 'hero_cta')} className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition mt-6">
                      {pageData.hero.cta.text}
                    </Link>
                  ) : (
                    <a href={pageData.hero.cta.link} target="_blank" rel="noopener noreferrer" onClick={() => trackButtonClickV2(PAGE_ID, 'hero_cta')} className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition mt-6">
                      {pageData.hero.cta.text}
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {pageData.sections && pageData.sections.length > 0 && pageData.sections.map((section, index) => {
        const sectionLayoutClasses = {
          center: "flex flex-col items-center text-center",
          left: "flex flex-col md:flex-row md:items-center gap-8",
          right: "flex flex-col md:flex-row-reverse md:items-center gap-8"
        }
        const sectionLayout = (section.layout || "center") as keyof typeof sectionLayoutClasses

        return (
          <section key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} py-16 md:py-24`}>
            <div className="max-w-6xl mx-auto px-4">
              <div className={sectionLayoutClasses[sectionLayout]}>
                {section.image && (
                  <div className={sectionLayout === "center" ? "w-full" : "w-full md:w-1/2"}>
                    <img src={section.image} alt={section.title || ""} className="w-full h-auto rounded-lg" />
                  </div>
                )}
                <div className={sectionLayout === "center" ? "w-full" : "w-full md:w-1/2"}>
                  {section.title && (
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900">{section.title}</h2>
                  )}
                  {section.content && (
                    <p className="text-base md:text-lg text-gray-700 max-w-2xl mt-4 whitespace-pre-line">{section.content}</p>
                  )}
                  {section.cta && section.cta.link && section.cta.text && (
                    <>
                      {section.cta.type === "internal" ? (
                        <Link href={section.cta.link} onClick={() => trackButtonClickV2(PAGE_ID, `section_${index}_cta`)} className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition mt-6">
                          {section.cta.text}
                        </Link>
                      ) : (
                        <a href={section.cta.link} target="_blank" rel="noopener noreferrer" onClick={() => trackButtonClickV2(PAGE_ID, `section_${index}_cta`)} className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition mt-6">
                          {section.cta.text}
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </main>
  )
}