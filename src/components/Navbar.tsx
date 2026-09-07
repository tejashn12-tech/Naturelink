import React, { useState } from 'react';
import { ArrowRight, Menu, X, MapPin, Lock, ShieldCheck, LogOut } from 'lucide-react';
import { STORE_INFO, NAV_ITEMS } from '../data/storeData';

interface NavbarProps {
  onOpenQuote: () => void;
  isAdmin: boolean;
  unreadQuotesCount?: number;
  onOpenAdminLogin: () => void;
  onOpenAdminPanel: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuote,
  isAdmin,
  unreadQuotesCount = 0,
  onOpenAdminLogin,
  onOpenAdminPanel,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full pt-3 pb-3 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto mt-2 rounded-2xl bg-neutral-950/70 backdrop-blur-xl border border-white/10 shadow-2xl transition-all">
      <div className="flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-wider text-white uppercase group-hover:text-emerald-400 transition-colors">
              {STORE_INFO.name}
            </span>
            <span className="text-[10px] font-medium text-neutral-300 tracking-tight flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5 text-emerald-400" />
              Mysuru, Karnataka
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-5 lg:space-x-7 text-xs lg:text-sm font-medium text-neutral-300">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="hover:text-emerald-400 transition-colors py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Button & Admin Login */}
        <div className="hidden sm:flex items-center gap-2.5">
          {isAdmin ? (
            <div className="flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/40 rounded-full px-2.5 py-1 backdrop-blur-md">
              <button
                onClick={onOpenAdminPanel}
                className="text-[11px] font-bold text-emerald-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Admin Console</span>
                {unreadQuotesCount > 0 && (
                  <span className="bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full animate-pulse shadow-xs flex items-center gap-0.5">
                    <span>{unreadQuotesCount}</span>
                    <span className="text-[8px] font-mono uppercase">new</span>
                  </span>
                )}
              </button>
              <button
                onClick={onLogout}
                className="text-neutral-400 hover:text-rose-400 p-0.5 rounded cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              className="relative text-neutral-300 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-neutral-800/60 flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
              title="Admin Portal (ID: admin@123)"
            >
              <Lock className="w-3.5 h-3.5 text-neutral-400" />
              <span>Admin</span>
              {unreadQuotesCount > 0 && (
                <span className="inline-flex items-center gap-1 bg-amber-500 text-neutral-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping"></span>
                  <span>{unreadQuotesCount} New Quote{unreadQuotesCount > 1 ? 's' : ''}</span>
                </span>
              )}
            </button>
          )}

          <button
            onClick={onOpenQuote}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold pl-4 pr-1.5 py-2 rounded-full flex items-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            <span>Get Quote</span>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center sm:hidden gap-2">
          {isAdmin ? (
            <button
              onClick={onOpenAdminPanel}
              className="relative bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1"
            >
              <span>Admin</span>
              {unreadQuotesCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
              )}
            </button>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              className="relative text-neutral-300 text-[11px] font-medium px-2 py-1 flex items-center gap-1"
            >
              <Lock className="w-3.5 h-3.5" />
              {unreadQuotesCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              )}
            </button>
          )}

          <button
            onClick={onOpenQuote}
            className="bg-emerald-600 text-white text-[11px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1"
          >
            Quote
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-3 pt-3 pb-4 border-t border-white/10 bg-neutral-950/90 backdrop-blur-2xl rounded-2xl px-4 shadow-xl space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-neutral-200">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 hover:bg-neutral-800 rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            {isAdmin ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminPanel();
                }}
                className="text-xs font-bold text-emerald-300 flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Open Admin Control</span>
                {unreadQuotesCount > 0 && (
                  <span className="bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                    {unreadQuotesCount} new
                  </span>
                )}
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminLogin();
                }}
                className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Login Portal</span>
                {unreadQuotesCount > 0 && (
                  <span className="bg-amber-500 text-neutral-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {unreadQuotesCount} new
                  </span>
                )}
              </button>
            )}

            {isAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="text-xs text-rose-400 font-semibold"
              >
                Logout
              </button>
            )}
          </div>

          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full bg-emerald-600 text-white text-xs font-semibold py-2.5 px-4 rounded-full flex items-center justify-center gap-2"
            >
              <span>Calculate Delivery & Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
