import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const API_KEY = process.env.API_KEY; // 서버 환경변수로 API 키 관리 권장

  if (!API_KEY) {
    return NextResponse.json({ error: 'API 키가 설정되지 않았습니다.' }, { status: 500 });
  }

  const now = new Date();

  let disYear = now.getFullYear();
  let disMonth = now.getMonth() + 1; // 1~12월

  disMonth -= 3;
  if (disMonth <= 0) {
    disMonth += 12;
    disYear -= 1;
  }

  const disMonthStr = disMonth.toString().padStart(2, '0'); // 2자리 포맷

//   console.log(`요청된 날짜: ${disYear}-${disMonthStr}`);

  // API 요청 URL 생성
  const url = `https://apis.data.go.kr/B552584/RfidFoodWasteServiceNew/getTotalDateList?serviceKey=${API_KEY}&type=json&disYear=${disYear}&disMonth=${disMonthStr}&page=1&rowNum=10`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } }); // 60초 캐시 (선택)

    if (!res.ok) {
      return NextResponse.json({ error: 'API 호출 실패' }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: '서버 에러 발생' }, { status: 500 });
  }
}
