import Chart from '../components/Chart';

export const metadata = {
  title: '남김이 - 배출량 그래프',
  description: '일별 음식물 쓰레기 배출량을 확인해보세요!',
  openGraph: {
    type: 'website',
    title: '남김이 그래프',
    description: '일별 음식물 쓰레기 배출량을 확인해보세요!',
    images: '/favicon.ico',
  },
  keywords: [
    '배출량 그래프',
    '음식물 쓰레기',
    '일별 배출량',
  ],
}

export default function ChartPage() {
  return (
    <Chart />
  );
}
