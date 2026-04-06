import React from "react";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight,
  Calendar
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { StatCard, Card } from "../components/ui/Card";
import { useFinance } from "../context/FinanceContext";
import { MOCK_CHART_DATA } from "../data/mockData";
import { cn } from "../utils/cn";
import { motion } from "motion/react";

const COLORS = ["#111827", "#10B981", "#F59E0B", "#EF4444", "#6366F1", "#EC4899"];

export const Dashboard = () => {
  const { stats, categoryData, transactions, isLoading, isDarkMode } = useFinance();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-800 border-t-gray-900 dark:border-t-white rounded-full animate-spin" />
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">Loading financial data...</p>
      </div>
    );
  }

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Balance"
          value={stats.totalBalance}
          trend={12.5}
          trendType="up"
          icon={Wallet}
          colorClass="bg-foreground"
        />
        <StatCard
          title="Total Income"
          value={stats.totalIncome}
          trend={8.2}
          trendType="up"
          icon={TrendingUp}
          colorClass="bg-green-500"
        />
        <StatCard
          title="Total Expenses"
          value={stats.totalExpense}
          trend={4.1}
          trendType="down"
          icon={TrendingDown}
          colorClass="bg-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2" title="Balance Overview" subtitle="Monthly balance trends">
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#27272A" : "#F3F4F6"} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: "12px", 
                    border: "none", 
                    backgroundColor: isDarkMode ? "#18181B" : "#fff",
                    color: isDarkMode ? "#fff" : "#000",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" 
                  }}
                  itemStyle={{ color: isDarkMode ? "#fff" : "#000" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  stroke={isDarkMode ? "#FAFAFA" : "#111827"} 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: isDarkMode ? "#FAFAFA" : "#111827", strokeWidth: 2, stroke: isDarkMode ? "#18181B" : "#fff" }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Breakdown */}
        <Card title="Spending by Category" subtitle="Expense distribution">
          <div className="h-[300px] w-full mt-4 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ 
                    borderRadius: "12px", 
                    border: "none", 
                    backgroundColor: isDarkMode ? "#18181B" : "#fff",
                    color: isDarkMode ? "#fff" : "#000",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" 
                  }}
                  itemStyle={{ color: isDarkMode ? "#fff" : "#000" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 w-full">
              {categoryData.slice(0, 4).map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card title="Recent Transactions" subtitle="Your latest financial activities">
        <div className="mt-4 space-y-4">
          {recentTransactions.map((t, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={t.id} 
              className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  t.type === "income" ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400" : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                )}>
                  {t.type === "income" ? <ArrowUpRight className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{t.description}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-md">{t.category}</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {t.date}
                    </span>
                  </div>
                </div>
              </div>
              <p className={cn(
                "text-sm font-bold",
                t.type === "income" ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-white"
              )}>
                {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString()}
              </p>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};
