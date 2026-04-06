import React, { useState } from "react";
import { 
  LayoutDashboard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  PieChart, 
  Settings, 
  LogOut,
  User,
  Shield,
  Eye
} from "lucide-react";
import { cn } from "../utils/cn";
import { useFinance } from "../context/FinanceContext";

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-foreground text-background shadow-lg shadow-gray-200 dark:shadow-none" 
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "text-background" : "text-gray-400 group-hover:text-foreground")} />
    <span className="font-medium">{label}</span>
  </button>
);

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { role, setRole } = useFinance();

  return (
    <aside className="w-64 bg-card border-r border-border h-screen flex flex-col sticky top-0 transition-colors duration-300">
      <div className="p-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-background rounded-sm rotate-45" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">Finovate</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <SidebarItem 
          icon={LayoutDashboard} 
          label="Dashboard" 
          active={activeTab === "dashboard"} 
          onClick={() => setActiveTab("dashboard")}
        />
        <SidebarItem 
          icon={ArrowUpRight} 
          label="Transactions" 
          active={activeTab === "transactions"} 
          onClick={() => setActiveTab("transactions")}
        />
        <SidebarItem 
          icon={PieChart} 
          label="Insights" 
          active={activeTab === "insights"} 
          onClick={() => setActiveTab("insights")}
        />
        <SidebarItem 
          icon={Settings} 
          label="Settings" 
          active={activeTab === "settings"} 
          onClick={() => setActiveTab("settings")}
        />
      </nav>

      <div className="p-4 border-t border-border">
        <div className="bg-muted rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role Switcher</span>
            {role === "admin" ? <Shield className="w-3 h-3 text-amber-500" /> : <Eye className="w-3 h-3 text-blue-500" />}
          </div>
          <div className="flex bg-card p-1 rounded-xl border border-border">
            <button
              onClick={() => setRole("viewer")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-medium transition-all",
                role === "viewer" ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Eye className="w-3 h-3" />
              Viewer
            </button>
            <button
              onClick={() => setRole("admin")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-medium transition-all",
                role === "admin" ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Shield className="w-3 h-3" />
              Admin
            </button>
          </div>
        </div>
        
        <button className="flex items-center gap-3 w-full px-4 py-3 mt-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all duration-200">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};
