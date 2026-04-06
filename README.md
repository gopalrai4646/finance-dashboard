# Finovate Dashboard

A modern, clean, and highly interactive Finance Dashboard web application built with React and Tailwind CSS.

## ✨ Features

- **Financial Overview**: Real-time summary of balance, income, and expenses with trend indicators.
- **Interactive Charts**: Visual breakdown of spending categories and balance trends over time using Recharts.
- **Transaction Management**: Full CRUD operations (Add, Edit, Delete) for transactions with search and filtering capabilities.
- **Role-Based Access Control**: Toggle between **Admin** (full control) and **Viewer** (read-only) modes.
- **Smart Insights**: Automated financial health scoring and actionable insights based on spending patterns.
- **Premium UI/UX**: Minimalist design inspired by top SaaS products, featuring smooth animations with Framer Motion and responsive layouts.
- **Data Persistence**: LocalStorage integration to keep your data across sessions.
- **Export Functionality**: Export your transaction data as a JSON file.

## 🚀 Tech Stack

- **Frontend**: React 19 (Functional Components & Hooks)
- **Styling**: Tailwind CSS 4
- **Animations**: motion/react (Framer Motion)
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React Context API
- **Utilities**: clsx, tailwind-merge, date-fns

## 🛠️ How to Run Locally

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser at `http://localhost:3000`.

## 📝 Assumptions & Decisions

- **Mock Data**: The application uses a set of initial mock transactions to demonstrate functionality.
- **Role System**: The role switcher is a frontend-only implementation for demonstration purposes.
- **Responsive Design**: The sidebar is optimized for desktop, while the main content area adjusts for all screen sizes.
- **Color Palette**: Focused on neutral tones (Gray-900, Gray-50) with functional accents (Green-500 for income, Red-500 for expenses, Amber-500 for warnings).

## 📸 Screenshots

*(Placeholders for screenshots)*
- Dashboard Overview
- Transactions Table
- Smart Insights Panel
