"use client"

import { useState, useEffect } from "react"
import { Users, Store, DollarSign, Activity, AlertCircle } from "lucide-react"
import { MetricCard } from "@/app/components/ui/metric-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"

// Mock data for the chart
const transactionData = Array.from({ length: 90 }, (_, i) => ({
  date: new Date(2023, 0, i + 1).toISOString().split("T")[0],
  amount: Math.floor(Math.random() * 10000) + 5000,
}))

// Mock data for system logs
const systemLogs = [
  { id: 1, date: "2023-01-15 14:32:45", action: "New merchant registered", user: "System", level: "info" },
  { id: 2, date: "2023-01-15 12:18:22", action: "License key generated", user: "admin@example.com", level: "info" },
  {
    id: 3,
    date: "2023-01-14 23:45:11",
    action: "Failed login attempt",
    user: "merchant@example.com",
    level: "warning",
  },
  { id: 4, date: "2023-01-14 18:22:09", action: "Store banned", user: "admin@example.com", level: "warning" },
  { id: 5, date: "2023-01-14 15:11:37", action: "System update completed", user: "System", level: "info" },
  { id: 6, date: "2023-01-13 09:45:22", action: "Database backup failed", user: "System", level: "error" },
  { id: 7, date: "2023-01-13 08:12:55", action: "New API key generated", user: "merchant@example.com", level: "info" },
]

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "info":
        return "text-[#007BFF]"
      case "warning":
        return "text-[#FFC107]"
      case "error":
        return "text-[#DC3545]"
      default:
        return "text-[#6C757D]"
    }
  }

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#007BFF] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">320 Pay Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">System overview and metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Merchants"
          value="156"
          icon={<Users size={24} color="#007BFF" />}
          trend={{ value: 12, isPositive: true }}
          className="animate-fadeIn [animation-delay:0.1s]"
        />
        <MetricCard
          title="Active Stores"
          value="487"
          icon={<Store size={24} color="#007BFF" />}
          trend={{ value: 8, isPositive: true }}
          className="animate-fadeIn [animation-delay:0.2s]"
        />
        <MetricCard
          title="Transaction Volume"
          value="$45,678"
          icon={<DollarSign size={24} color="#28A745" />}
          trend={{ value: 15, isPositive: true }}
          color="#28A745"
          className="animate-fadeIn [animation-delay:0.3s]"
        />
        <MetricCard
          title="System Health"
          value="98.7%"
          icon={<Activity size={24} color="#007BFF" />}
          trend={{ value: 0.2, isPositive: true }}
          className="animate-fadeIn [animation-delay:0.4s]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 animate-fadeIn [animation-delay:0.5s]">
          <CardHeader>
            <CardTitle>Transaction Trend (Last 90 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end">
              {transactionData.slice(-30).map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div className="relative">
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-[#212529] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      ${item.amount.toLocaleString()}
                    </div>
                    <div
                      className="w-full max-w-[12px] bg-[#007BFF] rounded-t-sm animate-growUp"
                      style={{
                        height: `${(item.amount / 15000) * 250}px`,
                        animationDelay: `${0.05 * index}s`,
                      }}
                    ></div>
                  </div>
                  {index % 5 === 0 && (
                    <span className="text-xs text-[#6C757D] mt-1">{new Date(item.date).getDate()}</span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fadeIn [animation-delay:0.6s]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>System Logs</CardTitle>
            <Button variant="ghost" size="sm" className="text-[#007BFF]">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-start space-x-3 p-3 rounded-md bg-gray-50">
                  <div className={`mt-0.5 ${getLogLevelColor(log.level)}`}>
                    <AlertCircle size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{log.action}</p>
                    <div className="flex items-center text-xs text-[#6C757D] mt-1">
                      <span>{log.date}</span>
                      <span className="mx-2">•</span>
                      <span>{log.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-fadeIn [animation-delay:0.7s]">
        <CardHeader>
          <CardTitle>Recent System Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {systemLogs.map((log, index) => (
                <TableRow key={log.id} className="animate-fadeIn" style={{ animationDelay: `${0.1 * index}s` }}>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        log.level === "info"
                          ? "bg-blue-100 text-[#007BFF]"
                          : log.level === "warning"
                            ? "bg-yellow-100 text-[#FFC107]"
                            : "bg-red-100 text-[#DC3545]"
                      }`}
                    >
                      {log.level}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
