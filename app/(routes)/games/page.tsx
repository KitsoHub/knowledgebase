'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Container from '@/app/components/shared/games/container'; // Adjust path as needed
import Leaderboard from '@/app/components/shared/games/leaderboard'; // Import Leaderboard component

export default function Games() {
  const [activeTab, setActiveTab] = useState('games');

  return (
    <div className="min-h-screen bg-gray-100">

        <div className="flex justify-between items-center mb-6">
          <Button asChild variant="link" className="mt-4 sm:mt-0">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          </div>
          <div className='text-center mb-6 max-w-[270px] mx-auto'>
         <div className=" flex w-2xl space-x-4 bg-white rounded-lg shadow-md p-1  justify-center">
            <Button
              variant={activeTab === 'games' ? 'default' : 'outline'}
              className={`${
                activeTab === 'games'
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'text-gray-700'
              } px-6 py-2 rounded-md`}
              onClick={() => setActiveTab('games')}
            >
              Games
            </Button>
            <Button
              variant={activeTab === 'leaderboard' ? 'default' : 'outline'}
              className={`${
                activeTab === 'leaderboard'
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'text-gray-700'
              } px-6 py-2 rounded-md`}
              onClick={() => setActiveTab('leaderboard')}
            >
              Leaderboard
            </Button>
          </div>
          </div>
         
        
        {activeTab === 'games' ? <Container /> : <Leaderboard />}
      </div>
   
  );
}