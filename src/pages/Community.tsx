import { useState } from 'react'
import { MessageSquare, Heart, Share2, Send, User, PlusCircle } from 'lucide-react'
import { useStore } from '../store/useStore'

const mockPosts = [
  {
    id: 1,
    user: { name: '小明', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', level: 5 },
    language: '英语',
    type: 'status',
    content: '今天完成了英语初级课程的全部内容！感觉自己进步很大，继续加油！💪',
    likes: 24,
    comments: [
      { user: '小红', content: '太棒了！我也在学这个课程' },
      { user: '小李', content: '恭喜恭喜！🎉' }
    ],
    time: '2小时前'
  },
  {
    id: 2,
    user: { name: '樱花', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', level: 8 },
    language: '日语',
    type: 'question',
    content: '请教大家一个问题：「おはようございます」和「こんにちは」在使用上有什么区别？',
    likes: 15,
    comments: [
      { user: '日语达人', content: '「おはよう」是早上用的，「こんにちは」是白天用的~' }
    ],
    time: '4小时前'
  },
  {
    id: 3,
    user: { name: '韩语爱好者', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', level: 3 },
    language: '韩语',
    type: 'status',
    content: '终于掌握了韩文字母的发音！好开心～推荐大家多听韩语歌来练习听力 🎵',
    likes: 32,
    comments: [],
    time: '昨天'
  }
]

const Community = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [newPost, setNewPost] = useState('')
  const user = useStore(state => state.user)

  const filteredPosts = activeTab === 'all'
    ? mockPosts
    : mockPosts.filter(p => p.type === activeTab)

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">学习社区</h1>
          <p className="text-gray-600 text-lg">与志同道合的学习者一起成长</p>
        </div>

        {/* Create Post */}
        {user && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-slide-up">
            <div className="flex items-start space-x-4">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="分享你的学习心得或提出问题..."
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none h-24"
                />
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-2">
                    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                      <option value="english">英语</option>
                      <option value="japanese">日语</option>
                      <option value="korean">韩语</option>
                    </select>
                  </div>
                  <button
                    disabled={!newPost.trim()}
                    className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    <span>发布</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          {[
            { id: 'all', name: '全部' },
            { id: 'status', name: '动态' },
            { id: 'question', name: '问答' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post, index) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{post.user.name}</span>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">Lv.{post.user.level}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span className="px-2 py-0.5 bg-gray-100 rounded-full">{post.language}</span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                </div>
                {post.type === 'question' && (
                  <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                    问答
                  </span>
                )}
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

              <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  <span>{post.comments.length}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>分享</span>
                </button>
              </div>

              {post.comments.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                  {post.comments.map((comment, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-xl p-3">
                        <span className="font-semibold text-gray-900 text-sm">{comment.user}</span>
                        <p className="text-gray-600 text-sm mt-1">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Community
