import React, { useState, useMemo } from 'react';
import { useSociety } from '../../context/SocietyContext';
import {
  Image as ImageIcon,
  Plus,
  Lock,
  Globe,
  Edit2,
  Trash2,
  X,
  Upload,
  CheckCircle2,
  Filter,
  Eye,
  Camera,
  Layers,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { SocietyGalleryItem } from '../../types';

export const SocietyGalleryView: React.FC = () => {
  const {
    role,
    galleryItems,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    userName,
  } = useSociety();

  const isAdminOrMC = role === 'admin' || role === 'mc_member' || role === 'secretary';

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<SocietyGalleryItem | null>(null);

  // Admin Modal States
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<SocietyGalleryItem | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    visibility: 'Public' | 'Private';
  }>({
    title: '',
    description: '',
    imageUrl: '',
    category: 'Amenities',
    visibility: 'Public',
  });

  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // All categories available
  const categories = ['All', 'Amenities', 'Architecture', 'Fitness', 'Utilities', 'Grounds', 'Campus Layout'];

  // Filter items based on user role and selected category
  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      // Non-admins can only see Public photos
      if (!isAdminOrMC && item.visibility === 'Private') {
        return false;
      }
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [galleryItems, isAdminOrMC, selectedCategory]);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      category: 'Amenities',
      visibility: 'Public',
    });
    setShowAddModal(true);
  };

  const handleOpenEditModal = (item: SocietyGalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      category: item.category || 'Amenities',
      visibility: item.visibility,
    });
    setShowAddModal(true);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.imageUrl.trim()) {
      alert('Photo title and image are required.');
      return;
    }

    if (editingItem) {
      await updateGalleryItem(editingItem.id, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        imageUrl: formData.imageUrl.trim(),
        category: formData.category,
        visibility: formData.visibility,
      });
      setFeedbackMsg('Gallery photo updated successfully');
    } else {
      await addGalleryItem({
        title: formData.title.trim(),
        description: formData.description.trim(),
        imageUrl: formData.imageUrl.trim(),
        category: formData.category,
        visibility: formData.visibility,
        uploadedBy: userName || 'Estate Office',
      });
      setFeedbackMsg('New photo added to society gallery');
    }

    setShowAddModal(false);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleToggleVisibility = async (item: SocietyGalleryItem) => {
    const newVis = item.visibility === 'Public' ? 'Private' : 'Public';
    await updateGalleryItem(item.id, { visibility: newVis });
    setFeedbackMsg(`Visibility changed to ${newVis} for "${item.title}"`);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleDelete = async (item: SocietyGalleryItem) => {
    if (window.confirm(`Are you sure you want to delete "${item.title}" from the society gallery?`)) {
      await deleteGalleryItem(item.id);
      if (activeLightboxItem?.id === item.id) setActiveLightboxItem(null);
      setFeedbackMsg('Photo deleted from gallery');
      setTimeout(() => setFeedbackMsg(null), 3000);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner & Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
            <ImageIcon className="w-3.5 h-3.5 text-teal-600" />
            <span>Campus Visual Showcase</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Society Photo Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            High-definition photographs and facilities directory for Kool Homes Solitaire CHS Ltd.
            {isAdminOrMC && ' Administrators can manage and configure Public vs Private photo access controls.'}
          </p>
        </div>

        {isAdminOrMC && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>+ Upload Photo</span>
            </button>
          </div>
        )}
      </div>

      {/* Feedback banner */}
      {feedbackMsg && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Category Filter Pills & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium self-end sm:self-auto">
          <span>Showing <strong>{filteredItems.length}</strong> photos</span>
          {isAdminOrMC && (
            <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-mono">
              Admin Mode
            </span>
          )}
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No photos in this category</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {isAdminOrMC
              ? 'Click "+ Upload Photo" to add images to this section.'
              : 'There are currently no public photos listed under this category.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Image Container with Badges */}
              <div
                className="relative aspect-16/10 overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => setActiveLightboxItem(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Category Pill */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-xs shadow-xs">
                    {item.category || 'Facility'}
                  </span>
                </div>

                {/* Visibility Badge */}
                <div className="absolute top-3 right-3">
                  {item.visibility === 'Public' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-600/90 text-white backdrop-blur-xs shadow-xs">
                      <Globe className="w-3 h-3" />
                      <span>Public</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-600/90 text-white backdrop-blur-xs shadow-xs">
                      <Lock className="w-3 h-3" />
                      <span>Private (Admin/MC)</span>
                    </span>
                  )}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-lg bg-white/90 text-slate-900 text-xs font-bold backdrop-blur-xs flex items-center gap-1.5 shadow-sm">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Photo</span>
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h3
                    onClick={() => setActiveLightboxItem(item)}
                    className="text-sm font-bold text-slate-900 group-hover:text-teal-800 transition-colors cursor-pointer line-clamp-1"
                    title={item.title}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.description || 'Community facility and grounds photograph.'}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{item.uploadedBy || 'Estate Office'}</span>
                  <span>{item.createdAt}</span>
                </div>

                {/* Admin Management Controls */}
                {isAdminOrMC && (
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    {/* Visibility Switch Toggle */}
                    <button
                      type="button"
                      onClick={() => handleToggleVisibility(item)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer border ${
                        item.visibility === 'Public'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                      }`}
                      title="Toggle Visibility between Public and Private"
                    >
                      {item.visibility === 'Public' ? (
                        <>
                          <Globe className="w-3 h-3 text-emerald-600" />
                          <span>Public (Switch)</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3 h-3 text-amber-600" />
                          <span>Private (Switch)</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(item)}
                        className="p-1.5 text-slate-600 hover:text-teal-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="Edit description or details"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete photo from gallery"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveLightboxItem(null);
          }}
        >
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[90vh]">
            <div className="p-4 flex items-center justify-between text-white border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 text-[10px] font-bold uppercase tracking-wider border border-teal-500/30">
                  {activeLightboxItem.category}
                </span>
                <h3 className="text-sm sm:text-base font-bold truncate max-w-md">
                  {activeLightboxItem.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 bg-black flex items-center justify-center overflow-hidden p-2">
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                className="max-h-[65vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>

            <div className="p-4 bg-slate-900 text-white space-y-1 border-t border-slate-800">
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeLightboxItem.description}
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Uploaded by: {activeLightboxItem.uploadedBy}</span>
                <span>Date: {activeLightboxItem.createdAt}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Add / Edit Modal */}
      {showAddModal && isAdminOrMC && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAddModal(false);
          }}
        >
          <div className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-teal-600 rounded-lg text-white">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">
                    {editingItem ? 'Edit Gallery Photo' : 'Upload New Society Photo'}
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    Sync to Supabase society_gallery with Public vs Private controls
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Photo Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Semi-Olympic Swimming Pool"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs font-medium focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs font-semibold focus:border-teal-600 focus:outline-none"
                  >
                    <option value="Amenities">Amenities</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Grounds">Grounds</option>
                    <option value="Campus Layout">Campus Layout</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Visibility Control <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.visibility}
                    onChange={(e) =>
                      setFormData({ ...formData, visibility: e.target.value as 'Public' | 'Private' })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs font-semibold focus:border-teal-600 focus:outline-none"
                  >
                    <option value="Public">Public (All Residents & Visitors)</option>
                    <option value="Private">Private (Admins & MC Only)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Description / Caption
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief description of the facility, timings, or features..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs font-medium focus:border-teal-600 focus:outline-none"
                />
              </div>

              {/* Image Input: URL or File */}
              <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="font-semibold text-slate-800 block text-xs">
                  Image Source <span className="text-red-500">*</span>
                </label>

                <div className="space-y-2">
                  <input
                    type="url"
                    placeholder="Enter image URL (https://...)"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-xs font-medium focus:border-teal-600 focus:outline-none"
                  />

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-400">or upload directly:</span>
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer shadow-2xs">
                      <Upload className="w-3.5 h-3.5 text-slate-500" />
                      <span>Choose Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {formData.imageUrl && (
                  <div className="mt-2 relative w-full h-32 rounded-lg overflow-hidden border border-slate-300 bg-slate-200">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl font-medium cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold cursor-pointer shadow-sm transition-all flex items-center gap-1.5"
                >
                  {editingItem ? 'Save Updates' : 'Add to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
