import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type LessonProgress = {
  lessonId: string
  unitId: string
  completed: boolean
  score: number
  lastAccessed: string
  vocabularyMastered: string[] // IDs of mastered vocabulary items
  exercisesCompleted: string[] // IDs of completed exercises
}

export type UnitProgress = {
  unitId: string
  lessonsCompleted: number
  totalLessons: number
  lastAccessed: string
}

export type UserProgress = {
  currentUnitId: string
  currentLessonId: string
  streak: number
  lastStreak: string
  xp: number
  lessonProgress: Record<string, LessonProgress>
  unitProgress: Record<string, UnitProgress>
}

type ProgressStore = {
  progress: UserProgress
  completeLesson: (unitId: string, lessonId: string, score: number) => void
  startLesson: (unitId: string, lessonId: string) => void
  updateVocabularyMastery: (
    lessonId: string,
    vocabularyId: string,
    mastered: boolean
  ) => void
  completeExercise: (lessonId: string, exerciseId: string) => void
  updateStreak: () => void
  addXP: (amount: number) => void
}

// Initial progress state
const initialProgress: UserProgress = {
  currentUnitId: 'beginner-unit-1',
  currentLessonId: 'greetings',
  streak: 0,
  lastStreak: '',
  xp: 0,
  lessonProgress: {},
  unitProgress: {
    'beginner-unit-1': {
      unitId: 'beginner-unit-1',
      lessonsCompleted: 0,
      totalLessons: 4,
      lastAccessed: new Date().toISOString(),
    },
    'beginner-unit-2': {
      unitId: 'beginner-unit-2',
      lessonsCompleted: 0,
      totalLessons: 4,
      lastAccessed: '',
    },
    'beginner-unit-3': {
      unitId: 'beginner-unit-3',
      lessonsCompleted: 0,
      totalLessons: 4,
      lastAccessed: '',
    },
    'intermediate-unit-1': {
      unitId: 'intermediate-unit-1',
      lessonsCompleted: 0,
      totalLessons: 4,
      lastAccessed: '',
    },
    'intermediate-unit-2': {
      unitId: 'intermediate-unit-2',
      lessonsCompleted: 0,
      totalLessons: 4,
      lastAccessed: '',
    },
    'intermediate-unit-3': {
      unitId: 'intermediate-unit-3',
      lessonsCompleted: 0,
      totalLessons: 4,
      lastAccessed: '',
    },
    'advanced-unit-1': {
      unitId: 'advanced-unit-1',
      lessonsCompleted: 0,
      totalLessons: 4,
      lastAccessed: '',
    },
    'advanced-unit-2': {
      unitId: 'advanced-unit-2',
      lessonsCompleted: 0,
      totalLessons: 4,
      lastAccessed: '',
    },
    'advanced-unit-3': {
      unitId: 'advanced-unit-3',
      lessonsCompleted: 0,
      totalLessons: 4,
      lastAccessed: '',
    },
  },
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: initialProgress,

      completeLesson: (unitId, lessonId, score) => {
        const { progress } = get()
        const lessonKey = `${unitId}-${lessonId}`
        const wasAlreadyCompleted =
          progress.lessonProgress[lessonKey]?.completed || false

        // Update lesson progress
        const updatedLessonProgress = {
          ...progress.lessonProgress,
          [lessonKey]: {
            lessonId,
            unitId,
            completed: true,
            score,
            lastAccessed: new Date().toISOString(),
            vocabularyMastered:
              progress.lessonProgress[lessonKey]?.vocabularyMastered || [],
            exercisesCompleted:
              progress.lessonProgress[lessonKey]?.exercisesCompleted || [],
          },
        }

        // Update unit progress
        const unitProgress = progress.unitProgress[unitId] || {
          unitId,
          lessonsCompleted: 0,
          totalLessons: 4, // Default
          lastAccessed: '',
        }

        const updatedUnitProgress = {
          ...progress.unitProgress,
          [unitId]: {
            ...unitProgress,
            lessonsCompleted: wasAlreadyCompleted
              ? unitProgress.lessonsCompleted
              : unitProgress.lessonsCompleted + 1,
            lastAccessed: new Date().toISOString(),
          },
        }

        // Add XP for completing the lesson
        const xpGained = wasAlreadyCompleted ? 5 : 20 // Less XP for repeating lessons

        set({
          progress: {
            ...progress,
            lessonProgress: updatedLessonProgress,
            unitProgress: updatedUnitProgress,
            xp: progress.xp + xpGained,
          },
        })

        // Update streak
        get().updateStreak()
      },

      startLesson: (unitId, lessonId) => {
        const { progress } = get()

        set({
          progress: {
            ...progress,
            currentUnitId: unitId,
            currentLessonId: lessonId,
          },
        })
      },

      updateVocabularyMastery: (lessonId, vocabularyId, mastered) => {
        const { progress } = get()
        const unitId =
          Object.keys(progress.unitProgress).find(
            id => progress.unitProgress[id].lessonsCompleted > 0
          ) || 'beginner-unit-1'

        const lessonKey = `${unitId}-${lessonId}`
        const lessonProgress = progress.lessonProgress[lessonKey] || {
          lessonId,
          unitId,
          completed: false,
          score: 0,
          lastAccessed: new Date().toISOString(),
          vocabularyMastered: [],
          exercisesCompleted: [],
        }

        const vocabularyMastered = mastered
          ? [...lessonProgress.vocabularyMastered, vocabularyId]
          : lessonProgress.vocabularyMastered.filter(id => id !== vocabularyId)

        set({
          progress: {
            ...progress,
            lessonProgress: {
              ...progress.lessonProgress,
              [lessonKey]: {
                ...lessonProgress,
                vocabularyMastered,
              },
            },
          },
        })
      },

      completeExercise: (lessonId, exerciseId) => {
        const { progress } = get()
        const unitId =
          Object.keys(progress.unitProgress).find(
            id => progress.unitProgress[id].lessonsCompleted > 0
          ) || 'beginner-unit-1'

        const lessonKey = `${unitId}-${lessonId}`
        const lessonProgress = progress.lessonProgress[lessonKey] || {
          lessonId,
          unitId,
          completed: false,
          score: 0,
          lastAccessed: new Date().toISOString(),
          vocabularyMastered: [],
          exercisesCompleted: [],
        }

        const exercisesCompleted = [
          ...lessonProgress.exercisesCompleted,
          exerciseId,
        ]

        set({
          progress: {
            ...progress,
            lessonProgress: {
              ...progress.lessonProgress,
              [lessonKey]: {
                ...lessonProgress,
                exercisesCompleted,
              },
            },
            xp: progress.xp + 5, // Small XP gain for completing an exercise
          },
        })
      },

      updateStreak: () => {
        const { progress } = get()
        const today = new Date().toISOString().split('T')[0]

        // If already logged in today, do nothing
        if (progress.lastStreak === today) {
          return
        }

        // Check if the last streak was yesterday
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayString = yesterday.toISOString().split('T')[0]

        const newStreak =
          progress.lastStreak === yesterdayString ? progress.streak + 1 : 1

        set({
          progress: {
            ...progress,
            streak: newStreak,
            lastStreak: today,
          },
        })
      },

      addXP: amount => {
        const { progress } = get()

        set({
          progress: {
            ...progress,
            xp: progress.xp + amount,
          },
        })
      },
    }),
    {
      name: 'lingua-leap-progress',
    }
  )
)
