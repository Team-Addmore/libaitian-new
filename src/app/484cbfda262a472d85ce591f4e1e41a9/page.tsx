'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

const PAGE_ID = "Prompt-Test"

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
  const pageData = {
    "pageId": "Prompt-Test",
    "hero": {
      "title": "test",
      "subtitle": "test",
      "image": "https://mcfqfhjxvmxlmzuunyxq.supabase.co/storage/v1/object/public/red-pizza-images/8300860cc110411aa1165e75ca990df1.png",
      "layout": "left",
      "cta": {
        "text": "test",
        "link": "https://www.google.com",
        "type": "external"
      }
    },
    "sections": [
      {
        "title": "test1",
        "content": "test1",
        "image": "https://mcfqfhjxvmxlmzuunyxq.supabase.co/storage/v1/object/public/red-pizza-images/73c997d07a984e19b6c44c6fda99cd6d.png",
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

  const sectionLayoutClasses = {
    center: "flex flex-col items-center text-center",
    left: "flex flex-col md:flex-row md:items-center gap-8",
    right: "flex flex-col md:flex-row-reverse md:items-center gap-8"
  }

  return (
    <main>
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className={heroLayoutClasses[heroLayout]}>
            {pageData.hero.image && (
              <div className="flex-1">
                <img src={pageData.hero.image} alt={pageData.hero.title || ''} className="w-full h-auto rounded-lg" />
              </div>
            )}
            <div className="flex-1">
              {pageData.hero.title && (
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900">{pageData.hero.title}</h1>
              )}
              {pageData.hero.subtitle && (
                <p className="text-lg md:text-xl text-gray-600 mt-4">{pageData.hero.subtitle}</p>
              )}
              {pageData.hero.cta && pageData.hero.cta.link && pageData.hero.cta.text && (
                <>
                  {pageData.hero.cta.type === 'internal' ? (
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

      {pageData.sections && pageData.sections.map((section, index) => {
        const sectionLayout = (section.layout || "center") as keyof typeof sectionLayoutClasses
        return (
          <section key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} py-16 md:py-24`}>
            <div className="max-w-6xl mx-auto px-4">
              <div className={sectionLayoutClasses[sectionLayout]}>
                {section.image && (
                  <div className="flex-1">
                    <img src={section.image} alt={section.title || ''} className="w-full h-auto rounded-lg" />
                  </div>
                )}
                <div className="flex-1">
                  {section.title && (
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900">{section.title}</h2>
                  )}
                  {section.content && (
                    <p className="text-base md:text-lg text-gray-700 max-w-2xl mt-4 whitespace-pre-line">{section.content}</p>
                  )}
                  {section.cta && section.cta.link && section.cta.text && (
                    <>
                      {section.cta.type === 'internal' ? (
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