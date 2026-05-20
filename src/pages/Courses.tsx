import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Users, Search, Filter } from 'lucide-react'
import { useStore } from '../store/useStore'

const Courses = () => {
  const courses = useStore(state => state.courses)
  const [selectedLanguage, setSelectedLanguage] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

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

  const filteredCourses = courses.filter(course => {
    const matchesLanguage = selectedLanguage === 'all' || course.language === selectedLanguage
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesLanguage && matchesLevel && matchesSearch
  })

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">课程中心</h1>
          <p className="text-gray-600 text-lg">探索丰富的语言课程，找到适合你的学习路径</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索课程..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="all">全部语言</option>
                <option value="english">英语</option>
                <option value="japanese">日语</option>
                <option value="korean">韩语</option>
              </select>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="all">全部等级</option>
                <option value="beginner">入门</option>
                <option value="elementary">初级</option>
                <option value="intermediate">中级</option>
                <option value="advanced">高级</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">找到 <span className="font-semibold text-gray-900">{filteredCourses.length}</span> 门课程</p>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
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
                    className="w-full h-52 object-cover"
                  />
                  {course.progress !== undefined && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-primary">{course.progress}% 完成</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {languageLabel(course.language)}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                      {levelLabel(course.level)}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{course.enrolledCount.toLocaleString()}</span>
                      </div>
                    </div>
                    <span className="text-primary font-semibold hover:text-blue-700 transition-colors">
                      查看详情 →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">没有找到相关课程</h3>
            <p className="text-gray-600">尝试调整筛选条件或搜索关键词</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Courses
