
import { Metadata } from 'next';
import About from '../components/About';

export const metadata: Metadata = {
  title: '제로 키친 소개',
  description: '제로 키친 프로젝트는 AI를 통해 음식물 쓰레기를 줄입니다.',
  openGraph: {
    type: 'website',
    title: '제로 키친 소개',
    description: '제로 키친은 AI와 함께 음식물 쓰레기를 줄이는 것을 목표로 하는 플랫폼입니다.',
    images: '/favicon.ico',
  }
}

export default function AboutPage() {
  return (
    <>
      <About />
    </>
  );
}
