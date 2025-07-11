'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-4xl font-bold text-orange-600 mb-6">
          음식물 쓰레기를 줄이기 위한 작은 시작
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
          여러분은 오늘 얼마나 많은 재료를 버리셨나요?<br />
          이 프로젝트는 음식 재료의 낭비를 줄이고,<br />
          남은 재료로 맛있는 요리를 만들 수 있도록 돕기 위해 만들어졌습니다.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-orange-50 border border-orange-200 rounded-xl p-6 shadow-md"
        >
          <h2 className="text-2xl font-semibold text-orange-500 mb-3">💡 어떻게 작동하나요?</h2>
          <p className="text-gray-800 text-base leading-relaxed">
            집에 남은 재료를 입력해보세요!<br />
            AI가 여러분께 어울리는 레시피를 제안해드립니다.<br />
            맛있게 먹고, 음식물 배출도 줄여보아요 😊
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
