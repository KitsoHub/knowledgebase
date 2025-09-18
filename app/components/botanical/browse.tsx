import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react';
import { mockPlants } from '@/app/utils/mock/botanical';
import { MedicinalPlant } from '@/lib/types/botanical';
import PlantCard from './plant-card';
import { Button } from '../ui/button';
import { PlantModal } from './plant-modal';
import { ChevronUp, LucideArrowLeft } from 'lucide-react';
import BotanicalSearchBar from './search-bar';
import { useRouter } from 'next/navigation';

export default function BotanicalBrowse() {

  const [botanicalData, setBotanicalData] = useState<MedicinalPlant[]>(mockPlants);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('All Families');
  const [selectedOrigin, setSelectedOrigin] = useState('All Origins');
  const [selectedPartUsed, setSelectedPartUsed] = useState('All Parts');
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [selectedPlant, setSelectedPlant] = useState<MedicinalPlant | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const router = useRouter();

  const plantsPerPage = 6;

  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedFamily, selectedOrigin, selectedPartUsed, selectedCondition]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedFamily('All Families');
    setSelectedOrigin('All Origins');
    setSelectedPartUsed('All Parts');
    setSelectedCondition('All Conditions');
  };

  // Filter plants based on search and filters
  const filteredPlants = useMemo(() => {
    return botanicalData.filter((plant) => {
      const matchesSearch =
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.medicinalQualities.some(quality =>
          quality.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        plant.traditionalUses.some(use =>
          use.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesFamily = selectedFamily === 'All Families' || plant.family === selectedFamily;
      const matchesOrigin = selectedOrigin === 'All Origins' || plant.origin === selectedOrigin;
      const matchesPartUsed = selectedPartUsed === 'All Parts' ||
        plant.partsUsed.some(part => part === selectedPartUsed);

      return matchesSearch && matchesFamily && matchesOrigin && matchesPartUsed;
    });
  }, [botanicalData, searchTerm, selectedFamily, selectedOrigin, selectedPartUsed]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">


      <div className="container mx-auto px-4 py-8">
        <Button
          onClick={() => router.back()}
          variant={'ghost'}
          size="icon"
          className="mb-9"
        >
          <LucideArrowLeft size={20} />
        </Button>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >

          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-500 from-primary to-primary/80 rounded-2xl flex items-center justify-center text-2xl">
              🌿
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-green-600 to-emerald-500 bg-clip-text text-transparent">
              Botanical Explorer
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the healing power of nature with our comprehensive database of medicinal plants,
            their traditional uses, and modern research. Connect with ancient wisdom and contemporary science.
          </p>
        </motion.div>

        {/* Search and Upload Section */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex justify-between items-start gap-4 mb-4">
            <div className="flex-1">
              <BotanicalSearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedFamily={selectedFamily}
                onFamilyChange={setSelectedFamily}
                selectedOrigin={selectedOrigin}
                onOriginChange={setSelectedOrigin}
                selectedPartUsed={selectedPartUsed}
                onPartUsedChange={setSelectedPartUsed}
                selectedCondition={selectedCondition}
                onConditionChange={setSelectedCondition}
                onClearFilters={clearFilters} />
            </div>
          </div>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-6"
        >
          <p className="text-muted-foreground">
            Showing {botanicalData.length} of {filteredPlants.length} plants
            {filteredPlants.length !== botanicalData.length && ` (filtered from ${botanicalData.length} total)`}
          </p>
        </motion.div>

        {/* Plants Grid */}
        <AnimatePresence mode="wait">
          {filteredPlants.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🌿</div>
              <h3 className="text-xl font-medium mb-2">No plants found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredPlants.map((plant, index) => (
                    <motion.div
                      key={plant.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                    >
                      <PlantCard
                        plant={plant}
                        onCardClick={setSelectedPlant}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Plant Detail Modal */}
        <PlantModal
          plant={selectedPlant}
          isOpen={!!selectedPlant}
          onClose={() => setSelectedPlant(null)}
        />
        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-primary text-primary-foreground p-3 rounded-full shadow-lg z-50 hover:shadow-xl transition-shadow"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>


    </div>

  )
}
