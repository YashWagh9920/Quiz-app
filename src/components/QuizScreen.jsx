import { useEffect, useState } from 'react';
import axios from 'axios';
import { Timer, Check, X } from 'lucide-react';


const QuizScreen = ({ onQuizComplete,scoreSend, giveData }) => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch quiz data using Axios
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const apiUrl = import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${apiUrl}/Uw5CrX`);
        
        setQuizData(response.data.questions); // Adjust according to API response structure
        giveData(response.data.questions);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchQuizData();
  }, []);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = (isCorrect) => {
    if (isCorrect) {
      setScore(prev => prev + 10); // 10 points per correct answer
    }
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      scoreSend(score,quizData.length);
      onQuizComplete("results");
    }
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-300 text-lg">Loading your quiz...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg border border-red-500/50">
        <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-400 text-center">Error: {error}</p>
      </div>
    </div>
  );

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-700 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-gray-200">Question {currentQuestionIndex + 1}/{quizData.length}</h2>
              <p className="text-gray-400 text-sm">Current Score: {score} points</p>
            </div>
            <div className="flex items-center gap-2 bg-gray-700/50 px-4 py-2 rounded-lg">
              <Timer className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Quiz in Progress</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-gray-700 mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-200 mb-8">
            {currentQuestion.description}
          </h2>

          {/* Answer Options */}
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 md:p-5 text-left rounded-xl transition-all duration-200 border
                  ${selectedAnswer === index 
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300' 
                    : 'bg-gray-700/30 border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm border
                    ${selectedAnswer === index
                      ? 'border-blue-500 text-blue-300'
                      : 'border-gray-500 text-gray-400'}`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-lg">{option.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Button */}
        <button
          onClick={() => handleNextQuestion(currentQuestion.options[selectedAnswer]?.is_correct)}
          disabled={selectedAnswer === null}
          className={`w-full py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-200
            ${selectedAnswer !== null 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg hover:shadow-blue-500/25'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
        >
          {currentQuestionIndex === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>

        {/* Question Counter */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          Question {currentQuestionIndex + 1} of {quizData.length}
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;