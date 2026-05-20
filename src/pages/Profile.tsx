import { useState } from 'react'
import { User, Settings, LogOut, BookOpen, Award, TrendingUp, Globe, Edit3, Calendar, Clock } from 'lucide-react'
import { useStore } from '../store/useStore'

const Profile = () => {
  const { user, courses, achievements } = useStore(state => ({
    user: state.user,
    courses: state.courses,
    achievements: state.achievements
  }))

  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)

  const unlockedAchievements = achievements.filter(a => a.unlocked).length
  const startedCourses = courses.filter(c => c.progress !== undefined && c.progress > 0).length

  const recommendedCourses = courses.filter(c => c.progress === undefined).slice(0, 3)

  if (!user) return null

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 text-white mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="absolute bottom-0 right-0 w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
              >
                <Edit3 className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                <h1 className="text-3xl font-bold">{user.username}</h1>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Lv.{user.level}</span>
              </div>
              <p className="text-blue-100 mb-4">{user.email}</p>
              <div className="flex items-center justify-center md:justify-start space-x-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{startedCourses}</p>
                  <p className="text-blue-200 text-sm">学习课程</p>
                </div>
                <div className="w-px h-10 bg-white/30" />
                <div className="text-center">
                  <p className="text-2xl font-bold">{unlockedAchievements}</p>
                  <p className="text-blue-200 text-sm">获得成就</p>
                </div>
                <div className="w-px h-10 bg-white/30" />
                <div className="text-center">
                  <p className="text-2xl font-bold">{user.xp}</p>
                  <p className="text-blue-200 text-sm">总经验</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          {[
            { id: 'overview', name: '概览', icon: User },
            { id: 'learning', name: '学习路径', icon: BookOpen },
            { id: 'achievements', name: '成就', icon: Award },
            { id: 'settings', name: '设置', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Learning Stats */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">学习统计</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-primary/5 rounded-xl">
                      <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">24.5h</p>
                      <p className="text-sm text-gray-600">总学习时长</p>
                    </div>
                    <div className="text-center p-4 bg-secondary/5 rounded-xl">
                      <Calendar className="w-8 h-8 text-secondary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">7</p>
                      <p className="text-sm text-gray-600">连续学习</p>
                    </div>
                    <div className="text-center p-4 bg-accent/5 rounded-xl">
                      <BookOpen className="w-8 h-8 text-accent mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">156</p>
                      <p className="text-sm text-gray-600">完成课时</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">95%</p>
                      <p className="text-sm text-gray-600">正确率</p>
                    </div>
                  </div>
                </div>

                {/* Recommended Courses */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">为你推荐</h2>
                  <div className="space-y-4">
                    {recommendedCourses.map((course) => (
                      <div key={course.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{course.title}</h3>
                          <p className="text-sm text-gray-600">{course.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                              {course.language === 'english' ? '英语' : course.language === 'japanese' ? '日语' : '韩语'}
                            </span>
                            <span className="text-sm text-gray-500">{course.enrolledCount.toLocaleString()}人学习</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-blue-800 transition-colors">
                          开始学习
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Language Preference */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">学习语言</h2>
                  <div className="space-y-3">
                    {[
                      { code: 'english', name: '英语', flag: '🇬🇧', level: '学习中' },
                      { code: 'japanese', name: '日语', flag: '🇯🇵', level: '入门' },
                      { code: 'korean', name: '韩语', flag: '🇰🇷', level: '未开始' }
                    ].map((lang) => (
                      <div
                        key={lang.code}
                        className={`flex items-center justify-between p-3 rounded-xl ${
                          lang.code === user.preferredLanguage
                            ? 'bg-primary/10 border-2 border-primary/20'
                            : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{lang.flag}</span>
                          <div>
                            <p className="font-semibold text-gray-900">{lang.name}</p>
                            <p className="text-sm text-gray-600">{lang.level}</p>
                          </div>
                        </div>
                        {lang.code === user.preferredLanguage && (
                          <div className="w-3 h-3 bg-primary rounded-full" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Achievements */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">最近成就</h2>
                  <div className="space-y-3">
                    {achievements.filter(a => a.unlocked).slice(0, 3).map((achievement) => (
                      <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-accent/5 rounded-xl">
                        <span className="text-3xl">{achievement.icon}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{achievement.name}</p>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'learning' && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">学习路径</h2>
              <p className="text-gray-600">你的专属学习路径正在规划中...</p>
              <div className="mt-8 p-8 bg-gray-50 rounded-xl text-center">
                <TrendingUp className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-gray-500">完成更多课程后，将为你生成个性化学习路径</p>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">成就殿堂</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-6 rounded-xl text-center transition-all duration-300 ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20'
                        : 'bg-gray-50 border-2 border-gray-200 opacity-50'
                    }`}
                  >
                    <div className="text-5xl mb-3">{achievement.icon}</div>
                    <p className="font-bold text-gray-900">{achievement.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                    {achievement.unlocked && (
                      <div className="mt-3 text-green-600 text-sm font-medium">✓ 已解锁</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">账号设置</h2>
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">个人信息</h3>
                  <p className="text-sm text-gray-600">编辑你的个人资料</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">学习偏好</h3>
                  <p className="text-sm text-gray-600">设置学习提醒和通知</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">隐私设置</h3>
                  <p className="text-sm text-gray-600">管理你的隐私和数据</p>
                </div>
                <button className="w-full p-4 border-2 border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors flex items-center justify-center space-x-2">
                  <LogOut className="w-5 h-5" />
                  <span>退出登录</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
