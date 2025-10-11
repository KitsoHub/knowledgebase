
'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { culturalSites } from '@/app/utils/map/locations';
import { CulturalSite } from '@/lib/types/culturalSites';
import { motion } from 'framer-motion';

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
  const [mapCenter, setMapCenter] = useState<{ latitude: number; longitude: number }>({
    latitude: -22.3285, // Default to Botswana's center
    longitude: 24.6849,
  });
  const [mapZoom, setMapZoom] = useState(6); // Default zoom level

  // Only show public sites in Botswana
  const publicSites = culturalSites.filter(
    site =>
      site.metadata.sensitivityLevel === 'public' &&
      site.latitude >= -26.9 &&
      site.latitude <= -17.8 &&
      site.longitude >= 20.0 &&
      site.longitude <= 29.4
  );

  // Extract unique categories and languages
  const uniqueCategories = [...new Set(publicSites.map(site => site.category))];
  const uniqueLanguages = [...new Set(publicSites.map(site => site.language).filter(Boolean) as string[])];

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

  // Handle search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // Find the first matching site and update the map center and zoom
    const matchingSite = publicSites.find(site =>
      site.name.toLowerCase().includes(query.toLowerCase()) ||
      site.description.toLowerCase().includes(query.toLowerCase()) ||
      site.tribe?.toLowerCase().includes(query.toLowerCase()) ||
      site.language?.toLowerCase().includes(query.toLowerCase())
    );

    if (matchingSite) {
      setMapCenter({ latitude: matchingSite.latitude, longitude: matchingSite.longitude });
      setMapZoom(12); // Zoom in closer to the site
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 mt-28">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 p-8 md:p-12 text-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,64,175,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(202,138,4,0.1),transparent_50%)]" />

        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1.1, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }}
          className="inline-block mb-4"
        >
        </motion.div>

        <h1 className="text-4xl md:text-5xl mb-4">Cultural Heritage Explorer</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover and explore publicly accessible cultural heritage sites in Botswana.
        </p>
      </motion.div>

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
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Categories</option>
              {uniqueCategories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Languages</option>
              {uniqueLanguages.map(language => (
                <option key={language} value={language}>
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Site List */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h3 className="font-semibold text-lg">Filtered Sites</h3>
            {filteredSites.length === 0 ? (
              <p className="text-gray-500">No sites match your criteria.</p>
            ) : (
              filteredSites.map(site => (
                <div
                  key={site.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedSite(site)}
                >
                  <h4 className="font-medium">{site.name}</h4>
                  <p className="text-sm text-gray-600">{site.description.substring(0, 100)}...</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Panel: Map */}
        <div className="lg:w-2/3 h-[70vh] bg-white rounded-xl shadow-sm overflow-hidden">
          <SiteMap sites={filteredSites} center={[mapCenter.latitude, mapCenter.longitude]} zoom={mapZoom} />
        </div>
      </div>
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
            <button onClick={onClose} className="text-2xl">
              &times;
            </button>
          </div>
          <p className="text-gray-700 mb-4">{site.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Category:</strong> {site.category}
            </div>
            <div>
              <strong>Language:</strong> {site.language || 'N/A'}
            </div>
            <div>
              <strong>Tribe:</strong> {site.tribe || 'N/A'}
            </div>
            <div>
              <strong>Location:</strong> {site.latitude}, {site.longitude}
            </div>
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
