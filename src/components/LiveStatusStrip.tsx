import React from 'react';
import { useSociety } from '../context/SocietyContext';
import { Droplets, Zap, Shield, Bell, ChevronRight, Activity } from 'lucide-react';

export const LiveStatusStrip: React.FC = () => {
  const { setActiveTab } = useSociety();

  return (
    <div className="w-full bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 text-xs">
          {/* Status indicators */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {/* Daily Supervisor Inspection Live Feed */}
            <button
              onClick={() => setActiveTab('inspection')}
              className="flex items-center gap-2 group text-left hover:text-teal-300 transition-colors cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
              </span>
              <span className="font-semibold text-slate-300 group-hover:text-teal-200">Daily Supervisor Inspection:</span>
              <span className="text-teal-400 font-medium">Day 2 (31/33 OK)</span>
              <span className="text-slate-400 text-[11px] hidden sm:inline">· 33 Point Protocol Live</span>
            </button>
          </div>

          {/* Society Notice Flash */}
          <div className="flex items-center gap-2 text-slate-300 bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700/60 justify-between sm:justify-start">
            <div className="flex items-center gap-2 truncate">
              <Bell className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span className="font-medium text-slate-200 truncate">
                Notice: 14th AGM on Sunday 10:00 AM at Clubhouse
              </span>
            </div>
            <button
              onClick={() => setActiveTab('committee')}
              className="text-teal-400 hover:text-teal-300 flex items-center shrink-0 font-medium ml-1 cursor-pointer"
            >
              <span>Details</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
