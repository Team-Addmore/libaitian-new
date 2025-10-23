'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 연동 예정
    console.log('Form submitted:', formData);
    alert('문의가 접수되었습니다. 곧 연락드리겠습니다.');
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#002427]">
            WeChat 문의하기
          </h2>
          <p className="text-lg text-gray-600">
            WeChat 관련 문의사항을 남겨주시면 빠르게 답변드리겠습니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="space-y-6">
            {/* 이름 */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffae00] focus:border-transparent outline-none transition"
                placeholder="홍길동"
              />
            </div>

            {/* 이메일 */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                이메일 <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffae00] focus:border-transparent outline-none transition"
                placeholder="example@email.com"
              />
            </div>

            {/* 연락처 */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                연락처
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffae00] focus:border-transparent outline-none transition"
                placeholder="010-0000-0000"
              />
            </div>

            {/* 문의내용 */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                문의내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffae00] focus:border-transparent outline-none transition resize-none"
                placeholder="문의하실 내용을 입력해주세요"
              />
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              className="w-full bg-[#002427] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#003437] transition-colors duration-200"
            >
              문의하기
            </button>

            <p className="text-sm text-gray-500 text-center mt-4">
              * 표시는 필수 입력 항목입니다.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
