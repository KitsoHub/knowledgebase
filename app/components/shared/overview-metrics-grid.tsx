'use client'
import { useState, useEffect } from 'react'
import {
  DatabaseIcon,
  MessageCircleIcon,
  AlertCircleIcon,
  BarChart2Icon,
  ClockIcon,
} from 'lucide-react'
import { ServiceEndPoints } from '@/lib/api-config'

interface DashboardMetric {
  icon?: React.ElementType
  label: string
  count: number | string
  percentage: number | string
  color: string
}

interface Metrics {
  articles: number
  products: number
  sites: number
  cultures: number
  plants: number
  animals: number
  games: number
}

export default function OverviewMetricsGrid() {
  // const metrics
  const [overviewMetrics, setOverviewMetrics] = useState<Metrics>({
    articles: 0,
    products: 0,
    sites: 0,
    cultures: 0,
    plants: 0,
    animals: 0,
    games: 0,
  })

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch(ServiceEndPoints.getMetrics, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        if (response.ok) {
          const data = await response.json()
          setOverviewMetrics(data)
        }
      } catch (error) {
        console.error('Failed to fetch metrics:', error)
      }
    }

    fetchMetrics()
  }, [overviewMetrics])
  const metricsData: DashboardMetric[] = [
    {
      icon: DatabaseIcon,
      label: 'Academic Articles',
      count: 0,
      percentage: 15.9,
      color: 'text-blue-500',
    },
    {
      icon: MessageCircleIcon,
      label: 'Historical Artifacts',
      count: '-',
      percentage: 15.9,
      color: 'text-green-500',
    },
    {
      icon: AlertCircleIcon,
      label: 'Cultures',
      count: 0,
      percentage: 15.9,
      color: 'text-red-500',
    },
    {
      icon: ClockIcon,
      label: 'Flora/Fauna Records',
      count: 0,
      percentage: 15.9,
      color: 'text-yellow-500',
    },
    {
      icon: BarChart2Icon,
      label: 'Scientific Data',
      count: 0,
      percentage: 15.9,
      color: 'text-purple-500',
    },
  ]
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {metricsData.map((metric, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border dark:border-gray-700 hover:shadow-lg transition-all"
          >
            <div className="flex items-center space-x-4">
              {metric.icon && (
                <metric.icon className={`w-8 h-8 ${metric.color}`} />
              )}
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {metric.label}
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {metric.count}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
