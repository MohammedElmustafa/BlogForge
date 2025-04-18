'use client';
import dynamic from 'next/dynamic';

const StatisticsChart = dynamic(
  () => import('./StatisticsChart'),
  { ssr: false }
);

const TrendsChart = dynamic(
  () => import('./TrendsChart'),
  { ssr: false }
);

interface StatsData {
  name: string;
  value: number;
}

interface TrendsData {
  month: string;
  users: number;
  posts: number;
}

interface DashboardChartsProps {
  chartData: StatsData[];
  trendsData: TrendsData[];
}

export default function DashboardCharts({
  chartData,
  trendsData,
}: DashboardChartsProps) {
  return (
    <div className="space-y-8">
      <StatisticsChart data={chartData} />
      <TrendsChart data={trendsData} />
    </div>
  );
}