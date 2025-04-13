// app/components/TrendsChart.tsx
"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface TrendsDataItem {
  month: string;
  users: number;
  posts: number;
}

interface TrendsChartProps {
  data: TrendsDataItem[];
}

const TrendsChart: React.FC<TrendsChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="month" stroke="#4a5568" />
        <YAxis stroke="#4a5568" allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="users" stroke="#4f46e5" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="posts" stroke="#38a169" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrendsChart;
