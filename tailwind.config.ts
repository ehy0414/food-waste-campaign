const config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}']
,
  safelist: [
    'p-6', 'bg-white', 'rounded-xl', 'shadow-md',
    'prose', 'prose-lg', 'text-gray-800',
    'text-2xl', 'font-bold', 'text-orange-600', 'mb-2',
    'list-decimal', 'list-inside', 'text-gray-700', 'space-y-1',
    'border-l-4', 'border-orange-400', 'pl-4', 'mb-6'
  ],
  plugins: [require('@tailwindcss/typography')],
};

export default config;
