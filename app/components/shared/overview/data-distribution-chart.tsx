'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  {
    name: 'Articles',
    academic: 4000,
    indigenous: 1200,
    historical: 2400,
  },
  {
    name: 'Artifacts',
    academic: 1500,
    indigenous: 800,
    historical: 3200,
  },
  {
    name: 'Flora',
    academic: 2800,
    indigenous: 3000,
    historical: 1200,
  },
  {
    name: 'Fauna',
    academic: 3200,
    indigenous: 2200,
    historical: 900,
  },
  {
    name: 'Cultural',
    academic: 1800,
    indigenous: 3800,
    historical: 1600,
  },
]

export function DataDistributionChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="academic" name="Academic Sources" fill="#8884d8" />
        <Bar dataKey="indigenous" name="Indigenous Knowledge" fill="#82ca9d" />
        <Bar dataKey="historical" name="Historical Records" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  )
}
