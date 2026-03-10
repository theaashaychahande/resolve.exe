import { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import {
  Upload,
  Database,
  BarChart3,
  Download,
  Menu,
  X,
  FileText,
  Bell,
  Search,
  ChevronDown,
  LogOut,
} from 'lucide-react';
import type { NavItem } from '@/types';

const navItems: NavItem[] = [
  { to: '/dashboard/upload', icon: Upload, label: 'Upload Document' },
  { to: '/dashboard/data', icon: Database, label: 'Extracted Data' },
  { to: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/dashboard/export', icon: Download, label: 'Export Data' },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── Sidebar ─────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: 'linear-gradient(180deg, #0B231A 0%, #2D5444 100%)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-lg bg-[#2D5444] flex items-center justify-center shadow-lg shadow-[#2D5444]/20">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <Link to="/" className="text-xl font-bold tracking-wide">
            DRISHTI
          </Link>
          <button
            className="ml-auto lg:hidden text-white/70 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="mt-6 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#2D5444] text-white shadow-lg shadow-[#2D5444]/30'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary-light font-semibold text-sm">
              AK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-white/40 truncate">admin@drishti.ai</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── Main content ────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center gap-4">
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1 flex items-center">
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Notifications */}
          <button className="relative text-gray-400 hover:text-gray-600 transition">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 text-sm hover:bg-primary-soft rounded-lg px-2 py-1.5 transition"
            >
              <div className="w-8 h-8 rounded-full bg-[#2D5444]/10 flex items-center justify-center text-[#2D5444] font-bold text-xs shadow-sm">
                AK
              </div>
              <span className="hidden sm:block text-gray-900 font-bold">Admin</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-border py-2 z-50">
                <Link
                  to="/"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={() => setProfileOpen(false)}
                >
                  <LogOut className="w-4 h-4" /> Sign out
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
