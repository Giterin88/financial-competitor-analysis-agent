import { create } from 'zustand'

interface User {
  id: string
  email: string
  username: string
  avatar?: string
  level: number
  xp: number
  preferredLanguage: string
}

interface Course {
  id: string
  language: string
  level: 'beginner' | 'elementary' | 'intermediate' | 'advanced'
  title: string
  description: string
  thumbnail: string
  rating: number
  enrolledCount: number
  progress?: number
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
}

interface AppState {
  user: User | null
  isAuthenticated: boolean
  courses: Course[]
  achievements: Achievement[]
  currentLanguage: string
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, username: string, password: string) => Promise<boolean>
  logout: () => void
  setCourses: (courses: Course[]) => void
  setCurrentLanguage: (lang: string) => void
  addXP: (amount: number) => void
  unlockAchievement: (id: string) => void
}

// Mock data
const mockCourses: Course[] = [
  {
    id: '1',
    language: 'english',
    level: 'beginner',
    title: '英语入门',
    description: '从零开始学习英语，掌握基础词汇和语法',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop',
    rating: 4.8,
    enrolledCount: 12500,
    progress: 35
  },
  {
    id: '2',
    language: 'english',
    level: 'intermediate',
    title: '英语中级',
    description: '提升听说读写能力，掌握复杂句型',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
    rating: 4.7,
    enrolledCount: 8900
  },
  {
    id: '3',
    language: 'japanese',
    level: 'beginner',
    title: '日语入门',
    description: '学习五十音图，掌握基础日语会话',
    thumbnail: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=300&fit=crop',
    rating: 4.9,
    enrolledCount: 15600
  },
  {
    id: '4',
    language: 'japanese',
    level: 'elementary',
    title: '日语初级',
    description: '深入学习日语语法和常用词汇',
    thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
    rating: 4.6,
    enrolledCount: 7200
  },
  {
    id: '5',
    language: 'korean',
    level: 'beginner',
    title: '韩语入门',
    description: '学习韩文字母，开启韩语学习之旅',
    thumbnail: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=400&h=300&fit=crop',
    rating: 4.8,
    enrolledCount: 9800,
    progress: 60
  },
  {
    id: '6',
    language: 'korean',
    level: 'intermediate',
    title: '韩语中级',
    description: '掌握韩语口语和听力技巧',
    thumbnail: 'https://images.unsplash.com/photo-1534274988757-a28bf1a500d7?w=400&h=300&fit=crop',
    rating: 4.5,
    enrolledCount: 5400
  }
]

const mockAchievements: Achievement[] = [
  { id: '1', name: '初学者', description: '完成第一个课程', icon: '🌱', unlocked: true },
  { id: '2', name: '坚持一周', description: '连续学习7天', icon: '🔥', unlocked: true },
  { id: '3', name: '词汇大师', description: '掌握1000个单词', icon: '📚', unlocked: false },
  { id: '4', name: '语法达人', description: '完成所有语法练习', icon: '✏️', unlocked: false },
  { id: '5', name: '多语者', description: '学习3种以上语言', icon: '🌍', unlocked: false },
  { id: '6', name: '百日英雄', description: '连续学习100天', icon: '🏆', unlocked: false }
]

export const useStore = create<AppState>((set, get) => ({
  user: {
    id: '1',
    email: 'demo@example.com',
    username: '语言学习者',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    level: 3,
    xp: 450,
    preferredLanguage: 'english'
  },
  isAuthenticated: true,
  courses: mockCourses,
  achievements: mockAchievements,
  currentLanguage: 'english',
  
  setUser: (user) => set({ user }),
  
  login: async (email, password) => {
    // Mock login
    await new Promise(resolve => setTimeout(resolve, 1000))
    set({
      isAuthenticated: true,
      user: {
        id: '1',
        email,
        username: '语言学习者',
        level: 3,
        xp: 450,
        preferredLanguage: 'english'
      }
    })
    return true
  },
  
  register: async (email, username, password) => {
    // Mock register
    await new Promise(resolve => setTimeout(resolve, 1000))
    set({
      isAuthenticated: true,
      user: {
        id: '1',
        email,
        username,
        level: 1,
        xp: 0,
        preferredLanguage: 'english'
      }
    })
    return true
  },
  
  logout: () => set({ user: null, isAuthenticated: false }),
  
  setCourses: (courses) => set({ courses }),
  
  setCurrentLanguage: (lang) => set({ currentLanguage: lang }),
  
  addXP: (amount) => {
    const state = get()
    if (state.user) {
      const newXP = state.user.xp + amount
      const newLevel = Math.floor(newXP / 200) + 1
      set({
        user: {
          ...state.user,
          xp: newXP,
          level: newLevel
        }
      })
    }
  },
  
  unlockAchievement: (id) => {
    const state = get()
    set({
      achievements: state.achievements.map(a => 
        a.id === id ? { ...a, unlocked: true } : a
      )
    })
  }
}))
