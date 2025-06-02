'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import axios from 'axios';

/**
 * MyPage – 최종 완성본
 * ----------------------------------
 * API 명세서 #4 ~ #7
 * 4. GET    /api/users/me/          → 프로필 조회
 * 5. PATCH  /api/users/me/          → 닉네임 변경 { nickname }
 * 6. PATCH  /api/users/password/    → 비밀번호 변경 { old_password, new_password }
 * 7. DELETE /api/users/me/          → 회원 탈퇴    { password }
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
const authHeader = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

interface UserProfile {
  nickname: string;
  email: string;
  joined_at: string;
  avatar: string | null;
}

export default function MyPage() {
  const router = useRouter();

  /* -------- state -------- */
  const [user, setUser] = useState<UserProfile | null>(null);

  // nickname
  const [showNickModal, setShowNickModal] = useState(false);
  const [newNick, setNewNick] = useState('');
  const [nickLoading, setNickLoading] = useState(false);

  // password
  const [showPwModal, setShowPwModal] = useState(false);
  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPwConf, setNewPwConf] = useState('');
  const [pwLoading, setPwLoading] = useState(false);

  // delete
  const [showDelModal, setShowDelModal] = useState(false);
  const [delPw, setDelPw] = useState('');
  const [delLoading, setDelLoading] = useState(false);

  // nav hide
  const [showNav, setShowNav] = useState(true);
  const [lastY, setLastY] = useState(0);

  /* -------- effects -------- */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowNav(!(y > lastY && y > 100));
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  useEffect(() => {
    const getMe = async () => {
      try {
        const { data } = await axios.get<UserProfile>(`${API_BASE}/api/users/me/`, { headers: authHeader() });
        setUser(data);
      } catch (e: any) {
        if (e?.response?.status === 401) {
          alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
          router.push('/login');
        }
      }
    };
    getMe();
  }, [router]);

  /* -------- handlers -------- */
  const handleNickUpdate = async () => {
    if (!newNick.trim()) return;
    setNickLoading(true);
    try {
      await axios.patch(`${API_BASE}/api/users/me/`, { nickname: newNick }, { headers: authHeader() });
      setUser((u) => (u ? { ...u, nickname: newNick } : u));
      setShowNickModal(false);
      setNewNick('');
    } catch (e: any) {
      alert(e?.response?.data?.detail ?? '닉네임 변경 실패');
    } finally {
      setNickLoading(false);
    }
  };

  const handlePwChange = async () => {
    if (!oldPw || !newPw) return;
    if (newPw !== newPwConf) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    setPwLoading(true);
    try {
      await axios.patch(
        `${API_BASE}/api/users/password/`,
        { old_password: oldPw, new_password: newPw },
        { headers: authHeader() }
      );
      alert('비밀번호가 변경되었습니다. 다시 로그인해 주세요.');
      localStorage.clear();
      router.push('/login');
    } catch (e: any) {
      alert(e?.response?.data?.detail ?? '비밀번호 변경 실패');
    } finally {
      setPwLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!delPw.trim()) {
      alert('비밀번호를 입력해 주세요.');
      return;
    }
    if (!window.confirm('정말로 탈퇴하시겠습니까?')) return;
    setDelLoading(true);
    try {
      await axios.delete(`${API_BASE}/api/users/me/`, {
        headers: authHeader(),
        data: { password: delPw },
      });
      alert('탈퇴가 완료되었습니다.');
      localStorage.clear();
      router.push('/');
    } catch (e: any) {
      alert(e?.response?.data?.detail ?? '회원 탈퇴 실패');
    } finally {
      setDelLoading(false);
      setShowDelModal(false);
    }
  };

  /* -------- render -------- */
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* nav */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: showNav ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-md fixed top-0 w-full z-50"
      >
        <div className="w-full px-4 sm:px-6 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold font-KakaoBig bg-gradient-to-r from-purple-800 to-purple-500 bg-clip-text text-transparent">
            <a href="/">Docverse</a>
          </h1>
          <ul className="flex space-x-60 text-gray-700 font-medium">
            {['공지사항', '도움말', '그룹'].map((t) => (
              <li key={t} className="hover:text-purple-600 font-KakaoBig transition-colors">
                <a href="#">{t}</a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-1 bg-purple-600 text-white rounded font-KakaoBig hover:bg-purple-700"
          >
            시작하기
          </button>
        </div>
      </motion.nav>

      {/* main */}
      <main className="max-w-screen-md mx-auto px-6 pt-12 pb-20">
        <h2 className="text-5xl font-bold font-KakaoBig text-gray-800 mb-12 -mt-10">마이페이지</h2>

        {/* profile */}
        <section className="flex items-center gap-4 mb-6">
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className="w-16 h-16 rounded-full object-cover border" />
          ) : (
            <div className="w-16 h-16 rounded-full border bg-white" />
          )}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-800">{user.nickname}</span>
            <button
              onClick={() => setShowNickModal(true)}
              className="px-3 py-1 text-sm font-KakaoBig bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              닉네임 변경
            </button>
          </div>
        </section>

        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-1">이메일</label>
          <p className="text-gray-800">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-1">가입일</label>
          <p className="text-gray-800">{user.joined_at}</p>
        </div>

        <hr className="border-gray-300 my-6" />

        <button onClick={() => setShowPwModal(true)} className="font-KakaoBig hover:text-purple-600">
          비밀번호 변경
        </button>

        <hr className="border-gray-300 my-6" />

        <button onClick={() => setShowDelModal(true)} className="text-red-500 font-KakaoBig hover:underline">
          회원 탈퇴
        </button>
      </main>

      {/* 닉네임 모달 */}
      {showNickModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow space-y-4">
            <h3 className="text-lg font-bold">닉네임 변경</h3>
            <input
              value={newNick}
              onChange={(e) => setNewNick(e.target.value)}
              placeholder="새 닉네임"
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-purple-400"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowNickModal(false)} className="px-4 py-2 bg-gray-200 rounded">
                취소
              </button>
              <button
                onClick={handleNickUpdate}
                disabled={nickLoading}
                className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
              >
                {nickLoading ? '변경 중...' : '변경'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 비밀번호 모달 */}
      {showPwModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow space-y-4">
            <h3 className="text-lg font-bold">비밀번호 변경</h3>
            <input
              type="password"
              placeholder="현재 비밀번호"
              value={oldPw}
              onChange={(e) => setOldPw(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="password"
              placeholder="새 비밀번호"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="password"
              placeholder="새 비밀번호 확인"
              value={newPwConf}
              onChange={(e) => setNewPwConf(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowPwModal(false)} className="px-4 py-2 bg-gray-200 rounded">
                취소
              </button>
              <button
                onClick={handlePwChange}
                disabled={pwLoading}
                className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
              >
                {pwLoading ? '변경 중...' : '변경'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 탈퇴 모달 */}
      {showDelModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow space-y-4">
            <h3 className="text-lg font-bold text-red-600">정말로 탈퇴하시겠습니까?</h3>
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={delPw}
              onChange={(e) => setDelPw(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowDelModal(false)} className="px-4 py-2 bg-gray-200 rounded">
                취소
              </button>
              <button
                onClick={handleDelete}
                disabled={delLoading}
                className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
              >
                {delLoading ? '탈퇴 중...' : '탈퇴'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
