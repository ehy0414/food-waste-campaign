'use client';

import { motion } from 'framer-motion';
import TodayChart from "../components/TodayChart";

export default function ChartPage() {
  return (
    <motion.div
      className="min-h-screen bg-white py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-3xl mx-auto p-6 text-center">
        <motion.h1
          className="text-4xl font-bold text-orange-600 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          최신 배출량 기반 일별 그래프
        </motion.h1>

        <motion.p
          className="text-orange-400 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
        음식물 쓰레기 배출량을 확인해보세요!
        </motion.p>

        <motion.p
          className="text-orange-400 mb-8 text-base leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          우리 함께 음식물 쓰레기를 줄여 깨끗한 지구를 만들어봐요! 💪🌱
        </motion.p>

        <motion.div
          className="bg-white border border-orange-200 rounded-xl shadow-md p-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <TodayChart />
        </motion.div>
      </div>
    </motion.div>
  );
}
