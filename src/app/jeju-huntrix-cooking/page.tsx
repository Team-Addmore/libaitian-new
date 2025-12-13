'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { trackScrollDepthV2, trackButtonClickV2 } from '@/lib/analytics'

const PAGE_ID = "jeju_cooking_class_2025"

const pageData = {
  "pageId": "jeju_cooking_class_2025",
  "hero": {
    "title": "K-Food Cooking Class in Jeju",
    "subtitle": "Cook the iconic dishes loved by Huntrix from Netflix's record-breaking hit 'KPop Demon Hunters' — Gimbap and Tteokbokki with a Jeju twist!",
    "image": "/images/cooking/cooking1.webp",
    "layout": "left",
    "cta": {
      "text": "Register Now",
      "link": "https://docs.google.com/forms/d/e/1FAIpQLScpKu4rqOaWUOksLhf-hfyPk_EPsaPYhOwYFey1h66hUlHa-w/viewform",
      "type": "form"
    }
  },
  "sections": [
    {
      "title": "Why K-Food is Trending Worldwide",
      "content": "KPop Demon Hunters became Netflix's most-watched title ever with 325 million views.\n\nGimbap and Tteokbokki — Korea's beloved comfort foods featured in the film — have sparked a global K-Food craze.\n\nNow you can make these iconic dishes with premium Jeju ingredients!",
      "image": "/images/cooking/cooking2.webp",
      "layout": "right"
    },
    {
      "title": "Schedule & Information",
      "content": "Session 1: Dec 26 (Fri) 12:30 - 14:30\nSession 2: Dec 29 (Mon) 12:30 - 14:30\n\nRegistration Deadline: Dec 19 (Fri) - First come, first served\nLocation: Jeju Communication Center 5F Shared Kitchen\nFee: 77,000 KRW\nLanguage: Korean with Chinese interpretation",
      "image": "/images/cooking/cooking3.webp",
      "layout": "left"
    },
    {
      "title": "Class Menu",
      "content": "Tot Gimbap\nGimbap with Jeju's unique seaweed 'Tot' — ocean flavors and satisfying texture in every bite.\n\nGalchi-sokjeot Tteokbokki\nJeju-style spicy rice cakes with fermented hairtail sauce — a modern twist on tradition.\n\nSweet Pumpkin Sikhye\nTraditional Korean sweet rice drink with Jeju pumpkin — the perfect match for spicy dishes.\n\nMakgeolli Tasting (Adults only)\nKorea's traditional rice wine with smooth, subtle sweetness.",
      "image": "/images/cooking/cooking4.webp",
      "layout": "right"
    },
    {
      "title": "Why Join This Class?",
      "content": "More than cooking — experience Jeju culture and local ingredients\n\nLearn authentic K-Food recipes that captivated 325 million viewers worldwide\n\nChinese interpretation provided — enjoy without language barriers\n\nShare your creations and make unforgettable Jeju memories",
      "image": "/images/cooking/cooking5.webp",
      "layout": "left"
    },
    {
      "title": "FEEL IT. REMEMBER IT. ARCHIVE IT.",
      "content": "This isn't just a cooking class.\nIt's a moment you'll carry with you forever.\n\nLoved by KPop Demon Hunters\n\nJoin the K-Food wave that swept the world.",
      "image": "/images/cooking/cooking6.webp",
      "layout": "right",
      "cta": {
        "text": "Reserve Your Spot",
        "link": "https://docs.google.com/forms/d/e/1FAIpQLScpKu4rqOaWUOksLhf-hfyPk_EPsaPYhOwYFey1h66hUlHa-w/viewform",
        "type": "form"
      }
    }
  ]
}

export default function Page() {
  const scrollTracked = useRef<Set<number>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const scrollPercent = (scrolled / scrollHeight) * 100

      const depths = [25, 50, 75, 100]
      depths.forEach(depth => {
        if (scrollPercent >= depth && !scrollTracked.current.has(depth)) {
          scrollTracked.current.add(depth)
          trackScrollDepthV2(PAGE_ID, depth)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const heroLayout = pageData.hero.layout || "center"
  const isHeroCenter = heroLayout === "center"
  const heroContainerClass = isHeroCenter
    ? "flex flex-col items-center text-center"
    : heroLayout === "left"
    ? "flex flex-col md:flex-row md:items-center gap-8"
    : "flex flex-col md:flex-row-reverse md:items-center gap-8"

  return (
    <main>
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className={heroContainerClass}>
            {pageData.hero.image && (
              <div className={isHeroCenter ? "w-full" : "w-full md:w-1/2"}>
                <Image
                  src={pageData.hero.image}
                  alt={pageData.hero.title}
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}
            <div className={isHeroCenter ? "w-full" : "w-full md:w-1/2"}>
              {pageData.hero.title && (
                <h1 className="text-4xl md:text-6xl font-bold text-brand-primary">
                  {pageData.hero.title}
                </h1>
              )}
              {pageData.hero.subtitle && (
                <p className="text-lg md:text-xl text-gray-600 mt-4">
                  {pageData.hero.subtitle}
                </p>
              )}
              {pageData.hero.cta && pageData.hero.cta.link && pageData.hero.cta.text && (
                pageData.hero.cta.type === "internal" ? (
                  <Link
                    href={pageData.hero.cta.link}
                    onClick={() => trackButtonClickV2(PAGE_ID, "hero_cta")}
                    className="inline-block bg-brand-accent text-brand-primary font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition mt-6"
                  >
                    {pageData.hero.cta.text}
                  </Link>
                ) : (
                  <a
                    href={pageData.hero.cta.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackButtonClickV2(PAGE_ID, "hero_cta")}
                    className="inline-block bg-brand-accent text-brand-primary font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition mt-6"
                  >
                    {pageData.hero.cta.text}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {(pageData.sections || []).map((section, index) => {
        const sectionLayout = section.layout || "center"
        const isSectionCenter = sectionLayout === "center"
        const sectionContainerClass = isSectionCenter
          ? "flex flex-col items-center text-center"
          : sectionLayout === "left"
          ? "flex flex-col md:flex-row md:items-center gap-8"
          : "flex flex-col md:flex-row-reverse md:items-center gap-8"
        const bgClass = index % 2 === 0 ? "bg-gray-50" : "bg-white"

        return (
          <section key={index} className={`${bgClass} py-16 md:py-24`}>
            <div className="max-w-6xl mx-auto px-4">
              <div className={sectionContainerClass}>
                {section.image && (
                  <div className={isSectionCenter ? "w-full" : "w-full md:w-1/2"}>
                    <Image
                      src={section.image}
                      alt={section.title || ""}
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                )}
                <div className={isSectionCenter ? "w-full" : "w-full md:w-1/2"}>
                  {section.title && (
                    <h2 className="text-2xl md:text-4xl font-bold text-brand-primary">
                      {section.title}
                    </h2>
                  )}
                  {section.content && (
                    <p className="text-base md:text-lg text-gray-700 max-w-2xl mt-4 whitespace-pre-line">
                      {section.content}
                    </p>
                  )}
                  {section.cta && section.cta.link && section.cta.text && (
                    section.cta.type === "internal" ? (
                      <Link
                        href={section.cta.link}
                        onClick={() => trackButtonClickV2(PAGE_ID, `section_${index}_cta`)}
                        className="inline-block bg-brand-accent text-brand-primary font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition mt-6"
                      >
                        {section.cta.text}
                      </Link>
                    ) : (
                      <a
                        href={section.cta.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackButtonClickV2(PAGE_ID, `section_${index}_cta`)}
                        className="inline-block bg-brand-accent text-brand-primary font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition mt-6"
                      >
                        {section.cta.text}
                      </a>
                    )
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