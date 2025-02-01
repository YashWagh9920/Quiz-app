import React from 'react';
import { Trophy, ArrowRight, BookOpen, RotateCcw } from 'lucide-react';


const ResultScreen = ({ score, totalQuestions, onRestart }) => {
  const percentage = (score / (totalQuestions * 10)) * 100;
  const correctAnswers = score / 10;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-8">
        {/* Result Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700 shadow-xl">
          {/* Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="relative w-24 h-24 mx-auto">
              {percentage >= 70 ? (
                <Trophy className="w-24 h-24 text-yellow-400 animate-bounce" />
              ) : percentage >= 50 ? (
                <Trophy className="w-24 h-24 text-blue-400" />
              ) : (
                <Trophy className="w-24 h-24 text-gray-400" />
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-200">
              Quiz Completed!
            </h1>
          </div>

          {/* Score Display */}
          <div className="relative mb-8">
            <div className="flex justify-center items-center">
              <div className="relative w-48 h-48">
                {/* Background Circle */}
                <div className="absolute inset-0 rounded-full border-8 border-gray-700"></div>
                {/* Progress Circle */}
                <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className={`${
                      percentage >= 70 ? 'text-green-500' :
                      percentage >= 50 ? 'text-blue-500' :
                      'text-red-500'
                    }`}
                    strokeDasharray={`${percentage * 2.64}, 264`}
                  />
                </svg>
                {/* Score Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-gray-200">{score}</span>
                  <span className="text-gray-400">out of {totalQuestions * 10}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-700/30 rounded-xl p-4 text-center">
              <p className="text-gray-400 mb-1">Correct Answers</p>
              <p className="text-2xl font-bold text-gray-200">{correctAnswers} / {totalQuestions}</p>
            </div>
            <div className="bg-gray-700/30 rounded-xl p-4 text-center">
              <p className="text-gray-400 mb-1">Accuracy</p>
              <p className="text-2xl font-bold text-gray-200">{percentage.toFixed(1)}%</p>
            </div>
          </div>

          {/* Feedback Message */}
          <div className="text-center mb-8 p-4 rounded-xl bg-gray-700/30">
            {score <= 50 ? (
              <p className="text-red-400">
                Keep practicing! Review the study material and try again to improve your score.
              </p>
            ) : (
              <p className="text-green-400">
                Excellent work! 🎉 Your dedication to learning shows in your results!
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onRestart("idle")}
              className="flex-1 group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
              Restart Quiz
            </button>
            <button
              onClick={() => onRestart("analyze")}
              className="flex-1 group bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              Study Now
            </button>
          </div>
        </div>

        {/* Share Section */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Share your achievement with friends and keep learning!
          </p>
        </div>
      </div>
    </div>
  );
};


export default ResultScreen;
