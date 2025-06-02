'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'

const guides = [
  { title: '아이디어 공유하기', description: '나만의 생각을 자유롭게 올리고 의견을 받아보세요.' },
  { title: '협업 시작하기', description: '관심 있는 사람들과 프로젝트를 함께 해보세요.' },
  { title: '자료 모아보기', description: '유용한 개발 자료를 한눈에 정리하세요.' },
  { title: '피드백 주고받기', description: '자유롭게 질문하고 서로 의견을 나눠보세요.' },
];

export default function Home() {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const guideRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowNav(!(currentY > lastScrollY && currentY > 100));
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToGuide = () => {
    if (guideRef.current) {
      const y = guideRef.current.getBoundingClientRect().top + window.scrollY + 500;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-[300vh] flex flex-col relative overflow-hidden select-none">
      {/* Blob 배경 */}
      <div className="absolute top-0 left-0 -z-10 w-full h-full overflow-hidden">
        {[0, 2000, 4000].map((delay, i) => (
          <div
            key={i}
            className={`absolute w-[400px] h-[400px] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-${delay}`}
            style={{
              backgroundColor: ['#D8B4FE', '#F9A8D4', '#FDE68A'][i],
              top: ['10%', '30%', '60%'][i],
              left: ['10%', '50%', '20%'][i],
            }}
          />
        ))}
      </div>  

      {/* 네비게이션 바 */}
      <motion.nav
  initial={{ y: 0 }}
  animate={{ y: showNav ? 0 : -100 }}
  transition={{ duration: 0.3 }}
  className="bg-white shadow-md fixed top-0 w-full z-50"
>
  <div className="w-full px-4 sm:px-6 py-3 flex justify-between items-center">
    <div className="flex items-center space-x-2">
    <h1 className="text-2xl font-bold font-KakaoBig bg-gradient-to-r from-purple-800 to-purple-500 bg-clip-text text-transparent">
       <a href="/">Docverse</a>
    </h1>
    </div>
    <ul className="flex space-x-60  text-gray-700 font-medium">
      {['공지사항', '도움말', '그룹'].map((text, idx) => (
        <li key={idx}>
          <a href="#" className="hover:text-purple-600 font-KakaoBig transition-colors">{text}</a>
        </li>
      ))}
    </ul>
    <div>
      <button
        onClick={() => router.push('/login')}
        className="px-4 py-1 bg-purple-600 text-white rounded font-KakaoBig hover:bg-purple-700 transition"
      >
        시작하기
      </button>
    </div>
  </div>
</motion.nav>


      {/* 메인 영역 */}
      <main className="container mx-auto px-6 pt-28 pb-12 text-center">
        <motion.h2
          className="text-7xl font-extrabold font-SBAggroB text-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          모든 협업을, 하나의 공간에서
        </motion.h2>

        <motion.p
          className="text-gray-500 mt-4 text-lg font-SBAggroB"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          누구나 쉽게, 어디서든 함께
        </motion.p>

        <motion.button
          onClick={scrollToGuide}
          className="mt-6 px-6 py-3 text-base font-semibold text-white font-KakaoBig bg-purple-600 rounded-lg shadow hover:bg-purple-700 transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          자세히 알아보기
        </motion.button>

        {/* 가이드 카드 */}
        <section ref={guideRef} className="mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {guides.map((guide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5, ease: 'linear' }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 border border-purple-200 p-6 rounded-lg shadow-sm min-h-[400px] flex flex-col justify-start text-center backdrop-blur-sm"
            >
              <h3 className="text-xl font-KakaoBig text-purple-700 mb-2">{guide.title}</h3>
              <p className="text-base font-KakaoBig text-gray-600 mt-2">{guide.description}</p>
            </motion.div>
          ))}
        </section>

        <motion.div
          className="mt-40 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h3 className="text-4xl font-bold text-gray-800">
            협업과 공유를 위한 최적의 플랫폼
          </h3>
        </motion.div>
      </main>

      <footer className="bg-purple-100 text-gray-700 text-xs text-center p-1 border-t">
        <p>© 2025 Reverse Website Project</p>
      </footer>

      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
        }
        .animate-blob { animation: blob 20s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}
