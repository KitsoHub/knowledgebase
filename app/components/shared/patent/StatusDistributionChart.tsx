'use client';

import type React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { getApplicationsByStage } from '@/app/utils/mock/patent-data';

const COLORS = ['#0EA5E9', '#1E40AF', '#8B5CF6', '#F59E0B', '#10B981', '#64748B'];

const StatusDistributionChart: React.FC = () => {
  const data = getApplicationsByStage();

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <Card className="col-span-1 row-span-1">
      <CardHeader>
        <CardTitle>Application Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip


                formatter={(value: unknown) => [`${value} Applications`, 'Count']}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusDistributionChart;
