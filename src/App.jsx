import { useState } from 'react'
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import StartScreen from './components/StartScreen';
import StudyScreen from './components/StudyScreen';

function App() {
  const [quizState, setQuizState] = useState("idle");
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [data, setData] = useState([]);

  const setQuizStat = (state) => {
    setQuizState(state);
  };

  const updateScore = (newScore, questions) => {
    setScore(newScore);
    setTotalQuestions(questions);
  };

  const getData = (apidata) => {
    setData(apidata);
  };

  return (
    <div className="min-h-screen min-w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 antialiased">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvZz48L3N2Zz4=')] opacity-40"></div>

      {/* Main Content Container */}
      <main className="relative min-h-screen flex items-center justify-center">
        {quizState === "idle" && (
          <StartScreen updateState={setQuizStat} />
        )}

        {quizState === "start" && (
          <QuizScreen 
            onQuizComplete={setQuizStat} 
            scoreSend={updateScore} 
            giveData={getData} 
          />
        )}

        {quizState === "results" && (
          <ResultScreen 
            onRestart={setQuizStat} 
            score={score} 
            totalQuestions={totalQuestions} 
          />
        )}

        {quizState === "analyze" && (
          <StudyScreen 
            studyData={data} 
            updateState={setQuizStat} 
          />
        )}
      </main>
    </div>
  )
}

export default App;