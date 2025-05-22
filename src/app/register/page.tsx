'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState<'agree' | 'disagree' | null>(null);
  const [showTerms, setShowTerms] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (agree !== 'agree') {
      alert('약관에 동의해야 회원가입이 가능합니다.');
      return;
    }
    console.log('회원가입 정보:', { username, email, password });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 pt-20 relative">
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

      <h2 className="text-4xl font-bold font-KakaoBig text-purple-700 mt-15 mb-4">회원가입</h2>

      <div className="flex flex-col items-center justify-center w-full px-4 pb-10">
        <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button type="button" className="whitespace-nowrap px-3 py-2 bg-purple-100 text-purple-600 rounded-md border border-purple-300 hover:bg-purple-200">
                중복 확인
              </button>
            </div>

            <input
              type="email"
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
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <div className="text-sm text-gray-600 mt-2">
              <p>
                본인은 <button type="button" className="text-purple-600 underline" onClick={() => setShowTerms(true)}>이용약관</button>을 모두 읽고 이해하였으며, 이에 동의합니다.
              </p>
              <div className="flex mt-2 space-x-4">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="terms"
                    checked={agree === 'agree'}
                    onChange={() => setAgree('agree')}
                  /> 동의
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="terms"
                    checked={agree === 'disagree'}
                    onChange={() => setAgree('disagree')}
                  /> 비동의
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 p-3 font-KakaoBig bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              가입
            </button>
          </form>

          <p className="text-center mt-4 text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-purple-600 font-semibold hover:underline"
            >
              로그인
            </button>
          </p>
        </div>
      </div>

      {showTerms && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-lg">
            <h3 className="text-lg font-bold mb-4">이용약관</h3>
            <p className="text-sm text-gray-700 h-60 overflow-y-auto">
              제1조 (목적) 이 약관은 Docverse가 제공하는 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.<br /><br />
              제2조 (이용계약의 성립) 이용자는 본 약관에 동의함으로써 서비스 이용 계약이 성립됩니다. 회사는 이용자에게 서비스를 제공하며, 이용자는 관련 법령과 본 약관을 준수해야 합니다.<br /><br />
              제3조 (개인정보 보호) 회사는 이용자의 개인정보를 중요시하며, 관련 법령에 따라 보호하고 처리합니다. 개인정보 처리방침은 별도로 제공됩니다.<br /><br />
              제4조 (서비스 이용 제한) 이용자는 다음 각 호의 행위를 하여서는 아니 되며, 위반 시 서비스 이용이 제한되거나 계정이 삭제될 수 있습니다: 타인의 개인정보 도용, 불법 정보 게시, 시스템 해킹 등.<br /><br />
              제5조 (계약 해지) 이용자가 회원 탈퇴를 원하는 경우 언제든지 회사에 요청할 수 있으며, 회사 또한 본 약관에 따라 계약을 해지할 수 있습니다.
            </p>
            <div className="mt-4 text-right">
              <button onClick={() => setShowTerms(false)} className="text-purple-600 font-medium hover:underline">
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}