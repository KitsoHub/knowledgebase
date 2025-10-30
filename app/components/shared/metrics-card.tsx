import {
  ArrowUpRight,
  Calendar,
  FileText,
  TrendingUp,
  User,
} from 'lucide-react'
import React from 'react'
import { Card, CardContent } from '../ui/card'

export default function MetricsCard() {
  const headerMetrics = [
    {
      title: 'Total Entries',
      value: '11,543',
      change: '+12.5%',
      icon: <FileText className="h-6 w-6" />,
    },
    {
      title: 'Contributors',
      value: '5,287',
      change: '+8.2%',
      icon: <User className="h-6 w-6" />,
    },
    {
      title: 'New This Month',
      value: '423',
      change: '+5.7%',
      icon: <Calendar className="h-6 w-6" />,
    },
    {
      title: 'Avg. Credibility',
      value: '87%',
      change: '+2.3%',
      icon: <TrendingUp className="h-6 w-6" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {headerMetrics.map((metric, index) => (
        <Card
          key={index}
          className="bg-white shadow-sm  border-accent animate-fade-in "
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {' '}
                  {metric.title}
                </p>
                <p className="text-3xl font-bold">{metric.value}</p>
              </div>
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                {metric.icon}
              </div>
            </div>
            <div className="flex items-center mt-3 text-sm">
              <span className="text-green-600 font-medium flex items-center mr-2">
                {metric.change} <ArrowUpRight className="h-3 w-3 ml-0.5" />
              </span>
              <span className="text-muted-foreground">vs previous period</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
