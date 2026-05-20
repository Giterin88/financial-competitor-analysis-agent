import { useState } from 'react'
import { BookOpen, FileText, Mic, Headphones, CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react'
import { useStore } from '../store/useStore'

const vocabularyQuestions = [
  { word: 'Hello', meaning: '你好', options: ['你好', '再见', '谢谢', '对不起'] },
  { word: 'Thank you', meaning: '谢谢', options: ['请', '谢谢', '对不起', '你好'] },
  { word: 'Goodbye', meaning: '再见', options: ['你好', '再见', '请', '谢谢'] },
  { word: 'Please', meaning: '请', options: ['谢谢', '请', '对不起', '你好'] },
  { word: 'Sorry', meaning: '对不起', options: ['你好', '谢谢', '对不起', '请'] },
]

const grammarQuestions = [
  {
    question: '选择正确的句子：',
    options: ['I is a student', 'I am a student', 'I are a student', 'I be a student'],
    correct: 1
  },
  {
    question: 'She ___ to school every day.',
    options: ['go', 'goes', 'going', 'gone'],
    correct: 1
  },
  {
    question: 'They ___ football yesterday.',
    options: ['play', 'plays', 'played', 'playing'],
    correct: 2
  },
]

const Learn = () => {
  const [activeModule, setActiveModule] = useState('vocabulary')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const addXP = useStore(state => state.addXP)

  const modules = [
    { id: 'vocabulary', name: '单词记忆', icon: BookOpen, color: 'primary' },
    { id: 'grammar', name: '语法练习', icon: FileText, color: 'secondary' },
    { id: 'speaking', name: '口语跟读', icon: Mic, color: 'accent' },
    { id: 'listening', name: '听力训练', icon: Headphones, color: 'green' },
  ]

  const handleAnswer = (index: number) => {
    if (answered) return
    setSelectedAnswer(index)
    setAnswered(true)
    
    const isCorrect = activeModule === 'vocabulary' 
      ? vocabularyQuestions[currentQuestion].options[index] === vocabularyQuestions[currentQuestion].meaning
      : grammarQuestions[currentQuestion].correct === index
    
    if (isCorrect) {
      setScore(prev => prev + 1)
      addXP(10)
    }
  }

  const handleNext = () => {
    const questions = activeModule === 'vocabulary' ? vocabularyQuestions : grammarQuestions
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setAnswered(false)
      setSelectedAnswer(null)
    } else {
      alert(`练习完成！得分：${score + (selectedAnswer !== null && (activeModule === 'vocabulary' ? vocabularyQuestions[currentQuestion].options[selectedAnswer] === vocabularyQuestions[currentQuestion].meaning : grammarQuestions[currentQuestion].correct === selectedAnswer) ? 1 : 0)}/${questions.length}`)
      setCurrentQuestion(0)
      setScore(0)
      setAnswered(false)
      setSelectedAnswer(null)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setAnswered(false)
    setSelectedAnswer(null)
  }

  const questions = activeModule === 'vocabulary' ? vocabularyQuestions : grammarQuestions
  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">互动学习</h1>
          <p className="text-gray-600 text-lg">通过多种练习模式，全方位提升你的语言能力</p>
        </div>

        {/* Module Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {modules.map((module) => {
            const Icon = module.icon
            const colorClasses = {
              primary: module.id === activeModule ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-primary/5',
              secondary: module.id === activeModule ? 'bg-secondary text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-secondary/5',
              accent: module.id === activeModule ? 'bg-accent text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-accent/5',
              green: module.id === activeModule ? 'bg-green-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-green-50',
            }
            return (
              <button
                key={module.id}
                onClick={() => {
                  setActiveModule(module.id)
                  setCurrentQuestion(0)
                  setScore(0)
                  setAnswered(false)
                  setSelectedAnswer(null)
                }}
                className={`p-6 rounded-2xl transition-all duration-300 flex flex-col items-center space-y-3 ${colorClasses[module.color as keyof typeof colorClasses]}`}
              >
                <Icon className="w-10 h-10" />
                <span className="font-semibold">{module.name}</span>
              </button>
            )
          })}
        </div>

        {/* Learning Area */}
        {(activeModule === 'vocabulary' || activeModule === 'grammar') && (
          <div className="bg-white rounded-3xl shadow-xl p-8 animate-fade-in">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-600">问题 {currentQuestion + 1}/{questions.length}</span>
                <span className="text-sm font-semibold text-primary">得分：{score}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + (answered ? 1 : 0)) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="text-center mb-10">
              {activeModule === 'vocabulary' ? (
                <div>
                  <p className="text-gray-500 text-lg mb-2">这个单词的意思是？</p>
                  <h2 className="text-5xl font-bold text-gray-900">{currentQ.word}</h2>
                </div>
              ) : (
                <h2 className="text-2xl font-bold text-gray-900">{currentQ.question}</h2>
              )}
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentQ.options.map((option, index) => {
                let buttonClass = 'p-6 rounded-2xl border-2 text-left transition-all duration-300'
                let isCorrect = activeModule === 'vocabulary'
                  ? option === currentQ.meaning
                  : index === currentQ.correct

                if (answered) {
                  if (isCorrect) {
                    buttonClass += ' border-green-500 bg-green-50 text-green-800'
                  } else if (index === selectedAnswer) {
                    buttonClass += ' border-red-500 bg-red-50 text-red-800'
                  } else {
                    buttonClass += ' border-gray-200 text-gray-400'
                  }
                } else if (index === selectedAnswer) {
                  buttonClass += ' border-primary bg-primary/5 text-primary'
                } else {
                  buttonClass += ' border-gray-200 hover:border-primary hover:bg-primary/5'
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-lg">{option}</span>
                      {answered && isCorrect && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                      {answered && index === selectedAnswer && !isCorrect && <XCircle className="w-6 h-6 text-red-500" />}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handleRestart}
                className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-200 rounded-xl text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
              >
                <RotateCcw className="w-5 h-5" />
                <span>重新开始</span>
              </button>

              {answered && (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span>{currentQuestion === questions.length - 1 ? '完成' : '下一题'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Speaking and Listening Placeholders */}
        {(activeModule === 'speaking' || activeModule === 'listening') && (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center animate-fade-in">
            {activeModule === 'speaking' ? (
              <Mic className="w-24 h-24 text-accent mx-auto mb-6" />
            ) : (
              <Headphones className="w-24 h-24 text-green-600 mx-auto mb-6" />
            )}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {activeModule === 'speaking' ? '口语跟读' : '听力训练'}
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {activeModule === 'speaking'
                ? '此功能需要集成语音识别API。你可以录制自己的发音，系统会自动评估并给出反馈。'
                : '此功能需要集成音频播放API。你可以听听力材料并回答问题，提升你的听力理解能力。'}
            </p>
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-100 rounded-xl text-gray-600">
              <span>🚧 功能开发中</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Learn
