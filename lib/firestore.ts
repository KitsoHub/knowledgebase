/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
  increment,
} from 'firebase/firestore'
import { db } from './firebase'

export interface Player {
  id?: string
  name: string
  email?: string
  avatar?: string
  totalGames: number
  totalWins: number
  totalScore: number
  createdAt: any
  lastActive: any
}

export interface GameResult {
  id?: string
  playerId: string
  playerName: string
  gameType: 'morabaraba' | 'diketo' | 'ntimo'
  score: number
  won: boolean
  createdAt: any
}

export interface QuizResult {
  id?: string
  playerId: string
  playerName: string
  gameType: 'maele-quiz' | 'morabaraba' | 'diketo' | 'ntimo'
  score: number
  correctAnswers: number
  wrongAnswers: number
  totalQuestions: number
  won: boolean
  createdAt: any
}

export interface LeaderboardEntry {
  id?: string
  playerId: string
  playerName: string
  gameType: string
  score: number
  games: number
  wins: number
  winRate: number
  avatar?: string
}

// Player functions
export const createPlayer = async (
  playerData: Omit<Player, 'id' | 'createdAt' | 'lastActive'>
) => {
  try {
    const docRef = await addDoc(collection(db, 'players'), {
      ...playerData,
      createdAt: serverTimestamp(),
      lastActive: serverTimestamp(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating player:', error)
    throw error
  }
}

export const getPlayer = async (playerId: string): Promise<Player | null> => {
  try {
    const docRef = doc(db, 'players', playerId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Player
    }
    return null
  } catch (error) {
    console.error('Error getting player:', error)
    throw error
  }
}

export const getPlayerByName = async (name: string): Promise<Player | null> => {
  try {
    const q = query(
      collection(db, 'players'),
      where('name', '==', name),
      limit(1)
    )
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      return { id: doc.id, ...doc.data() } as Player
    }
    return null
  } catch (error) {
    console.error('Error getting player by name:', error)
    throw error
  }
}

export const updatePlayerStats = async (
  playerId: string,
  gameResult: { score: number; won: boolean }
) => {
  try {
    const playerRef = doc(db, 'players', playerId)
    await updateDoc(playerRef, {
      totalGames: increment(1),
      totalWins: increment(gameResult.won ? 1 : 0),
      totalScore: increment(gameResult.score),
      lastActive: serverTimestamp(),
    })
  } catch (error) {
    console.error('Error updating player stats:', error)
    throw error
  }
}

// Game result functions
export const addGameResult = async (
  gameResult: Omit<GameResult, 'id' | 'createdAt'>
) => {
  try {
    const docRef = await addDoc(collection(db, 'gameResults'), {
      ...gameResult,
      createdAt: serverTimestamp(),
    })

    // Update player stats
    await updatePlayerStats(gameResult.playerId, {
      score: gameResult.score,
      won: gameResult.won,
    })

    return docRef.id
  } catch (error) {
    console.error('Error adding game result:', error)
    throw error
  }
}

export const addQuizResult = async (
  quizResult: Omit<QuizResult, 'id' | 'createdAt'>
) => {
  try {
    const docRef = await addDoc(collection(db, 'gameResults'), {
      ...quizResult,
      createdAt: serverTimestamp(),
    })

    // Update player stats
    await updatePlayerStats(quizResult.playerId, {
      score: quizResult.score,
      won: quizResult.won,
    })

    return docRef.id
  } catch (error) {
    console.error('Error adding quiz result:', error)
    throw error
  }
}

// Leaderboard functions
export const getLeaderboard = async (
  gameType: string,
  limitCount = 10
): Promise<LeaderboardEntry[]> => {
  try {
    // Get all game results for the specific game type
    const q = query(
      collection(db, 'gameResults'),
      where('gameType', '==', gameType),
      orderBy('createdAt', 'desc')
    )

    const querySnapshot = await getDocs(q)
    const gameResults: GameResult[] = []

    querySnapshot.forEach(doc => {
      gameResults.push({ id: doc.id, ...doc.data() } as GameResult)
    })

    // Group by player and calculate stats
    const playerStats: { [key: string]: LeaderboardEntry } = {}

    gameResults.forEach(result => {
      if (!playerStats[result.playerId]) {
        playerStats[result.playerId] = {
          playerId: result.playerId,
          playerName: result.playerName,
          gameType,
          score: 0,
          games: 0,
          wins: 0,
          winRate: 0,
        }
      }

      const stats = playerStats[result.playerId]
      stats.score += result.score
      stats.games += 1
      if (result.won) stats.wins += 1
      stats.winRate = Math.round((stats.wins / stats.games) * 100)
    })

    // Convert to array and sort by score
    const leaderboard = Object.values(playerStats)
      .sort((a, b) => b.score - a.score)
      .slice(0, limitCount)

    return leaderboard
  } catch (error) {
    console.error('Error getting leaderboard:', error)
    throw error
  }
}

export const getAllPlayers = async (): Promise<Player[]> => {
  try {
    const q = query(collection(db, 'players'), orderBy('totalScore', 'desc'))
    const querySnapshot = await getDocs(q)
    const players: Player[] = []

    querySnapshot.forEach(doc => {
      players.push({ id: doc.id, ...doc.data() } as Player)
    })

    return players
  } catch (error) {
    console.error('Error getting all players:', error)
    throw error
  }
}
