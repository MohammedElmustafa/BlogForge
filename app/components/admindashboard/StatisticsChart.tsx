"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartDataItem {
  name: string;
  value: number;
}
interface StatisticsChartProps {
  data: ChartDataItem[];
}
const StatisticsChart: React.FC<StatisticsChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" stroke="#4a5568" />
        <YAxis stroke="#4a5568" allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="value" fill="#4f46e5" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatisticsChart;