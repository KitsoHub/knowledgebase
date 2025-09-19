// app/page.tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { culturalSites } from '@/app/utils/map/locations';
import { CulturalSite } from '@/lib/types/culturalSites';

// Dynamically load map (SSR-safe)
const SiteMap = dynamic(() => import('@/app/components/shared/map'), {
  loading: () => <div className="bg-gray-100 rounded-lg flex items-center justify-center">Loading map...</div>,
  ssr: false,
});

export default function ExplorerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [selectedSite, setSelectedSite] = useState<CulturalSite | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Only show public sites
  const publicSites = culturalSites.filter(site => site.metadata.sensitivityLevel === 'public');

  // Extract unique languages
  const uniqueLanguages = [...new Set(publicSites.map(s => s.language).filter(Boolean) as string[])];

  // Filtered sites
  const filteredSites = publicSites.filter(site => {
    const matchesSearch = 
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.tribe?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.language?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || site.category === categoryFilter;
    const matchesLanguage = languageFilter === 'all' || site.language === languageFilter;

    return matchesSearch && matchesCategory && matchesLanguage;
  });

  // Category helpers
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'heritage': return 'bg-amber-100 text-amber-800';
      case 'language': return 'bg-blue-100 text-blue-800';
      case 'botanical': return 'bg-green-100 text-green-800';
      case 'tribal': return 'bg-purple-100 text-purple-800';
      case 'migration': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'heritage': return '🏛️';
      case 'language': return '🗣️';
      case 'botanical': return '🌿';
      case 'tribal': return '👥';
      case 'migration': return '🛤️';
      default: return '📍';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="text-center py-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cultural Heritage Explorer</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover and explore publicly accessible cultural heritage sites across Africa.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto">
        
        {/* Left Panel: Filters & List */}
        <div className="lg:w-1/3 space-y-6">
          
          {/* Search & Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search sites, tribes, languages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Categories</option>
              <option value="heritage">Heritage Sites</option>
              <option value="language">Language Sites</option>
              <option value="botanical">Botanical Sites</option>
              <option value="tribal">Tribal Sites</option>
              <option value="migration">Migration Routes</option>
            </select>

            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Languages</option>
              {uniqueLanguages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                List
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold mb-3">Legend</h3>
            <div className="space-y-2">
              {(['heritage', 'language', 'botanical', 'tribal', 'migration'] as const).map(cat => {
                const count = filteredSites.filter(s => s.category === cat).length;
                return (
                  <div key={cat} className="flex items-center gap-2 text-sm">
                    <span className="text-lg">{getCategoryIcon(cat)}</span>
                    <span className="capitalize flex-1">{cat}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Site List */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 gap-4' : 'space-y-4'}>
            {filteredSites.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No sites match your criteria.</p>
            ) : viewMode === 'grid' ? (
              filteredSites.map(site => (
                <div
                  key={site.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer transition-shadow"
                  onClick={() => setSelectedSite(site)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getCategoryIcon(site.category)}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{site.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{site.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(site.category)}`}>
                          {site.category}
                        </span>
                        {site.language && (
                          <span className="text-xs text-gray-500">{site.language}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              filteredSites.map(site => (
                <div
                  key={site.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedSite(site)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{site.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{site.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(site.category)}`}>
                          {getCategoryIcon(site.category)} {site.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Panel: Map */}
        <div className="lg:w-2/3 h-[70vh] bg-white rounded-xl shadow-sm overflow-hidden">
          <SiteMap sites={filteredSites} zoom={5} />
        </div>
      </div>

      {/* Detail Modal */}
      {selectedSite && (
        <SiteDetailModal site={selectedSite} onClose={() => setSelectedSite(null)} />
      )}
    </div>
  );
}

// Reusable Modal Component
function SiteDetailModal({ site, onClose }: { site: CulturalSite; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl max-h-[90vh] overflow-y-auto w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{site.name}</h2>
            <button onClick={onClose} className="text-2xl">&times;</button>
          </div>
          <p className="text-gray-700 mb-4">{site.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong>Category:</strong> {site.category}</div>
            <div><strong>Language:</strong> {site.language || 'N/A'}</div>
            <div><strong>Tribe:</strong> {site.tribe || 'N/A'}</div>
            <div><strong>Location:</strong> {site.latitude}, {site.longitude}</div>
          </div>
          {site.metadata.unesco && (
            <div className="mt-4">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">UNESCO Listed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}