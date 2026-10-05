import React from 'react';
import { useSociety } from '../../context/SocietyContext';
import {
  Wrench,
  Calendar,
  ArrowRight,
  ClipboardCheck,
  Car,
  FolderOpen,
  Image as ImageIcon,
} from 'lucide-react';
import { PublicLandingView } from './PublicLandingView';
import { CommunityPollsSection } from '../polls/CommunityPollsSection';
import { CampusSiteMap } from '../campus/CampusSiteMap';
import heroImage from '../../assets/images/hero_solitaire_society_1790929946633.jpg';

export const HomeView: React.FC = () => {
  const {
    setActiveTab,
    setIsBookingModalOpen,
    setIsBookingModalOpen: _setBooking,
    setTargetAmenity,
    notices,
    role,
    isAuthenticated,
    isPendingApproval,
    userFlat,
    openLoginModal,
  } = useSociety();

  // If unauthenticated visitor, display Public Landing Page
  if (!isAuthenticated) {
    return (
      <PublicLandingView
        onOpenLogin={() => openLoginModal('login')}
        onOpenRegister={() => openLoginModal('register')}
      />
    );
  }

  const handleOpenAmenity = (amenity: 'pool' | 'gym' | 'clubhouse' | 'play_area') => {
    setTargetAmenity(amenity);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="space-y-10 pb-16 animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-md">
        <div className="relative h-[400px] md:h-[460px] w-full overflow-hidden">
          <img
            src={heroImage}
            alt="Solitaire Cooperative Housing Society Architecture"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-75 hover:scale-105 transition-transform duration-700 ease-out"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 max-w-4xl text-white">
            <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
              Registration No. PNA/HSG/TC/12492/2018 · Towers A, B & C
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight mb-3">
              Solitaire CHS Resident Operations & Governance
            </h1>
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed mb-6 font-normal">
              Automated FastTag gate logistics, verified single-member-per-flat occupancy, multi-item vendor procurement, and community living.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('inspection')}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>Supervisor Checklist</span>
              </button>
              <button
                onClick={() => setActiveTab('helpdesk')}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white border border-white/20 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Wrench className="w-4 h-4 text-teal-300" />
                <span>Helpdesk Tickets</span>
              </button>
              <button
                onClick={() => setActiveTab('parking')}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white border border-white/20 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Car className="w-4 h-4 text-teal-300" />
                <span>Parking & FastTag Bays</span>
              </button>
              <button
                onClick={() => setActiveTab('amenities')}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white border border-white/20 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Amenities</span>
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white border border-white/20 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <ImageIcon className="w-4 h-4 text-teal-300" />
                <span>Society Gallery</span>
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className="px-4 py-2.5 text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <FolderOpen className="w-4 h-4 text-teal-300" />
                <span>Document Repository</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Society Overview & Towers Configuration */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Towers Configuration & Predefined Units (Tower A, Tower B, Tower C)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            180 Residential units strictly bound by the 1 Member Per Flat rule.
          </p>
        </div>

        {/* Interactive Vector Architectural Site Map with Real-time Occupancy Indicators */}
        <CampusSiteMap />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Tower A */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-slate-300 transition-colors space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider block">Wing 1</span>
                <h3 className="text-lg font-bold text-slate-900">Tower A</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md">
                60 Units (101 to 1504)
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              60 Residential units spanning 15 floors. 2 & 3 BHK configurations. 2 Otis passenger elevators + dual utility shafts + covered stilt & basement parking bays.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Occupancy: <strong className="text-slate-800 tabular-nums">98% Verified</strong></span>
              <span>FastTag Bays: <strong className="text-slate-800 tabular-nums">P-A-101 to P-A-130</strong></span>
            </div>
          </div>

          {/* Tower B */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-slate-300 transition-colors space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wider block">Wing 2</span>
                <h3 className="text-lg font-bold text-slate-900">Tower B</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md">
                60 Units (101 to 1504)
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              60 Residential units spanning 15 floors. Garden facing balconies. Dedicated service elevator with medical stretcher clearance + FastTag RFID gate integration.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Occupancy: <strong className="text-slate-800 tabular-nums">95% Verified</strong></span>
              <span>FastTag Bays: <strong className="text-slate-800 tabular-nums">P-B-101 to P-B-130</strong></span>
            </div>
          </div>

          {/* Tower C */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-slate-300 transition-colors space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">Wing 3</span>
                <h3 className="text-lg font-bold text-slate-900">Tower C</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 bg-teal-50 text-teal-700 border border-teal-200 rounded-md">
                60 Units (101 to 1504)
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              60 Residential units spanning 15 floors. Modern layout with dual high-speed elevators, pressurized fire refuge shafts, and dedicated EV charging bays.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Occupancy: <strong className="text-slate-800 tabular-nums">Handover Active</strong></span>
              <span>FastTag Bays: <strong className="text-slate-800 tabular-nums">P-C-101 to P-C-130</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Community Polls & Society Voting with Live D3 Visualizations */}
      <CommunityPollsSection />

      {/* Official Bulletins */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Managing Committee Official Bulletins</h2>
            <p className="text-xs text-slate-500">Important dates, circulars, and community notices.</p>
          </div>
          <button
            onClick={() => setActiveTab('documents')}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 cursor-pointer"
          >
            All Circulars &rarr;
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {notices.map((notice) => (
            <div key={notice.id} className="py-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-900 hover:text-teal-700 cursor-pointer">
                    {notice.title}
                  </span>
                  {notice.urgent && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                      Important
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">{notice.summary}</p>
              </div>
              <div className="text-xs text-slate-400 sm:text-right shrink-0">
                <span className="tabular-nums font-medium text-slate-600">{notice.date}</span>
                <span className="block text-[11px] text-slate-400 capitalize">{notice.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
