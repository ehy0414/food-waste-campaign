import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
당신은 한국 전통 요리 전문가입니다.

아래 재료를 기반으로 만들 수 있는 전통 전주 음식 레시피를 HTML 형식으로 출력해주세요.

- 모든 텍스트는 HTML로 구성해주세요.
- 모든 텍스트는 tailwindcss를 사용하여 스타일링해주세요.
- 음식 이름은 크고 눈에 띄게 표시해주세요.
- 조리법은 목록 형식으로 나열해주세요.
- 조리법의 순서대로 번호를 매겨주세요.
- 조리법의 각 재료의 양을 명시해주세요.
- 각 음식은 다음 형식을 따르세요:

<string>🍚 음식 이름</string>
<strong>조리법</strong><br/>
<ul> 태그 안에 조리법을 나열해주세요.
- 음식 이름은 <string> 태그로 감싸주세요.

- 결과는 <ul> 태그 안에 추천 음식 2~3개를 나열해주세요.
- 설명은 <br/> 태그로 줄바꿈해주세요.

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
