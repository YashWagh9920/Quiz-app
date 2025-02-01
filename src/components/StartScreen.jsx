import React from 'react'
import { Sparkles } from 'lucide-react'

function StartScreen({ updateState }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Main Content Container */}
      <div className="max-w-2xl w-full text-center space-y-8 p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-700">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          Welcome to the Tech Quiz
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-lg md:text-xl">
          Test your knowledge and challenge yourself with our interactive quiz experience
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {[
            "Multiple choice questions",
            "Instant feedback",
            "Detailed explanations",
            "Track your progress"
          ].map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 text-gray-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Start Button */}
        <button
          onClick={() => updateState("start")}
          className="group relative px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all hover:scale-105 hover:shadow-[0_0_40px_4px_rgba(59,130,246,0.3)] active:scale-95"
        >
          <span className="group-hover:opacity-0 transition-opacity">Start Quiz</span>
          <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            Let's Begin!
          </span>
        </button>

        {/* Additional Info */}
        <p className="text-gray-400 text-sm">
          Ready to challenge yourself? Click start when you're ready!
        </p>
      </div>

      {/* Footer */}
      <div className="mt-8 text-gray-500 text-sm">
        © 2024 Tech Quiz • Powered by React
      </div>
    </div>
  )
}

export default StartScreen
