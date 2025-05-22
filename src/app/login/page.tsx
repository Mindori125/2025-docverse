'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const [showNav, setShowNav] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('로그인 시도:', { email, password, autoLogin });
    // 로그인 처리 로직
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 bg-gray-50 relative">
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

      {/* 로그인 폼 */}
      <div className="flex flex-col items-center justify-center mt-15 w-full">
        <h2 className="text-4xl font-bold mb-8 font-KakaoBig text-purple-700">로그인</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[400px] bg-white shadow-md rounded-xl p-8">
          <input
            type="id"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* 비밀번호 찾기 & 자동 로그인 */}
          <div className="flex justify-between items-center text-sm text-gray-600 px-1">
            <button type="button" className="hover:underline hover:text-purple-600">비밀번호 찾기</button>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={autoLogin}
                onChange={() => setAutoLogin(!autoLogin)}
                className="accent-purple-600"
              />
              <span>자동 로그인</span>
            </label>
          </div>

          <button type="submit" className="mt-2 p-3 bg-purple-600 text-white rounded-md font-KakaoBig hover:bg-purple-700 transition">
            로그인
          </button>

          {/* 회원가입 유도 문구 */}
          <div className="text-center mt-4 text-sm text-gray-700">
            계정이 없으신가요?{' '}
            <button
              type="button"
              onClick={() => router.push('/register')}
              className="text-purple-600 font-semibold hover:underline"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
