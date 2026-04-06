import React from "react";
import { Search, Bell, ChevronDown, Moon, Sun } from "lucide-react";
import { useFinance } from "../context/FinanceContext";

export const Navbar = ({ title }) => {
  const { role, isDarkMode, toggleDarkMode } = useFinance();

  return (
    <header className="h-20 bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-40 px-8 flex items-center justify-between transition-colors duration-300">
      <div>
        <h1 className="text-xl font-bold text-foreground">{title}</h1>
        <p className="text-xs text-muted-foreground font-medium">Welcome back, Gopal Rai</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-muted border-none rounded-xl pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-border text-foreground transition-all"
          />
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2 text-muted-foreground hover:bg-muted rounded-xl transition-all"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button className="p-2 text-muted-foreground hover:bg-muted rounded-xl transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full border-2 border-card" />
          </button>
          
          <div className="h-8 w-px bg-border" />

          <button className="flex items-center gap-3 hover:bg-muted p-1.5 rounded-xl transition-all">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-foreground to-muted-foreground flex items-center justify-center text-background text-xs font-bold">
              GR
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-foreground">Gopal Rai</p>
              <p className="text-[10px] font-medium text-muted-foreground capitalize">{role}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};
