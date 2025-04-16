import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MetricCardProps {
	title: string;
	value: string | number;
	description?: string;
	icon?: ReactNode;
	trend?: { value: number; positive: boolean };
	className?: string;
}

const PatentMetricCard: React.FC<MetricCardProps> = ({
	title,
	value,
	description,
	icon,
	trend,
	className,
}) => {
	return (
        <div className={cn("bg-card rounded-lg shadow-sm p-6", className)}>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline">
              <h3 className="text-3xl font-bold">{value}</h3>
              {trend && (
                <span className={cn(
                  "ml-2 text-sm font-medium",
                  trend.positive ? "text-green-400" : "text-red-400"
                )}>
                  {trend.positive ? '+' : '-'}{Math.abs(trend.value)}%
                </span>
              )}
            </div>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {icon && (
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              {icon}
            </div>
          )}
        </div>
      </div>
	);
};

export default PatentMetricCard;
