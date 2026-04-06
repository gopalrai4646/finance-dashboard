import React, { useMemo } from "react";
import { 
  Lightbulb, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { useFinance } from "../context/FinanceContext";
import { Card } from "../components/ui/Card";
import { cn } from "../utils/cn";
import { motion } from "motion/react";

const InsightCard = ({ icon: Icon, title, description, type, action }) => {
  const colors = {
    info: "bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/20",
    success: "bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 border-green-100 dark:border-green-900/20",
    warning: "bg-amber-50 dark:bg-amber-900/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/20",
    danger: "bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-6 rounded-2xl border flex gap-4 transition-all hover:shadow-md",
        colors[type]
      )}
    >
      <div className={cn("p-3 rounded-xl h-fit", colors[type].split(" ")[0])}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
        {action && (
          <button className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white hover:gap-3 transition-all">
            {action}
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export const Insights = () => {
  const { stats, categoryData, isLoading } = useFinance();

  const insights = useMemo(() => {
    const list = [];
    
    // Savings insight
    const savingsRate = ((stats.totalIncome - stats.totalExpense) / stats.totalIncome) * 100;
    if (savingsRate > 20) {
      list.push({
        icon: CheckCircle2,
        title: "Excellent Savings Rate",
        description: `You've saved ${savingsRate.toFixed(1)}% of your income this month. You're well above the recommended 20% savings goal.`,
        type: "success",
        action: "View savings plan"
      });
    } else if (savingsRate > 0) {
      list.push({
        icon: Lightbulb,
        title: "Good Progress",
        description: `You're saving ${savingsRate.toFixed(1)}% of your income. Increasing this by just 5% could help you reach your goals faster.`,
        type: "info",
        action: "How to save more"
      });
    } else {
      list.push({
        icon: AlertCircle,
        title: "Budget Overrun",
        description: "Your expenses have exceeded your income this month. Consider reviewing your non-essential spending.",
        type: "danger",
        action: "Review budget"
      });
    }

    // Category insight
    if (categoryData.length > 0) {
      const highest = [...categoryData].sort((a, b) => b.value - a.value)[0];
      list.push({
        icon: TrendingUp,
        title: `High Spending in ${highest.name}`,
        description: `You've spent $${highest.value.toLocaleString()} on ${highest.name} this month. This accounts for ${((highest.value / stats.totalExpense) * 100).toFixed(1)}% of your total expenses.`,
        type: "warning",
        action: "View breakdown"
      });
    }

    // Comparison insight (mocked logic for demo)
    list.push({
      icon: TrendingDown,
      title: "Reduced Food Expenses",
      description: "Great job! You spent 15% less on dining out compared to last month. That's a saving of approximately $120.",
      type: "success"
    });

    return list;
  }, [stats, categoryData]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-800 border-t-gray-900 dark:border-t-white rounded-full animate-spin" />
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">Analyzing your finances...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Financial Health" subtitle="Your overall score">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="currentColor"
                  className="text-gray-100 dark:text-gray-800"
                  strokeWidth="12"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="currentColor"
                  className="text-gray-900 dark:text-white"
                  strokeWidth="12"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * 85) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-gray-900 dark:text-white">85</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Great</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-6 text-center max-w-[200px]">
              Your financial health is better than 82% of users in your bracket.
            </p>
          </div>
        </Card>

        <div className="space-y-6">
          <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Smart Insights</h3>
          <div className="space-y-4">
            {insights.map((insight, idx) => (
              <InsightCard key={idx} {...insight} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
