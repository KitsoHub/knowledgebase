'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs, startAfter, QueryDocumentSnapshot } from 'firebase/firestore';
import { Trophy, ChevronDown } from 'lucide-react';

interface LeaderboardEntry {
  username: string;
  score: number;
  timestamp: Date;
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const ENTRIES_PER_PAGE = 10;

  const fetchLeaderboard = async (isLoadMore = false) => {
    try {
      setLoading(true);
      
      let q;
      if (isLoadMore && lastDoc) {
        // Fetch next batch starting after the last document
        q = query(
          collection(db, 'leaderboard'), 
          orderBy('score', 'desc'), 
          startAfter(lastDoc),
          limit(ENTRIES_PER_PAGE)
        );
      } else {
        // Initial fetch
        q = query(
          collection(db, 'leaderboard'), 
          orderBy('score', 'desc'), 
          limit(ENTRIES_PER_PAGE)
        );
      }

      const querySnapshot = await getDocs(q);
      const leaderboardData = querySnapshot.docs.map((doc) => ({
        username: doc.data().username,
        score: doc.data().score,
        timestamp: doc.data().timestamp.toDate(),
      }));

      if (isLoadMore) {
        // Append new entries to existing ones
        setEntries(prev => [...prev, ...leaderboardData]);
      } else {
        // Replace entries (initial load)
        setEntries(leaderboardData);
      }

      // Update pagination state
      if (querySnapshot.docs.length < ENTRIES_PER_PAGE) {
        setHasMore(false);
      }
      
      if (querySnapshot.docs.length > 0) {
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }

    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleShowMore = () => {
    fetchLeaderboard(true);
  };

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
        <CardTitle className="text-2xl font-bold text-gray-800 flex-1 flex items-center justify-center space-x-5 gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Game Ranking 
        </CardTitle>
      </CardHeader>
      <CardContent>
        {entries.length === 0 && !loading ? (
          <p className="text-center text-gray-700">No scores yet.</p>
        ) : (
          <>
            <ul className="space-y-2">
              {entries.map((entry, index) => (
                <li
                  key={`${entry.username}-${entry.timestamp.getTime()}-${index}`}
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
            
            {/* Show More Button */}
            {hasMore && (
              <div className="flex justify-center mt-4">
                <Button
                  onClick={handleShowMore}
                  disabled={loading}
                  variant="outline"
                  className="flex items-center gap-2 text-purple-600 border-purple-600 hover:bg-purple-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Show More
                    </>
                  )}
                </Button>
              </div>
            )}
            
            {/* End of results indicator */}
            {!hasMore && entries.length >= ENTRIES_PER_PAGE && (
              <p className="text-center text-gray-500 text-sm mt-4">
                You've reached the end of the leaderboard
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}