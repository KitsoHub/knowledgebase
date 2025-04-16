'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockWeeklyProductivity } from '@/app/utils/mock/patent-data';
import { Tabs, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

const ProductivityTrendsChart: React.FC = () => {
  const [duration, setDuration] = useState('3m');

  // Filter data based on selected duration
  const getFilteredData = () => {
    switch (duration) {
      case '1m':
        return mockWeeklyProductivity.slice(-4);
      case '3m':
        return mockWeeklyProductivity.slice(-12);
      case '6m':
        return mockWeeklyProductivity;
      default:
        return mockWeeklyProductivity;
    }
  };

  return (
    <Card className="col-span-2 row-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Personal Productivity Trends</CardTitle>
        <Tabs defaultValue="3m" onValueChange={setDuration}>
          <TabsList>
            <TabsTrigger value="1m">1 Month</TabsTrigger>
            <TabsTrigger value="3m">3 Months</TabsTrigger>
            <TabsTrigger value="6m">6 Months</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={getFilteredData()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="applicationsProcessed"
                name="Applications Processed"
                stroke="#0EA5E9"
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="averageProcessingTime"
                name="Avg. Days Per Application"
                stroke="#8B5CF6"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="officeActionsIssued"
                name="Office Actions Issued"
                stroke="#10B981"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductivityTrendsChart;
