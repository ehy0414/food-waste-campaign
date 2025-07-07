"use client"

import { useState } from "react";

export default function RecipeFinder() {
    const [ingredients, setIngredients] = useState('');
    const [recipe, setRecipe] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!ingredients.trim()) {
            setError('재료를 입력해주세요!');
            return;
        }

        setLoading(true);
        setError('');
        setRecipe('');

        try {
            const response = await fetch('/api/recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    ingredients: ingredients.trim(),
                    prompt: ingredients.trim()
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setRecipe(data.result);
            } else {
                setError(data.error || '레시피를 불러오는데 실패했습니다.');
            }
        } catch (err) {
            setError('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* 헤더 */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <span className="text-4xl mr-3">👨‍🍳</span>
                        <h1 className="text-4xl font-bold text-gray-800">전주 음식 레시피 파인더</h1>
                    </div>
                    <div className="flex items-center justify-center mb-6">
                        <span className="text-xl mr-2">📍</span>
                        <p className="text-gray-600 text-lg">가진 재료로 만드는 전주 전통 음식</p>
                    </div>
                </div>

                {/* 입력 폼 */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
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
                                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-gray-700"
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-lg font-medium text-lg hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                            {loading ? (
                                <>
                                    <span className="animate-spin">⏳</span>
                                    <span>레시피를 찾고 있어요...</span>
                                </>
                            ) : (
                                <>
                                    <span>🔍</span>
                                    <span>전주 음식 레시피 찾기</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* 레시피 결과 */}
                {recipe && (
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex items-center mb-6">
                            <span className="text-2xl mr-3">👨‍🍳</span>
                            <h2 className="text-2xl font-bold text-gray-800">추천 레시피</h2>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-6">
                            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                {recipe}
                            </div>
                        </div>
                    </div>
                )}

                {/* 설명 섹션 */}
                {!recipe && !loading && (
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                            전주 음식의 특별함
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-orange-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">🍚 전주 비빔밥</h3>
                                <p className="text-gray-600">
                                    전주의 대표 음식으로 다양한 나물과 고추장을 넣어 비벼 먹는 영양 만점 한 그릇 음식입니다.
                                </p>
                            </div>
                            <div className="bg-red-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">🥢 전주 한정식</h3>
                                <p className="text-gray-600">
                                    정갈하고 다양한 반찬들로 구성된 전주 한정식은 조선 왕조의 맛을 계승한 전통 요리입니다.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}