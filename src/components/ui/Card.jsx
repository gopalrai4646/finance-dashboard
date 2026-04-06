import React from "react";
import { cn } from "../../utils/cn";

export const Card = ({ children, className, title, subtitle, icon: Icon }) => {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300 p-6",
        className
      )}
    >
      {(title || Icon) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && (
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {title}
              </h3>
            )}
            {subtitle && <p className="text-xs text-muted-foreground/60 mt-1">{subtitle}</p>}
          </div>
          {Icon && (
            <div className="p-2 bg-muted rounded-lg">
              <Icon className="w-5 h-5 text-muted-foreground" />
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export const StatCard = ({ title, value, trend, trendType, icon: Icon, colorClass }) => {
  const isPositive = trendType === "up";
  
  return (
    <Card className="flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className={cn("p-3 rounded-xl", colorClass)}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center text-xs font-medium px-2 py-1 rounded-full",
            isPositive ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400" : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
          )}>
            {isPositive ? "↑" : "↓"} {trend}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <h2 className="text-2xl font-bold text-card-foreground mt-1">
          ${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h2>
      </div>
    </Card>
  );
};
