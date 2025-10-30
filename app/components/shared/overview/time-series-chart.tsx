'use client'

import {
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  {
    month: 'Jan',
    articles: 400,
    artifacts: 240,
    flora: 320,
    fauna: 280,
    cultural: 190,
  },
  {
    month: 'Feb',
    articles: 430,
    artifacts: 250,
    flora: 340,
    fauna: 290,
    cultural: 210,
  },
  {
    month: 'Mar',
    articles: 450,
    artifacts: 270,
    flora: 360,
    fauna: 310,
    cultural: 230,
  },
  {
    month: 'Apr',
    articles: 480,
    artifacts: 290,
    flora: 380,
    fauna: 320,
    cultural: 250,
  },
  {
    month: 'May',
    articles: 520,
    artifacts: 310,
    flora: 410,
    fauna: 340,
    cultural: 270,
  },
  {
    month: 'Jun',
    articles: 550,
    artifacts: 330,
    flora: 440,
    fauna: 360,
    cultural: 290,
  },
  {
    month: 'Jul',
    articles: 580,
    artifacts: 350,
    flora: 460,
    fauna: 380,
    cultural: 310,
  },
  {
    month: 'Aug',
    articles: 610,
    artifacts: 370,
    flora: 490,
    fauna: 400,
    cultural: 330,
  },
  {
    month: 'Sep',
    articles: 640,
    artifacts: 390,
    flora: 520,
    fauna: 420,
    cultural: 350,
  },
  {
    month: 'Oct',
    artifacts: 410,
    articles: 670,
    flora: 550,
    fauna: 440,
    cultural: 370,
  },
  {
    month: 'Nov',
    articles: 700,
    artifacts: 430,
    flora: 580,
    fauna: 460,
    cultural: 390,
  },
  {
    month: 'Dec',
    articles: 730,
    artifacts: 450,
    flora: 610,
    fauna: 480,
    cultural: 410,
  },
]

export function TimeSeriesChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="articles"
          name="Articles"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="artifacts"
          name="Artifacts"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="flora"
          name="Flora"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
        />
        <Area
          type="monotone"
          dataKey="fauna"
          name="Fauna"
          stackId="1"
          stroke="#ff8042"
          fill="#ff8042"
        />
        <Area
          type="monotone"
          dataKey="cultural"
          name="Cultural"
          stackId="1"
          stroke="#0088fe"
          fill="#0088fe"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
