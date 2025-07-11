'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      className="bg-white shadow-md py-4 px-6 sticky top-0 z-50"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center relative">
        {/* 로고 */}
        <Link href="/" className="text-2xl font-bold text-orange-500 flex items-center gap-2">
          <span>🌿 EcoFood</span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="space-x-6 hidden md:flex">
          <Link
            href="/about"
            className="text-orange-500 font-medium hover:text-orange-600 transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/chart"
            className="text-orange-500 font-medium hover:text-orange-600 transition-colors duration-200"
          >
            배출량 그래프
          </Link>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <div className="md:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-orange-500 text-2xl focus:outline-none"
          >
            ☰
          </button>

          {/* 드롭다운 메뉴 */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="absolute right-0 mt-2 w-40 bg-white border border-orange-200 rounded-md shadow-lg z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col text-right px-4 py-2 space-y-2">
                  <Link
                    href="/about"
                    onClick={() => setIsOpen(false)}
                    className="text-orange-500 hover:text-orange-600 font-medium"
                  >
                    About
                  </Link>
                  <Link
                    href="/chart"
                    onClick={() => setIsOpen(false)}
                    className="text-orange-500 hover:text-orange-600 font-medium"
                  >
                    배출량 그래프
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
