export default function Home() {
  return (
    <>
      {/* Hero Section - 메인 비주얼 */}
      <section className="relative bg-black text-white" style={{ height: '792px' }}>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              LIBAITIAN
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              대한민국의 혁신을 이끌어가는 리바이티엔입니다
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
