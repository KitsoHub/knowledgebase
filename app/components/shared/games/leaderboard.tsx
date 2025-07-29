'use client';

import { useEffect, useState } from 'react'; // Added useEffect import
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Trophy } from 'lucide-react';

interface LeaderboardEntry {
  username: string;
  score: number;
  timestamp: Date;
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const q = query(collection(db, 'leaderboard'), orderBy('score', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);
        const leaderboardData = querySnapshot.docs.map((doc) => ({
          username: doc.data().username,
          score: doc.data().score,
          timestamp: doc.data().timestamp.toDate(),
        }));
        setEntries(leaderboardData);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };
    fetchLeaderboard();
  }, []);

  const getRankLabel = (index: number) => {
    const rank = index + 1;
    if (rank === 1) return '1st';
    if (rank === 2) return '2nd';
    if (rank === 3) return '3rd';
    return `${rank}th`;
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-12 bg-white/90 border border-gray-200 shadow-xl">
      <CardHeader>
        <CardTitle className=" text-2xl font-bold  text-gray-800 flex-1 flex items-center justify-center space-x-5 gap-2">
         <Trophy className="h-6 w-6 text-yellow-500" />
          Game Ranking 
        </CardTitle>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <p className="text-center text-gray-700">No scores yet.</p>
        ) : (
          <ul className="space-y-2">
            {entries.map((entry, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-purple-600 w-8">
                    {getRankLabel(index)}
                  </span>
                  <span className="text-gray-800">{entry.username}</span>
                </div>
                <span className="font-bold text-purple-600">{entry.score}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}