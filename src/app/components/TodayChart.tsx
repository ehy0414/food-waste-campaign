'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

export default function TodayChart() {
  const [wasteData, setWasteData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/waste')
      .then((res) => res.json())
      .then((data) => {
        const items = data.data?.list || [];
        setWasteData(items);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (!wasteData.length) return <p>데이터가 없습니다.</p>;

  const labels = wasteData.map(
    (item) =>
      `${item.disMonth.padStart(2, '0')}/${item.disDate.padStart(2, '0')}`
  );

  const quantities = wasteData.map((item) =>
    Math.round(item.disQuantity / 1000000) // 백만 단위로 변환
  );

  const data = {
    labels,
    datasets: [
      {
        label: '일별 배출량 (단위: 백만 톤)',
        data: quantities,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📊 최신 배출량 그래프</h1>
      <p className="mt-3 text-sm text-gray-500">
        본 데이터는 공공데이터 포털의 한국환경공단_RFID기반 음식물쓰레기 배출정보를 참고하였습니다
      </p><br/>
      <Line data={data} />
      
    </div>
  );
}
