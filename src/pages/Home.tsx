import { Link } from 'react-router-dom'
import { GraduationCap, Languages, Star, TrendingUp, Play, Clock, Users as UsersIcon, Trophy } from 'lucide-react'
import { useStore } from '../store/useStore'

const Home = () => {
  const { user, courses } = useStore(state => ({
    user: state.user,
    courses: state.courses
  }))

  const popularCourses = courses.sort((a, b) => b.enrolledCount - a.enrolledCount).slice(0, 4)

  const levelLabel = (level: string) => {
    const labels = {
      beginner: '入门',
      elementary: '初级',
      intermediate: '中级',
      advanced: '高级'
    }
    return labels[level as keyof typeof labels]
  }

  const languageLabel = (lang: string) => {
    const labels = {
      english: '英语',
      japanese: '日语',
      korean: '韩语'
    }
    return labels[lang as keyof typeof labels]
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-blue-700 to-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Languages className="w-5 h-5" />
              <span>支持英语、日语、韩语等多种语言</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              沉浸式语言学习<br />
              <span className="text-yellow-300">成就更好的自己</span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              分级课程体系，互动练习模块，进度追踪系统，让语言学习更高效、更有趣
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center space-x-2 bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Play className="w-6 h-6 fill-current" />
                <span>开始学习</span>
              </Link>
              <Link
                to="/learn"
                className="inline-flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/30 transition-all duration-300"
              >
                <GraduationCap className="w-6 h-6" />
                <span>免费试学</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center animate-slide-up">
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-gray-600">活跃学员</div>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-secondary mb-2">200+</div>
              <div className="text-gray-600">精品课程</div>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-accent mb-2">10M+</div>
              <div className="text-gray-600">学习时长</div>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">好评率</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">热门课程</h2>
              <p className="text-gray-600">学员们最喜欢的语言课程</p>
            </div>
            <Link
              to="/courses"
              className="text-primary font-semibold hover:text-blue-700 flex items-center space-x-1"
            >
              <span>查看全部</span>
              <TrendingUp className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCourses.map((course, index) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  {course.progress && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-3">
                      <div className="flex items-center justify-between text-white text-sm mb-1">
                        <span>学习进度</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-white/30 rounded-full h-2">
                        <div
                          className="bg-secondary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {languageLabel(course.language)}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                      {levelLabel(course.level)}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <UsersIcon className="w-4 h-4" />
                      <span className="text-sm">{course.enrolledCount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* User's Progress */}
      {user && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-8 text-white">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                  <h2 className="text-2xl font-bold mb-2">继续你的学习之旅</h2>
                  <p className="text-blue-100">你已经学习了 450 XP，继续加油！</p>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{user.level}</div>
                    <div className="text-blue-200">等级</div>
                  </div>
                  <div className="w-px h-16 bg-white/30" />
                  <div className="text-center">
                    <div className="text-4xl font-bold">{user.xp}</div>
                    <div className="text-blue-200">经验值</div>
                  </div>
                  <Link
                    to="/learn"
                    className="ml-8 bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2"
                  >
                    <Clock className="w-5 h-5" />
                    <span>继续学习</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">为什么选择我们</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">我们提供全方位的语言学习体验，让你在轻松愉快的氛围中掌握新语言</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center animate-slide-up">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">分级课程体系</h3>
              <p className="text-gray-600">从入门到高级，循序渐进的课程设计，适合各个水平的学习者</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Play className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">互动学习模块</h3>
              <p className="text-gray-600">单词记忆、语法练习、口语跟读、听力训练，全方位提升语言能力</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">成就激励系统</h3>
              <p className="text-gray-600">追踪学习进度，解锁成就徽章，让学习更有动力和成就感</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
