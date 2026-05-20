import { Trophy, Calendar, TrendingUp, BookOpen, Star, CheckCircle2, Clock } from 'lucide-react'
import { useStore } from '../store/useStore'

const Progress = () => {
  const { user, achievements, courses } = useStore(state => ({
    user: state.user,
    achievements: state.achievements,
    courses: state.courses
  }))

  const weeklyData = [
    { day: '周一', minutes: 45 },
    { day: '周二', minutes: 60 },
    { day: '周三', minutes: 30 },
    { day: '周四', minutes: 90 },
    { day: '周五', minutes: 45 },
    { day: '周六', minutes: 120 },
    { day: '周日', minutes: 60 },
  ]

  const maxMinutes = Math.max(...weeklyData.map(d => d.minutes))

  const ongoingCourses = courses.filter(c => c.progress !== undefined && c.progress > 0 && c.progress < 100)

  if (!user) return null

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">学习进度</h1>
          <p className="text-gray-600 text-lg">追踪你的学习旅程，见证每一步成长</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl">🌟</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">等级</p>
            <p className="text-3xl font-bold text-gray-900">{user.level}</p>
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>下一等级</span>
                <span>{user.xp % 200}/200 XP</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                  style={{ width: `${(user.xp % 200) / 2}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-secondary" />
              </div>
              <span className="text-2xl">✨</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">总经验值</p>
            <p className="text-3xl font-bold text-gray-900">{user.xp}</p>
            <p className="text-green-600 text-sm mt-2 font-medium">+10 今日获得</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <span className="text-2xl">📅</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">连续学习</p>
            <p className="text-3xl font-bold text-gray-900">7 天</p>
            <p className="text-gray-500 text-sm mt-2">保持 streak！</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl">⏰</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">学习时长</p>
            <p className="text-3xl font-bold text-gray-900">24.5 小时</p>
            <p className="text-gray-500 text-sm mt-2">本周 +7.5 小时</p>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">本周学习</h2>
          <div className="flex items-end justify-between h-48 gap-4">
            {weeklyData.map((data, index) => (
              <div key={data.day} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-100 rounded-t-lg relative overflow-hidden" style={{ height: '160px' }}>
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg transition-all duration-500"
                    style={{ height: `${(data.minutes / maxMinutes) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-3">{data.day}</p>
                <p className="text-xs text-gray-500">{data.minutes} 分钟</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <div className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">成就徽章</h2>
            <div className="grid grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl text-center transition-all duration-300 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20'
                      : 'bg-gray-50 border-2 border-gray-200 opacity-50'
                  }`}
                >
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <p className="font-semibold text-gray-900 text-sm">{achievement.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
                  {achievement.unlocked && (
                    <div className="mt-2 inline-flex items-center px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      已解锁
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Ongoing Courses */}
          <div className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">进行中的课程</h2>
            <div className="space-y-4">
              {ongoingCourses.length > 0 ? (
                ongoingCourses.map((course) => (
                  <div key={course.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 font-medium">{course.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>暂无进行中的课程</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Progress
