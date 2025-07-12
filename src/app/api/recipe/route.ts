import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
당신은 한국 전통 요리 전문가입니다.

아래 재료를 기반으로 만들 수 있는 음식 레시피를 HTML 형식으로 출력해주세요.

❗ 출력 형식에 대한 세부 지침:

- 출력은 순수 HTML만 출력해주세요. Markdown 코드 블록 (예: \`\`\`html) 없이 출력하세요.
- tailwindcss 클래스를 각 HTML 요소에 적용해주세요.
- 입력받은 재료를 통해서 음식을 추천해주세요.
- 각 음식은 다음 형식을 따르세요:

<string class='text-2xl font-bold text-orange-600 mb-2>음식 이름</string><br/>
<strong>조리법</strong><br/>
<ul class="list-decimal list-inside text-gray-700 space-y-1">...</ul>
<li class="border-l-4 border-orange-400 pl-4 mb-6">

- 음식 이름은 눈에 띄게, 조리법에는 재료의 양을 구체적으로 포함해주세요.
- 전체 결과는 <div class="p-6 bg-white rounded-xl shadow-md prose prose-lg text-gray-800">로 감싸주세요.
- 추천 음식은 최소 2개, 최대 3개로 해주세요.
- 줄바꿈은 <br/> 태그로 표현해주세요.

재료: ${ingredients}
`;



    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log("Generated Recipe:", text);
    const cleanedText = text
    .replace(/^```html\s*/i, '')  // 시작 부분 ```html 제거
    .replace(/```$/, '')
    .replace(/className=/g, 'class=');

    return NextResponse.json({ result: cleanedText });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gemini API 호출 실패" }, { status: 500 });
  }
}
