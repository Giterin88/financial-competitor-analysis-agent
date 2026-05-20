import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { YearlyFinancialData } from '../types';

interface GrowthTrendChartProps {
  competitors: Array<{
    companyName: string;
    ticker: string;
    yearlyData: YearlyFinancialData[];
    currency: string;
  }>;
  dataType: 'revenue' | 'netIncome' | 'grossMargin' | 'operatingMargin' | 'netMargin';
  title: string;
  yAxisLabel: string;
  formatValue: (value: number | null) => string;
}

const COLORS = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6'
];

export function GrowthTrendChart({
  competitors,
  dataType,
  title,
  yAxisLabel,
  formatValue
}: GrowthTrendChartProps) {
  // 标准化数据用于图表
  const chartData = React.useMemo(() => {
    if (competitors.length === 0) return [];
    
    const years = ['2023', '2024', '2025'];
    
    return years.map(year => {
      const dataPoint: any = { year };
      
      competitors.forEach((comp) => {
        const yearData = comp.yearlyData.find(d => d.fiscalYear === year);
        if (yearData) {
          dataPoint[comp.companyName] = yearData[dataType];
        }
      });
      
      return dataPoint;
    });
  }, [competitors, dataType]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-blue-500" />
        {title}
      </h3>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="year"
            stroke="#6b7280"
            tick={{ fontSize: 14 }}
          />
          <YAxis
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
            label={{
              value: yAxisLabel,
              angle: -90,
              position: 'insideLeft',
              style: { fontSize: 12, fill: '#6b7280' }
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              fontSize: '13px'
            }}
            formatter={(value: any) => formatValue(value as number | null)}
          />
          <Legend
            wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }}
          />
          
          {competitors.map((comp, index) => (
            <Line
              key={comp.ticker}
              type="monotone"
              dataKey={comp.companyName}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={3}
              dot={{ r: 6, strokeWidth: 2 }}
              activeDot={{ r: 8 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* 增长概览卡片 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {competitors.map((comp, index) => {
          const latestData = comp.yearlyData.find(d => d.fiscalYear === '2025');
          const earliestData = comp.yearlyData.find(d => d.fiscalYear === '2023');
          const growth = latestData && earliestData && latestData[dataType] && earliestData[dataType]
            ? Math.round(((latestData[dataType] - earliestData[dataType]) / earliestData[dataType] * 100) * 10) / 10
            : null;
          
          return (
            <div
              key={comp.ticker}
              className="p-4 rounded-lg border"
              style={{ borderColor: COLORS[index % COLORS.length] }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800">{comp.companyName}</span>
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ backgroundColor: `${COLORS[index % COLORS.length]}20`, color: COLORS[index % COLORS.length] }}
                >
                  ({comp.currency})
                </span>
              </div>
              
              {latestData && (
                <div className="text-lg font-bold text-gray-800 mb-1">
                  {formatValue(latestData[dataType])}
                </div>
              )}
              
              {growth !== null && (
                <div className={`flex items-center gap-1 text-sm font-medium ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {growth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {growth >= 0 ? '+' : ''}{growth}% 增长 (2023-2025)
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
