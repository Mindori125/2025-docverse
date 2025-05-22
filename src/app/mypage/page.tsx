'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function MyPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    nickname: 'mindori125',
    email: 'mindori125@example.com',
    joinedAt: '2024-11-01',
    avatar: '' // 사용자 이미지 없을 경우 빈 문자열
  });

  const [showEditNickname, setShowEditNickname] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowNav(!(currentY > lastScrollY && currentY > 100));
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNicknameChange = () => {
    if (newNickname.trim() !== '') {
      setUser({ ...user, nickname: newNickname });
      setShowEditNickname(false);
      setNewNickname('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-6">
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
          <ul className="flex space-x-60 text-gray-700 font-medium">
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

    </div>
  );
}
