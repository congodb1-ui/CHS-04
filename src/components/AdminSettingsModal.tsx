import React, { useState, useEffect } from 'react';
import { useSociety } from '../context/SocietyContext';
import {
  X,
  Settings,
  Building2,
  FileText,
  ShieldCheck,
  LifeBuoy,
  Bell,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  Layers,
  Image,
} from 'lucide-react';
import { SocietyProfileDetails } from '../types';
import layoutImg from '../assets/images/solitaire_layout_1791127831982.jpg';
import clubhouseImg from '../assets/images/solitaire_clubhouse_1791127802446.jpg';
import amenitiesImg from '../assets/images/solitaire_amenities_1791127816486.jpg';

export const AdminSettingsModal: React.FC = () => {
  const {
    societyDetails,
    updateSocietyDetails,
    isSocietySettingsModalOpen,
    closeSocietySettingsModal,
    defaultTermsAndConditions,
    updateDefaultTermsAndConditions,
    resetDefaultTermsAndConditions,
    role,
  } = useSociety();

  const [activeTab, setActiveTab] = useState<'identity' | 'procurement' | 'registration' | 'sla' | 'announcements'>('identity');
  const [formData, setFormData] = useState<SocietyProfileDetails>(societyDetails);
  const [termsList, setTermsList] = useState<string[]>(defaultTermsAndConditions);
  const [newTermInput, setNewTermInput] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  useEffect(() => {
    setFormData(societyDetails);
  }, [societyDetails]);

  useEffect(() => {
    setTermsList(defaultTermsAndConditions);
  }, [defaultTermsAndConditions]);

  if (!isSocietySettingsModalOpen) return null;

  // Authorization check - only Admin or MC Member
  const isAuthorized = role === 'admin' || role === 'mc_member' || role === 'secretary';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSocietyDetails(formData);
    updateDefaultTermsAndConditions(termsList);
    setSaveSuccessMsg(true);
    setTimeout(() => {
      setSaveSuccessMsg(false);
    }, 3000);
  };

  const handleAddTerm = () => {
    if (!newTermInput.trim()) return;
    setTermsList([...termsList, newTermInput.trim()]);
    setNewTermInput('');
  };

  const handleRemoveTerm = (index: number) => {
    setTermsList(termsList.filter((_, i) => i !== index));
  };

  const handleResetTerms = () => {
    resetDefaultTermsAndConditions();
    setTermsList(societyDetails.workOrderDefaults?.defaultTerms || []);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden my-auto">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600/30 border border-teal-500/40 flex items-center justify-center text-teal-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">Society Global Administration & Executive Settings</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30">
                  RERA P52100008192
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Configure identity branding, procurement defaults, registration policies, and live parameters for Kool Homes Solitaire CHS.
              </p>
            </div>
          </div>
          <button
            onClick={closeSocietySettingsModal}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-4 sm:px-6 pt-3 border-b border-slate-200 bg-slate-50/80 overflow-x-auto text-xs font-semibold shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('identity')}
            className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'identity' ? 'border-teal-700 text-teal-900 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Society Identity & Campus</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('procurement')}
            className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'procurement' ? 'border-teal-700 text-teal-900 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Work Orders & Terms</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('registration')}
            className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'registration' ? 'border-teal-700 text-teal-900 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Registration & Flat Rules</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sla')}
            className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'sla' ? 'border-teal-700 text-teal-900 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Helpdesk & SLAs</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('announcements')}
            className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'announcements' ? 'border-teal-700 text-teal-900 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Live Announcements</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs">
          {saveSuccessMsg && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-center justify-between animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold">Global Society Settings Updated & Synchronized Successfully!</span>
              </div>
              <span className="text-[11px] text-emerald-700">Reflecting across all portals</span>
            </div>
          )}

          {!isAuthorized && (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>You are viewing society settings in read-only preview. Sign in as Admin or MC Member to apply live updates.</span>
            </div>
          )}

          {/* TAB 1: SOCIETY IDENTITY & CAMPUS */}
          {activeTab === 'identity' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Society Registered Name <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:outline-teal-700 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    MahaRERA Registration ID <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.reraRegNo || 'P52100008192'}
                    onChange={(e) => setFormData({ ...formData, reraRegNo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold focus:outline-teal-700 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Co-op Society Registration No <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.societyRegNo}
                    onChange={(e) => setFormData({ ...formData, societyRegNo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold focus:outline-teal-700 focus:bg-white"
                  />
                </div>
              </div>

              {/* Campus Infrastructure Dimensions */}
              <div className="p-4 bg-teal-50/50 border border-teal-100 rounded-xl space-y-3">
                <span className="font-bold text-teal-950 uppercase tracking-wider text-[11px] block">
                  Campus Specifications (Kausar Baugh, NIBM)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Land Area <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.landArea || '1.24 Acres'}
                      onChange={(e) => setFormData({ ...formData, landArea: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-teal-200 rounded-lg text-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Residential Towers <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.activeTowers.join(', ')}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          activeTowers: e.target.value.split(',').map((s) => s.trim()),
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-teal-200 rounded-lg text-slate-900 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Floors per Tower <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.totalFloors || 6}
                      onChange={(e) => setFormData({ ...formData, totalFloors: Number(e.target.value) || 6 })}
                      className="w-full px-3 py-2 bg-white border border-teal-200 rounded-lg text-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Total Units <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.totalUnits}
                      onChange={(e) => setFormData({ ...formData, totalUnits: Number(e.target.value) || 200 })}
                      className="w-full px-3 py-2 bg-white border border-teal-200 rounded-lg text-slate-900 font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Street & Premise Address <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.addressLine}
                    onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-teal-700 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Sub-Locality & Landmark <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subLocality}
                    onChange={(e) => setFormData({ ...formData, subLocality: e.target.value, landmark: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-teal-700 focus:bg-white"
                  />
                </div>
              </div>

              {/* City, State, Pin */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    City <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    State <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Postal Pincode <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold"
                  />
                </div>
              </div>

              {/* Helpline & Contacts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Security Gate Helpline <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.securityGatePhone}
                    onChange={(e) => setFormData({ ...formData, securityGatePhone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Estate Office Phone <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.estateOfficePhone}
                    onChange={(e) => setFormData({ ...formData, estateOfficePhone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Official Email <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.officialEmail}
                    onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              {/* Bank & Maintenance */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Bank Name <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Bank Account No <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.bankAccountNo}
                    onChange={(e) => setFormData({ ...formData, bankAccountNo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    IFSC Code <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.bankIFSC}
                    onChange={(e) => setFormData({ ...formData, bankIFSC: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Maintenance Rate (₹/sq ft) <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    required
                    value={formData.maintenancePerSqFt}
                    onChange={(e) => setFormData({ ...formData, maintenancePerSqFt: Number(e.target.value) || 3.85 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold"
                  />
                </div>
              </div>

              {/* Campus Master Image Assets Showcase */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block">
                  Connected Society Visual Assets
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-200 text-center">
                    <img src={layoutImg} alt="Society Layout" className="w-full h-24 object-cover rounded-md mb-1.5" />
                    <span className="font-semibold text-[11px] text-slate-800 block">Master Layout Plan</span>
                    <span className="text-[10px] text-slate-500">1.24 Acres · 3 Towers</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200 text-center">
                    <img src={clubhouseImg} alt="Club House" className="w-full h-24 object-cover rounded-md mb-1.5" />
                    <span className="font-semibold text-[11px] text-slate-800 block">Modern Club House</span>
                    <span className="text-[10px] text-slate-500">Banquet & Terrace</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200 text-center">
                    <img src={amenitiesImg} alt="Amenities Courtyard" className="w-full h-24 object-cover rounded-md mb-1.5" />
                    <span className="font-semibold text-[11px] text-slate-800 block">Courtyard & Amphitheater</span>
                    <span className="text-[10px] text-slate-500">Pool, Deck & Play Area</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WORK ORDER & PROCUREMENT DEFAULTS */}
          {activeTab === 'procurement' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Default GST Preset (%) <span className="text-red-500 font-bold">*</span>
                  </label>
                  <select
                    value={formData.workOrderDefaults?.defaultGstPercent || 18}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        workOrderDefaults: {
                          ...(formData.workOrderDefaults || { defaultTerms: [], defaultGstPercent: 18, approvalThresholdAmount: 50000 }),
                          defaultGstPercent: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold"
                  >
                    <option value={18}>18% (Standard Works Contract)</option>
                    <option value={12}>12% (Construction Materials / Repair)</option>
                    <option value={5}>5% (Specified Services)</option>
                    <option value={0}>0% (Exempt)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Secretary Approval Threshold (₹) <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="number"
                    step="5000"
                    required
                    value={formData.workOrderDefaults?.approvalThresholdAmount || 50000}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        workOrderDefaults: {
                          ...(formData.workOrderDefaults || { defaultTerms: [], defaultGstPercent: 18, approvalThresholdAmount: 50000 }),
                          approvalThresholdAmount: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Quotes above this amount require formal Managing Committee resolution.
                  </span>
                </div>
              </div>

              {/* Customizable Legal Terms & Conditions List Editor */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 text-xs block">
                      Customizable Work Order Terms & Conditions Editor
                    </span>
                    <span className="text-[11px] text-slate-500">
                      These clauses are automatically injected into all newly generated work orders and vendor contracts.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetTerms}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer font-medium"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset to Bylaws Default</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {termsList.map((term, index) => (
                    <div
                      key={index}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-bold text-teal-700 mt-0.5">#{index + 1}</span>
                        <p className="text-slate-800 leading-relaxed font-medium">{term}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveTerm(index)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded-md cursor-pointer shrink-0 transition-colors"
                        title="Remove term"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Custom Clause */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Add custom legal clause, defect liability condition, or safety protocol..."
                    value={newTermInput}
                    onChange={(e) => setNewTermInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTerm();
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs focus:bg-white focus:outline-teal-700"
                  />
                  <button
                    type="button"
                    onClick={handleAddTerm}
                    className="px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-bold text-xs cursor-pointer flex items-center gap-1.5 shrink-0 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Term</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REGISTRATION & FLAT RULES */}
          {activeTab === 'registration' && (
            <div className="space-y-5">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <span className="font-bold text-slate-900 text-xs block">Resident Onboarding Policies</span>

                {/* Single Member Per Flat Toggle */}
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.registrationRules?.enforceOneMemberPerFlat ?? true}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationRules: {
                          ...(formData.registrationRules || { enforceOneMemberPerFlat: true, autoApproveOwners: false, defaultTowers: ['Tower A', 'Tower B', 'Tower C'] }),
                          enforceOneMemberPerFlat: e.target.checked,
                        },
                      })
                    }
                    className="rounded border-slate-300 text-teal-700 focus:ring-teal-700 w-4 h-4 mt-0.5"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">Strict 1-Primary-Member Constraint per Flat</span>
                    <span className="text-[11px] text-slate-500 leading-relaxed block">
                      Enforces exactly 1 registered primary account per residential flat (A-101 to B-1504). Prevents unauthorized secondary duplicates until reviewed by MC.
                    </span>
                  </div>
                </label>

                {/* Auto Approve Owners */}
                <label className="flex items-start gap-3 cursor-pointer select-none pt-2 border-t border-slate-200">
                  <input
                    type="checkbox"
                    checked={formData.registrationRules?.autoApproveOwners ?? false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationRules: {
                          ...(formData.registrationRules || { enforceOneMemberPerFlat: true, autoApproveOwners: false, defaultTowers: ['Tower A', 'Tower B', 'Tower C'] }),
                          autoApproveOwners: e.target.checked,
                        },
                      })
                    }
                    className="rounded border-slate-300 text-teal-700 focus:ring-teal-700 w-4 h-4 mt-0.5"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">Instant Verification for Registered Flat Owners</span>
                    <span className="text-[11px] text-slate-500 leading-relaxed block">
                      When disabled (recommended), all owner registrations require explicit Secretary/Admin approval in Resident Registry before unlocking full features.
                    </span>
                  </div>
                </label>
              </div>

              {/* Supported Towers List */}
              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Active Towers in Scope <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.registrationRules?.defaultTowers?.join(', ') || 'Tower A, Tower B, Tower C'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      registrationRules: {
                        ...(formData.registrationRules || { enforceOneMemberPerFlat: true, autoApproveOwners: false, defaultTowers: [] }),
                        defaultTowers: e.target.value.split(',').map((s) => s.trim()),
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Comma-separated list of recognized towers for flat registration selectors.
                </span>
              </div>
            </div>
          )}

          {/* TAB 4: HELPDESK & SLAS */}
          {activeTab === 'sla' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Recognized Ticket Statuses <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slaSettings?.ticketStatuses?.join(', ') || 'Open, In Progress, Resolved, Closed'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        slaSettings: {
                          ...(formData.slaSettings || { ticketStatuses: [], priorityLevels: [], defaultTechnicianRole: 'Estate Technical Supervisor' }),
                          ticketStatuses: e.target.value.split(',').map((s) => s.trim()),
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Priority Levels <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slaSettings?.priorityLevels?.join(', ') || 'Low, Normal, Urgent, Critical Emergency'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        slaSettings: {
                          ...(formData.slaSettings || { ticketStatuses: [], priorityLevels: [], defaultTechnicianRole: 'Estate Technical Supervisor' }),
                          priorityLevels: e.target.value.split(',').map((s) => s.trim()),
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Default Assigned Technician / Desk Role <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.slaSettings?.defaultTechnicianRole || 'Estate Technical Supervisor'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slaSettings: {
                        ...(formData.slaSettings || { ticketStatuses: [], priorityLevels: [], defaultTechnicianRole: '' }),
                        defaultTechnicianRole: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold"
                />
              </div>
            </div>
          )}

          {/* TAB 5: LIVE ANNOUNCEMENTS */}
          {activeTab === 'announcements' && (
            <div className="space-y-5">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">Community Broadcast Banner</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.announcementBanner?.enabled ?? true}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          announcementBanner: {
                            ...(formData.announcementBanner || { enabled: true, message: '', type: 'info' }),
                            enabled: e.target.checked,
                          },
                        })
                      }
                      className="rounded border-slate-300 text-teal-700 focus:ring-teal-700 w-4 h-4"
                    />
                    <span className="font-bold text-xs text-slate-800">Display Live on Header / Portal</span>
                  </label>
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Announcement Banner Text <span className="text-red-500 font-bold">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.announcementBanner?.message || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        announcementBanner: {
                          ...(formData.announcementBanner || { enabled: true, message: '', type: 'info' }),
                          message: e.target.value,
                        },
                      })
                    }
                    placeholder="Enter urgent society circular, water supply alert, or AGM notice..."
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-medium text-xs focus:outline-teal-700"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Banner Styling Severity <span className="text-red-500 font-bold">*</span>
                  </label>
                  <select
                    value={formData.announcementBanner?.type || 'info'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        announcementBanner: {
                          ...(formData.announcementBanner || { enabled: true, message: '', type: 'info' }),
                          type: e.target.value as any,
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-semibold"
                  >
                    <option value="info">Information (Blue / Slate Banner)</option>
                    <option value="warning">Maintenance Alert (Amber / Orange Banner)</option>
                    <option value="alert">Emergency Circular (Red Banner)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
            <span className="text-[11px] text-slate-500">
              Changes update state immediately and persist locally across sessions.
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeSocietySettingsModal}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-medium cursor-pointer transition-colors"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={!isAuthorized}
                className="px-5 py-2 bg-teal-700 hover:bg-teal-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save All Global Settings</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
