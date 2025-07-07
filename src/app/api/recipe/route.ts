import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
당신은 한국 전통 요리 전문가입니다. 아래 재료로 만들 수 있는 전주의 전통 음식 레시피를 추천해주세요.

형식:
1. 인식된 재료
2. 추천 음식 2~3개
3. 각 음식의 간단한 조리법
4. 전주 음식의 역사적 배경 (간단히)

재료: ${ingredients}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ result: text });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gemini API 호출 실패" }, { status: 500 });
  }
}
