import type React from "react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: string
  className?: string
}

export function MetricCard({ title, value, icon, trend, color = "text-crypto-blue", className }: MetricCardProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md animate-fadeIn border border-gray-100 dark:border-gray-700",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className={cn("text-2xl font-bold mt-1", color)}>{value}</h3>

          {trend && (
            <p
              className={cn(
                "text-xs font-medium mt-2 flex items-center",
                trend.isPositive ? "text-crypto-green" : "text-red-500",
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              <span className="ml-1 text-gray-500 dark:text-gray-400">vs last period</span>
            </p>
          )}
        </div>

        <div
          className={cn(
            "p-3 rounded-full",
            color === "text-crypto-blue"
              ? "bg-crypto-blue/10"
              : color === "text-crypto-green"
                ? "bg-crypto-green/10"
                : color === "text-crypto-purple"
                  ? "bg-crypto-purple/10"
                  : "bg-gray-100 dark:bg-gray-700",
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}
