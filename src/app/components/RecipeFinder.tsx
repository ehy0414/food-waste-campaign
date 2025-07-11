'use client';

import { useState } from 'react';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';

export default function RecipeFinder() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sample = `
  <div class="p-6 bg-white rounded-xl shadow-md prose prose-lg text-gray-800">
    <h2 class="text-2xl font-bold text-red-600 mb-4">🍽️ 전통 전주 음식 레시피</h2>
    <ul class="space-y-8">
      <li class="border-l-4 border-orange-400 pl-4">
        <p class="text-xl font-extrabold text-orange-600 mb-2">
          <strong>🍚 <span class="text-orange-800">전주 비빔밥</span></strong>
        </p>
        <p class="text-gray-700 font-semibold mb-1">조리법</p>
        <ul class="list-decimal list-inside text-gray-600 space-y-1">
          <li>쌀 1컵을 씻어 1.2컵의 물로 밥을 짓습니다.</li>
          <li>콩나물 100g을 끓는 물에 3분간 데친 후 찬물에 헹굽니다.</li>
          <li>당근, 시금치 등 나물 50g씩을 각각 데치고 간장 1작은술, 참기름 1작은술로 무칩니다.</li>
          <li>고추장 1큰술, 참기름 1작은술, 설탕 1작은술을 섞어 비빔 소스를 만듭니다.</li>
          <li>그릇에 밥, 나물, 콩나물을 보기 좋게 담고 고추장을 올린 후 계란 프라이를 올려 마무리합니다.</li>
        </ul><br/>
      </li>
    </ul>
  </div>`;

  const handleSubmit = async () => {
    setRecipe(sample);
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-4xl font-bold text-orange-600">음식 레시피 추천해드려요!</h1>
          </div>
          <div className="flex items-center justify-center mb-6">
            <span className="text-xl mr-2">📍</span>
            <p className="text-orange-500 text-lg">남은 재료를 말해주세요! AI가 추천해드립니다!</p>
          </div>
        </motion.div>

        {/* 입력 폼 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-10"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="ingredients" className="block text-lg font-medium text-gray-700 mb-3">
                어떤 재료들이 있나요?
              </label>
              <textarea
                id="ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="예: 쌀, 콩나물, 시금치, 당근, 고추장, 참기름..."
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none text-gray-800"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-lg font-medium text-lg hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span className="ml-2">레시피를 찾고 있어요...</span>
                </>
              ) : (
                <>
                  <span>🔍</span>
                  <span className="ml-2">음식 레시피 찾기</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* 결과 */}
        {recipe && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-center mb-6">
              <span className="text-2xl mr-3">👨‍🍳</span>
              <h2 className="text-2xl font-bold text-orange-600">추천 레시피</h2>
            </div>
            <div
              className="prose max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(recipe) }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
